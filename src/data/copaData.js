// Copa do Mundo 2026 - Banco de Dados de Figurinhas Oficial Panini (48 Seleções)

export const groups = {
  A: { name: 'Grupo A', teams: ['MEX', 'CRC', 'MAR', 'JPN'] },
  B: { name: 'Grupo B', teams: ['CAN', 'URU', 'POL', 'KOR'] },
  C: { name: 'Grupo C', teams: ['BRA', 'DEN', 'ALG', 'KSA'] },
  D: { name: 'Grupo D', teams: ['USA', 'SWE', 'EGY', 'IRN'] },
  E: { name: 'Grupo E', teams: ['FRA', 'COL', 'TUN', 'IRQ'] },
  F: { name: 'Grupo F', teams: ['GER', 'PER', 'NGA', 'QAT'] },
  G: { name: 'Grupo G', teams: ['ESP', 'CHI', 'CMR', 'UZB'] },
  H: { name: 'Grupo H', teams: ['POR', 'SUI', 'GHA', 'JAM'] },
  I: { name: 'Grupo I', teams: ['ITA', 'PAR', 'MLI', 'OMA'] },
  J: { name: 'Grupo J', teams: ['ENG', 'UKR', 'CIV', 'UAE'] },
  K: { name: 'Grupo K', teams: ['BEL', 'CRO', 'RSA', 'NZL'] },
  L: { name: 'Grupo L', teams: ['ARG', 'NED', 'SEN', 'AUS'] },
  X: { name: 'Páginas Especiais', teams: ['HIST', 'COCA'] }
};

