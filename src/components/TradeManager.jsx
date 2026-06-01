import React from 'react';
import { Copy, Share2, Trash2, Check } from 'lucide-react';
import { teams, getStickersForTeam } from '../data/copaData';

export default function TradeManager({ stickerStates, onClearAllDuplicates }) {
  
  // Agrupar as repetidas por seleção
  const getDuplicatesByTeam = () => {
    const list = {};
    Object.keys(stickerStates).forEach((key) => {
      const state = stickerStates[key];
      if (state.duplicates > 0) {
        const [teamCode, numberStr] = key.split('_');
        const number = parseInt(numberStr, 10);
        
        if (!list[teamCode]) {
          list[teamCode] = [];
        }
        
        const teamStickers = getStickersForTeam(teamCode);
        const sticker = teamStickers.find(s => s.number === number);
        
        list[teamCode].push({
          key,
          number,
          name: sticker?.name || `Jogador ${number}`,
          duplicates: state.duplicates
        });
      }
    });
    
    // Ordenar as repetidas de cada time pelo número da figurinha
    Object.keys(list).forEach((team) => {
      list[team].sort((a, b) => a.number - b.number);
    });
    
    return list;
  };

  const duplicatesByTeam = getDuplicatesByTeam();
  const totalDuplicates = Object.values(stickerStates).reduce((acc, state) => acc + (state.duplicates || 0), 0);

  const handleShareList = () => {
    if (totalDuplicates === 0) {
      alert("Você não possui nenhuma figurinha repetida para compartilhar!");
      return;
    }

    let shareText = "🏆 Minhas Figurinhas Repetidas para Troca! 🏆\n\n";
    Object.keys(duplicatesByTeam).forEach((teamCode) => {
      const team = teams[teamCode];
      const stickersText = duplicatesByTeam[teamCode]
        .map(s => `${s.number} (${s.duplicates}x)`)
        .join(', ');
      shareText += `${team.flag} *${team.name}*: ${stickersText}\n`;
    });
    
    shareText += "\nVamos trocar?";

    // Copiar para o clipboard
    navigator.clipboard.writeText(shareText)
      .then(() => {
        alert("Lista de repetidas copiada para a área de transferência! Pronta para compartilhar no WhatsApp!");
      })
      .catch((err) => {
        console.error("Erro ao copiar lista:", err);
      });
  };

  return (
    <div className="trade-manager-container" style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <span style={{ color: 'var(--text-muted)', fontSize: '13px', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '1px' }}>Negociação</span>
          <h2 style={{ fontSize: '24px', marginTop: '2px' }}>Minhas <span className="gold-text">Repetidas</span></h2>
        </div>
        <span style={{
          background: 'rgba(0, 230, 118, 0.15)',
          color: 'var(--color-duplicate)',
          padding: '6px 14px',
          borderRadius: '20px',
          fontSize: '13px',
          fontWeight: 700
        }}>
          Total: {totalDuplicates}
        </span>
      </div>

      {/* Share / Clear Actions */}
      <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 0.8fr', gap: '12px' }}>
        <button
          onClick={handleShareList}
          className="glass glass-interactive"
          style={{
            border: 'none',
            background: 'var(--accent-gold-gradient)',
            color: '#000',
            padding: '14px',
            borderRadius: '12px',
            fontSize: '14px',
            fontWeight: 700,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '8px',
            cursor: 'pointer'
          }}
        >
          <Share2 size={16} /> Compartilhar Repetidas
        </button>

        <button
          onClick={() => {
            if (window.confirm("Deseja limpar toda a sua lista de figurinhas repetidas?")) {
              onClearAllDuplicates();
            }
          }}
          className="glass glass-interactive"
          style={{
            border: 'none',
            background: 'rgba(255, 61, 0, 0.1)',
            color: '#ff3d00',
            border: '1px solid rgba(255, 61, 0, 0.2)',
            padding: '14px',
            borderRadius: '12px',
            fontSize: '14px',
            fontWeight: 700,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '8px',
            cursor: 'pointer'
          }}
        >
          <Trash2 size={16} /> Limpar
        </button>
      </div>

      {/* List of Duplicates */}
      {totalDuplicates === 0 ? (
        <div className="glass" style={{ padding: '40px 20px', textAlign: 'center', color: 'var(--text-muted)' }}>
          <Copy size={36} style={{ marginBottom: '12px', opacity: 0.5 }} />
          <p style={{ fontSize: '14px' }}>Você ainda não marcou nenhuma figurinha repetida.</p>
          <p style={{ fontSize: '12px', marginTop: '6px' }}>Use o botão "+" nas páginas das seleções ou no Scanner para adicioná-las.</p>
        </div>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          {Object.keys(duplicatesByTeam).map((teamCode) => {
            const team = teams[teamCode];
            return (
              <div key={teamCode} className="glass" style={{ padding: '16px', borderLeft: `4px solid ${team.color}` }}>
                {/* Team Header */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '12px', borderBottom: '1px solid var(--border-glass)', paddingBottom: '8px' }}>
                  <span style={{ fontSize: '20px' }}>{team.flag}</span>
                  <span style={{ fontSize: '15px', fontWeight: 700 }}>{team.name}</span>
                </div>

                {/* Duplicates Tags */}
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                  {duplicatesByTeam[teamCode].map((sticker) => (
                    <div
                      key={sticker.key}
                      style={{
                        background: 'rgba(255,255,255,0.03)',
                        border: '1px solid var(--border-glass)',
                        borderRadius: '8px',
                        padding: '6px 10px',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '8px',
                        fontSize: '13px'
                      }}
                    >
                      <span style={{ fontWeight: 700, color: 'var(--accent-gold)' }}>Nº {sticker.number}</span>
                      <span style={{ color: 'var(--text-secondary)', fontSize: '12px' }}>{sticker.name}</span>
                      <span style={{
                        background: 'rgba(0, 230, 118, 0.15)',
                        color: 'var(--color-duplicate)',
                        padding: '2px 6px',
                        borderRadius: '4px',
                        fontSize: '11px',
                        fontWeight: 800
                      }}>
                        {sticker.duplicates}x
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
