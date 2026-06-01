import React, { useEffect, useState } from 'react';
import './SplashScreen.css';

export default function SplashScreen({ onComplete }) {
  const [fadeOut, setFadeOut] = useState(false);

  useEffect(() => {
    // A animação principal dura cerca de 3 segundos
    const timer1 = setTimeout(() => {
      setFadeOut(true);
    }, 3500);

    // Tempo extra para a transição de fade out terminar
    const timer2 = setTimeout(() => {
      onComplete();
    }, 4000); 

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
    };
  }, [onComplete]);

  return (
    <div className={`splash-container ${fadeOut ? 'fade-out' : ''}`}>
      <div className="logo-wrapper">
        <svg viewBox="0 0 200 320" className="animated-26">
          <defs>
            <linearGradient id="grad26" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" style={{ stopColor: '#ffffff', stopOpacity: 1 }} />
              <stop offset="100%" style={{ stopColor: '#d4d4d4', stopOpacity: 1 }} />
            </linearGradient>
            <filter id="glow">
              <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
              <feMerge>
                <feMergeNode in="coloredBlur"/>
                <feMergeNode in="SourceGraphic"/>
              </feMerge>
            </filter>
          </defs>
          
          {/* Número 2 */}
          <path
            className="path-2"
            d="M 60 90 C 60 30, 140 30, 140 90 C 140 150, 60 210, 60 210 L 140 210"
            fill="none"
            stroke="url(#grad26)"
            strokeWidth="32"
            strokeLinecap="round"
            strokeLinejoin="round"
            filter="url(#glow)"
          />
          
          {/* Número 6 */}
          <path
            className="path-6"
            d="M 140 180 C 90 180, 60 210, 60 260 C 60 310, 140 310, 140 260 C 140 220, 80 220, 80 260"
            fill="none"
            stroke="url(#grad26)"
            strokeWidth="32"
            strokeLinecap="round"
            strokeLinejoin="round"
            filter="url(#glow)"
          />
        </svg>

        <div className="trophy-container">
          <div className="trophy">🏆</div>
        </div>
      </div>
      
      <div className="text-container">
        <div className="fifa-text">FIFA WORLD CUP</div>
        <div className="year-text">2026</div>
      </div>
    </div>
  );
}
