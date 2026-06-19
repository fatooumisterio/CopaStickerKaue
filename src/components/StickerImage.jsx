import React, { useState, useEffect } from 'react';

// API limits and caching strategy
const CACHE_PREFIX = 'player_img_cache_';

export default function StickerImage({ playerName, teamColor, isPasted, isSpecial }) {
  const [imageUrl, setImageUrl] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (isSpecial) {
      setLoading(false);
      return;
    }

    let isMounted = true;
    const fetchImage = async () => {
      // Check cache first
      const cached = localStorage.getItem(CACHE_PREFIX + playerName);
      if (cached) {
        if (cached !== 'NOT_FOUND' && isMounted) {
          setImageUrl(cached);
        }
        if (isMounted) setLoading(false);
        return;
      }

      try {
        // Fetch from TheSportsDB
        const res = await fetch(`https://www.thesportsdb.com/api/v1/json/3/searchplayers.php?p=${encodeURIComponent(playerName)}`);
        const data = await res.json();
        
        if (data && data.player && data.player.length > 0) {
          // Prefer cutout (transparent background) over thumb
          const player = data.player[0];
          const img = player.strCutout || player.strThumb;
          
          if (img) {
            localStorage.setItem(CACHE_PREFIX + playerName, img);
            if (isMounted) setImageUrl(img);
          } else {
            localStorage.setItem(CACHE_PREFIX + playerName, 'NOT_FOUND');
          }
        } else {
          localStorage.setItem(CACHE_PREFIX + playerName, 'NOT_FOUND');
        }
      } catch (error) {
        console.error("Error fetching player image:", error);
        // Don't cache errors so we can retry later
      } finally {
        if (isMounted) setLoading(false);
      }
    };

    fetchImage();

    return () => {
      isMounted = false;
    };
  }, [playerName, isSpecial]);

  // Special Stickers (Shield, Stadium, etc)
  if (isSpecial) {
    return (
      <div style={{
        width: '64px',
        height: '88px',
        borderRadius: '4px',
        border: isPasted ? `2px solid ${teamColor}` : '2px dashed var(--border-glass)',
        padding: isPasted ? '3px' : '0',
        background: isPasted ? '#fff' : 'rgba(0,0,0,0.1)',
        overflow: 'hidden',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        opacity: isPasted ? 1 : 0.4,
        filter: isPasted ? 'none' : 'grayscale(100%)',
        transition: 'all 0.3s ease',
        boxShadow: isPasted ? '0 2px 5px rgba(0,0,0,0.2)' : 'none'
      }}>
        <img 
          src={`https://ui-avatars.com/api/?name=${encodeURIComponent(playerName)}&background=ffd700&color=000&size=128&bold=true`} 
          alt={playerName}
          style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: isPasted ? '2px' : '0' }}
        />
      </div>
    );
  }

  // Player Stickers
  return (
    <div style={{
      width: '64px',
      height: '88px',
      borderRadius: '4px',
      border: isPasted ? `2px solid ${teamColor}` : '2px dashed var(--border-glass)',
      padding: isPasted ? '3px' : '0',
      background: isPasted ? '#fff' : 'rgba(0,0,0,0.1)',
      overflow: 'hidden',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      opacity: isPasted ? 1 : 0.4,
      filter: isPasted ? 'none' : 'grayscale(100%)',
      transition: 'all 0.3s ease',
      boxShadow: isPasted ? '0 2px 5px rgba(0,0,0,0.2)' : 'none'
    }}>
      {loading ? (
        <div style={{ width: '20px', height: '20px', border: '2px solid var(--border-glass)', borderTopColor: teamColor, borderRadius: '50%', animation: 'spin 1s linear infinite' }} />
      ) : imageUrl ? (
        <img 
          src={imageUrl} 
          alt={playerName}
          style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: isPasted ? '2px' : '0', background: 'transparent' }}
          onError={(e) => {
            // Fallback if image fails to load
            e.target.onerror = null;
            setImageUrl(null);
          }}
        />
      ) : (
        <img 
          src={`https://ui-avatars.com/api/?name=${encodeURIComponent(playerName)}&background=random&color=fff&size=128&bold=true`} 
          alt={playerName}
          style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: isPasted ? '2px' : '0' }}
        />
      )}
    </div>
  );
}
