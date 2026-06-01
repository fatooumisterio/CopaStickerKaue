import React, { useState } from 'react';
import { Sparkles, ArrowRight, Loader2, LogIn } from 'lucide-react';
import { loginWithGoogle, loginWithApple } from '../services/firebase';

export default function Login({ onLoginSuccess }) {
  const [loading, setLoading] = useState(null); // null | 'google' | 'apple' | 'guest'

  const handleRealLogin = async (provider) => {
    setLoading(provider);
    try {
      let loggedUser = null;
      if (provider === 'google') {
        loggedUser = await loginWithGoogle();
      } else if (provider === 'apple') {
        loggedUser = await loginWithApple();
      } else {
        // Simular um breve carregamento para o Convidado
        await new Promise(resolve => setTimeout(resolve, 1000));
        loggedUser = {
          name: 'Convidado',
          email: 'guest@copa2026.com',
          provider: 'guest',
          avatar: '👤'
        };
      }
      onLoginSuccess(loggedUser);
    } catch (error) {
      console.error("Erro na autenticação:", error);
      alert("Falha na autenticação. Verifique sua conexão e tente novamente.");
    } finally {
      setLoading(null);
    }
  };

  return (
    <div style={{
      width: '100%',
      minHeight: '100vh',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      padding: '24px',
      background: 'var(--bg-primary)',
      backgroundImage: 'radial-gradient(circle at 50% 30%, rgba(255, 90, 0, 0.06) 0%, transparent 50%), radial-gradient(circle at 50% 80%, rgba(0, 156, 180, 0.06) 0%, transparent 50%)',
      position: 'relative',
      overflow: 'hidden'
    }}>
      
      {/* Decorative Circles */}
      <div style={{ position: 'absolute', top: '-10%', left: '-10%', width: '250px', height: '250px', borderRadius: '50%', background: 'var(--color-lime)', filter: 'blur(100px)', opacity: 0.15 }}></div>
      <div style={{ position: 'absolute', bottom: '-10%', right: '-10%', width: '250px', height: '250px', borderRadius: '50%', background: 'var(--color-orange)', filter: 'blur(100px)', opacity: 0.15 }}></div>

      {/* Main Login Card */}
      <div className="glass shine-effect" style={{
        width: '100%',
        maxWidth: '380px',
        padding: '36px 24px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '24px',
        border: '1px solid rgba(255, 90, 0, 0.25)',
        boxShadow: '0 20px 40px rgba(0,0,0,0.15)',
        position: 'relative',
        zIndex: 10
      }}>
        
        {/* Album Brand Logo Banner */}
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px' }}>
          {/* Logo container */}
          <div style={{
            width: '64px',
            height: '84px',
            borderRadius: '10px',
            overflow: 'hidden',
            border: '2px solid rgba(255, 90, 0, 0.4)',
            background: '#070a13',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: '0 8px 16px rgba(0,0,0,0.3)'
          }}>
            <img src="/logo_2026.png" alt="Logo Copa 2026" style={{ height: '100%', width: 'auto', objectFit: 'contain' }} />
          </div>
          
          <div style={{ textAlign: 'center', marginTop: '6px' }}>
            <h2 className="neon-text-2026" style={{ fontSize: '28px', lineHeight: '1' }}>WORLD CUP</h2>
            <div style={{ display: 'flex', justifyContent: 'space-between', color: 'var(--color-blue)', fontWeight: 950, fontSize: '42px', lineHeight: '0.85', width: '100%' }}>
              <span>2</span>
              <span>0</span>
              <span>2</span>
              <span>6</span>
            </div>
            <span style={{ color: 'var(--text-muted)', fontSize: '12px', fontWeight: 700, letterSpacing: '1px', textTransform: 'uppercase', display: 'block', marginTop: '6px' }}>
              Colecionador Oficial
            </span>
          </div>
        </div>

        {/* Welcome message */}
        <p style={{ fontSize: '13px', color: 'var(--text-secondary)', textAlign: 'center', lineHeight: '1.6', padding: '0 8px' }}>
          Sincronize seu progresso na nuvem, salve suas repetidas e nunca perca sua coleção de figurinhas!
        </p>

        {/* Buttons List */}
        <div style={{ width: '100%', display: 'flex', flexDirection: 'column', gap: '12px', marginTop: '10px' }}>
          
          {loading ? (
            <div className="glass" style={{
              width: '100%',
              padding: '16px',
              borderRadius: '12px',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '12px',
              background: 'rgba(255, 255, 255, 0.9)',
              border: '1px solid rgba(0, 156, 180, 0.2)'
            }}>
              <Loader2 size={24} className="animate-spin" style={{ color: 'var(--color-orange)', animation: 'spin 1s linear infinite' }} />
              <span style={{ fontSize: '13px', fontWeight: 700, color: 'var(--text-primary)' }}>
                {loading === 'google' && 'Conectando ao Google...'}
                {loading === 'apple' && 'Conectando ao ID Apple...'}
                {loading === 'guest' && 'Iniciando painel...'}
              </span>
            </div>
          ) : (
            <>
              {/* Google Button */}
              <button
                onClick={() => handleRealLogin('google')}
                className="glass-interactive"
                style={{
                  width: '100%',
                  height: '52px',
                  border: '1px solid rgba(0, 0, 0, 0.08)',
                  borderRadius: '12px',
                  background: '#ffffff',
                  color: '#1f1f1f',
                  fontWeight: 700,
                  fontSize: '14px',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '12px',
                  boxShadow: '0 2px 4px rgba(0,0,0,0.05)'
                }}
              >
                {/* Google Colorful Icon */}
                <svg width="18" height="18" viewBox="0 0 18 18">
                  <path d="M17.64 9.2c0-.63-.06-1.25-.16-1.84H9v3.47h4.84c-.21 1.12-.84 2.07-1.79 2.7l2.76 2.13c1.62-1.49 2.83-3.7 2.83-6.46z" fill="#4285F4" />
                  <path d="M9 18c2.43 0 4.47-.8 5.96-2.18l-2.76-2.13c-.76.51-1.74.82-3.2.82-2.46 0-4.54-1.66-5.28-3.9L.94 12.8C2.42 15.9 5.48 18 9 18z" fill="#34A853" />
                  <path d="M3.72 10.61c-.19-.57-.3-1.18-.3-1.8s.11-1.23.3-1.8L.94 4.79C.34 5.98 0 7.37 0 8.8s.34 2.82.94 4.01l2.78-2.2z" fill="#FBBC05" />
                  <path d="M9 3.58c1.32 0 2.5.45 3.44 1.35l2.58-2.58C13.46.89 11.43 0 9 0 5.48 0 2.42 2.1 1.05 5.2L3.72 7.4c.74-2.24 2.82-3.82 5.28-3.82z" fill="#EA4335" />
                </svg>
                Entrar com Google
              </button>

              {/* Apple Button */}
              <button
                onClick={() => handleRealLogin('apple')}
                className="glass-interactive"
                style={{
                  width: '100%',
                  height: '52px',
                  border: 'none',
                  borderRadius: '12px',
                  background: '#000000',
                  color: '#ffffff',
                  fontWeight: 700,
                  fontSize: '14px',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '12px',
                  boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)'
                }}
              >
                {/* Apple White Icon */}
                <svg width="16" height="18" viewBox="0 0 16 18" fill="none">
                  <path d="M13.626 9.176c.026 2.058 1.802 2.748 1.828 2.762-.016.052-.284.97-1.008 1.954-.626.852-1.272 1.698-2.296 1.716-1.004.016-1.327-.55-2.47-.55-1.144 0-1.503.534-2.454.568-.985.034-1.716-.918-2.348-1.78C3.593 12.062 2.3 8.358 3.633 6.208c.662-1.07 1.84-1.748 3.102-1.766 1.004-.016 1.95.632 2.564.632.616 0 1.763-.78 2.973-.664.506.018 1.93.188 2.846 1.442-.074.043-1.698.928-1.692 2.825l.2-.5z" fill="white" />
                  <path d="M11.236 2.548c.51-.577.854-1.383.76-2.186-.738.028-1.632.463-2.16 1.042-.464.506-.87 1.327-.753 2.115.823.06 1.642-.395 2.153-.971z" fill="white" />
                </svg>
                Entrar com a Apple
              </button>

              {/* Guest / Continue Offline Button */}
              <button
                onClick={() => handleRealLogin('guest')}
                className="glass-interactive"
                style={{
                  width: '100%',
                  height: '46px',
                  border: '1px solid var(--border-glass)',
                  borderRadius: '12px',
                  background: 'transparent',
                  color: 'var(--text-secondary)',
                  fontWeight: 600,
                  fontSize: '13px',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '6px',
                  marginTop: '10px'
                }}
              >
                Continuar sem conta (Convidado)
                <ArrowRight size={14} />
              </button>
            </>
          )}

        </div>

      </div>

      {/* Footer Branding */}
      <span style={{ position: 'absolute', bottom: '24px', fontSize: '10px', color: 'var(--text-muted)', fontWeight: 700, letterSpacing: '1px', textTransform: 'uppercase' }}>
        FIFA World Cup 2026 © Panini & Google
      </span>

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
