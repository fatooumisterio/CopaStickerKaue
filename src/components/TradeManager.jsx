import React, { useState } from 'react';
import { Copy, Share2, Trash2, Check, LayoutGrid } from 'lucide-react';
import { teams, getStickersForTeam } from '../data/copaData';

export default function TradeManager({ stickerStates, onClearAllDuplicates }) {
  const [activeTab, setActiveTab] = useState('repetidas');
  
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
    
    Object.keys(list).forEach((team) => {
      list[team].sort((a, b) => a.number - b.number);
    });
    
    return list;
  };

  // Agrupar as faltantes por seleção
  const getMissingByTeam = () => {
    const list = {};
    Object.keys(teams).forEach((teamCode) => {
      const teamStickers = getStickersForTeam(teamCode);
      const missingForTeam = [];
      teamStickers.forEach((sticker) => {
        const key = `${teamCode}_${sticker.number}`;
        if (!stickerStates[key] || stickerStates[key].status !== 'pasted') {
          missingForTeam.push({
            key,
            number: sticker.number,
            name: sticker.name
          });
        }
      });
      if (missingForTeam.length > 0) {
        list[teamCode] = missingForTeam;
      }
    });
    return list;
  };

  const duplicatesByTeam = getDuplicatesByTeam();
  const missingByTeam = getMissingByTeam();
  const totalDuplicates = Object.values(stickerStates).reduce((acc, state) => acc + (state.duplicates || 0), 0);
  const totalMissing = Object.values(missingByTeam).reduce((acc, teamList) => acc + teamList.length, 0);

  const handleShareList = () => {
    if (activeTab === 'repetidas' && totalDuplicates === 0) {
      alert("Você não possui nenhuma figurinha repetida para compartilhar!");
      return;
    }
    if (activeTab === 'faltantes' && totalMissing === 0) {
      alert("Seu álbum está completo! Nenhuma faltante para compartilhar!");
      return;
    }

    let shareText = activeTab === 'repetidas' 
      ? "🏆 Minhas Figurinhas Repetidas para Troca! 🏆\n\n"
      : "🔍 Minhas Figurinhas Faltantes! 🔍\n\n";

    const listToShare = activeTab === 'repetidas' ? duplicatesByTeam : missingByTeam;

    Object.keys(listToShare).forEach((teamCode) => {
      const team = teams[teamCode];
      const stickersText = listToShare[teamCode]
        .map(s => activeTab === 'repetidas' ? `${s.number} (${s.duplicates}x)` : s.number)
        .join(', ');
      shareText += `${team.flag} *${team.name}*: ${stickersText}\n`;
    });
    
    shareText += activeTab === 'repetidas' ? "\nVamos trocar?" : "\nTem alguma dessas para mim?";

    navigator.clipboard.writeText(shareText)
      .then(() => {
        alert("Lista copiada para a área de transferência! Pronta para compartilhar no WhatsApp!");
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
          <h2 style={{ fontSize: '24px', marginTop: '2px' }}>Minhas <span className="gold-text">Trocas</span></h2>
        </div>
        <span style={{
          background: activeTab === 'repetidas' ? 'rgba(0, 230, 118, 0.15)' : 'rgba(255, 61, 0, 0.15)',
          color: activeTab === 'repetidas' ? 'var(--color-duplicate)' : '#ff3d00',
          padding: '6px 14px',
          borderRadius: '20px',
          fontSize: '13px',
          fontWeight: 700
        }}>
          Total: {activeTab === 'repetidas' ? totalDuplicates : totalMissing}
        </span>
      </div>

      {/* Tabs */}
      <div style={{ display: 'flex', background: 'rgba(255,255,255,0.05)', borderRadius: '12px', padding: '4px' }}>
        <button
          onClick={() => setActiveTab('repetidas')}
          style={{
            flex: 1,
            padding: '10px',
            border: 'none',
            background: activeTab === 'repetidas' ? 'var(--bg-secondary)' : 'transparent',
            color: activeTab === 'repetidas' ? 'var(--text-primary)' : 'var(--text-muted)',
            borderRadius: '8px',
            fontWeight: 800,
            cursor: 'pointer',
            transition: 'all 0.2s',
            boxShadow: activeTab === 'repetidas' ? '0 2px 8px rgba(0,0,0,0.2)' : 'none'
          }}
        >
          Repetidas
        </button>
        <button
          onClick={() => setActiveTab('faltantes')}
          style={{
            flex: 1,
            padding: '10px',
            border: 'none',
            background: activeTab === 'faltantes' ? 'var(--bg-secondary)' : 'transparent',
            color: activeTab === 'faltantes' ? 'var(--text-primary)' : 'var(--text-muted)',
            borderRadius: '8px',
            fontWeight: 800,
            cursor: 'pointer',
            transition: 'all 0.2s',
            boxShadow: activeTab === 'faltantes' ? '0 2px 8px rgba(0,0,0,0.2)' : 'none'
          }}
        >
          Faltantes
        </button>
      </div>

      {/* Share / Clear Actions */}
      <div style={{ display: 'grid', gridTemplateColumns: activeTab === 'repetidas' ? '1.2fr 0.8fr' : '1fr', gap: '12px' }}>
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
          <Share2 size={16} /> Compartilhar {activeTab === 'repetidas' ? 'Repetidas' : 'Faltantes'}
        </button>

        {activeTab === 'repetidas' && (
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
        )}
      </div>

      {/* List of Stickers */}
      {activeTab === 'repetidas' && totalDuplicates === 0 ? (
        <div className="glass" style={{ padding: '40px 20px', textAlign: 'center', color: 'var(--text-muted)' }}>
          <Copy size={36} style={{ marginBottom: '12px', opacity: 0.5 }} />
          <p style={{ fontSize: '14px' }}>Você ainda não marcou nenhuma figurinha repetida.</p>
          <p style={{ fontSize: '12px', marginTop: '6px' }}>Use o botão "+" nas páginas das seleções ou no Scanner para adicioná-las.</p>
        </div>
      ) : activeTab === 'faltantes' && totalMissing === 0 ? (
        <div className="glass" style={{ padding: '40px 20px', textAlign: 'center', color: 'var(--text-muted)' }}>
          <Check size={36} style={{ marginBottom: '12px', opacity: 0.5, color: 'var(--color-lime)' }} />
          <p style={{ fontSize: '14px' }}>Parabéns! Seu álbum está completo!</p>
        </div>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          {Object.keys(activeTab === 'repetidas' ? duplicatesByTeam : missingByTeam).map((teamCode) => {
            const team = teams[teamCode];
            const listToMap = activeTab === 'repetidas' ? duplicatesByTeam[teamCode] : missingByTeam[teamCode];
            return (
              <div key={teamCode} className="glass" style={{ padding: '16px', borderLeft: `4px solid ${team.color}` }}>
                {/* Team Header */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '12px', borderBottom: '1px solid var(--border-glass)', paddingBottom: '8px' }}>
                  <span style={{ fontSize: '20px' }}>{team.flag}</span>
                  <span style={{ fontSize: '15px', fontWeight: 700 }}>{team.name}</span>
                  <span style={{ marginLeft: 'auto', fontSize: '12px', color: 'var(--text-muted)', fontWeight: 700 }}>{listToMap.length}</span>
                </div>

                {/* Stickers Tags */}
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                  {listToMap.map((sticker) => (
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
                      <span style={{ fontWeight: 700, color: activeTab === 'repetidas' ? 'var(--accent-gold)' : '#fff' }}>Nº {sticker.number}</span>
                      <span style={{ color: 'var(--text-secondary)', fontSize: '12px' }}>{sticker.name}</span>
                      {activeTab === 'repetidas' && (
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
                      )}
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
