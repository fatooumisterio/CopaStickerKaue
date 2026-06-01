import React from 'react';
import { Trophy, CheckCircle2, Circle, Copy, Share2, Sparkles } from 'lucide-react';
import { TOTAL_STICKERS, teams } from '../data/copaData';

export default function Dashboard({ stats, stickerStates, onSelectTeam, onNavigateToAlbum, onNavigateToTrades }) {
  const percentComplete = ((stats.pasted / TOTAL_STICKERS) * 100).toFixed(1);
  const numericPercent = parseFloat(percentComplete);

  // SVG parameters for Main Pie Chart
  const radius = 50;
  const circumference = 2 * Math.PI * radius; // ~314.16
  const strokeDashoffset = circumference - (numericPercent / 100) * circumference;

  // Obter o progresso de cada seleção individualmente
  const getTeamProgress = (teamCode) => {
    let pasted = 0;
    for (let i = 1; i <= 20; i++) {
      if (stickerStates[`${teamCode}_${i}`]?.status === 'pasted') {
        pasted++;
      }
    }
    return pasted;
  };

  // Ordenar seleções em ordem alfabética pelo nome completo
  const sortedTeamCodes = Object.keys(teams).sort((a, b) =>
    teams[a].name.localeCompare(teams[b].name, 'pt-BR')
  );

  return (
    <div className="dashboard-container" style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>

      {/* Premium Header with Official 2026 Logo */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', paddingBottom: '5px' }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span style={{ color: 'var(--text-muted)', fontSize: '11px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '1px' }}>Minha Coleção Oficial</span>
            <span style={{ fontSize: '9px', color: 'var(--color-teal)', fontWeight: 800, textTransform: 'uppercase', background: 'rgba(0, 156, 180, 0.1)', padding: '1px 8px', borderRadius: '20px', letterSpacing: '0.5px' }}>48 Seleções</span>
          </div>
          <h1 style={{ marginTop: '4px', lineHeight: '0.95', display: 'flex', flexDirection: 'column', width: 'fit-content' }}>
            <span className="neon-text-2026" style={{ fontSize: '32px', letterSpacing: '-0.03em' }}>WORLD CUP</span>
            <div style={{ display: 'flex', justifyContent: 'space-between', color: '#000000', fontWeight: 950, fontSize: '64px', lineHeight: '0.85', marginTop: '2px' }}>
              <span>2</span>
              <span>0</span>
              <span>2</span>
              <span>6</span>
            </div>
          </h1>
        </div>
        {/* Official logo displayed at the top right corner (2x Larger) */}
        <div className="glass shine-effect" style={{
          width: '100px',
          height: '132px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          borderRadius: '12px',
          overflow: 'hidden',
          padding: '4px',
          border: '2px solid rgba(255, 90, 0, 0.4)',
          background: 'rgba(7, 10, 19, 0.95)',
          boxShadow: '0 8px 20px rgba(0,0,0,0.6)',
          flexShrink: 0
        }}>
          <img
            src="/logo_2026.png"
            alt="Logo Oficial Copa 2026"
            style={{
              height: '100%',
              width: 'auto',
              objectFit: 'contain'
            }}
          />
        </div>
      </div>

      {/* Main Pie Chart Progress Card */}
      <div className="glass shine-effect animate-pulse-gold" style={{ padding: '20px', display: 'flex', alignItems: 'center', gap: '20px', position: 'relative', overflow: 'hidden' }}>
        {/* SVG Interactive Pie/Donut Chart */}
        <div style={{ position: 'relative', width: '120px', height: '120px', flexShrink: 0 }}>
          <svg width="100%" height="100%" viewBox="0 0 120 120" style={{ transform: 'rotate(-90deg)' }}>
            {/* Background Circle */}
            <circle
              cx="60"
              cy="60"
              r={radius}
              fill="transparent"
              stroke="rgba(255,255,255,0.05)"
              strokeWidth="10"
            />
            {/* Animated Filled Progress Circle */}
            <circle
              cx="60"
              cy="60"
              r={radius}
              fill="transparent"
              stroke="url(#copaGradient)"
              strokeWidth="10"
              strokeDasharray={circumference}
              strokeDashoffset={strokeDashoffset}
              strokeLinecap="round"
              style={{ transition: 'stroke-dashoffset 1s ease-in-out' }}
            />
            {/* Gradient definition matching Album Cover */}
            <defs>
              <linearGradient id="copaGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="var(--color-lime)" />
                <stop offset="50%" stopColor="var(--color-orange)" />
                <stop offset="100%" stopColor="var(--color-teal)" />
              </linearGradient>
            </defs>
          </svg>

          {/* Inner Percentage Label */}
          <div style={{
            position: 'absolute',
            top: 0, left: 0, right: 0, bottom: 0,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 5
          }}>
            <span style={{ fontSize: '20px', fontWeight: 900, color: 'var(--text-primary)' }}>{percentComplete}%</span>
            <span style={{ fontSize: '9px', color: 'var(--text-secondary)', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Concluído</span>
          </div>
        </div>

        {/* Text statistics */}
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '6px' }}>
          <span style={{ color: 'var(--text-secondary)', fontSize: '13px', fontWeight: 600 }}>Total de Figurinhas</span>
          <div style={{ display: 'flex', alignItems: 'baseline', gap: '4px' }}>
            <span style={{ fontSize: '32px', fontWeight: 900, color: 'var(--color-orange)' }}>{stats.pasted}</span>
            <span style={{ color: 'var(--text-muted)', fontSize: '15px', fontWeight: 600 }}>/ {TOTAL_STICKERS}</span>
          </div>

          <div style={{ display: 'flex', gap: '4px', alignItems: 'center', marginTop: '2px', fontSize: '11px', color: 'var(--color-teal)', fontWeight: 700 }}>
            <Sparkles size={12} />
            <span>Colecionando Rumo ao Título!</span>
          </div>
        </div>
      </div>

      {/* QUICK STATS ROW */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
        <div className="glass" style={{ padding: '14px 16px', display: 'flex', gap: '12px', alignItems: 'center' }}>
          <div style={{ color: 'var(--color-lime)', background: 'rgba(178, 225, 21, 0.1)', padding: '8px', borderRadius: '10px' }}>
            <CheckCircle2 size={18} />
          </div>
          <div>
            <div style={{ fontSize: '18px', fontWeight: 800 }}>{stats.pasted}</div>
            <div style={{ fontSize: '11px', color: 'var(--text-secondary)' }}>Coladas</div>
          </div>
        </div>

        <div className="glass" style={{ padding: '14px 16px', display: 'flex', gap: '12px', alignItems: 'center' }}>
          <div style={{ color: 'var(--text-muted)', background: 'rgba(255, 255, 255, 0.04)', padding: '8px', borderRadius: '10px' }}>
            <Circle size={18} />
          </div>
          <div>
            <div style={{ fontSize: '18px', fontWeight: 800 }}>{TOTAL_STICKERS - stats.pasted}</div>
            <div style={{ fontSize: '11px', color: 'var(--text-secondary)' }}>Faltantes</div>
          </div>
        </div>
      </div>

      {/* HORIZONTAL SWIPING CAROUSEL (CARRETILHA DE SELEÇÕES) */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <h3 style={{ fontSize: '15px', fontWeight: 800, color: 'var(--text-primary)', letterSpacing: '0.5px' }}>Progresso por Seleção (A-Z)</h3>
          <span style={{ fontSize: '10px', color: 'var(--text-muted)', fontWeight: 700 }}>Arraste para o lado ↔</span>
        </div>

        {/* Scrollable Container */}
        <div style={{
          display: 'flex',
          overflowX: 'auto',
          scrollSnapType: 'x mandatory',
          gap: '12px',
          paddingBottom: '10px',
          WebkitOverflowScrolling: 'touch',
          scrollbarWidth: 'none' /* Firefox */
        }} className="horizontal-carousel-no-scrollbar">
          {sortedTeamCodes.map((code) => {
            const team = teams[code];
            const teamPasted = getTeamProgress(code);
            const teamPercent = ((teamPasted / 20) * 100).toFixed(0);

            // Mini SVG circular parameters
            const miniRadius = 18;
            const miniCircumference = 2 * Math.PI * miniRadius; // ~113
            const miniOffset = miniCircumference - (parseFloat(teamPercent) / 100) * miniCircumference;

            return (
              <div
                key={code}
                onClick={() => onSelectTeam(code)}
                className="glass glass-interactive"
                style={{
                  flex: '0 0 100px',
                  scrollSnapAlign: 'start',
                  padding: '12px 10px',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  gap: '8px',
                  cursor: 'pointer',
                  border: '1px solid rgba(255, 90, 0, 0.1)',
                  position: 'relative'
                }}
              >
                {/* Mini SVG donut */}
                <div style={{ position: 'relative', width: '42px', height: '42px' }}>
                  <svg width="42" height="42" viewBox="0 0 42 42" style={{ transform: 'rotate(-90deg)' }}>
                    <circle
                      cx="21"
                      cy="21"
                      r={miniRadius}
                      fill="transparent"
                      stroke="rgba(255,255,255,0.04)"
                      strokeWidth="4"
                    />
                    <circle
                      cx="21"
                      cy="21"
                      r={miniRadius}
                      fill="transparent"
                      stroke={team.color}
                      strokeWidth="4"
                      strokeDasharray={miniCircumference}
                      strokeDashoffset={miniOffset}
                      strokeLinecap="round"
                    />
                  </svg>
                  {/* Flag in Center */}
                  <div style={{
                    position: 'absolute',
                    top: 0, left: 0, right: 0, bottom: 0,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '18px'
                  }}>
                    {team.flag}
                  </div>
                </div>

                {/* Team Name and Percent */}
                <div style={{ textAlign: 'center' }}>
                  <div style={{ fontSize: '11px', fontWeight: 800, color: 'var(--text-primary)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', maxWidth: '80px' }}>
                    {team.name}
                  </div>
                  <div style={{ fontSize: '10px', fontWeight: 700, color: 'var(--text-secondary)', marginTop: '2px' }}>
                    {teamPercent}% ({teamPasted}/20)
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* REPETIDAS & TROCA QUICK ACCESS CARD */}
      <div className="glass glass-interactive" style={{ padding: '16px', display: 'flex', gap: '12px', alignItems: 'center' }} onClick={onNavigateToTrades}>
        <div style={{ color: 'var(--color-teal)', background: 'rgba(0, 156, 180, 0.1)', padding: '10px', borderRadius: '12px' }}>
          <Copy size={20} />
        </div>
        <div style={{ flex: 1 }}>
          <div style={{ fontSize: '18px', fontWeight: 800 }}>{stats.duplicates}</div>
          <div style={{ fontSize: '12px', color: 'var(--text-secondary)' }}>Minhas Repetidas de Troca</div>
        </div>
        <Share2 size={16} style={{ color: 'var(--text-muted)' }} />
      </div>

      {/* Bottom navigate to Album */}
      <button className="glass glass-interactive" style={{ background: 'var(--accent-2026-gradient)', color: '#000', border: 'none', padding: '16px', borderRadius: '14px', fontSize: '16px', fontWeight: 800, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }} onClick={onNavigateToAlbum}>
        Abrir Álbum Oficial 2026
      </button>

      {/* CSS injection to hide horizontal scrollbar specifically for the swiper */}
      <style>{`
        .horizontal-carousel-no-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .horizontal-carousel-no-scrollbar {
          -ms-overflow-style: none;  /* IE and Edge */
          scrollbar-width: none;  /* Firefox */
        }
      `}</style>

    </div>
  );
}