export const teams = {
  MEX: { name: 'México', flag: '🇲🇽', color: '#006847' },
  CRC: { name: 'Costa Rica', flag: '🇨🇷', color: '#1155cc' },
  MAR: { name: 'Marrocos', flag: '🇲🇦', color: '#c1272d' },
  JPN: { name: 'Japão', flag: '🇯🇵', color: '#002f6c' },
  
  CAN: { name: 'Canadá', flag: '🇨🇦', color: '#ff0000' },
  URU: { name: 'Uruguai', flag: '🇺🇾', color: '#00a3e0' },
  POL: { name: 'Polônia', flag: '🇵🇱', color: '#dc143c' },
  KOR: { name: 'Coreia do Sul', flag: '🇰🇷', color: '#0a1172' },
  
  BRA: { name: 'Brasil', flag: '🇧🇷', color: '#009739' },
  DEN: { name: 'Dinamarca', flag: '🇩🇰', color: '#c8102e' },
  ALG: { name: 'Argélia', flag: '🇩🇿', color: '#006633' },
  KSA: { name: 'Arábia Saudita', flag: '🇸🇦', color: '#006c35' },
  
  USA: { name: 'Estados Unidos', flag: '🇺🇸', color: '#002868' },
  SWE: { name: 'Suécia', flag: '🇸🇪', color: '#006aa7' },
  EGY: { name: 'Egito', flag: '🇪🇬', color: '#c8102e' },
  IRN: { name: 'Irã', flag: '🇮🇷', color: '#239f40' },
  
  FRA: { name: 'França', flag: '🇫🇷', color: '#002395' },
  COL: { name: 'Colômbia', flag: '🇨🇴', color: '#fcd116' },
  TUN: { name: 'Tunísia', flag: '🇹🇳', color: '#e10600' },
  IRQ: { name: 'Iraque', flag: '🇮🇶', color: '#007a3d' },
  
  GER: { name: 'Alemanha', flag: '🇩🇪', color: '#000000' },
  PER: { name: 'Peru', flag: '🇵🇪', color: '#d91414' },
  NGA: { name: 'Nigéria', flag: '🇳🇬', color: '#008751' },
  QAT: { name: 'Catar', flag: '🇶🇦', color: '#8a1538' },
  
  ESP: { name: 'Espanha', flag: '🇪🇸', color: '#c11b17' },
  CHI: { name: 'Chile', flag: '🇨🇱', color: '#0039a6' },
  CMR: { name: 'Camarões', flag: '🇨🇲', color: '#007a5e' },
  UZB: { name: 'Uzbequistão', flag: '🇺🇿', color: '#0099b5' },
  
  POR: { name: 'Portugal', flag: '🇵🇹', color: '#046a38' },
  SUI: { name: 'Suíça', flag: '🇨🇭', color: '#d52b1e' },
  GHA: { name: 'Gana', flag: '🇬🇭', color: '#da291c' },
  JAM: { name: 'Jamaica', flag: '🇯🇲', color: '#009b3a' },
  
  ITA: { name: 'Itália', flag: '🇮🇹', color: '#0064aa' },
  PAR: { name: 'Paraguai', flag: '🇵🇾', color: '#d52b1e' },
  MLI: { name: 'Mali', flag: '🇲🇱', color: '#14b53a' },
  OMA: { name: 'Omã', flag: '🇴🇲', color: '#d01c1f' },
  
  ENG: { name: 'Inglaterra', flag: '🏴󠁧󠁢󠁥󠁮󠁧󠁿', color: '#cf081f' },
  UKR: { name: 'Ucrânia', flag: '🇺🇦', color: '#ffd700' },
  CIV: { name: 'Costa do Marfim', flag: '🇨🇮', color: '#ff8200' },
  UAE: { name: 'Emirados Árabes', flag: '🇦🇪', color: '#00732f' },
  
  BEL: { name: 'Bélgica', flag: '🇧🇪', color: '#e52b50' },
  CRO: { name: 'Croácia', flag: '🇭🇷', color: '#ff0000' },
  RSA: { name: 'África do Sul', flag: '🇿🇦', color: '#007c59' },
  NZL: { name: 'Nova Zelândia', flag: '🇳🇿', color: '#000000' },

  ARG: { name: 'Argentina', flag: '🇦🇷', color: '#74acdf' },
  NED: { name: 'Holanda', flag: '🇳🇱', color: '#f36c21' },
  SEN: { name: 'Senegal', flag: '🇸🇳', color: '#00a859' },
  AUS: { name: 'Austrália', flag: '🇦🇺', color: '#00008b' },

  HIST: { name: 'Campeões Históricos (FIFA Museum)', flag: '🏛️', color: '#D4AF37' },
  COCA: { name: 'Team Believers (Coca-Cola)', flag: '🥤', color: '#F40009' }
};

