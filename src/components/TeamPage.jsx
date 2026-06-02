import React from 'react';
import { ArrowLeft, Plus, Minus, Check, Copy } from 'lucide-react';
import { teams, getStickersForTeam } from '../data/copaData';
import StickerImage from './StickerImage';

const flagMap = {
  MEX: 'mx', RSA: 'za', KOR: 'kr', CZE: 'cz',
  CAN: 'ca', BIH: 'ba', QAT: 'qa', SUI: 'ch',
  BRA: 'br', MAR: 'ma', HAI: 'ht', SCO: 'gb-sct',
  USA: 'us', PAR: 'py', AUS: 'au', TUR: 'tr',
  GER: 'de', CUW: 'cw', CIV: 'ci', ECU: 'ec',
  NED: 'nl', JPN: 'jp', SWE: 'se', TUN: 'tn',
  BEL: 'be', EGY: 'eg', IRN: 'ir', NZL: 'nz',
  ESP: 'es', CPV: 'cv', KSA: 'sa', URU: 'uy',
  FRA: 'fr', SEN: 'sn', IRQ: 'iq', NOR: 'no',
  ARG: 'ar', ALG: 'dz', AUT: 'at', JOR: 'jo',
  POR: 'pt', COD: 'cd', UZB: 'uz', COL: 'co',
  ENG: 'gb-eng', CRO: 'hr', GHA: 'gh', PAN: 'pa'
};

