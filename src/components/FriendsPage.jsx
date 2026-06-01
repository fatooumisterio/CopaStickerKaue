import React, { useState } from 'react';
import { Search, User, Copy, AlertCircle, Loader2, Trophy } from 'lucide-react';
import { db } from '../services/firebase';
import { collection, query, where, getDocs } from 'firebase/firestore';

export default function FriendsPage({ currentUser }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(false);
  const [friendData, setFriendData] = useState(null);
  const [error, setError] = useState(null);

  const handleSearch = async (e) => {
    e.preventDefault();
    const emailToSearch = searchTerm.trim().toLowerCase();
    
    if (!emailToSearch) return;

    if (currentUser?.email?.toLowerCase() === emailToSearch) {
      setError("Você não pode pesquisar a si mesmo!");
      setFriendData(null);
      return;
    }

    setLoading(true);
    setError(null);
    setFriendData(null);

    try {
      const q = query(collection(db, 'users'), where('email', '==', emailToSearch));
      const querySnapshot = await getDocs(q);

      if (querySnapshot.empty) {
        setError("Nenhum usuário encontrado com esse e-mail.");
      } else {
        // Pega o primeiro resultado (e-mail é único)
        const docSnap = querySnapshot.docs[0];
        setFriendData(docSnap.data());
      }
    } catch (err) {
      console.error("Erro ao buscar amigo:", err);
      setError("Erro ao buscar no banco de dados. Verifique sua conexão e se o Firestore foi ativado.");
    } finally {
      setLoading(false);
    }
  };

  // Processa as figurinhas repetidas do amigo
  const getFriendDuplicates = () => {
    if (!friendData || !friendData.stickers) return [];
    
    const duplicates = [];
    Object.entries(friendData.stickers).forEach(([key, state]) => {
      if (state.duplicates > 0) {
        duplicates.push({ key, count: state.duplicates });
      }
    });

    // Ordena pelo código (ex: BRA_10)
    return duplicates.sort((a, b) => a.key.localeCompare(b.key));
  };

  const duplicates = getFriendDuplicates();

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
        <div className="glass" style={{ padding: '12px', borderRadius: '14px', background: 'var(--accent-2026-gradient)', color: '#fff' }}>
          <User size={24} />
        </div>
        <div>
          <h2 style={{ fontSize: '24px', lineHeight: '1.2' }}>Amigos</h2>
          <span style={{ fontSize: '13px', color: 'var(--text-secondary)' }}>Busque colecionadores por e-mail</span>
        </div>
      </div>

      {/* Search Bar */}
      <form onSubmit={handleSearch} className="glass" style={{ display: 'flex', padding: '8px', borderRadius: '16px', gap: '8px', alignItems: 'center' }}>
        <div style={{ padding: '0 8px', color: 'var(--text-muted)' }}>
          <Search size={20} />
        </div>
        <input 
          type="email" 
          placeholder="E-mail do amigo (ex: joao@gmail.com)" 
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          style={{
            flex: 1,
            border: 'none',
            background: 'transparent',
            outline: 'none',
            fontSize: '14px',
            color: 'var(--text-primary)'
          }}
          required
        />
        <button 
          type="submit"
          className="glass-interactive"
          disabled={loading}
          style={{
            border: 'none',
            background: 'var(--color-blue)',
            color: '#fff',
            padding: '12px 16px',
            borderRadius: '12px',
            fontWeight: 700,
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}
        >
          {loading ? <Loader2 size={18} className="animate-spin" /> : 'Buscar'}
        </button>
      </form>

      {/* Error Message */}
      {error && (
        <div className="glass" style={{ padding: '16px', display: 'flex', gap: '12px', alignItems: 'center', background: 'rgba(255, 90, 0, 0.05)', borderColor: 'rgba(255, 90, 0, 0.2)', color: 'var(--color-orange)' }}>
          <AlertCircle size={20} />
          <span style={{ fontSize: '13px', fontWeight: 600 }}>{error}</span>
        </div>
      )}

      {/* Friend Profile & Results */}
      {friendData && (
        <div className="glass shine-effect" style={{ padding: '24px 20px', display: 'flex', flexDirection: 'column', gap: '20px' }}>
          
          {/* Friend Header */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px', paddingBottom: '16px', borderBottom: '1px solid var(--border-glass)' }}>
            <img 
              src={friendData.avatar} 
              alt={friendData.name} 
              style={{ width: '56px', height: '56px', borderRadius: '50%', border: '3px solid var(--color-lime)' }}
              onError={(e) => { e.target.style.display = 'none'; }}
            />
            <div>
              <h3 style={{ fontSize: '18px', fontWeight: 800, color: 'var(--text-primary)' }}>{friendData.name}</h3>
              <span style={{ fontSize: '12px', color: 'var(--text-muted)' }}>{friendData.email}</span>
            </div>
          </div>

          {/* Duplicates Section */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--color-teal)', fontWeight: 800 }}>
                <Copy size={18} />
                <span>Repetidas para Troca</span>
              </div>
              <span style={{ background: 'rgba(0, 156, 180, 0.1)', color: 'var(--color-teal)', padding: '4px 10px', borderRadius: '12px', fontSize: '12px', fontWeight: 800 }}>
                {duplicates.length} totais
              </span>
            </div>

            {duplicates.length === 0 ? (
              <div style={{ textAlign: 'center', padding: '30px 20px', background: 'rgba(0,0,0,0.02)', borderRadius: '12px' }}>
                <Trophy size={32} style={{ color: 'var(--text-muted)', margin: '0 auto 10px auto', opacity: 0.5 }} />
                <p style={{ fontSize: '13px', color: 'var(--text-secondary)', fontWeight: 600 }}>Este usuário ainda não tem nenhuma figurinha repetida registrada.</p>
              </div>
            ) : (
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                {duplicates.map((dup) => {
                  const [team, num] = dup.key.split('_');
                  return (
                    <div key={dup.key} style={{
                      background: 'rgba(178, 225, 21, 0.15)',
                      border: '1px solid rgba(178, 225, 21, 0.4)',
                      padding: '8px 12px',
                      borderRadius: '10px',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '6px'
                    }}>
                      <span style={{ fontSize: '14px', fontWeight: 800, color: 'var(--text-primary)' }}>{team} {num}</span>
                      <span style={{ fontSize: '11px', fontWeight: 900, color: '#fff', background: 'var(--color-lime)', padding: '2px 6px', borderRadius: '6px' }}>
                        x{dup.count}
                      </span>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
          
        </div>
      )}

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
