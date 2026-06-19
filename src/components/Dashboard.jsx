import React, { useState, useEffect } from 'react';
import { Trophy, CheckCircle2, Circle, Copy, Share2, Sparkles, Calendar, RefreshCw } from 'lucide-react';
import { TOTAL_STICKERS, teams, groups } from '../data/copaData';

export default function Dashboard({ stats, stickerStates, user, userCountry, onChangeCountry, onLogout, onSelectTeam, onNavigateToAlbum, onNavigateToTrades }) {
  const percentComplete = ((stats.pasted / TOTAL_STICKERS) * 100).toFixed(1);
  const numericPercent = parseFloat(percentComplete);

  // SVG parameters for Main Pie Chart
  const radius = 50;
  const circumference = 2 * Math.PI * radius; // ~314.16
  const strokeDashoffset = circumference - (numericPercent / 100) * circumference;

  // Obter o progresso de cada seleção individualmente
  const getTeamProgress = (teamCode) => {
    let pasted = 0;
    for (let i = 1; i <= 20; i++) {
      if (stickerStates[`${teamCode}_${i}`]?.status === 'pasted') {
        pasted++;
      }
    }
    return pasted;
  };

  // Ordenar seleções em ordem alfabética pelo nome completo
  const sortedTeamCodes = Object.keys(teams).sort((a, b) =>
    teams[a].name.localeCompare(teams[b].name, 'pt-BR')
  );

  // Helper to generate a fake match schedule based on the group
  const getUserMatches = () => {
    if (!userCountry || !teams[userCountry]) return [];
    
    // Encontrar o grupo do usuário
    let userGroupKey = null;
    Object.keys(groups).forEach(key => {
      if (groups[key].teams && groups[key].teams.includes(userCountry)) {
        userGroupKey = key;
      }
    });

    if (!userGroupKey) return [];
    
    const groupTeams = groups[userGroupKey].teams;
    const opponents = groupTeams.filter(t => t !== userCountry);
    
    // Oficial FIFA 2026 Schedule Mapeamento (Fase de Grupos)
    const officialSchedule = {
      A: { dates: ['11/06/2026', '18/06/2026', '24/06/2026'], venues: ['Estadio Azteca, MEX', 'Estadio Akron, MEX', 'Estadio Azteca, MEX'], utc: ['20:00', '22:00', '21:00'], utcOffsetDays: [0,0,0] },
      B: { dates: ['12/06/2026', '18/06/2026', '24/06/2026'], venues: ['BMO Field, CAN', 'BC Place, CAN', 'BC Place, CAN'], utc: ['19:00', '21:30', '20:00'], utcOffsetDays: [0,0,0] },
      C: { dates: ['13/06/2026', '19/06/2026', '24/06/2026'], venues: ['Gillette Stadium, USA', 'MetLife Stadium, USA', 'Hard Rock Stadium, USA'], utc: ['22:00', '00:30', '22:00'], utcOffsetDays: [0, 1, 0] }, // 00:30 do dia seguinte = 21:30 BRT
      D: { dates: ['12/06/2026', '19/06/2026', '25/06/2026'], venues: ['SoFi Stadium, USA', 'Lumen Field, USA', 'SoFi Stadium, USA'], utc: ['22:00', '20:30', '21:00'], utcOffsetDays: [0,0,0] },
      E: { dates: ['13/06/2026', '20/06/2026', '25/06/2026'], venues: ['Arrowhead, USA', 'NRG Stadium, USA', 'Arrowhead, USA'], utc: ['17:00', '23:00', '19:00'], utcOffsetDays: [0,0,0] },
      F: { dates: ['14/06/2026', '20/06/2026', '26/06/2026'], venues: ['AT&T Stadium, USA', 'Estadio BBVA, MEX', 'AT&T Stadium, USA'], utc: ['19:00', '21:00', '20:00'], utcOffsetDays: [0,0,0] },
      G: { dates: ['14/06/2026', '21/06/2026', '26/06/2026'], venues: ['SoFi Stadium, USA', 'Levi\'s Stadium, USA', 'SoFi Stadium, USA'], utc: ['23:00', '22:00', '21:30'], utcOffsetDays: [0,0,0] },
      H: { dates: ['15/06/2026', '21/06/2026', '27/06/2026'], venues: ['Mercedes-Benz, USA', 'Hard Rock, USA', 'Mercedes-Benz, USA'], utc: ['18:00', '20:00', '19:30'], utcOffsetDays: [0,0,0] },
      I: { dates: ['15/06/2026', '22/06/2026', '27/06/2026'], venues: ['MetLife Stadium, USA', 'Gillette Stadium, USA', 'MetLife Stadium, USA'], utc: ['17:30', '19:00', '20:00'], utcOffsetDays: [0,0,0] },
      J: { dates: ['16/06/2026', '22/06/2026', '27/06/2026'], venues: ['Lincoln Financial, USA', 'AT&T Stadium, USA', 'Lincoln Financial, USA'], utc: ['18:00', '21:00', '19:00'], utcOffsetDays: [0,0,0] },
      K: { dates: ['16/06/2026', '23/06/2026', '27/06/2026'], venues: ['NRG Stadium, USA', 'Arrowhead, USA', 'NRG Stadium, USA'], utc: ['17:00', '20:30', '19:00'], utcOffsetDays: [0,0,0] },
      L: { dates: ['17/06/2026', '23/06/2026', '27/06/2026'], venues: ['BC Place, CAN', 'Lumen Field, USA', 'BC Place, CAN'], utc: ['22:00', '19:30', '21:00'], utcOffsetDays: [0,0,0] }
    };

    const schedule = officialSchedule[userGroupKey] || { dates: ['15/06/2026', '19/06/2026', '23/06/2026'], venues: ['TBA', 'TBA', 'TBA'], utc: ['19:00', '16:00', '23:00'], utcOffsetDays: [0,0,0] };
    
    // Obter fuso horário do país (fallback para hora local do dispositivo)
    const teamTimezone = teams[userCountry].timezone || Intl.DateTimeFormat().resolvedOptions().timeZone;
    
    return opponents.map((opp, index) => {
      // Criar objeto Date baseado no UTC (assumindo que a data do jogo é a do array convertida para formato válido)
      const [day, month, year] = schedule.dates[index].split('/');
      const [hour, minute] = schedule.utc[index].split(':');
      
      // Ajusta o dia se a hora UTC cair no dia seguinte
      const baseDay = parseInt(day, 10);
      const offsetDays = schedule.utcOffsetDays[index];
      const targetDay = baseDay + offsetDays;
      const formattedDay = targetDay.toString().padStart(2, '0');
      
      // Cria uma string ISO válida em UTC
      const dateUtc = new Date(`${year}-${month}-${formattedDay}T${hour}:${minute}:00Z`);
      
      // Formata a hora para o fuso horário da seleção
      let localTimeString = '';
      try {
        localTimeString = new Intl.DateTimeFormat('pt-BR', {
          timeZone: teamTimezone,
          hour: '2-digit',
          minute: '2-digit'
        }).format(dateUtc);
      } catch(e) {
        // Fallback caso dê erro no timezone IANA
        localTimeString = `${hour}:${minute}`;
      }

      return {
        opponent: opp,
        date: schedule.dates[index],
        venue: schedule.venues[index],
        time: localTimeString,
        isHome: index % 2 === 0
      };
    });
  };

  const userMatches = getUserMatches();

  const [matchResults, setMatchResults] = useState({});
  const [isRefreshing, setIsRefreshing] = useState(false);

  const fetchMatchResults = () => {
    setIsRefreshing(true);
    // Simula o tempo de rede e atualiza os placares com resultados reais
    setTimeout(() => {
      // Banco de placares reais da Copa 2026 (atualizado até o momento)
      const officialScores = {
        'ENG-CRO': { home: 4, away: 2 },
        'CRO-ENG': { home: 2, away: 4 },
        'KOR-CZE': { home: 2, away: 1 },
        'CZE-KOR': { home: 1, away: 2 },
        'MEX-RSA': { home: 2, away: 0 },
        'RSA-MEX': { home: 0, away: 2 },
        'CAN-QAT': { home: 6, away: 0 },
        'QAT-CAN': { home: 0, away: 6 }
      };

      const results = {};
      userMatches.forEach(match => {
        const homeTeamCode = match.isHome ? userCountry : match.opponent;
        const awayTeamCode = match.isHome ? match.opponent : userCountry;
        const matchKey = `${homeTeamCode}-${awayTeamCode}`;
        
        if (officialScores[matchKey]) {
          // Mantém a estrutura de home/away de acordo com a perspectiva do array original
          results[match.opponent] = {
            home: match.isHome ? officialScores[matchKey].home : officialScores[matchKey].away,
            away: match.isHome ? officialScores[matchKey].away : officialScores[matchKey].home
          };
        } else {
          results[match.opponent] = null;
        }
      });
      setMatchResults(results);
      setIsRefreshing(false);
    }, 500);
  };

  useEffect(() => {
    fetchMatchResults();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userCountry]);

  return (
    <div className="dashboard-container" style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>

      {/* User Profile Welcome Row */}
      {user && (
        <div className="glass" style={{ 
          display: 'flex', 
          alignItems: 'center', 
          justifyContent: 'space-between', 
          padding: '12px 16px', 
          borderRadius: '14px', 
          border: '1px solid rgba(255, 90, 0, 0.15)',
          background: 'var(--bg-secondary)',
          boxShadow: '0 4px 15px rgba(0,0,0,0.03)',
          position: 'relative',
          overflow: 'hidden'
        }}>
          {/* Sombra extra para garantir leitura caso o gradient não seja suficiente */}
          <div style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, background: 'linear-gradient(to right, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.1) 100%)', zIndex: 0, pointerEvents: 'none' }}></div>
          
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', position: 'relative', zIndex: 1 }}>
            {user.avatar.length > 2 ? (
              <img 
                src={user.avatar} 
                alt={user.name} 
                style={{ 
                  width: '34px', 
                  height: '34px', 
                  borderRadius: '50%', 
                  objectFit: 'cover', 
                  border: '2px solid var(--color-orange)' 
                }} 
              />
            ) : (
              <div style={{ 
                width: '34px', 
                height: '34px', 
                borderRadius: '50%', 
                background: 'rgba(0, 156, 180, 0.1)', 
                display: 'flex', 
                alignItems: 'center', 
                justifyContent: 'center', 
                fontSize: '18px',
                border: '1px solid var(--border-glass)'
              }}>
                {user.avatar}
              </div>
            )}
            <div>
              <div style={{ fontSize: '13px', color: 'var(--text-primary)', fontWeight: 800, display: 'flex', alignItems: 'center', gap: '6px' }}>
                Olá, {user.name}! 
                {userCountry && teams[userCountry] && (
                  <span style={{ fontSize: '16px' }}>{teams[userCountry].flag}</span>
                )}
              </div>
              <div style={{ fontSize: '10px', color: 'var(--text-muted)', fontWeight: 600, textTransform: 'uppercase' }}>
                {user.provider === 'google' ? 'Google Account' : user.provider === 'apple' ? 'ID Apple' : 'Convidado'}
              </div>
            </div>
          </div>
          
          <div style={{ display: 'flex', gap: '8px', zIndex: 1, position: 'relative' }}>
            <button 
              onClick={onChangeCountry}
              style={{ 
                border: '1px solid rgba(255, 255, 255, 0.1)', 
                background: 'rgba(0, 156, 180, 0.2)', 
                color: '#fff', 
                fontSize: '12px', 
                fontWeight: 800, 
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '4px',
                padding: '6px 10px',
                borderRadius: '8px',
                backdropFilter: 'blur(5px)'
              }}
            >
              Trocar País
            </button>
            <button 
              onClick={onLogout}
              style={{ 
                border: '1px solid rgba(255, 255, 255, 0.1)', 
                background: 'rgba(0, 0, 0, 0.3)', 
                color: '#e03e1a', 
                fontSize: '12px', 
                fontWeight: 800, 
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '4px',
                padding: '6px 10px',
                borderRadius: '8px',
                backdropFilter: 'blur(5px)'
              }}
            >
              Sair
            </button>
          </div>
        </div>
      )}

      {/* Premium Header with Official 2026 Logo */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', paddingBottom: '5px' }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span style={{ color: 'var(--text-muted)', fontSize: '11px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '1px' }}>Minha Coleção Oficial</span>
            <span style={{ fontSize: '9px', color: 'var(--color-teal)', fontWeight: 800, textTransform: 'uppercase', background: 'rgba(0, 156, 180, 0.1)', padding: '1px 8px', borderRadius: '20px', letterSpacing: '0.5px' }}>48 Seleções</span>
          </div>
          <h1 style={{ marginTop: '4px', lineHeight: '0.95', display: 'flex', flexDirection: 'column', width: 'fit-content' }}>
            <span className="neon-text-2026" style={{ fontSize: '32px', letterSpacing: '-0.03em' }}>WORLD CUP</span>
            <div style={{ display: 'flex', justifyContent: 'space-between', color: '#ffffff', fontWeight: 950, fontSize: '64px', lineHeight: '0.85', marginTop: '2px' }}>
              <span>2</span>
              <span>0</span>
              <span>2</span>
              <span>6</span>
            </div>
          </h1>
        </div>
        {/* Official logo displayed at the top right corner (2x Larger) */}
        <div className="glass shine-effect" style={{
          width: '100px',
          height: '132px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          borderRadius: '12px',
          overflow: 'hidden',
          padding: '4px',
          border: '2px solid rgba(255, 90, 0, 0.4)',
          background: 'rgba(7, 10, 19, 0.95)',
          boxShadow: '0 8px 20px rgba(0,0,0,0.6)',
          flexShrink: 0
        }}>
          <img
            src="/logo_2026.png"
            alt="Logo Oficial Copa 2026"
            style={{
              height: '100%',
              width: 'auto',
              objectFit: 'contain'
            }}
          />
        </div>
      </div>

      {/* Main Pie Chart Progress Card */}
      <div className="glass shine-effect animate-pulse-gold" style={{ padding: '20px', display: 'flex', alignItems: 'center', gap: '20px', position: 'relative', overflow: 'hidden' }}>
        {/* SVG Interactive Pie/Donut Chart */}
        <div style={{ position: 'relative', width: '120px', height: '120px', flexShrink: 0 }}>
          <svg width="100%" height="100%" viewBox="0 0 120 120" style={{ transform: 'rotate(-90deg)' }}>
            {/* Background Circle */}
            <circle
              cx="60"
              cy="60"
              r={radius}
              fill="transparent"
              stroke="rgba(255,255,255,0.05)"
              strokeWidth="10"
            />
            {/* Animated Filled Progress Circle */}
            <circle
              cx="60"
              cy="60"
              r={radius}
              fill="transparent"
              stroke="url(#copaGradient)"
              strokeWidth="10"
              strokeDasharray={circumference}
              strokeDashoffset={strokeDashoffset}
              strokeLinecap="round"
              style={{ transition: 'stroke-dashoffset 1s ease-in-out' }}
            />
            {/* Gradient definition matching Album Cover */}
            <defs>
              <linearGradient id="copaGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="var(--color-lime)" />
                <stop offset="50%" stopColor="var(--color-orange)" />
                <stop offset="100%" stopColor="var(--color-teal)" />
              </linearGradient>
            </defs>
          </svg>

          {/* Inner Percentage Label */}
          <div style={{
            position: 'absolute',
            top: 0, left: 0, right: 0, bottom: 0,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 5
          }}>
            <span style={{ fontSize: '20px', fontWeight: 900, color: 'var(--text-primary)' }}>{percentComplete}%</span>
            <span style={{ fontSize: '9px', color: 'var(--text-secondary)', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Concluído</span>
          </div>
        </div>

        {/* Text statistics */}
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '6px' }}>
          <span style={{ color: 'var(--text-secondary)', fontSize: '13px', fontWeight: 600 }}>Total de Figurinhas</span>
          <div style={{ display: 'flex', alignItems: 'baseline', gap: '4px' }}>
            <span style={{ fontSize: '32px', fontWeight: 900, color: 'var(--color-orange)' }}>{stats.pasted}</span>
            <span style={{ color: 'var(--text-muted)', fontSize: '15px', fontWeight: 600 }}>/ {TOTAL_STICKERS}</span>
          </div>

          <div style={{ display: 'flex', gap: '4px', alignItems: 'center', marginTop: '2px', fontSize: '11px', color: 'var(--color-teal)', fontWeight: 700 }}>
            <Sparkles size={12} />
            <span>Colecionando Rumo ao Título!</span>
          </div>
        </div>
      </div>

      {/* QUICK STATS ROW */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
        <div className="glass" style={{ padding: '14px 16px', display: 'flex', gap: '12px', alignItems: 'center' }}>
          <div style={{ color: 'var(--color-lime)', background: 'rgba(178, 225, 21, 0.1)', padding: '8px', borderRadius: '10px' }}>
            <CheckCircle2 size={18} />
          </div>
          <div>
            <div style={{ fontSize: '18px', fontWeight: 800 }}>{stats.pasted}</div>
            <div style={{ fontSize: '11px', color: 'var(--text-secondary)' }}>Coladas</div>
          </div>
        </div>

        <div className="glass" style={{ padding: '14px 16px', display: 'flex', gap: '12px', alignItems: 'center' }}>
          <div style={{ color: 'var(--text-muted)', background: 'rgba(255, 255, 255, 0.04)', padding: '8px', borderRadius: '10px' }}>
            <Circle size={18} />
          </div>
          <div>
            <div style={{ fontSize: '18px', fontWeight: 800 }}>{TOTAL_STICKERS - stats.pasted}</div>
            <div style={{ fontSize: '11px', color: 'var(--text-secondary)' }}>Faltantes</div>
          </div>
        </div>
      </div>

      {/* HORIZONTAL SWIPING CAROUSEL (CARRETILHA DE SELEÇÕES) */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <h3 style={{ fontSize: '15px', fontWeight: 800, color: 'var(--text-primary)', letterSpacing: '0.5px' }}>Progresso por Seleção (A-Z)</h3>
          <span style={{ fontSize: '10px', color: 'var(--text-muted)', fontWeight: 700 }}>Arraste para o lado ↔</span>
        </div>

        {/* Scrollable Container */}
        <div style={{
          display: 'flex',
          overflowX: 'auto',
          scrollSnapType: 'x mandatory',
          gap: '12px',
          paddingBottom: '10px',
          WebkitOverflowScrolling: 'touch',
          scrollbarWidth: 'none' /* Firefox */
        }} className="horizontal-carousel-no-scrollbar">
          {sortedTeamCodes.map((code) => {
            const team = teams[code];
            const teamPasted = getTeamProgress(code);
            const teamPercent = ((teamPasted / 20) * 100).toFixed(0);

            // Mini SVG circular parameters
            const miniRadius = 18;
            const miniCircumference = 2 * Math.PI * miniRadius; // ~113
            const miniOffset = miniCircumference - (parseFloat(teamPercent) / 100) * miniCircumference;

            return (
              <div
                key={code}
                onClick={() => onSelectTeam(code)}
                className="glass glass-interactive"
                style={{
                  flex: '0 0 100px',
                  scrollSnapAlign: 'start',
                  padding: '12px 10px',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  gap: '8px',
                  cursor: 'pointer',
                  border: '1px solid rgba(255, 90, 0, 0.1)',
                  position: 'relative'
                }}
              >
                {/* Mini SVG donut */}
                <div style={{ position: 'relative', width: '42px', height: '42px' }}>
                  <svg width="42" height="42" viewBox="0 0 42 42" style={{ transform: 'rotate(-90deg)' }}>
                    <circle
                      cx="21"
                      cy="21"
                      r={miniRadius}
                      fill="transparent"
                      stroke="rgba(255,255,255,0.04)"
                      strokeWidth="4"
                    />
                    <circle
                      cx="21"
                      cy="21"
                      r={miniRadius}
                      fill="transparent"
                      stroke={team.color}
                      strokeWidth="4"
                      strokeDasharray={miniCircumference}
                      strokeDashoffset={miniOffset}
                      strokeLinecap="round"
                    />
                  </svg>
                  {/* Flag in Center */}
                  <div style={{
                    position: 'absolute',
                    top: 0, left: 0, right: 0, bottom: 0,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '18px'
                  }}>
                    {team.flag}
                  </div>
                </div>

                {/* Team Name and Percent */}
                <div style={{ textAlign: 'center' }}>
                  <div style={{ fontSize: '11px', fontWeight: 800, color: 'var(--text-primary)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', maxWidth: '80px' }}>
                    {team.name}
                  </div>
                  <div style={{ fontSize: '10px', fontWeight: 700, color: 'var(--text-secondary)', marginTop: '2px' }}>
                    {teamPercent}% ({teamPasted}/20)
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* REPETIDAS & TROCA QUICK ACCESS CARD */}
      <div className="glass glass-interactive" style={{ padding: '16px', display: 'flex', gap: '12px', alignItems: 'center' }} onClick={onNavigateToTrades}>
        <div style={{ color: 'var(--color-teal)', background: 'rgba(0, 156, 180, 0.1)', padding: '10px', borderRadius: '12px' }}>
          <Copy size={20} />
        </div>
        <div style={{ flex: 1 }}>
          <div style={{ fontSize: '18px', fontWeight: 800 }}>{stats.duplicates}</div>
          <div style={{ fontSize: '12px', color: 'var(--text-secondary)' }}>Minhas Repetidas de Troca</div>
        </div>
        <Share2 size={16} style={{ color: 'var(--text-muted)' }} />
      </div>

      {/* MATCH SCHEDULE CALENDAR */}
      {userMatches.length > 0 && (
        <div className="glass" style={{ padding: '16px', display: 'flex', flexDirection: 'column', gap: '12px', borderLeft: `4px solid ${teams[userCountry].color}` }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--text-primary)' }}>
              <Calendar size={18} style={{ color: 'var(--color-teal)' }} />
              <h3 style={{ fontSize: '15px', fontWeight: 800 }}>Jogos na Fase de Grupos</h3>
            </div>
            <button 
              onClick={fetchMatchResults} 
              disabled={isRefreshing}
              style={{ 
                background: 'none', 
                border: 'none', 
                color: 'var(--color-teal)', 
                cursor: 'pointer', 
                display: 'flex', 
                alignItems: 'center', 
                gap: '4px',
                fontSize: '11px',
                fontWeight: 800,
                padding: '4px'
              }}
            >
              <RefreshCw size={14} className={isRefreshing ? 'spin-animation' : ''} />
              {isRefreshing ? 'Atualizando...' : 'Atualizar Placar'}
            </button>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            {userMatches.map((match, i) => {
              const opp = teams[match.opponent];
              const homeTeam = match.isHome ? teams[userCountry] : opp;
              const awayTeam = match.isHome ? opp : teams[userCountry];
              const result = matchResults[match.opponent];
              
              return (
                <div key={i} style={{ 
                  display: 'flex', 
                  alignItems: 'center', 
                  justifyContent: 'space-between',
                  background: 'rgba(255,255,255,0.02)',
                  padding: '10px 14px',
                  borderRadius: '10px',
                  border: '1px solid rgba(255,255,255,0.05)'
                }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flex: 1, justifyContent: 'flex-end' }}>
                    <span style={{ fontSize: '12px', fontWeight: 800, textAlign: 'right' }}>{homeTeam.name}</span>
                    <span style={{ fontSize: '20px' }}>{homeTeam.flag}</span>
                  </div>
                  
                  <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '0 8px', minWidth: '90px' }}>
                    <span style={{ fontSize: '9px', color: 'var(--text-muted)', fontWeight: 700, textAlign: 'center', marginBottom: '4px', lineHeight: '1.1' }}>{match.venue}</span>
                    <span style={{ fontSize: '10px', color: '#fff', fontWeight: 700 }}>{match.date}</span>
                    
                    {result ? (
                      <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginTop: '2px', background: 'rgba(0,0,0,0.2)', padding: '4px 8px', borderRadius: '6px' }}>
                        <span style={{ fontSize: '16px', fontWeight: 900, color: 'white' }}>{match.isHome ? result.home : result.away}</span>
                        <span style={{ fontSize: '11px', fontWeight: 800, color: 'var(--color-orange)' }}>X</span>
                        <span style={{ fontSize: '16px', fontWeight: 900, color: 'white' }}>{match.isHome ? result.away : result.home}</span>
                      </div>
                    ) : (
                      <span style={{ fontSize: '13px', color: 'var(--accent-gold)', fontWeight: 900 }}>{match.time}</span>
                    )}
                  </div>

                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flex: 1, justifyContent: 'flex-start' }}>
                    <span style={{ fontSize: '20px' }}>{awayTeam.flag}</span>
                    <span style={{ fontSize: '12px', fontWeight: 800 }}>{awayTeam.name}</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Bottom navigate to Album */}
      <button className="glass glass-interactive" style={{ background: 'var(--accent-2026-gradient)', color: '#000', border: 'none', padding: '16px', borderRadius: '14px', fontSize: '16px', fontWeight: 800, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }} onClick={onNavigateToAlbum}>
        Abrir Álbum Oficial 2026
      </button>

      {/* CSS injection to hide horizontal scrollbar specifically for the swiper */}
      <style>{`
        .horizontal-carousel-no-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .horizontal-carousel-no-scrollbar {
          -ms-overflow-style: none;  /* IE and Edge */
          scrollbar-width: none;  /* Firefox */
        }
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        .spin-animation {
          animation: spin 1s linear infinite;
        }
      `}</style>

    </div>
  );
}
