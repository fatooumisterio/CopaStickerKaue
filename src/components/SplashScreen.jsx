import React, { useEffect, useState } from 'react';
import './SplashScreen.css';

export default function SplashScreen({ onComplete }) {
  const [fadeOut, setFadeOut] = useState(false);

  useEffect(() => {
    // A animação principal dura cerca de 1.5 segundos
    const timer1 = setTimeout(() => {
      setFadeOut(true);
    }, 1500);

    // Tempo extra para a transição de fade out terminar
    const timer2 = setTimeout(() => {
      onComplete();
    }, 2000); 

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
    };
  }, [onComplete]);

  return (
    <div className={`splash-container ${fadeOut ? 'fade-out' : ''}`}>
      <div className="text-container">
        <div className="fifa-text">FIFA WORLD CUP</div>
        <div className="year-text">2026</div>
      </div>
    </div>
  );
}
