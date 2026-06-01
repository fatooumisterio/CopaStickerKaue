import React, { useState, useEffect } from 'react';
import { Home, BookOpen, Camera, Copy, Users } from 'lucide-react';
import Dashboard from './components/Dashboard';
import AlbumView from './components/AlbumView';
import TeamPage from './components/TeamPage';
import StickerScanner from './components/StickerScanner';
import TradeManager from './components/TradeManager';
import FriendsPage from './components/FriendsPage';
import Login from './components/Login';
import SplashScreen from './components/SplashScreen';
import { TOTAL_STICKERS } from './data/copaData';
import { db } from './services/firebase';
import { doc, getDoc, setDoc, serverTimestamp } from 'firebase/firestore';

export default function App() {
  const [currentTab, setCurrentTab] = useState('home'); // 'home' | 'album' | 'trades'
  const [selectedTeam, setSelectedTeam] = useState(null); // Code of the selected team (e.g., 'BRA')
  const [showScanner, setShowScanner] = useState(false);
  const [showSplash, setShowSplash] = useState(() => {
    return !sessionStorage.getItem('splash_shown');
  });

  const handleSplashComplete = () => {
    sessionStorage.setItem('splash_shown', 'true');
    setShowSplash(false);
  };

  // Authentication State
  const [user, setUser] = useState(() => {
    const saved = localStorage.getItem('copa_user');
    return saved ? JSON.parse(saved) : null;
  });

  // Sticker state structured as: { "BRA_10": { status: 'pasted' | 'missing', duplicates: 0 } }
  const [stickerStates, setStickerStates] = useState(() => {
    const saved = localStorage.getItem('copa_sticker_states');
    return saved ? JSON.parse(saved) : {};
  });

  // Sync stickerStates to localStorage
  useEffect(() => {
    localStorage.setItem('copa_sticker_states', JSON.stringify(stickerStates));
  }, [stickerStates]);

  // Sync user authentication to localStorage
  useEffect(() => {
    if (user) {
      localStorage.setItem('copa_user', JSON.stringify(user));
    } else {
      localStorage.removeItem('copa_user');
    }
  }, [user]);

  // Firestore: Fetch data when user logs in
  useEffect(() => {
    async function fetchUserData() {
      if (user && user.provider !== 'guest' && user.email) {
        try {
          const docRef = doc(db, 'users', user.email.toLowerCase());
          const docSnap = await getDoc(docRef);
          if (docSnap.exists()) {
            const data = docSnap.data();
            if (data.stickers) {
              setStickerStates(data.stickers);
            }
          }
        } catch (error) {
          console.error("Erro ao buscar dados do usuário:", error);
        }
      }
    }
    fetchUserData();
  }, [user]);

  // Firestore: Save data when stickerStates changes (debounced to avoid too many writes)
  useEffect(() => {
    const timer = setTimeout(async () => {
      if (user && user.provider !== 'guest' && user.email) {
        try {
          const docRef = doc(db, 'users', user.email.toLowerCase());
          await setDoc(docRef, {
            email: user.email.toLowerCase(),
            name: user.name,
            avatar: user.avatar,
            stickers: stickerStates,
            updatedAt: serverTimestamp()
          }, { merge: true });
        } catch (error) {
          console.error("Erro ao salvar no Firestore:", error);
        }
      }
    }, 1500);
    return () => clearTimeout(timer);
  }, [stickerStates, user]);

  // Aggregate stats helper
  const getStats = () => {
    let pasted = 0;
    let duplicates = 0;
    Object.values(stickerStates).forEach((state) => {
      if (state.status === 'pasted') {
        pasted++;
      }
      duplicates += (state.duplicates || 0);
    });
    return { pasted, duplicates };
  };

  const stats = getStats();

  // Action handlers
  const handleTogglePasted = (stickerKey) => {
    setStickerStates((prev) => {
      const current = prev[stickerKey] || { status: 'missing', duplicates: 0 };
      const newStatus = current.status === 'pasted' ? 'missing' : 'pasted';
      return {
        ...prev,
        [stickerKey]: {
          ...current,
          status: newStatus
        }
      };
    });
  };

  const handleAdjustDuplicates = (stickerKey, change) => {
    setStickerStates((prev) => {
      const current = prev[stickerKey] || { status: 'missing', duplicates: 0 };
      const newDuplicates = Math.max(0, (current.duplicates || 0) + change);
      return {
        ...prev,
        [stickerKey]: {
          ...current,
          duplicates: newDuplicates
        }
      };
    });
  };

  const handleClearAllDuplicates = () => {
    setStickerStates((prev) => {
      const cleaned = { ...prev };
      Object.keys(cleaned).forEach((key) => {
        cleaned[key] = {
          ...cleaned[key],
          duplicates: 0
        };
      });
      return cleaned;
    });
  };

  // Rendering correct component for current view
  const renderContent = () => {
    if (selectedTeam) {
      return (
        <TeamPage
          teamCode={selectedTeam}
          stickerStates={stickerStates}
          onTogglePasted={handleTogglePasted}
          onAdjustDuplicates={handleAdjustDuplicates}
          onBack={() => setSelectedTeam(null)}
        />
      );
    }

    switch (currentTab) {
      case 'home':
        return (
          <Dashboard
            stats={stats}
            stickerStates={stickerStates}
            user={user}
            onLogout={() => setUser(null)}
            onSelectTeam={(teamCode) => setSelectedTeam(teamCode)}
            onNavigateToAlbum={() => setCurrentTab('album')}
            onNavigateToTrades={() => setCurrentTab('trades')}
          />
        );
      case 'album':
        return (
          <AlbumView
            stickerStates={stickerStates}
            onSelectTeam={(teamCode) => setSelectedTeam(teamCode)}
          />
        );
      case 'trades':
        return (
          <TradeManager
            stickerStates={stickerStates}
            onClearAllDuplicates={handleClearAllDuplicates}
          />
        );
      case 'friends':
        return <FriendsPage currentUser={user} />;
      default:
        return (
          <Dashboard
            stats={stats}
            stickerStates={stickerStates}
            user={user}
            onLogout={() => setUser(null)}
            onSelectTeam={(teamCode) => setSelectedTeam(teamCode)}
          />
        );
    }
  };

  // If user is not authenticated, render Login Screen
  if (!user && !showSplash) {
    return <Login onLoginSuccess={(u) => setUser(u)} />;
  }

  return (
    <>
      {showSplash && <SplashScreen onComplete={handleSplashComplete} />}
      {!showSplash && (
        <div className="mobile-container">
          
          {/* Scrollable Main Area */}
      <div className="content-area">
        {renderContent()}
      </div>

      {/* Floating Camera Button and Bottom Tab Navigation */}
      <nav className="tab-bar glass">
        <button
          onClick={() => { setSelectedTeam(null); setCurrentTab('home'); }}
          className={`tab-btn ${currentTab === 'home' && !selectedTeam ? 'active' : ''}`}
        >
          <Home size={22} />
          <span>Início</span>
        </button>

        <button
          onClick={() => { setSelectedTeam(null); setCurrentTab('album'); }}
          className={`tab-btn ${currentTab === 'album' || selectedTeam ? 'active' : ''}`}
        >
          <BookOpen size={22} />
          <span>Álbum</span>
        </button>

        <button
          onClick={() => setShowScanner(true)}
          className="tab-btn-scan"
          aria-label="Escanear figurinha com a câmera"
        >
          <Camera size={26} strokeWidth={2.5} />
        </button>

        <button
          onClick={() => { setSelectedTeam(null); setCurrentTab('trades'); }}
          className={`tab-btn ${currentTab === 'trades' && !selectedTeam ? 'active' : ''}`}
        >
          <Copy size={22} />
          <span>Trocas</span>
        </button>

        <button
          onClick={() => { setSelectedTeam(null); setCurrentTab('friends'); }}
          className={`tab-btn ${currentTab === 'friends' && !selectedTeam ? 'active' : ''}`}
        >
          <Users size={22} />
          <span>Amigos</span>
        </button>
      </nav>

      {/* Modal Scanner overlay screen */}
      {showScanner && (
        <StickerScanner
          stickerStates={stickerStates}
          onTogglePasted={handleTogglePasted}
          onAdjustDuplicates={handleAdjustDuplicates}
          onClose={() => setShowScanner(false)}
        />
      )}

        </div>
      )}
    </>
  );
}
