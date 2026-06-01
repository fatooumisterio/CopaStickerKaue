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
import CountrySelector from './components/CountrySelector';
import { TOTAL_STICKERS, teams } from './data/copaData';
import { auth, db } from './services/firebase';
import { onAuthStateChanged } from 'firebase/auth';
import { doc, getDoc, setDoc, serverTimestamp } from 'firebase/firestore';

export default function App() {
  const [currentTab, setCurrentTab] = useState('home'); // 'home' | 'album' | 'trades'
  const [selectedTeam, setSelectedTeam] = useState(null); // Code of the selected team (e.g., 'BRA')
  const [showScanner, setShowScanner] = useState(false);
  const [showSplash, setShowSplash] = useState(() => {
    return !sessionStorage.getItem('splash_shown');
  });

  const [dataLoaded, setDataLoaded] = useState(false);

  const handleSplashComplete = () => {
    sessionStorage.setItem('splash_shown', 'true');
    setShowSplash(false);
  };

  // Authentication State
  const [user, setUser] = useState(() => {
    const saved = localStorage.getItem('copa_user');
    return saved ? JSON.parse(saved) : null;
  });

  // User Country Preference
  const [userCountry, setUserCountry] = useState(() => {
    return localStorage.getItem('copa_user_country') || null;
  });

  // Dynamic CSS Theming based on selected country
  useEffect(() => {
    if (userCountry && teams[userCountry]) {
      localStorage.setItem('copa_user_country', userCountry);
      const c = teams[userCountry].color;
      const root = document.documentElement;
      
      // Override main theme colors with the country's primary color
      root.style.setProperty('--color-teal', c);
      root.style.setProperty('--color-orange', c);
      root.style.setProperty('--color-blue', c);
      
      // Create a nice gradient using the country color and a darker shade or white
      root.style.setProperty('--accent-2026-gradient', `linear-gradient(135deg, ${c} 0%, rgba(255,255,255,0.2) 100%)`);
      root.style.setProperty('--glow-teal', `0 4px 15px ${c}40`);
      root.style.setProperty('--glow-orange', `0 4px 15px ${c}40`);
    }
  }, [userCountry]);

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
      localStorage.removeItem('copa_user_country');
      setUserCountry(null);
      setDataLoaded(false); // Reset on logout
    }
  }, [user]);

  // Recover Firebase Auth Session
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
      if (firebaseUser) {
        setUser(prev => {
          if (prev && prev.email === firebaseUser.email) return prev;
          return {
            name: firebaseUser.displayName || "Usuário",
            email: firebaseUser.email,
            provider: firebaseUser.providerData[0]?.providerId.includes('apple') ? 'apple' : 'google',
            avatar: firebaseUser.photoURL || "👤"
          };
        });
      }
    });
    return () => unsubscribe();
  }, []);

  // Firestore: Fetch data when user logs in
  useEffect(() => {
    async function fetchUserData() {
      if (user) {
        if (user.provider === 'guest') {
          setDataLoaded(true);
          return;
        }
        
        if (user.email) {
          try {
            const docRef = doc(db, 'users', user.email.toLowerCase());
            const docSnap = await getDoc(docRef);
            if (docSnap.exists()) {
              const data = docSnap.data();
              if (data.stickers) {
                setStickerStates(data.stickers);
              }
              if (data.country) {
                setUserCountry(data.country);
              }
            }
          } catch (error) {
            console.error("Erro ao buscar dados do usuário:", error);
          } finally {
            setDataLoaded(true);
          }
        }
      }
    }
    fetchUserData();
  }, [user]);

  // Firestore: Save data when stickerStates changes (debounced to avoid too many writes)
  useEffect(() => {
    if (!dataLoaded) return; // Prevent overwriting Firestore with local empty state before fetching!

    const timer = setTimeout(async () => {
      if (user && user.provider !== 'guest' && user.email) {
        try {
          const docRef = doc(db, 'users', user.email.toLowerCase());
          await setDoc(docRef, {
            email: user.email.toLowerCase(),
            name: user.name,
            avatar: user.avatar,
            stickers: stickerStates,
            country: userCountry,
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

  const handleSetStickerStatus = (stickerKey, newStatus) => {
    setStickerStates((prev) => {
      const current = prev[stickerKey] || { status: 'missing', duplicates: 0 };
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
            userCountry={userCountry}
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
            userCountry={userCountry}
            onLogout={() => setUser(null)}
            onSelectTeam={(teamCode) => setSelectedTeam(teamCode)}
          />
        );
    }
  };

  if (!user && !showSplash) {
    return <Login onLoginSuccess={(u) => setUser(u)} />;
  }

  // If user is authenticated but hasn't picked a country yet
  if (user && !userCountry && !showSplash) {
    return <CountrySelector onSelect={(code) => setUserCountry(code)} />;
  }

  return (
    <>
      {showSplash && <SplashScreen onComplete={handleSplashComplete} />}
      {!showSplash && userCountry && (
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
          onSetStickerStatus={handleSetStickerStatus}
          onAdjustDuplicates={handleAdjustDuplicates}
          onClose={() => setShowScanner(false)}
        />
      )}

        </div>
      )}
    </>
  );
}
