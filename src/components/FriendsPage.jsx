import React, { useState, useEffect } from 'react';
import { Search, User, Copy, AlertCircle, Loader2, Trophy, UserPlus, ChevronDown, ChevronUp, UserCheck } from 'lucide-react';
import { db } from '../services/firebase';
import { collection, query, where, getDocs, doc, getDoc, updateDoc, arrayUnion } from 'firebase/firestore';

export default function FriendsPage({ currentUser }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [loadingSearch, setLoadingSearch] = useState(false);
  const [searchResult, setSearchResult] = useState(null);
  const [error, setError] = useState(null);

  // My saved friends
  const [savedFriends, setSavedFriends] = useState([]);
  const [loadingFriends, setLoadingFriends] = useState(true);

  // Expandable list state
  const [expandedFriend, setExpandedFriend] = useState(null);
  const [loadingExpanded, setLoadingExpanded] = useState(false);
  const [expandedDuplicates, setExpandedDuplicates] = useState([]);

  // Fetch my saved friends on mount
  useEffect(() => {
    async function fetchMyFriends() {
      if (!currentUser?.email) return;
      try {
        const docRef = doc(db, 'users', currentUser.email.toLowerCase());
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          const data = docSnap.data();
          setSavedFriends(data.savedFriends || []);
        }
      } catch (err) {
        console.error("Erro ao carregar lista de amigos:", err);
      } finally {
        setLoadingFriends(false);
      }
    }
    fetchMyFriends();
  }, [currentUser]);

  const handleSearch = async (e) => {
    e.preventDefault();
    const emailToSearch = searchTerm.trim().toLowerCase();
    
    if (!emailToSearch) return;

    if (currentUser?.email?.toLowerCase() === emailToSearch) {
      setError("Você não pode pesquisar a si mesmo!");
      setSearchResult(null);
      return;
    }

    setLoadingSearch(true);
    setError(null);
    setSearchResult(null);

    try {
      const q = query(collection(db, 'users'), where('email', '==', emailToSearch));
      const querySnapshot = await getDocs(q);

      if (querySnapshot.empty) {
        setError("Nenhum usuário encontrado com esse e-mail.");
      } else {
        const docSnap = querySnapshot.docs[0];
        setSearchResult(docSnap.data());
      }
    } catch (err) {
      console.error("Erro ao buscar amigo:", err);
      setError("Erro ao buscar no banco de dados.");
    } finally {
      setLoadingSearch(false);
    }
  };

  const handleAddFriend = async () => {
    if (!searchResult || !currentUser?.email) return;
    
    // Check if already friend
    if (savedFriends.some(f => f.email === searchResult.email)) {
      setError("Este usuário já está na sua lista de amigos!");
      return;
    }

    const newFriend = {
      email: searchResult.email,
      name: searchResult.name,
      avatar: searchResult.avatar
    };

    try {
      const docRef = doc(db, 'users', currentUser.email.toLowerCase());
      await updateDoc(docRef, {
        savedFriends: arrayUnion(newFriend)
      });
      setSavedFriends(prev => [...prev, newFriend]);
      setSearchResult(null); // Clear search after adding
      setSearchTerm('');
    } catch (err) {
      console.error("Erro ao adicionar amigo:", err);
      setError("Erro ao adicionar amigo. Tente novamente.");
    }
  };

  const handleExpandFriend = async (friendEmail) => {
    if (expandedFriend === friendEmail) {
      setExpandedFriend(null);
      return;
    }

    setExpandedFriend(friendEmail);
    setLoadingExpanded(true);
    setExpandedDuplicates([]);

    try {
      const docRef = doc(db, 'users', friendEmail.toLowerCase());
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        const data = docSnap.data();
        if (data.stickers) {
          const dups = [];
          Object.entries(data.stickers).forEach(([key, state]) => {
            if (state.duplicates > 0) {
              dups.push({ key, count: state.duplicates });
            }
          });
          setExpandedDuplicates(dups.sort((a, b) => a.key.localeCompare(b.key)));
        }
      }
    } catch (err) {
      console.error("Erro ao carregar figurinhas do amigo:", err);
    } finally {
      setLoadingExpanded(false);
    }
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
      
      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
        <div className="glass" style={{ padding: '12px', borderRadius: '14px', background: 'var(--accent-2026-gradient)', color: '#fff' }}>
          <User size={24} />
        </div>
        <div>
          <h2 style={{ fontSize: '24px', lineHeight: '1.2' }}>Amigos</h2>
          <span style={{ fontSize: '13px', color: 'var(--text-secondary)' }}>Conecte-se com outros colecionadores</span>
        </div>
      </div>

      {/* Search Bar */}
      <form onSubmit={handleSearch} className="glass" style={{ display: 'flex', padding: '8px', borderRadius: '16px', gap: '8px', alignItems: 'center' }}>
        <div style={{ padding: '0 8px', color: 'var(--text-muted)' }}>
          <Search size={20} />
        </div>
        <input 
          type="email" 
          placeholder="E-mail do amigo" 
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
          disabled={loadingSearch}
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
          {loadingSearch ? <Loader2 size={18} className="animate-spin" /> : 'Buscar'}
        </button>
      </form>

      {error && (
        <div className="glass" style={{ padding: '16px', display: 'flex', gap: '12px', alignItems: 'center', background: 'rgba(255, 90, 0, 0.05)', borderColor: 'rgba(255, 90, 0, 0.2)', color: 'var(--color-orange)' }}>
          <AlertCircle size={20} />
          <span style={{ fontSize: '13px', fontWeight: 600 }}>{error}</span>
        </div>
      )}

      {/* Search Result Profile */}
      {searchResult && (
        <div className="glass shine-effect animate-pulse-gold" style={{ padding: '20px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <div style={{ fontSize: '12px', fontWeight: 800, color: 'var(--color-teal)', textTransform: 'uppercase' }}>Usuário Encontrado</div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
            <img 
              src={searchResult.avatar} 
              alt={searchResult.name} 
              style={{ width: '48px', height: '48px', borderRadius: '50%', border: '2px solid var(--color-teal)' }}
              onError={(e) => { e.target.style.display = 'none'; }}
            />
            <div style={{ flex: 1 }}>
              <h3 style={{ fontSize: '16px', fontWeight: 800, color: 'var(--text-primary)' }}>{searchResult.name}</h3>
              <span style={{ fontSize: '12px', color: 'var(--text-muted)' }}>{searchResult.email}</span>
            </div>
            
            {savedFriends.some(f => f.email === searchResult.email) ? (
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', color: 'var(--color-teal)', gap: '4px' }}>
                <UserCheck size={20} />
                <span style={{ fontSize: '10px', fontWeight: 700 }}>Salvo</span>
              </div>
            ) : (
              <button 
                onClick={handleAddFriend}
                className="glass-interactive"
                style={{
                  background: 'var(--color-lime)',
                  color: '#fff',
                  border: 'none',
                  padding: '10px 14px',
                  borderRadius: '10px',
                  fontWeight: 800,
                  fontSize: '13px',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px'
                }}
              >
                <UserPlus size={16} />
                Adicionar
              </button>
            )}
          </div>
        </div>
      )}

      {/* Saved Friends List */}
      <div style={{ marginTop: '10px' }}>
        <h3 style={{ fontSize: '16px', fontWeight: 800, marginBottom: '12px', color: 'var(--text-primary)' }}>Meus Amigos</h3>
        
        {loadingFriends ? (
          <div style={{ display: 'flex', justifyContent: 'center', padding: '20px' }}>
            <Loader2 size={24} className="animate-spin" style={{ color: 'var(--color-orange)' }} />
          </div>
        ) : savedFriends.length === 0 ? (
          <div className="glass" style={{ textAlign: 'center', padding: '30px 20px' }}>
            <span style={{ fontSize: '13px', color: 'var(--text-secondary)' }}>Você ainda não adicionou amigos.<br/>Busque por e-mail acima!</span>
          </div>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {savedFriends.map(friend => {
              const isExpanded = expandedFriend === friend.email;
              return (
                <div key={friend.email} className="glass" style={{ overflow: 'hidden' }}>
                  
                  {/* Friend Row */}
                  <div 
                    onClick={() => handleExpandFriend(friend.email)}
                    className="glass-interactive"
                    style={{ 
                      padding: '16px', 
                      display: 'flex', 
                      alignItems: 'center', 
                      justifyContent: 'space-between',
                      cursor: 'pointer',
                      background: isExpanded ? 'rgba(0, 156, 180, 0.05)' : 'transparent'
                    }}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                      <img 
                        src={friend.avatar} 
                        alt={friend.name} 
                        style={{ width: '40px', height: '40px', borderRadius: '50%', border: '2px solid var(--border-glass)' }}
                        onError={(e) => { e.target.style.display = 'none'; }}
                      />
                      <div>
                        <div style={{ fontSize: '15px', fontWeight: 700, color: 'var(--text-primary)' }}>{friend.name}</div>
                        <div style={{ fontSize: '11px', color: 'var(--text-muted)' }}>{friend.email}</div>
                      </div>
                    </div>
                    <div style={{ color: 'var(--color-teal)' }}>
                      {isExpanded ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                    </div>
                  </div>

                  {/* Expanded Content */}
                  {isExpanded && (
                    <div style={{ padding: '0 16px 20px 16px', borderTop: '1px solid var(--border-glass)' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--color-orange)', fontWeight: 800, padding: '16px 0 12px 0' }}>
                        <Copy size={16} />
                        <span style={{ fontSize: '13px' }}>Repetidas para Troca:</span>
                      </div>

                      {loadingExpanded ? (
                        <div style={{ display: 'flex', justifyContent: 'center', padding: '10px' }}>
                          <Loader2 size={20} className="animate-spin" style={{ color: 'var(--color-orange)' }} />
                        </div>
                      ) : expandedDuplicates.length === 0 ? (
                        <div style={{ textAlign: 'center', padding: '16px', background: 'rgba(0,0,0,0.02)', borderRadius: '12px' }}>
                          <Trophy size={24} style={{ color: 'var(--text-muted)', margin: '0 auto 6px auto', opacity: 0.5 }} />
                          <p style={{ fontSize: '12px', color: 'var(--text-secondary)', fontWeight: 600 }}>Nenhuma repetida no momento.</p>
                        </div>
                      ) : (
                        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                          {expandedDuplicates.map((dup) => {
                            const [team, num] = dup.key.split('_');
                            return (
                              <div key={dup.key} style={{
                                background: 'rgba(178, 225, 21, 0.15)',
                                border: '1px solid rgba(178, 225, 21, 0.4)',
                                padding: '6px 10px',
                                borderRadius: '8px',
                                display: 'flex',
                                alignItems: 'center',
                                gap: '6px'
                              }}>
                                <span style={{ fontSize: '13px', fontWeight: 800, color: 'var(--text-primary)' }}>{team} {num}</span>
                                <span style={{ fontSize: '10px', fontWeight: 900, color: '#fff', background: 'var(--color-lime)', padding: '2px 6px', borderRadius: '4px' }}>
                                  x{dup.count}
                                </span>
                              </div>
                            );
                          })}
                        </div>
                      )}
                    </div>
                  )}

                </div>
              );
            })}
          </div>
        )}
      </div>

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
