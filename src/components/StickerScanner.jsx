import React, { useState, useEffect, useRef } from 'react';
import { Camera, X, Bolt, Keyboard, Sparkles, Check, Plus, AlertCircle, Loader2, Maximize, FileText, CheckSquare, Square, CheckCircle } from 'lucide-react';
import { teams, getStickersForTeam } from '../data/copaData';
import Tesseract from 'tesseract.js';

export default function StickerScanner({ stickerStates, onTogglePasted, onSetStickerStatus, onAdjustDuplicates, onClose }) {
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const streamRef = useRef(null);
  const [stream, setStream] = useState(null);
  const [cameraError, setCameraError] = useState(false);
  const [flashlight, setFlashlight] = useState(false);
  
  // OCR status
  const [ocrProcessing, setOcrProcessing] = useState(false);
  
  // Modos de escaneamento
  const [scanMode, setScanMode] = useState('sticker'); // 'sticker' | 'page'
  
  // Fast input state
  const [inputTeam, setInputTeam] = useState('BRA');
  const [inputNumber, setInputNumber] = useState('');
  
  // Scanned sticker result modal
  const [scannedSticker, setScannedSticker] = useState(null);
  
  // Scanned page review modal
  const [pageReview, setPageReview] = useState(null); // { teamCode, statuses: { "1": "pasted", "2": "missing" } }
  
  const [scannerActive, setScannerActive] = useState(true);
  
  useEffect(() => {
    startCamera();
    return () => {
      stopCamera();
    };
  }, []);

  // Frame processing loop for real on-device OCR (Sticker Mode only)
  useEffect(() => {
    if (!scannerActive || cameraError || !stream || scanMode !== 'sticker' || pageReview) return;

    const intervalId = setInterval(async () => {
      if (ocrProcessing) return; // Wait if already analyzing a frame

      const video = videoRef.current;
      const canvas = canvasRef.current;

      if (video && canvas && video.readyState === video.HAVE_ENOUGH_DATA) {
        try {
          const ctx = canvas.getContext('2d');
          const videoWidth = video.videoWidth;
          const videoHeight = video.videoHeight;
          
          const cropSize = Math.min(videoWidth, videoHeight) * 0.45;
          const sx = (videoWidth - cropSize) / 2;
          const sy = (videoHeight - cropSize) / 2;

          ctx.drawImage(video, sx, sy, cropSize, cropSize, 0, 0, 240, 240);

          setOcrProcessing(true);
          
          const result = await Tesseract.recognize(canvas, 'eng');
          const text = result.data.text || '';
          
          const ocrUpper = text.toUpperCase();
          const cleanText = ocrUpper.replace(/[^A-Z0-9]/g, ' ');
          
          // 1. Tentar ler pelo código direto
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

          // 2. Fallback: Buscar pelo nome do jogador
          if (!detectedCode) {
            const allTeamCodes = Object.keys(teams);
            let bestMatch = null;

            for (const tCode of allTeamCodes) {
              const teamStickers = getStickersForTeam(tCode);
              for (const sticker of teamStickers) {
                if (sticker.name && sticker.name.length > 4) {
                  const normalizedName = sticker.name.toUpperCase();
                  if (ocrUpper.includes(normalizedName)) {
                    bestMatch = { teamCode: tCode, number: sticker.number.toString() };
                    break;
                  }
                  const nameParts = normalizedName.split(/\s+/).filter(part => part.length > 3 && part !== 'SILVA' && part !== 'SANTOS');
                  for (const part of nameParts) {
                    if (new RegExp(`\\b${part}\\b`).test(cleanText)) {
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

          if (detectedCode && detectedNum) {
            if (navigator.vibrate) navigator.vibrate(100);
            processStickerCode(detectedCode, detectedNum);
          }
        } catch (e) {
          console.error("OCR Frame processing error:", e);
        } finally {
          setOcrProcessing(false);
        }
      }
    }, 1500);

    return () => clearInterval(intervalId);
  }, [scannerActive, cameraError, stream, ocrProcessing, scanMode, pageReview]);

  // Função para escanear a página inteira
  const handleScanPage = async () => {
    const video = videoRef.current;
    if (!video || video.readyState !== video.HAVE_ENOUGH_DATA) return;

    try {
      setOcrProcessing(true);
      
      // 1. Otimização de Performance (Reduzir resolução para o OCR)
      const MAX_WIDTH = 800;
      const scale = Math.min(1, MAX_WIDTH / video.videoWidth);
      const targetWidth = video.videoWidth * scale;
      const targetHeight = video.videoHeight * scale;

      const fullCanvas = document.createElement('canvas');
      fullCanvas.width = targetWidth;
      fullCanvas.height = targetHeight;
      const ctx = fullCanvas.getContext('2d');
      ctx.drawImage(video, 0, 0, targetWidth, targetHeight);
      
      const result = await Tesseract.recognize(fullCanvas, 'eng');
      const text = result.data.text || '';
      const ocrUpper = text.toUpperCase();
      const cleanText = ocrUpper.replace(/[^A-Z0-9]/g, ' ');

      // Identificar a equipe
      let detectedTeam = null;
      for (const code of Object.keys(teams)) {
        const teamName = teams[code].name.toUpperCase();
        if (ocrUpper.includes(code) || ocrUpper.includes(teamName)) {
          detectedTeam = code;
          break;
        }
      }

      // Detectar os números de 1 a 20 visíveis
      let missingCount = 0;
      const missingNumbers = new Set();
      
      const teamStickers = detectedTeam ? getStickersForTeam(detectedTeam) : [];

      for (let i = 1; i <= 20; i++) {
        const numRegex = new RegExp(`\\b${i}\\b`);
        
        let foundMissing = false;
        
        if (numRegex.test(cleanText)) {
          foundMissing = true;
        } else if (teamStickers.length > 0) {
          // Fallback: verificar nome impresso na página vazia
          const sticker = teamStickers.find(s => s.number === i);
          if (sticker && sticker.name) {
            const nameParts = sticker.name.toUpperCase().split(/\s+/).filter(p => p.length > 4 && p !== 'SILVA' && p !== 'SANTOS');
            for (const part of nameParts) {
              if (new RegExp(`\\b${part}\\b`).test(cleanText)) {
                foundMissing = true;
                break;
              }
            }
          }
        }

        if (foundMissing) {
          missingNumbers.add(i.toString());
          missingCount++;
        }
      }

      // Validação de Falso Positivo: Se não achou time e achou menos de 2 números, não é página de álbum
      if (!detectedTeam && missingCount < 2) {
        alert("Página de álbum não reconhecida. Certifique-se de focar em uma página inteira e com boa iluminação.");
        setOcrProcessing(false);
        return;
      }

      if (!detectedTeam) {
        // Fallback apenas se tivermos certeza que é um album (baseado nos números encontrados)
        detectedTeam = 'BRA';
      }

      // Identificar status (Faltantes x Coladas)
      const newStatuses = {};
      for (let i = 1; i <= 20; i++) {
        if (missingNumbers.has(i.toString())) {
          newStatuses[i.toString()] = 'missing'; // Número visível -> figurinha falta
        } else {
          newStatuses[i.toString()] = 'pasted'; // Número invisível -> figurinha colada
        }
      }

      // Proteger figurinhas já marcadas como coladas anteriormente no banco
      for (let i = 1; i <= 20; i++) {
        const key = `${detectedTeam}_${i}`;
        if (stickerStates[key]?.status === 'pasted') {
          newStatuses[i.toString()] = 'pasted';
        }
      }

      if (navigator.vibrate) navigator.vibrate(100);
      
      setPageReview({
        teamCode: detectedTeam,
        statuses: newStatuses
      });
      setScannerActive(false);

    } catch (e) {
      console.error("Page scan error:", e);
      alert("Erro ao analisar a página. Tente novamente.");
    } finally {
      setOcrProcessing(false);
    }
  };

  const startCamera = async () => {
    setCameraError(false);
    try {
      if (streamRef.current || stream) {
        stopCamera();
      }
      const mediaStream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: 'environment', width: { ideal: 1280 }, height: { ideal: 720 } },
        audio: false
      });
      streamRef.current = mediaStream;
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
    if (streamRef.current) {
      streamRef.current.getTracks().forEach(track => track.stop());
      streamRef.current = null;
    }
    if (videoRef.current && videoRef.current.srcObject) {
      const tracks = videoRef.current.srcObject.getTracks();
      tracks.forEach(track => track.stop());
      videoRef.current.srcObject = null;
    }
    setStream(null);
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
        alert("Flashlight não suportada neste dispositivo.");
      }
    } catch (e) {
      console.error("Flashlight error:", e);
    }
  };

  const processStickerCode = (teamCode, numStr) => {
    const num = parseInt(numStr, 10);
    if (!teams[teamCode] || isNaN(num) || num < 1 || num > 20) return;

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
      
      setScannerActive(false);
    }
  };

  const handleModalSave = (action) => {
    if (!scannedSticker) return;
    if (action === 'paste') {
      onTogglePasted(scannedSticker.key);
    } else if (action === 'duplicate') {
      onAdjustDuplicates(scannedSticker.key, 1);
    }
    setScannedSticker(null);
    setScannerActive(true);
    setInputNumber('');
  };

  const handleToggleReviewStatus = (numStr) => {
    setPageReview(prev => {
      const currentStatus = prev.statuses[numStr];
      return {
        ...prev,
        statuses: {
          ...prev.statuses,
          [numStr]: currentStatus === 'pasted' ? 'missing' : 'pasted'
        }
      };
    });
  };

  const handleSavePageReview = () => {
    if (!pageReview) return;
    
    Object.entries(pageReview.statuses).forEach(([numStr, status]) => {
      const key = `${pageReview.teamCode}_${numStr}`;
      const currentState = stickerStates[key]?.status || 'missing';
      if (currentState !== status) {
        onSetStickerStatus(key, status);
      }
    });

    setPageReview(null);
    setScannerActive(true);
    alert(`Página salva com sucesso!`);
  };

  return (
    <div className="scanner-container" style={{
      position: 'fixed', top: 0, left: '50%', transform: 'translateX(-50%)',
      width: '100%', maxWidth: '480px', height: '100vh',
      background: '#000', zIndex: 500, display: 'flex', flexDirection: 'column',
      justifyContent: 'space-between', overflow: 'hidden'
    }}>
      
      <canvas ref={canvasRef} width="240" height="240" style={{ display: 'none' }} />
      
      {/* Top Bar */}
      <div style={{
        display: 'flex', justifyContent: 'space-between', alignItems: 'center',
        padding: '16px 20px', background: 'linear-gradient(to bottom, rgba(0,0,0,0.8), transparent)',
        position: 'absolute', top: 0, left: 0, right: 0, zIndex: 510
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <div style={{ width: '8px', height: '8px', background: scannerActive ? '#00e676' : '#ff3d00', borderRadius: '50%', boxShadow: '0 0 8px currentColor' }}></div>
          <span style={{ fontSize: '13px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '1px', color: '#fff' }}>
            Scanner de Figurinha
          </span>
        </div>
        
        <div style={{ display: 'flex', gap: '12px' }}>
          <button onClick={handleToggleFlashlight} className="glass" style={{ border: 'none', color: '#fff', width: '40px', height: '40px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Bolt size={18} style={{ color: flashlight ? 'var(--accent-gold)' : '#fff' }} />
          </button>
          <button onClick={onClose} className="glass" style={{ border: 'none', color: '#fff', width: '40px', height: '40px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <X size={18} />
          </button>
        </div>
      </div>

      {/* Mode Switcher removido */}

      {/* Viewport */}
      <div style={{ flex: 1, position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#05050a' }}>
        {cameraError ? (
          <div style={{ padding: '30px', textAlign: 'center', display: 'flex', flexDirection: 'column', gap: '16px', alignItems: 'center' }}>
            <AlertCircle size={48} style={{ color: '#ff3d00' }} />
            <h3 style={{ fontSize: '18px', color: '#fff' }}>Acesso à câmera indisponível</h3>
            <button onClick={startCamera} className="glass" style={{ border: 'none', padding: '10px 20px', color: 'var(--accent-gold)', fontWeight: 700 }}>
              Tentar Novamente
            </button>
          </div>
        ) : (
          <video ref={videoRef} autoPlay playsInline muted style={{ width: '100%', height: '100%', objectFit: 'cover', opacity: scannerActive ? 1 : 0.4, transition: 'opacity 0.3s ease' }} />
        )}

        {/* Targets */}
        {scannerActive && !cameraError && scanMode === 'sticker' && (
          <div style={{ position: 'absolute', width: '240px', height: '240px', border: '2px solid rgba(255, 90, 0, 0.5)', borderRadius: '16px', boxShadow: '0 0 0 9999px rgba(0, 0, 0, 0.6)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <div style={{ position: 'absolute', width: '100%', height: '3px', background: 'linear-gradient(to right, rgba(0,245,118,0) 0%, rgba(0,245,118,1) 50%, rgba(0,245,118,0) 100%)', boxShadow: '0 0 10px #00f576', animation: 'laser-sweep 2.5s infinite linear' }} />
            <div style={{ position: 'absolute', top: -2, left: -2, width: '20px', height: '20px', borderTop: '4px solid var(--color-orange)', borderLeft: '4px solid var(--color-orange)', borderTopLeftRadius: '12px' }}></div>
            <div style={{ position: 'absolute', top: -2, right: -2, width: '20px', height: '20px', borderTop: '4px solid var(--color-orange)', borderRight: '4px solid var(--color-orange)', borderTopRightRadius: '12px' }}></div>
            <div style={{ position: 'absolute', bottom: -2, left: -2, width: '20px', height: '20px', borderBottom: '4px solid var(--color-orange)', borderLeft: '4px solid var(--color-orange)', borderBottomLeftRadius: '12px' }}></div>
            <div style={{ position: 'absolute', bottom: -2, right: -2, width: '20px', height: '20px', borderBottom: '4px solid var(--color-orange)', borderRight: '4px solid var(--color-orange)', borderBottomRightRadius: '12px' }}></div>
            {ocrProcessing ? (
              <div style={{ position: 'absolute', display: 'flex', alignItems: 'center', gap: '6px', background: 'rgba(0,0,0,0.8)', padding: '6px 12px', borderRadius: '20px', fontSize: '11px', color: 'var(--color-lime)', fontWeight: 700, border: '1px solid rgba(178,225,21,0.3)' }}>
                <Loader2 size={12} className="animate-spin" /> <span>Analisando...</span>
              </div>
            ) : (
              <span style={{ position: 'absolute', color: '#fff', fontSize: '10px', fontWeight: 700, textTransform: 'uppercase', background: 'rgba(0,0,0,0.7)', padding: '4px 10px', borderRadius: '12px', letterSpacing: '0.5px' }}>
                Centralize o Código (Ex: BRA 10)
              </span>
            )}
          </div>
        )}

        {scannerActive && !cameraError && scanMode === 'page' && (
          <div style={{ position: 'absolute', width: '90%', height: '80%', border: '2px dashed rgba(0, 156, 180, 0.8)', borderRadius: '16px', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
            <span style={{ position: 'absolute', top: '20px', background: 'rgba(0,0,0,0.7)', padding: '8px 16px', borderRadius: '20px', color: '#fff', fontSize: '13px', fontWeight: 600 }}>Enquadre toda a página da seleção</span>
            
            <button 
              onClick={handleScanPage}
              disabled={ocrProcessing}
              style={{
                position: 'absolute', bottom: '30px',
                background: 'var(--color-blue)', color: '#fff', border: 'none', padding: '16px 32px', borderRadius: '30px',
                fontSize: '16px', fontWeight: 800, display: 'flex', alignItems: 'center', gap: '10px', cursor: 'pointer',
                boxShadow: '0 8px 20px rgba(0, 156, 180, 0.4)'
              }}
            >
              {ocrProcessing ? <><Loader2 size={20} className="animate-spin" /> Analisando Página...</> : <><Camera size={20} /> Tirar Foto e Analisar</>}
            </button>
          </div>
        )}
      </div>

      {/* Fast Input Section (Only in sticker mode) */}
      {scanMode === 'sticker' && !pageReview && (
        <div className="glass" style={{ background: 'rgba(10, 10, 20, 0.95)', borderTop: '1px solid var(--border-glass)', padding: '20px', display: 'flex', flexDirection: 'column', gap: '12px', zIndex: 510 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Keyboard size={16} style={{ color: 'var(--color-orange)' }} />
            <span style={{ fontSize: '12px', fontWeight: 700, color: '#e0d0f5' }}>Consulta Manual</span>
          </div>
          <div style={{ display: 'flex', gap: '10px' }}>
            <select value={inputTeam} onChange={(e) => setInputTeam(e.target.value)} style={{ flex: '1.2', height: '48px', background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '10px', color: '#fff', padding: '0 12px', fontSize: '16px', fontWeight: 700, outline: 'none' }}>
              {Object.keys(teams).map(code => <option key={code} value={code} style={{ background: '#0a0a14', color: '#fff' }}>{teams[code].flag} {code}</option>)}
            </select>
            <input type="number" placeholder="Nº" value={inputNumber} onChange={(e) => setInputNumber(e.target.value)} style={{ flex: '0.8', height: '48px', background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '10px', color: '#fff', textAlign: 'center', fontSize: '18px', fontWeight: 800, outline: 'none' }} />
            <button onClick={() => processStickerCode(inputTeam, inputNumber)} className="glass-interactive" style={{ flex: '1', height: '48px', border: 'none', borderRadius: '10px', background: 'var(--accent-2026-gradient)', color: '#fff', fontWeight: 800, fontSize: '14px', cursor: 'pointer' }}>Consultar</button>
          </div>
        </div>
      )}

      {/* Modal Single Sticker */}
      {scannedSticker && (
        <div className="modal-overlay" style={{ zIndex: 1050 }}>
          <div className="modal-content glass" style={{ padding: '24px', display: 'flex', flexDirection: 'column', gap: '20px', borderRadius: '16px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span style={{ fontSize: '12px', color: 'var(--text-muted)', fontWeight: 800, background: 'rgba(15,23,42,0.05)', padding: '2px 8px', borderRadius: '6px' }}>{scannedSticker.teamCode} {scannedSticker.number}</span>
              <button onClick={() => { setScannedSticker(null); setScannerActive(true); }} style={{ border: 'none', background: 'none', color: 'var(--text-muted)', cursor: 'pointer' }}><X size={20} /></button>
            </div>
            <div className="shine-effect" style={{ padding: '20px', borderRadius: '12px', background: scannedSticker.status === 'pasted' ? 'rgba(178, 225, 21, 0.08)' : 'rgba(15, 23, 42, 0.02)', border: scannedSticker.status === 'pasted' ? '2px solid var(--color-lime)' : '1px solid var(--border-glass)', textAlign: 'center', display: 'flex', flexDirection: 'column', gap: '6px' }}>
              <span style={{ fontSize: '42px' }}>{teams[scannedSticker.teamCode].flag}</span>
              <h3 style={{ fontSize: '18px', fontWeight: 800, color: 'var(--text-primary)' }}>{scannedSticker.name}</h3>
              <span style={{ fontSize: '12px', color: 'var(--text-secondary)' }}>{scannedSticker.role}</span>
            </div>
            <div style={{ textAlign: 'center', padding: '5px 0' }}>
              {scannedSticker.status === 'pasted' ? (
                <div style={{ color: 'var(--accent-gold)', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', fontWeight: 700 }}><Check size={20} strokeWidth={3} /><span>Você já tem!</span></div>
              ) : (
                <div style={{ color: 'var(--text-secondary)', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', fontWeight: 700 }}><AlertCircle size={20} style={{ color: 'var(--text-muted)' }} /><span>Faltante</span></div>
              )}
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              {scannedSticker.status !== 'pasted' && <button onClick={() => handleModalSave('paste')} className="glass-interactive" style={{ width: '100%', padding: '14px', border: 'none', borderRadius: '12px', background: 'var(--accent-2026-gradient)', color: '#fff', fontWeight: 800, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px' }}><Check size={16} strokeWidth={3} /> Colar figurinha agora</button>}
              <button onClick={() => handleModalSave('duplicate')} className="glass-interactive" style={{ width: '100%', padding: '14px', border: 'none', borderRadius: '12px', background: 'rgba(0, 230, 118, 0.1)', color: 'var(--color-duplicate)', border: '1px solid rgba(0, 230, 118, 0.3)', fontWeight: 800, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px' }}><Plus size={16} /> Marcar Repetida</button>
            </div>
          </div>
        </div>
      )}

      {/* Modal Page Review */}
      {pageReview && (
        <div className="modal-overlay" style={{ zIndex: 1050 }}>
          <div className="modal-content glass" style={{ padding: '24px', display: 'flex', flexDirection: 'column', gap: '16px', borderRadius: '16px', width: '90%', maxWidth: '400px', maxHeight: '85vh', overflow: 'auto' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <select 
                value={pageReview.teamCode} 
                onChange={(e) => setPageReview({...pageReview, teamCode: e.target.value})}
                style={{ fontSize: '18px', fontWeight: 800, background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', color: 'var(--text-primary)', outline: 'none', padding: '6px 12px', borderRadius: '8px' }}
              >
                {Object.keys(teams).map(code => (
                  <option key={code} value={code} style={{ background: '#0a0a14' }}>
                    {teams[code].flag} {teams[code].name}
                  </option>
                ))}
              </select>
              <button onClick={() => { setPageReview(null); setScannerActive(true); }} style={{ border: 'none', background: 'none', color: 'var(--text-muted)', cursor: 'pointer' }}><X size={20} /></button>
            </div>
            
            <p style={{ fontSize: '13px', color: 'var(--text-secondary)', lineHeight: '1.5' }}>
              Baseado na foto, prevemos o status abaixo. Altere a seleção acima se estiver incorreta e clique nas figurinhas para corrigir o status.
            </p>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', maxHeight: '50vh', overflowY: 'auto', paddingRight: '4px' }}>
              {Array.from({ length: 20 }, (_, i) => i + 1).map(num => {
                const status = pageReview.statuses[num.toString()];
                const isPasted = status === 'pasted';
                return (
                  <div key={num} onClick={() => handleToggleReviewStatus(num.toString())} style={{
                    display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '12px 16px',
                    background: isPasted ? 'rgba(178, 225, 21, 0.1)' : 'rgba(255,255,255,0.02)',
                    border: `1px solid ${isPasted ? 'rgba(178, 225, 21, 0.4)' : 'rgba(255,255,255,0.05)'}`,
                    borderRadius: '10px', cursor: 'pointer', transition: '0.2s'
                  }}>
                    <span style={{ fontSize: '15px', fontWeight: 800, color: isPasted ? 'var(--text-primary)' : 'var(--text-muted)' }}>
                      Figurinha {num}
                    </span>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: isPasted ? 'var(--color-lime)' : 'var(--text-secondary)', fontSize: '13px', fontWeight: 700 }}>
                      {isPasted ? <CheckSquare size={18} /> : <Square size={18} />}
                      {isPasted ? 'Colada' : 'Faltante'}
                    </div>
                  </div>
                );
              })}
            </div>

            <button onClick={handleSavePageReview} className="glass-interactive" style={{ width: '100%', padding: '16px', border: 'none', borderRadius: '12px', background: 'var(--color-blue)', color: '#fff', fontWeight: 800, fontSize: '15px', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', marginTop: '10px', boxShadow: '0 8px 16px rgba(0,156,180,0.3)' }}>
              <CheckCircle size={20} /> Confirmar e Salvar Página
            </button>
          </div>
        </div>
      )}

      <style>{`
        @keyframes spin { to { transform: rotate(360deg); } }
        .animate-spin { animation: spin 1s linear infinite; }
      `}</style>
    </div>
  );
}
