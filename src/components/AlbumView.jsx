import React, { useState } from 'react';
import { groups, teams } from '../data/copaData';
import { ChevronRight } from 'lucide-react';

export default function AlbumView({ stickerStates, onSelectTeam }) {
  const [activeGroup, setActiveGroup] = useState('A');

  // Calcular o progresso individual de cada seleção
  const getTeamProgress = (teamCode) => {
    let pasted = 0;
    for (let i = 1; i <= 20; i++) {
      if (stickerStates[`${teamCode}_${i}`]?.status === 'pasted') {
        pasted++;
      }
    }
    return pasted;
  };

  return (
    <div className="album-view-container" style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
      {/* Header */}
      <div>
        <span style={{ color: 'var(--text-muted)', fontSize: '13px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '1px' }}>Navegação</span>
        <h2 style={{ fontSize: '24px', marginTop: '2px' }}>Grupos da <span className="neon-text-2026">Copa 2026</span></h2>
      </div>

      {/* Group Tabs Selector (12 grupos organizados em grade de 4 colunas) */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '8px' }}>
        {Object.keys(groups).map((groupKey) => {
          const isActive = activeGroup === groupKey;
          return (
            <button
              key={groupKey}
              onClick={() => setActiveGroup(groupKey)}
              className="glass glass-interactive"
              style={{
                padding: '10px 0',
                fontSize: '13px',
                fontWeight: 800,
                border: isActive ? '1px solid var(--accent-lime)' : '1px solid var(--border-glass)',
                background: isActive ? 'rgba(0, 245, 118, 0.1)' : 'var(--bg-secondary)',
                color: isActive ? 'var(--accent-lime)' : 'var(--text-primary)',
                borderRadius: '8px',
                cursor: 'pointer'
              }}
            >
              Gr. {groupKey}
            </button>
          );
        })}
      </div>

      {/* Group Detail Card & Teams List */}
      <div className="glass" style={{ padding: '20px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid var(--border-glass)', paddingBottom: '12px' }}>
          <h3 style={{ fontSize: '18px', fontWeight: 800 }}>{groups[activeGroup].name}</h3>
          <span style={{ fontSize: '12px', color: 'var(--text-muted)', fontWeight: 600 }}>4 Seleções</span>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          {groups[activeGroup].teams.map((teamCode) => {
            const team = teams[teamCode];
            const pastedCount = getTeamProgress(teamCode);
            const totalCount = 20;
            const progressPercent = (pastedCount / totalCount) * 100;

            return (
              <div
                key={teamCode}
                onClick={() => onSelectTeam(teamCode)}
                className="glass-interactive"
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '14px',
                  padding: '14px',
                  background: 'rgba(255,255,255,0.02)',
                  border: '1px solid var(--border-glass)',
                  borderRadius: '12px',
                  cursor: 'pointer',
                  position: 'relative',
                  overflow: 'hidden'
                }}
              >
                {/* Colored team background border */}
                <div style={{ position: 'absolute', left: 0, top: 0, bottom: 0, width: '4px', background: team.color }}></div>

                {/* Flag Emoji */}
                <span style={{ fontSize: '32px', marginLeft: '6px' }}>{team.flag}</span>

                {/* Team Name and Code */}
                <div style={{ flex: 1 }}>
                  <div style={{ display: 'flex', alignItems: 'baseline', gap: '6px' }}>
                    <span style={{ fontSize: '16px', fontWeight: 800 }}>{team.name}</span>
                    <span style={{ fontSize: '11px', color: 'var(--text-muted)', fontWeight: 700 }}>{teamCode}</span>
                  </div>

                  {/* Progress Line */}
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginTop: '6px' }}>
                    <div style={{ flex: 1, height: '4px', background: 'rgba(255,255,255,0.05)', borderRadius: '2px', overflow: 'hidden' }}>
                      <div style={{ width: `${progressPercent}%`, height: '100%', background: team.color }} />
                    </div>
                    <span style={{ fontSize: '11px', color: 'var(--text-secondary)', fontWeight: 700, minWidth: '35px', textAlign: 'right' }}>
                      {pastedCount}/{totalCount}
                    </span>
                  </div>
                </div>

                <ChevronRight size={18} style={{ color: 'var(--text-muted)' }} />
              </div>
            );
          })}
        </div>
      </div>

      {/* Quick Navigation Help */}
      <div style={{ fontSize: '12px', color: 'var(--text-muted)', textAlign: 'center', marginTop: '8px' }}>
        Selecione uma seleção para ver a lista de jogadores e marcar suas figurinhas da Copa 2026!
      </div>
    </div>
  );
}