export default function TeamPage({ teamCode, stickerStates, onTogglePasted, onAdjustDuplicates, onBack }) {
  const team = teams[teamCode];
  const stickers = getStickersForTeam(teamCode);
  const countryCode = flagMap[teamCode] || 'br';

  const getStickerProgress = () => {
    let pasted = 0;
    for (let i = 1; i <= 20; i++) {
      if (stickerStates[`${teamCode}_${i}`]?.status === 'pasted') {
        pasted++;
      }
    }
    return pasted;
  };

  const pastedCount = getStickerProgress();

  return (
    <div className="team-page-container" style={{ display: 'flex', flexDirection: 'column', gap: '16px', position: 'relative' }}>
      
      {/* Background Flag Overlay */}
      <div style={{
        position: 'absolute',
        top: '-24px', /* Compensate for content-area padding */
        left: '-20px',
        right: '-20px',
        height: '380px',
        backgroundImage: `url(https://flagcdn.com/w1280/${countryCode}.png)`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        opacity: 0.15,
        maskImage: 'linear-gradient(to bottom, rgba(0,0,0,1) 0%, rgba(0,0,0,0) 100%)',
        WebkitMaskImage: 'linear-gradient(to bottom, rgba(0,0,0,1) 0%, rgba(0,0,0,0) 100%)',
        zIndex: 0,
        pointerEvents: 'none'
      }}></div>

      {/* Header Navigation */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '12px', position: 'relative', zIndex: 1 }}>
        <button
          onClick={onBack}
          className="glass glass-interactive"
          style={{
            border: 'none',
            color: 'var(--text-primary)',
            width: '40px',
            height: '40px',
            borderRadius: '50%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer'
          }}
        >
          <ArrowLeft size={20} />
        </button>
        <div>
          <span style={{ color: 'var(--text-muted)', fontSize: '12px', fontWeight: 600, textTransform: 'uppercase' }}>Voltar ao álbum</span>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span style={{ fontSize: '24px' }}>{team.flag}</span>
            <h2 style={{ fontSize: '22px' }}>{team.name}</h2>
          </div>
        </div>
      </div>

      {/* Team Stats Summary Card */}
      <div className="glass" style={{ padding: '16px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderLeft: `5px solid ${team.color}` }}>
        <div>
          <span style={{ fontSize: '13px', color: 'var(--text-secondary)' }}>Status da Seleção</span>
          <div style={{ display: 'flex', alignItems: 'baseline', gap: '4px', marginTop: '2px' }}>
            <span style={{ fontSize: '22px', fontWeight: 800 }}>{pastedCount}</span>
            <span style={{ fontSize: '13px', color: 'var(--text-muted)' }}>/ 20 Coladas</span>
          </div>
        </div>
        <div style={{ background: 'rgba(0, 156, 180, 0.08)', padding: '6px 12px', borderRadius: '20px', fontSize: '12px', fontWeight: 700, color: team.color }}>
          {((pastedCount / 20) * 100).toFixed(0)}% Completo
        </div>
      </div>

      {/* Stickers Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px' }}>
        {stickers.map((sticker) => {
          const stickerKey = `${teamCode}_${sticker.number}`;
          const state = stickerStates[stickerKey] || { status: 'missing', duplicates: 0 };
          const isPasted = state.status === 'pasted';
          const hasDuplicates = state.duplicates > 0;
          const isSpecial = sticker.type === 'special';

          return (
            <div
              key={sticker.number}
              className={`glass ${isPasted ? 'shine-effect' : ''}`}
              style={{
                padding: '12px',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                minHeight: '150px',
                border: isPasted ? `1.5px solid ${team.color}` : '1px solid var(--border-glass)',
                boxShadow: isPasted ? `0 4px 12px rgba(0,0,0,0.05)` : 'none',
                background: isPasted 
                  ? (isSpecial ? 'rgba(212, 175, 55, 0.12)' : 'rgba(0, 156, 180, 0.06)')
                  : 'var(--bg-secondary)',
                borderRadius: '12px',
                position: 'relative',
                transition: 'all 0.3s ease'
              }}
            >
              {/* Badge for Special (Shield, Team Photo) */}
              {isSpecial && (
                <span style={{
                  position: 'absolute',
                  top: '8px',
                  right: '8px',
                  background: 'var(--accent-gold-gradient)',
                  color: '#000',
                  fontSize: '9px',
                  fontWeight: 800,
                  padding: '2px 6px',
                  borderRadius: '4px',
                  textTransform: 'uppercase'
                }}>
                  Especial
                </span>
              )}

              {/* Top Row: Number & Duplicates Badge */}
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                <span style={{
                  fontSize: '12px',
                  fontWeight: 800,
                  color: isPasted ? 'var(--text-primary)' : 'var(--text-muted)',
                  background: 'rgba(0, 156, 180, 0.05)',
                  padding: '2px 6px',
                  borderRadius: '6px'
                }}>
                  {teamCode} {sticker.number}
                </span>

                {hasDuplicates && (
                  <span style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '2px',
                    fontSize: '11px',
                    fontWeight: 700,
                    background: 'rgba(0, 230, 118, 0.15)',
                    color: 'var(--color-duplicate)',
                    padding: '2px 6px',
                    borderRadius: '6px'
                  }}>
                    <Copy size={10} /> +{state.duplicates}
                  </span>
                )}
              </div>

              {/* Middle Row: Photo, Name & Role */}
              <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', margin: '6px 0', gap: '8px' }}>
                <StickerImage 
                  playerName={sticker.name} 
                  teamColor={team.color} 
                  isPasted={isPasted} 
                  isSpecial={isSpecial} 
                />

                <div style={{ textAlign: 'center' }}>
                  <h4 style={{
                    fontSize: '13px',
                    fontWeight: 700,
                    color: 'var(--text-primary)',
                    lineHeight: '1.2'
                  }}>
                    {sticker.name}
                  </h4>
                  <span style={{
                    fontSize: '11px',
                    color: 'var(--text-secondary)',
                    marginTop: '2px',
                    display: 'block'
                  }}>
                    {sticker.role}
                  </span>
                </div>
              </div>

              {/* Bottom Row: Actions */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginTop: '10px', paddingTop: '8px', borderTop: '1px solid rgba(255,255,255,0.04)' }}>
                {/* Pasted Status Toggle Button */}
                <button
                  onClick={() => onTogglePasted(stickerKey)}
                  className="glass-interactive"
                  style={{
                    flex: 1,
                    height: '28px',
                    borderRadius: '6px',
                    border: 'none',
                    background: isPasted ? 'var(--accent-gold-gradient)' : 'rgba(255,255,255,0.05)',
                    color: isPasted ? '#000' : 'var(--text-secondary)',
                    fontSize: '11px',
                    fontWeight: 700,
                    display: 'flex',
                    alignItems: 'center',
                    justify: 'center',
                    gap: '4px',
                    cursor: 'pointer'
                  }}
                >
                  {isPasted ? (
                    <>
                      <Check size={12} strokeWidth={3} /> Colada
                    </>
                  ) : (
                    'Colar'
                  )}
                </button>

                {/* Duplicates Counter Adjusters */}
                <div style={{ display: 'flex', alignItems: 'center', background: 'rgba(255,255,255,0.03)', borderRadius: '6px', border: '1px solid var(--border-glass)' }}>
                  <button
                    onClick={() => onAdjustDuplicates(stickerKey, -1)}
                    style={{
                      border: 'none',
                      background: 'none',
                      color: 'var(--text-muted)',
                      padding: '4px 6px',
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center'
                    }}
                  >
                    <Minus size={11} />
                  </button>
                  <span style={{ fontSize: '11px', fontWeight: 700, minWidth: '12px', textAlign: 'center' }}>
                    {state.duplicates}
                  </span>
                  <button
                    onClick={() => onAdjustDuplicates(stickerKey, 1)}
                    style={{
                      border: 'none',
                      background: 'none',
                      color: 'var(--text-muted)',
                      padding: '4px 6px',
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center'
                    }}
                  >
                    <Plus size={11} />
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