// Base oficial de jogadores (18 por seleção)
const officialPlayers = {
  BRA: ['Alisson', 'Ederson', 'Marquinhos', 'Gabriel Magalhães', 'Danilo', 'Guilherme Arana', 'Yan Couto', 'Bruno Guimarães', 'Lucas Paquetá', 'João Gomes', 'Douglas Luiz', 'Andreas Pereira', 'Neymar Jr', 'Vinicius Jr', 'Rodrygo', 'Raphinha', 'Endrick', 'Savinho'],
  ARG: ['Emiliano Martínez', 'Gerónimo Rulli', 'Nicolás Otamendi', 'Cristian Romero', 'Lisandro Martínez', 'Nahuel Molina', 'Nicolás Tagliafico', 'Rodrigo De Paul', 'Enzo Fernández', 'Alexis Mac Allister', 'Giovani Lo Celso', 'Exequiel Palacios', 'Lionel Messi', 'Ángel Di María', 'Julián Álvarez', 'Lautaro Martínez', 'Alejandro Garnacho', 'Nico González'],
  USA: ['Matt Turner', 'Ethan Horvath', 'Sergiño Dest', 'Antonee Robinson', 'Chris Richards', 'Tim Ream', 'Cameron Carter-Vickers', 'Weston McKennie', 'Tyler Adams', 'Yunus Musah', 'Gio Reyna', 'Johnny Cardoso', 'Christian Pulisic', 'Timothy Weah', 'Brenden Aaronson', 'Folarin Balogun', 'Ricardo Pepi', 'Josh Sargent'],
  MEX: ['Guillermo Ochoa', 'Luis Malagón', 'César Montes', 'Johan Vásquez', 'Jorge Sánchez', 'Gerardo Arteaga', 'Edson Álvarez', 'Luis Chávez', 'Erick Sánchez', 'Luis Romo', 'Orbelín Pineda', 'Uriel Antuna', 'Roberto Alvarado', 'Chucky Lozano', 'Julián Quiñones', 'Santiago Giménez', 'Henry Martín', 'Raúl Jiménez'],
  CAN: ['Maxime Crépeau', 'Dayne St. Clair', 'Alphonso Davies', 'Alistair Johnston', 'Moïse Bombito', 'Derek Cornelius', 'Kamal Miller', 'Stephen Eustáquio', 'Ismaël Koné', 'Jonathan Osorio', 'Samuel Piette', 'Ali Ahmed', 'Tajon Buchanan', 'Jacob Shaffelburg', 'Liam Millar', 'Jonathan David', 'Cyle Larin', 'Ike Ugbo'],
  FRA: ['Mike Maignan', 'Alphonse Areola', 'William Saliba', 'Dayot Upamecano', 'Ibrahima Konaté', 'Theo Hernández', 'Jules Koundé', 'N\'Golo Kanté', 'Aurélien Tchouaméni', 'Eduardo Camavinga', 'Adrien Rabiot', 'Antoine Griezmann', 'Kylian Mbappé', 'Ousmane Dembélé', 'Marcus Thuram', 'Randal Kolo Muani', 'Bradley Barcola', 'Kingsley Coman'],
  ENG: ['Jordan Pickford', 'Aaron Ramsdale', 'John Stones', 'Marc Guéhi', 'Kyle Walker', 'Luke Shaw', 'Trent Alexander-Arnold', 'Declan Rice', 'Jude Bellingham', 'Phil Foden', 'Bukayo Saka', 'Cole Palmer', 'Conor Gallagher', 'Kobbie Mainoo', 'Harry Kane', 'Ollie Watkins', 'Ivan Toney', 'Anthony Gordon'],
  ESP: ['Unai Simón', 'David Raya', 'Aymeric Laporte', 'Robin Le Normand', 'Dani Carvajal', 'Marc Cucurella', 'Alejandro Grimaldo', 'Rodri', 'Pedri', 'Fabián Ruiz', 'Mikel Merino', 'Dani Olmo', 'Lamine Yamal', 'Nico Williams', 'Ferran Torres', 'Álvaro Morata', 'Mikel Oyarzabal', 'Joselu'],
  GER: ['Manuel Neuer', 'Marc-André ter Stegen', 'Antonio Rüdiger', 'Jonathan Tah', 'Joshua Kimmich', 'Maximilian Mittelstädt', 'Nico Schlotterbeck', 'Toni Kroos', 'Robert Andrich', 'İlkay Gündoğan', 'Jamal Musiala', 'Florian Wirtz', 'Leroy Sané', 'Kai Havertz', 'Niclas Füllkrug', 'Thomas Müller', 'Deniz Undav', 'Maximilian Beier'],
  POR: ['Diogo Costa', 'Rui Patrício', 'Rúben Dias', 'Pepe', 'João Cancelo', 'Nuno Mendes', 'Diogo Dalot', 'João Palhinha', 'Vitinha', 'Bruno Fernandes', 'Bernardo Silva', 'Rúben Neves', 'João Neves', 'Cristiano Ronaldo', 'Rafael Leão', 'Diogo Jota', 'Gonçalo Ramos', 'João Félix'],
  ITA: ['Gianluigi Donnarumma', 'Guglielmo Vicario', 'Alessandro Bastoni', 'Riccardo Calafiori', 'Giovanni Di Lorenzo', 'Federico Dimarco', 'Gianluca Mancini', 'Nicolò Barella', 'Jorginho', 'Davide Frattesi', 'Lorenzo Pellegrini', 'Bryan Cristante', 'Federico Chiesa', 'Gianluca Scamacca', 'Mateo Retegui', 'Mattia Zaccagni', 'Giacomo Raspadori', 'Stephan El Shaarawy'],
  NED: ['Bart Verbruggen', 'Mark Flekken', 'Virgil van Dijk', 'Nathan Aké', 'Stefan de Vrij', 'Denzel Dumfries', 'Micky van de Ven', 'Jerdy Schouten', 'Tijjani Reijnders', 'Xavi Simons', 'Joey Veerman', 'Ryan Gravenberch', 'Cody Gakpo', 'Memphis Depay', 'Donyell Malen', 'Wout Weghorst', 'Steven Bergwijn', 'Jeremie Frimpong'],
  URU: ['Sergio Rochet', 'Santiago Mele', 'Ronald Araújo', 'José María Giménez', 'Mathías Olivera', 'Sebastián Cáceres', 'Nahitan Nández', 'Matías Viña', 'Federico Valverde', 'Manuel Ugarte', 'Rodrigo Bentancur', 'Nicolás de la Cruz', 'Giorgian de Arrascaeta', 'Maximiliano Araújo', 'Facundo Pellistri', 'Darwin Núñez', 'Luis Suárez', 'Cristian Olivera'],
  COL: ['Camilo Vargas', 'David Ospina', 'Davinson Sánchez', 'Yerry Mina', 'Jhon Lucumí', 'Daniel Muñoz', 'Johan Mojica', 'Jefferson Lerma', 'Richard Ríos', 'Mateus Uribe', 'Kevin Castaño', 'Jhon Arias', 'James Rodríguez', 'Juan Fernando Quintero', 'Luis Díaz', 'Jhon Córdoba', 'Rafael Santos Borré', 'Miguel Borja'],
  BEL: ['Koen Casteels', 'Matz Sels', 'Jan Vertonghen', 'Wout Faes', 'Arthur Theate', 'Timothy Castagne', 'Zeno Debast', 'Amadou Onana', 'Youri Tielemans', 'Kevin De Bruyne', 'Orel Mangala', 'Leandro Trossard', 'Jérémy Doku', 'Johan Bakayoko', 'Yannick Carrasco', 'Romelu Lukaku', 'Loïs Openda', 'Charles De Ketelaere'],
  CRO: ['Dominik Livaković', 'Ivica Ivušić', 'Joško Gvardiol', 'Josip Šutalo', 'Domagoj Vida', 'Josip Stanišić', 'Borna Sosa', 'Luka Modrić', 'Mateo Kovačić', 'Marcelo Brozović', 'Lovro Majer', 'Mario Pašalić', 'Luka Sučić', 'Andrej Kramarić', 'Bruno Petković', 'Ante Budimir', 'Ivan Perišić', 'Marko Pjaca']
};

