import React, { useState } from 'react';
import { Search, Globe, ChevronRight } from 'lucide-react';
import { teams } from '../data/copaData';

export default function CountrySelector({ onSelect }) {
  const [searchTerm, setSearchTerm] = useState('');

  // Filter out special pages, only show real teams
  const teamCodes = Object.keys(teams).filter(code => code !== 'HIST' && code !== 'COCA');

  const filteredTeams = teamCodes.filter(code => {
    const teamName = teams[code].name.toLowerCase();
    const search = searchTerm.toLowerCase();
    return teamName.includes(search) || code.toLowerCase().includes(search);
  });

  return (
    <div style={{
      width: '100%',
      minHeight: '100vh',
      display: 'flex',
      flexDirection: 'column',
      background: 'var(--bg-primary)',
      padding: '40px 20px',
      position: 'relative'
    }}>

      {/* Background Graphic */}
      <div style={{
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        height: '300px',
        background: 'linear-gradient(180deg, rgba(0, 156, 180, 0.15) 0%, rgba(10, 10, 12, 0) 100%)',
        zIndex: 0,
        pointerEvents: 'none'
      }}></div>

      <div style={{ position: 'relative', zIndex: 10, display: 'flex', flexDirection: 'column', gap: '24px', flex: 1 }}>
        <div style={{ textAlign: 'center', marginTop: '20px' }}>
          <div style={{
            width: '60px', height: '60px', borderRadius: '50%', background: 'rgba(0, 156, 180, 0.1)',
            display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 16px',

            border: '1px solid rgba(0, 156, 180, 0.3)', boxShadow: '0 0 20px rgba(0, 156, 180, 0.2)'
          }}>
            <Globe size={28} style={{ color: 'var(--color-teal)' }} />
          </div>
          <h1 style={{ fontSize: '24px', fontWeight: 900, color: '#fff', marginBottom: '8px' }}>
            Escolha sua Seleção
          </h1>
          <p style={{ fontSize: '14px', color: 'var(--text-muted)', lineHeight: '1.5' }}>
            O aplicativo mudará de cor e estilo para homenagear a sua nação favorita.
          </p>
        </div>

        {/* Search Bar */}
        <div className="glass" style={{
          display: 'flex', alignItems: 'center', padding: '0 16px', height: '54px',
          borderRadius: '16px', gap: '12px', background: 'rgba(25, 25, 30, 0.95)'
        }}>
          <Search size={20} style={{ color: 'var(--text-muted)' }} />
          <input
            type="text"
            placeholder="Buscar país..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            style={{
              flex: 1, height: '100%', background: 'transparent', border: 'none',
              color: '#fff', fontSize: '16px', fontWeight: 600, outline: 'none'
            }}
          />
        </div>

        {/* Teams List */}
        <div style={{
          display: 'flex', flexDirection: 'column', gap: '12px', overflowY: 'auto',
          paddingBottom: '40px', marginTop: '8px'
        }}>
          {filteredTeams.map(code => {
            const team = teams[code];
            return (
              <button
                key={code}
                onClick={() => onSelect(code)}
                className="glass-interactive"
                style={{
                  display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                  padding: '16px', borderRadius: '16px', border: '1px solid rgba(255,255,255,0.05)',
                  background: 'rgba(255,255,255,0.02)', cursor: 'pointer', textAlign: 'left',
                  boxShadow: `0 4px 12px rgba(0,0,0,0.2)`
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                  <span style={{ fontSize: '32px', filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.5))' }}>
                    {team.flag}
                  </span>
                  <div>
                    <h3 style={{ fontSize: '17px', fontWeight: 800, color: '#fff', marginBottom: '2px' }}>
                      {team.name}
                    </h3>
                    <span style={{ fontSize: '12px', fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '1px' }}>
                      {code}
                    </span>
                  </div>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  {/* Color preview dot */}
                  <div style={{
                    width: '12px', height: '12px', borderRadius: '50%',
                    background: team.color, boxShadow: `0 0 10px ${team.color}80`
                  }}></div>
                  <ChevronRight size={20} style={{ color: 'var(--text-muted)' }} />
                </div>
              </button>
            );
          })}

          {filteredTeams.length === 0 && (
            <div style={{ textAlign: 'center', padding: '30px', color: 'var(--text-muted)' }}>
              Nenhum país encontrado.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
