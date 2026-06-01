import React, { useState, useEffect } from 'react';
import { Home, BookOpen, Camera, Copy, Trophy } from 'lucide-react';
import Dashboard from './components/Dashboard';
import AlbumView from './components/AlbumView';
import TeamPage from './components/TeamPage';
import StickerScanner from './components/StickerScanner';
import TradeManager from './components/TradeManager';
import { TOTAL_STICKERS } from './data/copaData';

export default function App() {
  const [currentTab, setCurrentTab] = useState('home'); // 'home' | 'album' | 'trades'
  const [selectedTeam, setSelectedTeam] = useState(null); // Code of the selected team (e.g., 'BRA')
  const [showScanner, setShowScanner] = useState(false);

  // Sticker state structured as: { "BRA_10": { status: 'pasted' | 'missing', duplicates: 0 } }
  const [stickerStates, setStickerStates] = useState(() => {
    const saved = localStorage.getItem('copa_sticker_states');
    return saved ? JSON.parse(saved) : {};
  });

  // Sync to localStorage
  useEffect(() => {
    localStorage.setItem('copa_sticker_states', JSON.stringify(stickerStates));
  }, [stickerStates]);

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
      default:
        return (
          <Dashboard
            stats={stats}
            stickerStates={stickerStates}
            onSelectTeam={(teamCode) => setSelectedTeam(teamCode)}
          />
        );
    }
  };

  return (
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

        {/* Central Camera Floating Action Button (FAB) */}
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
  );
}