const genericNames = {
  CRC: ['Keylor Navas', 'Francisco Calvo', 'Juan Pablo Vargas', 'Kendall Waston', 'Bryan Oviedo', 'Keysher Fuller', 'Celso Borges', 'Yeltsin Tejeda', 'Brandon Aguilera', 'Jewison Bennette', 'Joel Campbell', 'Anthony Contreras', 'Johan Venegas', 'Ariel Lassiter', 'Carlos Mora', 'Warren Madrigal', 'Alonso Martínez', 'Kevin Chamorro'],
  MAR: ['Yassine Bounou', 'Munir Mohamedi', 'Achraf Hakimi', 'Romain Saïss', 'Nayef Aguerd', 'Noussair Mazraoui', 'Yahya Attiat-Allah', 'Sofyan Amrabat', 'Azzedine Ounahi', 'Selim Amallah', 'Bilal El Khannous', 'Hakim Ziyech', 'Youssef En-Nesyri', 'Ayoub El Kaabi', 'Amine Adli', 'Abde Ezzalzouli', 'Ismael Saibari', 'Brahim Díaz'],
  JPN: ['Zion Suzuki', 'Daniel Schmidt', 'Takehiro Tomiyasu', 'Ko Itakura', 'Shogo Taniguchi', 'Hiroki Ito', 'Yukinari Sugawara', 'Wataru Endo', 'Hidemasa Morita', 'Ao Tanaka', 'Takefusa Kubo', 'Junya Ito', 'Kaoru Mitoma', 'Takumi Minamino', 'Daichi Kamada', 'Ayase Ueda', 'Takuma Asano', 'Daizen Maeda'],
  POL: ['Wojciech Szczęsny', 'Łukasz Skorupski', 'Jan Bednarek', 'Jakub Kiwior', 'Paweł Dawidowicz', 'Matty Cash', 'Nicola Zalewski', 'Piotr Zieliński', 'Sebastian Szymański', 'Przemysław Frankowski', 'Jakub Moder', 'Karol Linetty', 'Kamil Grosicki', 'Robert Lewandowski', 'Arkadiusz Milik', 'Krzysztof Piątek', 'Karol Świderski', 'Adam Buksa'],
  KOR: ['Jo Hyeon-woo', 'Song Bum-keun', 'Kim Min-jae', 'Kim Young-gwon', 'Jung Seung-hyun', 'Seol Young-woo', 'Kim Jin-su', 'Hwang In-beom', 'Lee Kang-in', 'Lee Jae-sung', 'Hong Hyun-seok', 'Park Yong-woo', 'Son Heung-min', 'Hwang Hee-chan', 'Jeong Woo-yeong', 'Cho Gue-sung', 'Oh Hyeon-gyu', 'Joo Min-kyu'],
  DEN: ['Kasper Schmeichel', 'Mads Hermansen', 'Andreas Christensen', 'Joachim Andersen', 'Jannik Vestergaard', 'Simon Kjær', 'Joakim Mæhle', 'Victor Kristiansen', 'Pierre-Emile Højbjerg', 'Christian Eriksen', 'Thomas Delaney', 'Mathias Jensen', 'Christian Nørgaard', 'Rasmus Højlund', 'Jonas Wind', 'Yussuf Poulsen', 'Mikkel Damsgaard', 'Andreas Skov Olsen'],
  ALG: ['Anthony Mandrea', 'Raïs Mbolhi', 'Aïssa Mandi', 'Ramy Bensebaini', 'Rayan Aït-Nouri', 'Youcef Atal', 'Ahmed Touba', 'Ismaël Bennacer', 'Ramiz Zerrouki', 'Houssem Aouar', 'Nabil Bentaleb', 'Sofiane Feghouli', 'Riyad Mahrez', 'Islam Slimani', 'Baghdad Bounedjah', 'Amine Gouiri', 'Saïd Benrahma', 'Youcef Belaïli'],
  KSA: ['Mohammed Al-Owais', 'Nawaf Al-Aqidi', 'Ali Al-Bulaihi', 'Hassan Tambakti', 'Saud Abdulhamid', 'Yasser Al-Shahrani', 'Sultan Al-Ghannam', 'Mohamed Kanno', 'Abdulellah Al-Malki', 'Abdullah Al-Khaibari', 'Salem Al-Dawsari', 'Salman Al-Faraj', 'Sami Al-Najei', 'Firas Al-Buraikan', 'Saleh Al-Shehri', 'Abdulrahman Ghareeb', 'Ayman Yahya', 'Abdullah Radif'],
  SWE: ['Robin Olsen', 'Viktor Johansson', 'Victor Lindelöf', 'Isak Hien', 'Carl Starfelt', 'Ludwig Augustinsson', 'Emil Krafth', 'Dejan Kulusevski', 'Jesper Karlström', 'Mattias Svanberg', 'Jens Cajuste', 'Emil Forsberg', 'Anthony Elanga', 'Alexander Isak', 'Viktor Gyökeres', 'Jesper Karlsson', 'Hugo Larsson', 'Samuel Gustafson'],
  EGY: ['Mohamed El Shenawy', 'Gabaski', 'Mohamed Abdelmonem', 'Ahmed Hegazi', 'Ali Gabr', 'Omar Kamal', 'Mohamed Hany', 'Mohamed Elneny', 'Marwan Attia', 'Hamdi Fathi', 'Emam Ashour', 'Zizo', 'Mohamed Salah', 'Trezeguet', 'Omar Marmoush', 'Mostafa Mohamed', 'Mahmoud Kahraba', 'Koka'],
  IRN: ['Alireza Beiranvand', 'Hossein Hosseini', 'Hossein Kanaanizadegan', 'Shojae Khalilzadeh', 'Majid Hosseini', 'Ramin Rezaeian', 'Ehsan Hajsafi', 'Saeid Ezatolahi', 'Saman Ghoddos', 'Alireza Jahanbakhsh', 'Omid Ebrahimi', 'Ahmad Nourollahi', 'Mehdi Taremi', 'Sardar Azmoun', 'Mehdi Ghayedi', 'Mohammad Mohebi', 'Karim Ansarifard', 'Ali Gholizadeh']
};

