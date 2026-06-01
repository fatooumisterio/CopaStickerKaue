import React, { useState, useEffect, useRef } from 'react';
import { Camera, RefreshCw, X, Bolt, Keyboard, Sparkles, Check, Plus, AlertCircle, Copy, Loader2 } from 'lucide-react';
import { teams, getStickersForTeam } from '../data/copaData';
import Tesseract from 'tesseract.js';

export default function StickerScanner({ stickerStates, onTogglePasted, onAdjustDuplicates, onClose }) {
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const [stream, setStream] = useState(null);
  const [cameraError, setCameraError] = useState(false);
  const [flashlight, setFlashlight] = useState(false);
  
  // OCR status
  const [ocrProcessing, setOcrProcessing] = useState(false);
  
  // Fast input state
  const [inputTeam, setInputTeam] = useState('BRA');
  const [inputNumber, setInputNumber] = useState('');
  
  // Scanned sticker result modal
  const [scannedSticker, setScannedSticker] = useState(null);
  const [scannerActive, setScannerActive] = useState(true);
  
  // Start camera stream on mount
  useEffect(() => {
    startCamera();
    return () => {
      stopCamera();
    };
  }, []);

  // Frame processing loop for real on-device OCR
  useEffect(() => {
    if (!scannerActive || cameraError || !stream) return;

    const intervalId = setInterval(async () => {
      if (ocrProcessing) return; // Wait if already analyzing a frame

      const video = videoRef.current;
      const canvas = canvasRef.current;

      if (video && canvas && video.readyState === video.HAVE_ENOUGH_DATA) {
        try {
          const ctx = canvas.getContext('2d');
          const videoWidth = video.videoWidth;
          const videoHeight = video.videoHeight;
          
          // Crop center of video feed corresponding to the visual target box
          const cropSize = Math.min(videoWidth, videoHeight) * 0.45;
          const sx = (videoWidth - cropSize) / 2;
          const sy = (videoHeight - cropSize) / 2;

          // Draw the cropped frame to our hidden canvas
          ctx.drawImage(video, sx, sy, cropSize, cropSize, 0, 0, 240, 240);

          setOcrProcessing(true);
          
          // Execute real on-device OCR using Tesseract.js
           const result = await Tesseract.recognize(canvas, 'eng');
          const text = result.data.text || '';
          
          const ocrUpper = text.toUpperCase();
          const cleanText = ocrUpper.replace(/[^A-Z0-9]/g, ' ');
          
          // 1. Tentar ler pelo código direto (ex: "BRA 10" ou "ARG 10")
          const match = cleanText.match(/\b([A-Z]{3})\s*([0-9]{1,2})\b/);
          let detectedCode = null;
          let detectedNum = null;

          if (match) {
            const code = match[1];
            const num = match[2];
            const numVal = parseInt(num, 10);
            
            if (teams[code] && numVal >= 1 && numVal <= 20) {
              detectedCode = code;
              detectedNum = num;
            }
          }

          // 2. Fallback: Se não achou código, buscar pelo nome do jogador na frente da figurinha
          if (!detectedCode) {
            const allTeamCodes = Object.keys(teams);
            let bestMatch = null;

            for (const tCode of allTeamCodes) {
              const teamStickers = getStickersForTeam(tCode);
              for (const sticker of teamStickers) {
                if (sticker.name && sticker.name.length > 4) {
                  const normalizedName = sticker.name.toUpperCase();
                  
                  // Se o texto lido contém o nome completo (ex: "NEYMAR JR")
                  if (ocrUpper.includes(normalizedName)) {
                    bestMatch = { teamCode: tCode, number: sticker.number.toString() };
                    break;
                  }

                  // Verificar partes significativas do nome (ex: "NEYMAR" ou "MESSI" ou "VINICIUS")
                  const nameParts = normalizedName.split(/\s+/).filter(part => part.length > 3 && part !== 'SILVA' && part !== 'SANTOS' && part !== 'GARCIA');
                  for (const part of nameParts) {
                    if (ocrUpper.includes(part)) {
                      bestMatch = { teamCode: tCode, number: sticker.number.toString() };
                      break;
                    }
                  }
                }
                if (bestMatch) break;
              }
              if (bestMatch) break;
            }

            if (bestMatch) {
              detectedCode = bestMatch.teamCode;
              detectedNum = bestMatch.number;
            }
          }

          // 3. Processar resultado encontrado
          if (detectedCode && detectedNum) {
            if (navigator.vibrate) {
              navigator.vibrate(100); // Vibração tátil de sucesso
            }
            processStickerCode(detectedCode, detectedNum);
          }
        } catch (e) {
          console.error("OCR Frame processing error:", e);
        } finally {
          setOcrProcessing(false);
        }
      }
    }, 1500); // Scan every 1.5 seconds

    return () => clearInterval(intervalId);
  }, [scannerActive, cameraError, stream, ocrProcessing]);

  const startCamera = async () => {
    setCameraError(false);
    try {
      if (stream) {
        stopCamera();
      }
      const mediaStream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: 'environment', width: { ideal: 1280 }, height: { ideal: 720 } },
        audio: false
      });
      setStream(mediaStream);
      if (videoRef.current) {
        videoRef.current.srcObject = mediaStream;
      }
    } catch (err) {
      console.error("Camera access error:", err);
      setCameraError(true);
    }
  };

  const stopCamera = () => {
    if (stream) {
      stream.getTracks().forEach(track => track.stop());
      setStream(null);
    }
  };

  const handleToggleFlashlight = async () => {
    if (!stream) return;
    const track = stream.getVideoTracks()[0];
    try {
      const capabilities = track.getCapabilities();
      if (capabilities.torch) {
        await track.applyConstraints({
          advanced: [{ torch: !flashlight }]
        });
        setFlashlight(!flashlight);
      } else {
        alert("Flashlight/Torch não suportada neste dispositivo.");
      }
    } catch (e) {
      console.error("Flashlight error:", e);
    }
  };

  // Process and query a sticker code (e.g. BRA 10)
  const processStickerCode = (teamCode, numStr) => {
    const num = parseInt(numStr, 10);
    if (!teams[teamCode] || isNaN(num) || num < 1 || num > 20) {
      return;
    }

    const teamStickers = getStickersForTeam(teamCode);
    const sticker = teamStickers.find(s => s.number === num);
    
    if (sticker) {
      const stickerKey = `${teamCode}_${num}`;
      const state = stickerStates[stickerKey] || { status: 'missing', duplicates: 0 };
      
      setScannedSticker({
        key: stickerKey,
        teamCode,
        number: num,
        name: sticker.name,
        role: sticker.role,
        type: sticker.type,
        status: state.status,
        duplicates: state.duplicates
      });
      
      // Stop scanner temporarily to show details
      setScannerActive(false);
    }
  };

  const handleTriggerMockScan = () => {
    // Generate a random sticker from a list of teams
    const teamCodes = Object.keys(teams);
    const randomTeam = teamCodes[Math.floor(Math.random() * teamCodes.length)];
    const randomNumber = Math.floor(Math.random() * 20) + 1;
    processStickerCode(randomTeam, randomNumber.toString());
  };

  const handleModalSave = (action) => {
    if (!scannedSticker) return;
    
    if (action === 'paste') {
      onTogglePasted(scannedSticker.key);
    } else if (action === 'duplicate') {
      onAdjustDuplicates(scannedSticker.key, 1);
    }
    
    // Reset scanned sticker and re-enable scanner
    setScannedSticker(null);
    setScannerActive(true);
    setInputNumber('');
  };

  return (
    <div className="scanner-container" style={{
      position: 'fixed',
      top: 0,
      left: '50%',
      transform: 'translateX(-50%)',
      width: '100%',
      maxWidth: '480px',
      height: '100vh',
      background: '#000',
      zIndex: 500,
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'space-between',
      overflow: 'hidden'
    }}>
      
      {/* Hidden canvas for image frame extraction */}
      <canvas ref={canvasRef} width="240" height="240" style={{ display: 'none' }} />
      
      {/* Top Bar Controls */}
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '16px 20px',
        background: 'linear-gradient(to bottom, rgba(0,0,0,0.8), transparent)',
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 510
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <div style={{ width: '8px', height: '8px', background: scannerActive ? '#00e676' : '#ff3d00', borderRadius: '50%', boxShadow: '0 0 8px currentColor' }}></div>
          <span style={{ fontSize: '13px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '1px', color: '#fff' }}>
            Scanner Inteligente
          </span>
        </div>
        
        <div style={{ display: 'flex', gap: '12px' }}>
          <button onClick={handleToggleFlashlight} className="glass" style={{ border: 'none', color: '#fff', width: '40px', height: '40px', borderRadius: '50%', display: 'flex', alignItems: 'center', justify: 'center' }}>
            <Bolt size={18} style={{ color: flashlight ? 'var(--accent-gold)' : '#fff' }} />
          </button>
          <button onClick={onClose} className="glass" style={{ border: 'none', color: '#fff', width: '40px', height: '40px', borderRadius: '50%', display: 'flex', alignItems: 'center', justify: 'center' }}>
            <X size={18} />
          </button>
        </div>
      </div>

      {/* Video / Camera Viewport */}
      <div style={{
        flex: 1,
        position: 'relative',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: '#05050a'
      }}>
        {cameraError ? (
          <div style={{ padding: '30px', textAlign: 'center', display: 'flex', flexDirection: 'column', gap: '16px', alignItems: 'center' }}>
            <AlertCircle size={48} style={{ color: '#ff3d00' }} />
            <h3 style={{ fontSize: '18px', color: '#fff' }}>Acesso à câmera indisponível</h3>
            <p style={{ fontSize: '13px', color: '#8573a3', lineHeight: '1.6' }}>
              Não conseguimos abrir a câmera. Use o **Teclado Rápido** abaixo para consultar as figurinhas instantaneamente!
            </p>
            <button onClick={startCamera} className="glass" style={{ border: 'none', padding: '10px 20px', color: 'var(--accent-gold)', fontWeight: 700 }}>
              Tentar Novamente
            </button>
          </div>
        ) : (
          <video
            ref={videoRef}
            autoPlay
            playsInline
            muted
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              opacity: scannerActive ? 1 : 0.4,
              transition: 'opacity 0.3s ease'
            }}
          />
        )}

        {/* Live Scan Target Box Animation */}
        {scannerActive && !cameraError && (
          <div style={{
            position: 'absolute',
            width: '240px',
            height: '240px',
            border: '2px solid rgba(255, 90, 0, 0.5)',
            borderRadius: '16px',
            boxShadow: '0 0 0 9999px rgba(0, 0, 0, 0.6)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}>
            {/* Moving Laser Line */}
            <div style={{
              position: 'absolute',
              width: '100%',
              height: '3px',
              background: 'linear-gradient(to right, rgba(0,245,118,0) 0%, rgba(0,245,118,1) 50%, rgba(0,245,118,0) 100%)',
              boxShadow: '0 0 10px #00f576',
              animation: 'laser-sweep 2.5s infinite linear'
            }} />
            
            {/* Corners visual indicator */}
            <div style={{ position: 'absolute', top: -2, left: -2, width: '20px', height: '20px', borderTop: '4px solid var(--color-orange)', borderLeft: '4px solid var(--color-orange)', borderTopLeftRadius: '12px' }}></div>
            <div style={{ position: 'absolute', top: -2, right: -2, width: '20px', height: '20px', borderTop: '4px solid var(--color-orange)', borderRight: '4px solid var(--color-orange)', borderTopRightRadius: '12px' }}></div>
            <div style={{ position: 'absolute', bottom: -2, left: -2, width: '20px', height: '20px', borderBottom: '4px solid var(--color-orange)', borderLeft: '4px solid var(--color-orange)', borderBottomLeftRadius: '12px' }}></div>
            <div style={{ position: 'absolute', bottom: -2, right: -2, width: '20px', height: '20px', borderBottom: '4px solid var(--color-orange)', borderRight: '4px solid var(--color-orange)', borderBottomRightRadius: '12px' }}></div>
            
            {/* Real-time OCR scanning indicator */}
            {ocrProcessing ? (
              <div style={{
                position: 'absolute',
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
                background: 'rgba(0,0,0,0.8)',
                padding: '6px 12px',
                borderRadius: '20px',
                fontSize: '11px',
                color: 'var(--color-lime)',
                fontWeight: 700,
                border: '1px solid rgba(178,225,21,0.3)'
              }}>
                <Loader2 size={12} className="animate-spin" style={{ animation: 'spin 1s linear infinite' }} />
                <span>Analisando Código...</span>
              </div>
            ) : (
              <span style={{ 
                position: 'absolute', 
                color: '#fff', 
                fontSize: '10px', 
                fontWeight: 700, 
                textTransform: 'uppercase', 
                background: 'rgba(0,0,0,0.7)', 
                padding: '4px 10px', 
                borderRadius: '12px', 
                letterSpacing: '0.5px' 
              }}>
                Centralize o Código (Ex: BRA 10)
              </span>
            )}
          </div>
        )}
      </div>

      {/* Interactive Dial Keypad / Fast Input Section */}
      <div className="glass" style={{
        background: 'rgba(10, 10, 20, 0.95)',
        borderTop: '1px solid var(--border-glass)',
        padding: '20px',
        display: 'flex',
        flexDirection: 'column',
        gap: '12px',
        zIndex: 510
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <Keyboard size={16} style={{ color: 'var(--color-orange)' }} />
          <span style={{ fontSize: '12px', fontWeight: 700, color: '#e0d0f5' }}>Consulta Manual Instantânea</span>
        </div>

        <div style={{ display: 'flex', gap: '10px' }}>
          {/* Team Code Picker */}
          <select
            value={inputTeam}
            onChange={(e) => setInputTeam(e.target.value)}
            style={{
              flex: '1.2',
              height: '48px',
              background: 'rgba(255,255,255,0.06)',
              border: '1px solid rgba(255,255,255,0.1)',
              borderRadius: '10px',
              color: '#fff',
              padding: '0 12px',
              fontSize: '16px',
              fontWeight: 700,
              outline: 'none'
            }}
          >
            {Object.keys(teams).map(code => (
              <option key={code} value={code} style={{ background: '#0a0a14', color: '#fff' }}>
                {teams[code].flag} {code}
              </option>
            ))}
          </select>

          {/* Number Input Dial */}
          <input
            type="number"
            placeholder="Nº"
            value={inputNumber}
            onChange={(e) => setInputNumber(e.target.value)}
            style={{
              flex: '0.8',
              height: '48px',
              background: 'rgba(255,255,255,0.06)',
              border: '1px solid rgba(255,255,255,0.1)',
              borderRadius: '10px',
              color: '#fff',
              textAlign: 'center',
              fontSize: '18px',
              fontWeight: 800,
              outline: 'none'
            }}
          />

          {/* Check Button */}
          <button
            onClick={() => processStickerCode(inputTeam, inputNumber)}
            className="glass-interactive"
            style={{
              flex: '1',
              height: '48px',
              border: 'none',
              borderRadius: '10px',
              background: 'var(--accent-2026-gradient)',
              color: '#fff',
              fontWeight: 800,
              fontSize: '14px',
              cursor: 'pointer'
            }}
          >
            Consultar
          </button>
        </div>
      </div>

      {/* Scanned Sticker Details Modal */}
      {scannedSticker && (
        <div className="modal-overlay" style={{ zIndex: 1050 }}>
          <div className="modal-content glass" style={{ padding: '24px', display: 'flex', flexDirection: 'column', gap: '20px', borderRadius: '16px' }}>
            
            {/* Modal Header */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span style={{ fontSize: '12px', color: 'var(--text-muted)', fontWeight: 800, background: 'rgba(15,23,42,0.05)', padding: '2px 8px', borderRadius: '6px' }}>
                {scannedSticker.teamCode} {scannedSticker.number}
              </span>
              <button
                onClick={() => { setScannedSticker(null); setScannerActive(true); }}
                style={{ border: 'none', background: 'none', color: 'var(--text-muted)', cursor: 'pointer' }}
              >
                <X size={20} />
              </button>
            </div>

            {/* Sticker Graphic Presentation */}
            <div className="shine-effect" style={{
              padding: '20px',
              borderRadius: '12px',
              background: scannedSticker.status === 'pasted' ? 'rgba(178, 225, 21, 0.08)' : 'rgba(15, 23, 42, 0.02)',
              border: scannedSticker.status === 'pasted' ? '2px solid var(--color-lime)' : '1px solid var(--border-glass)',
              textAlign: 'center',
              display: 'flex',
              flexDirection: 'column',
              gap: '6px'
            }}>
              <span style={{ fontSize: '42px' }}>{teams[scannedSticker.teamCode].flag}</span>
              <h3 style={{ fontSize: '18px', fontWeight: 800, color: 'var(--text-primary)' }}>{scannedSticker.name}</h3>
              <span style={{ fontSize: '12px', color: 'var(--text-secondary)' }}>{scannedSticker.role}</span>
            </div>

            {/* Sticker Status Indicator */}
            <div style={{ textAlign: 'center', padding: '5px 0' }}>
              {scannedSticker.status === 'pasted' ? (
                <div style={{ color: 'var(--accent-gold)', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', fontWeight: 700 }}>
                  <Check size={20} strokeWidth={3} />
                  <span>Você já tem no álbum!</span>
                </div>
              ) : (
                <div style={{ color: 'var(--text-secondary)', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', fontWeight: 700 }}>
                  <AlertCircle size={20} style={{ color: 'var(--text-muted)' }} />
                  <span>Você ainda não tem! (FALTANTE)</span>
                </div>
              )}
            </div>

            {/* Fast Actions inside scanning flow */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              {scannedSticker.status !== 'pasted' && (
                <button
                  onClick={() => handleModalSave('paste')}
                  className="glass-interactive"
                  style={{
                    width: '100%',
                    padding: '14px',
                    border: 'none',
                    borderRadius: '12px',
                    background: 'var(--accent-2026-gradient)',
                    color: '#fff',
                    fontWeight: 800,
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '6px'
                  }}
                >
                  <Check size={16} strokeWidth={3} />
                  Colar figurinha agora
                </button>
              )}

              <button
                onClick={() => handleModalSave('duplicate')}
                className="glass-interactive"
                style={{
                  width: '100%',
                  padding: '14px',
                  border: 'none',
                  borderRadius: '12px',
                  background: 'rgba(0, 230, 118, 0.1)',
                  color: 'var(--color-duplicate)',
                  border: '1px solid rgba(0, 230, 118, 0.3)',
                  fontWeight: 800,
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '6px'
                }}
              >
                <Plus size={16} />
                Marcar como Repetida (Troca)
              </button>

              <button
                onClick={() => { setScannedSticker(null); setScannerActive(true); }}
                className="glass-interactive"
                style={{
                  width: '100%',
                  padding: '12px',
                  border: 'none',
                  borderRadius: '12px',
                  background: 'rgba(15, 23, 42, 0.05)',
                  color: 'var(--text-secondary)',
                  fontWeight: 600,
                  cursor: 'pointer'
                }}
              >
                Voltar a Escanear
              </button>
            </div>

          </div>
        </div>
      )}

      {/* Animation spinner style in head */}
      <style>{`
        @keyframes spin {
          to { transform: rotate(360deg); }
        }
        .animate-spin {
          animation: spin 1s linear infinite;
        }
      `}</style>

    </div>
  );
}