export const getStickersForTeam = (teamCode) => {
  const team = teams[teamCode];

  // Caso especial: Página de Campeões Históricos (FIFA Museum) - 11 Figurinhas
  if (teamCode === 'HIST') {
    const historicalWinners = [
      'Uruguai 1930', 'Itália 1934', 'Alemanha O. 1954', 'Brasil 1958', 'Inglaterra 1966',
      'Brasil 1970', 'Argentina 1978', 'Itália 1982', 'França 1998', 'Espanha 2010', 'Argentina 2022'
    ];
    return historicalWinners.map((winner, index) => ({
      number: `HC${index + 1}`,
      name: winner,
      type: 'special',
      role: 'Campeão Histórico'
    }));
  }

  // Caso especial: Página Coca-Cola - 12 Figurinhas
  if (teamCode === 'COCA') {
    const cocaColaPlayers = [
      'Emiliano Martínez (ARG)', 'Kylian Mbappé (FRA)', 'Jude Bellingham (ENG)', 'Vini Jr (BRA)',
      'Christian Pulisic (USA)', 'Alphonso Davies (CAN)', 'Jamal Musiala (GER)', 'Lamine Yamal (ESP)',
      'Santiago Giménez (MEX)', 'Heung-Min Son (KOR)', 'Achraf Hakimi (MAR)', 'Rafael Leão (POR)'
    ];
    return cocaColaPlayers.map((player, index) => ({
      number: `C${index + 1}`,
      name: player,
      type: 'special',
      role: 'Team Believers'
    }));
  }

  const stickers = [
    { number: 1, name: `Escudo 2026 - ${team.name}`, type: 'special', role: 'Escudo Oficial' },
    { number: 2, name: `Estádio / Team Photo - ${team.name}`, type: 'special', role: 'Especial' }
  ];

  let playerList = officialPlayers[teamCode] || genericNames[teamCode];

  // Fallback for teams not fully mapped yet (using real plausible names generator logic)
  if (!playerList) {
    playerList = Array.from({ length: 18 }, (_, i) => `Jogador Oficial ${i + 1} (${teamCode})`);
  }

  const roles = [
    'Goleiro', 'Goleiro', 
    'Defensor', 'Defensor', 'Defensor', 'Defensor', 'Defensor', 
    'Meio-campista', 'Meio-campista', 'Meio-campista', 'Meio-campista', 'Meio-campista', 
    'Atacante', 'Atacante', 'Atacante', 'Atacante', 'Atacante', 'Atacante'
  ];

  for (let i = 0; i < 18; i++) {
    stickers.push({
      number: i + 3,
      name: playerList[i],
      type: 'player',
      role: roles[i] || 'Jogador'
    });
  }

  return stickers;
};

// 48 seleções * 20 figurinhas = 960 figurinhas oficiais
// + 20 figurinhas especiais iniciais (Fifa, Taça, Mascote, etc) = 980 total
export const TOTAL_STICKERS = 980;
