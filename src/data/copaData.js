// Copa do Mundo 2026 - Banco de Dados de Figurinhas Oficial Panini (48 Seleções)

export const groups = {
  A: { name: 'Grupo A', teams: ['MEX', 'RSA', 'KOR', 'CZE'] },
  B: { name: 'Grupo B', teams: ['CAN', 'BIH', 'QAT', 'SUI'] },
  C: { name: 'Grupo C', teams: ['BRA', 'MAR', 'HAI', 'SCO'] },
  D: { name: 'Grupo D', teams: ['USA', 'PAR', 'AUS', 'TUR'] },
  E: { name: 'Grupo E', teams: ['GER', 'CUW', 'CIV', 'ECU'] },
  F: { name: 'Grupo F', teams: ['NED', 'JPN', 'SWE', 'TUN'] },
  G: { name: 'Grupo G', teams: ['BEL', 'EGY', 'IRN', 'NZL'] },
  H: { name: 'Grupo H', teams: ['ESP', 'CPV', 'KSA', 'URU'] },
  I: { name: 'Grupo I', teams: ['FRA', 'SEN', 'IRQ', 'NOR'] },
  J: { name: 'Grupo J', teams: ['ARG', 'ALG', 'AUT', 'JOR'] },
  K: { name: 'Grupo K', teams: ['POR', 'COD', 'UZB', 'COL'] },
  L: { name: 'Grupo L', teams: ['ENG', 'CRO', 'GHA', 'PAN'] },
  X: { name: 'Páginas Especiais', teams: ['HIST', 'COCA'] }
};

export const teams = {
  MEX: { name: 'México', flag: '🇲🇽', color: '#006847' },
  RSA: { name: 'África do Sul', flag: '🇿🇦', color: '#007749' },
  KOR: { name: 'Coreia do Sul', flag: '🇰🇷', color: '#C60C30' },
  CZE: { name: 'Tchéquia', flag: '🇨🇿', color: '#11457E' },

  CAN: { name: 'Canadá', flag: '🇨🇦', color: '#FF0000' },
  BIH: { name: 'Bósnia e Herzegovina', flag: '🇧🇦', color: '#002395' },
  QAT: { name: 'Catar', flag: '🇶🇦', color: '#8A1538' },
  SUI: { name: 'Suíça', flag: '🇨🇭', color: '#FF0000' },

  BRA: { name: 'Brasil', flag: '🇧🇷', color: '#009739' },
  MAR: { name: 'Marrocos', flag: '🇲🇦', color: '#C1272D' },
  HAI: { name: 'Haiti', flag: '🇭🇹', color: '#00209F' },
  SCO: { name: 'Escócia', flag: '🏴󠁧󠁢󠁳󠁣󠁴󠁿', color: '#0065BF' },

  USA: { name: 'Estados Unidos', flag: '🇺🇸', color: '#B31942' },
  PAR: { name: 'Paraguai', flag: '🇵🇾', color: '#D52B1E' },
  AUS: { name: 'Austrália', flag: '🇦🇺', color: '#00008B' },
  TUR: { name: 'Turquia', flag: '🇹🇷', color: '#E30A17' },

  GER: { name: 'Alemanha', flag: '🇩🇪', color: '#DD0000' },
  CUW: { name: 'Curaçao', flag: '🇨🇼', color: '#002B7F' },
  CIV: { name: 'Costa do Marfim', flag: '🇨🇮', color: '#F77F00' },
  ECU: { name: 'Equador', flag: '🇪🇨', color: '#FFDD00' },

  NED: { name: 'Holanda', flag: '🇳🇱', color: '#F36C21' },
  JPN: { name: 'Japão', flag: '🇯🇵', color: '#000555' },
  SWE: { name: 'Suécia', flag: '🇸🇪', color: '#FECC00' },
  TUN: { name: 'Tunísia', flag: '🇹🇳', color: '#E70013' },

  BEL: { name: 'Bélgica', flag: '🇧🇪', color: '#E30613' },
  EGY: { name: 'Egito', flag: '🇪🇬', color: '#CE1126' },
  IRN: { name: 'Irã', flag: '🇮🇷', color: '#239F40' },
  NZL: { name: 'Nova Zelândia', flag: '🇳🇿', color: '#C0C0C0' },

  ESP: { name: 'Espanha', flag: '🇪🇸', color: '#AA151B' },
  CPV: { name: 'Cabo Verde', flag: '🇨🇻', color: '#003893' },
  KSA: { name: 'Arábia Saudita', flag: '🇸🇦', color: '#006C35' },
  URU: { name: 'Uruguai', flag: '🇺🇾', color: '#0038A8' },

  FRA: { name: 'França', flag: '🇫🇷', color: '#002395' },
  SEN: { name: 'Senegal', flag: '🇸🇳', color: '#00853F' },
  IRQ: { name: 'Iraque', flag: '🇮🇶', color: '#CE1126' },
  NOR: { name: 'Noruega', flag: '🇳🇴', color: '#BA0C2F' },

  ARG: { name: 'Argentina', flag: '🇦🇷', color: '#43A1D5' },
  ALG: { name: 'Argélia', flag: '🇩🇿', color: '#006233' },
  AUT: { name: 'Áustria', flag: '🇦🇹', color: '#ED2939' },
  JOR: { name: 'Jordânia', flag: '🇯🇴', color: '#CE1126' },

  POR: { name: 'Portugal', flag: '🇵🇹', color: '#FF0000' },
  COD: { name: 'RD Congo', flag: '🇨🇩', color: '#007EE5' },
  UZB: { name: 'Uzbequistão', flag: '🇺🇿', color: '#0099B5' },
  COL: { name: 'Colômbia', flag: '🇨🇴', color: '#FCD116' },

  ENG: { name: 'Inglaterra', flag: '🏴󠁧󠁢󠁥󠁮󠁧󠁿', color: '#CF0820' },
  CRO: { name: 'Croácia', flag: '🇭🇷', color: '#FF0000' },
  GHA: { name: 'Gana', flag: '🇬🇭', color: '#006B3F' },
  PAN: { name: 'Panamá', flag: '🇵🇦', color: '#C8102E' },

  HIST: { name: 'Campeões Históricos (FIFA Museum)', flag: '🏛️', color: '#D4AF37' },
  COCA: { name: 'Team Believers (Coca-Cola)', flag: '🥤', color: '#F40009' }
};

// Base oficial de jogadores (18 por seleção)
const officialPlayers = {
  MEX: ['Luis Malagón', 'Johan Vásquez', 'Jorge Sánchez', 'César Montes', 'Jesús Gallardo', 'Israel Reyes', 'Diego Lainez', 'Carlos Rodríguez', 'Edson Álvarez', 'Orbelín Pineda', 'Marcel Ruiz', 'Érick Sánchez', 'Hirving Lozano', 'Santiago Giménez', 'Raúl Jiménez', 'Alexis Vega', 'Roberto Alvarado', 'César Huerta'],
  RSA: ['Ronwen Williams', 'Sipho Chaine', 'Aubrey Modiba', 'Samukele Kabini', 'Mbekezeli Mbokazi', 'Khulumani Ndamane', 'Siyabonga Ngezana', 'Khuliso Mudau', 'Nkosinathi Sibisi', 'Teboho Mokoena', 'Thalente Mbatha', 'Bathuisi Aubaas', 'Yaya Sithole', 'Sipho Mbule', 'Lyle Foster', 'Ioraam Rayners', 'Mohau Nkota', 'Oswin Appolis'],
  KOR: ['Hyeon-woo Jo', 'Seung-Gyu Kim', 'Min-jae Kim', 'Yu-min Cho', 'Young-woo Seol', 'Han-beom Lee', 'Tae-seok Lee', 'Myung-jae Lee', 'Jae-sung Lee', 'In-beom Hwang', 'Kang-in Lee', 'Seung-ho Paik', 'Jens Castrop', 'Dong-gyeong Lee', 'Gue-sung Cho', 'Heung-min Son', 'Hee-chan Hwang', 'Hyeon-Gyu Oh'],
  CZE: ['Matěj Kovář', 'Jindřich Staněk', 'Ladislav Krejčí', 'Vladimír Coufal', 'Jaroslav Zelený', 'Tomáš Holeš', 'David Zima', 'Michal Sadílek', 'Lukáš Provod', 'Lukáš Červ', 'Tomáš Souček', 'Pavel Šulc', 'Matěj Vydra', 'Vasil Kušej', 'Tomáš Chorý', 'Václav Černý', 'Adam Hložek', 'Patrik Schick'],
  CAN: ['Dayne St. Clair', 'Alphonso Davies', 'Alistair Johnston', 'Samuel Adekugbe', 'Richie Laryea', 'Derek Cornelius', 'Moïse Bombito', 'Kamal Miller', 'Stephen Eustáquio', 'Ismaël Koné', 'Jonathan Osorio', 'Jacob Shaffelburg', 'Mathieu Choinière', 'Niko Sigur', 'Tajon Buchanan', 'Liam Millar', 'Cyle Larin', 'Jonathan David'],
  BIH: ['Nikola Vasilj', 'Amar Dedić', 'Sead Kolašinac', 'Tarik Muharemović', 'Nihad Mujakić', 'Nikola Katić', 'Amir Hadžiahmetović', 'Benjamin Tahirović', 'Armin Gigović', 'Ivan Šunjić', 'Ivan Bašić', 'Dženis Burnić', 'Esmir Bajraktarević', 'Amar Memić', 'Ermedin Demirović', 'Edin Džeko', 'Samed Baždar', 'Haris Tabaković'],
  QAT: ['Meshaal Barsham', 'Sultan Albrake', 'Lucas Mendes', 'Homam Ahmed', 'Boualem Khoukhi', 'Pedro Miguel', 'Tarek Salman', 'Mohamed Al-Mannai', 'Karim Boudiaf', 'Assim Madibo', 'Ahmed Fatehi', 'Mohammed Waad', 'Abdulaziz Hatem', 'Hassan Al-Haydos', 'Edmilson Junior', 'Akram Hassan Afif', 'Ahmed Al Ganehi', 'Almoez Ali'],
  SUI: ['Gregor Kobel', 'Yvon Mvogo', 'Manuel Akanji', 'Ricardo Rodriguez', 'Nico Elvedi', 'Aurèle Amenda', 'Silvan Widmer', 'Granit Xhaka', 'Denis Zakaria', 'Remo Freuler', 'Fabian Rieder', 'Ardon Jashari', 'Johan Manzambi', 'Michel Aebischer', 'Breel Embolo', 'Ruben Vargas', 'Dan Ndoye', 'Zeki Amdouni'],
  BRA: ['Alisson', 'Bento', 'Marquinhos', 'Éder Militão', 'Gabriel Magalhães', 'Danilo', 'Wesley', 'Lucas Paquetá', 'Casemiro', 'Bruno Guimarães', 'Luiz Henrique', 'Vinícius Júnior', 'Rodrygo', 'João Pedro', 'Matheus Cunha', 'Gabriel Martinelli', 'Raphinha', 'Estêvão'],
  MAR: ['Yassine Bounou', 'Munir El Kajoui', 'Achraf Hakimi', 'Noussair Mazraoui', 'Nayef Aguerd', 'Romain Saïss', 'Jawad El Yamiq', 'Adam Masina', 'Sofyan Amrabat', 'Azzedine Ounahi', 'Eliesse Ben Seghir', 'Bilal El Khannouss', 'Ismael Saibari', 'Youssef En-Nesyri', 'Abde Ezzalzouli', 'Soufiane Rahimi', 'Brahim Díaz', 'Ayoub El Kaabi'],
  HAI: ['Johny Placide', 'Carlens Arcus', 'Martin Expérience', 'Jean-Kevin Duverne', 'Ricardo Adé', 'Duke Lacroix', 'Garven Metusala', 'Hannes Delcroix', 'Leverton Pierre', 'Danley Jean Jacques', 'Jean-Ricner Bellegarde', 'Christopher Attys', 'Derrick Etienne Jr.', 'Josué Casimir', 'Ruben Providence', 'Duckens Nazon', 'Louicius Deedson', 'Frantzdy Pierrot'],
  SCO: ['Angus Gunn', 'Jack Hendry', 'Kieran Tierney', 'Aaron Hickey', 'Andrew Robertson', 'Scott McKenna', 'John Souttar', 'Anthony Ralston', 'Grant Hanley', 'Scott McTominay', 'Billy Gilmour', 'Lewis Ferguson', 'Ryan Christie', 'Kenny McLean', 'John McGinn', 'Lyndon Dykes', 'Che Adams', 'Ben Gannon-Doak'],
  USA: ['Math Freese', 'Chris Richards', 'Tim Ream', 'Mark McKenzie', 'Alex Freeman', 'Antonee Robinson', 'Tyler Adams', 'Tanner Tessmann', 'Weston McKenny', 'Christian Roldan', 'Timothy Weah', 'Diego Luna', 'Malim Tillman', 'Christian Pulisic', 'Brenden Aaronson', 'Ricardo Pepi', 'Haji Wright', 'Folarin Balogun'],
  PAR: ['Roberto Fernández', 'Orlando Gill', 'Gustavo Gómez', 'Fabián Balbuena', 'Juan José Cáceres', 'Omar Alderete', 'Junior Alonso', 'Mathías Villasanti', 'Diego Gómez', 'Damián Bobadilla', 'Andrés Cubas', 'Matías Galarza Fonda', 'Julio Enciso', 'Miguel Almirón', 'Ramón Sosa', 'Antonio Sanabria', 'Alejandro Romero Gamarra', 'Mathías Espinoza'],
  AUS: ['Mathew Ryan', 'Joe Gauci', 'Harry Souttar', 'Alessandro Circati', 'Jordan Bos', 'Aziz Behich', 'Cameron Burgess', 'Lewis Miller', 'Milos Degenek', 'Jackson Irvine', 'Riley McGree', 'Aiden O’Neill', 'Connor Metcalfe', 'Patrick Yazbek', 'Craig Goodwin', 'Kusini Yengi', 'Nestory Irankunda', 'Mohamed Touré'],
  TUR: ['Ugurcan Cakir', 'Mert Muldur', 'Zeki Celik', 'Abdulkerim Bardakci', 'Caglar Soyunku', 'Merih Demiral', 'Ferdi Kadioglu', 'Kaan Ayhan', 'Ismail Yuksek', 'Hakan Calhanoglu', 'Orkun Kokcu', 'Arda Güler', 'Irfan Can Kahvecu', 'Yunus Akgun', 'Can Uzun', 'Baris Alper Yilmaz', 'Kerem Akturkoglu', 'Kenan Yildiz'],
  GER: ['Marc-André ter Stegen', 'Jonathan Tah', 'David Raum', 'Nico Schlotterbeck', 'Antonio Rüdiger', 'Waldemar Anton', 'Ridle Baku', 'Maximilian Mittelstädt', 'Joshua Kimmich', 'Florian Wirtz', 'Felix Nmecha', 'Leon Goretzka', 'Jamal Musiala', 'Serge Gnabry', 'Kai Havertz', 'Leroy Sané', 'Karim Adeyemi', 'Nick Woltemade'],
  CUW: ['Eloy Room', 'Armando Obispo', 'Sherel Floranus', 'Jurien Gaari', 'Joshua Brenet', 'Roshon Van Eijma', 'Shurandy Sambo', 'Livano Comenencia', 'Godfried Roemeratoe', 'Juninho Bacuna', 'Leandro Bacuna', 'Tahith Chong', 'Kenji Gorré', 'Jearl Margaritha', 'Jurgen Locadia', 'Jeremy Antonisse', 'Gervane Kastaneer', 'Sontje Hansen'],
  CIV: ['Yahia Fofana', 'Ghislain Konan', 'Wilfried Singo', 'Odilon Kossounou', 'Evan Ndicka', 'Willy Boly', 'Emmanuel Agbadou', 'Ousmane Diomande', 'Franck Kessié', 'Seko Fofana', 'Ibrahim Sangaré', 'Jean-Philippe Gbamin', 'Amad Diallo', 'Sébastien Haller', 'Simon Adingra', 'Yan Diomande', 'Evann Guessand', 'Oumar Diakité'],
  ECU: ['Hernán Galíndez', 'Gonzalo Valle', 'Piero Hincapié', 'Pervis Estupiñán', 'Willian Pacho', 'Ángelo Preciado', 'Joel Ordóñez', 'Moisés Caicedo', 'Alan Franco', 'Kendry Páez', 'Pedro Vite', 'John Veboah', 'Leonardo Campana', 'Gonzalo Plata', 'Nilson Angulo', 'Alan Minda', 'Kevin Rodríguez', 'Enner Valencia'],
  NED: ['Bart Verbruggen', 'Virgil van Dijk', 'Micky van de Ven', 'Jurriën Timber', 'Denzel Dumfries', 'Nathan Aké', 'Jeremie Frimpong', 'Jan Paul van Hecke', 'Tijjani Reijnders', 'Ryan Gravenberch', 'Teun Koopmeiners', 'Frenkie de Jong', 'Xavi Simons', 'Justin Kluivert', 'Memphis Depay', 'Donyell Malen', 'Wout Weghorst', 'Cody Gakpo'],
  JPN: ['Zion Suzuki', 'Henry Heroki Mochizuki', 'Ayumu Seko', 'Junnosuke Suzuki', 'Shogo Taniguchi', 'Tsuyoshi Watanabe', 'Kaishu Sano', 'Yuki Soma', 'Ao Tanaka', 'Daichi Kamada', 'Takefusa Kubo', 'Ritsu Doan', 'Keito Nakamura', 'Takumi Minamino', 'Shuto Machino', 'Junya Ito', 'Koki Ogawa', 'Ayase Ueda'],
  SWE: ['Victor Johansson', 'Isak Hien', 'Gabriel Gudmundsson', 'Emil Holm', 'Victor Nilsson Lindelöf', 'Gustaf Lagerbielke', 'Lucas Bergvall', 'Hugo Larsson', 'Jesper Karlström', 'Yasin Ayari', 'Mattias Svanberg', 'Daniel Svensson', 'Ken Sema', 'Roony Bardghji', 'Dejan Kulusevski', 'Anthony Elanga', 'Alexander Isak', 'Viktor Gyökeres'],
  TUN: ['Bechir Ben Said', 'Aymen Dahmen', 'Van Valery', 'Montassar Talbi', 'Yassine Meriah', 'Ali Abdi', 'Dylan Bronn', 'Ellyes Skhiri', 'Aissa Laidouni', 'Ferjani Sassi', 'Mohamed Ali Ben Romdhane', 'Hannibal Mejbri', 'Elias Achouri', 'Elias Saad', 'Hazem Mastouri', 'Ismael Gharbi', 'Sayfallah Ltaief', 'Naim Sliti'],
  BEL: ['Thibaut Courtois', 'Arthur Theate', 'Timothy Castagne', 'Zeno Debast', 'Brandon Mechele', 'Maxim De Cuyper', 'Thomas Meunier', 'Youri Tielemans', 'Amadou Onana', 'Nicolas Raskin', 'Alexis Saelemaekers', 'Hans Vanaken', 'Kevin De Bruyne', 'Jérémy Doku', 'Charles De Ketelaere', 'Leandro Trossard', 'Loïs Openda', 'Romelu Lukaku'],
  EGY: ['Mohamed El Shenawy', 'Mohamed Hany', 'Mohamed Hamdy', 'Yasser Ibrahim', 'Khaled Sobhi', 'Ramy Rabia', 'Hossam Abdelmaguid', 'Ahmed Fatouh', 'Marwan Attia', 'Zizo', 'Hamdy Fathy', 'Mohamed Lasheen', 'Emam Ashour', 'Osama Faisal', 'Mohamed Salah', 'Mostafa Mohamed', 'Trezeguet', 'Omar Marmoush'],
  IRN: ['Alireza Beiranvand', 'Morteza Pouraliganji', 'Ehsan Hajsafi', 'Milad Mohammadi', 'Shoja Khalilzadeh', 'Ramin Rezaeian', 'Hossein Kanaani', 'Sadegh Moharrami', 'Saleh Hardani', 'Saeed Ezatolahi', 'Saman Ghoddos', 'Omid Noorafkan', 'Roozbeh Cheshmi', 'Mohammad Mohebi', 'Sardar Azmoun', 'Mehdi Taremi', 'Alireza Jahanbakhsh', 'Ali Gholizadeh'],
  NZL: ['Max Crocombe-Payne', 'Alex Paulsen', 'Michael Boxall', 'Liberato Cacace', 'Tim Payne', 'Tyler Bindon', 'Francis de Vries', 'Finn Surman', 'Joe Bell', 'Sarpreet Singh', 'Ryan Thomas', 'Matthew Garbett', 'Marko Stamenić', 'Ben Old', 'Chris Wood', 'Elijah Just', 'Callum McCowatt', 'Kosta Barbarouses'],
  ESP: ['Unai Simón', 'Robin Le Normand', 'Aymeric Laporte', 'Dean Huijsen', 'Pedro Porro', 'Dani Carvajal', 'Marc Cucurella', 'Martín Zubimendi', 'Rodri', 'Pedri', 'Fabián Ruiz', 'Mikel Merino', 'Lamine Yamal', 'Dani Olmo', 'Nico Williams', 'Ferran Torres', 'Álvaro Morata', 'Mikel Oyarzabal'],
  CPV: ['Vozinha', 'Logan Costa', 'Pico', 'Diney', 'Steven Moreira', 'Wagner Pina', 'João Paulo', 'Yannick Semedo', 'Kevin Pina', 'Patrick Andrade', 'Jamiro Monteiro', 'Deroy Duarte', 'Garry Rodrigues', 'Jovane Cabral', 'Ryan Mendes', 'Dailon Livramento', 'Willy Semedo', 'Bebé'],
  KSA: ['Nawaf Alaqidi', 'Abdulrahman Al-Sanbi', 'Saud Abdulhamid', 'Nawaf Boushal', 'Jihad Thakri', 'Moteb Al-Harbi', 'Hassan Altambakti', 'Musab Aljuwayr', 'Ziyad Aljohani', 'Abdullah Alkhaibari', 'Nasser Aldawsari', 'Saleh Abu Alshamat', 'Marwan Alsahafi', 'Salem Aldawsari', 'Abdulrahman Al-Aboud', 'Feras Albrikan', 'Saleh Alshehri', 'Abdullah Al-Hamdan'],
  URU: ['Sergio Rochet', 'Santiago Mele', 'Ronald Araujo', 'José María Giménez', 'Sebastian Caceres', 'Mathias Olivera', 'Guillermo Varela', 'Nahitan Nandez', 'Federico Valverde', 'Giorgian De Arrascaeta', 'Rodrigo Bentancur', 'Manuel Ugarte', 'Nicolás de la Cruz', 'Maxi Araujo', 'Darwin Núñez', 'Federico Viñas', 'Rodrigo Aguirre', 'Facundo Pellistri'],
  FRA: ['Mike Maignan', 'Theo Hernández', 'William Saliba', 'Jules Koundé', 'Ibrahima Konaté', 'Dayot Upamecano', 'Lucas Digne', 'Aurélien Tchouaméni', 'Eduardo Camavinga', 'Manu Koné', 'Adrien Rabiot', 'Michael Olise', 'Ousmane Dembélé', 'Bradley Barcola', 'Désiré Doué', 'Kingsley Coman', 'Hugo Ekitike', 'Kylian Mbappé'],
  SEN: ['Eduardo Mendy', 'Yehvann Diouf', 'Moussa Niakhaté', 'Abdoulaye Seck', 'Ismail Jakobs', 'El Hadji Malick Diouf', 'Kalidou Koulibaly', 'Idrissa Gana Gueye', 'Pape Matar Sarr', 'Pape Gueye', 'Habib Diarra', 'Lamine Camara', 'Sadio Mane', 'Ismaïla Sarr', 'Boulaye Dia', 'Iliman Ndiaye', 'Nicolas Jackson', 'Krepin Diatta'],
  IRQ: ['Jalal Hassan', 'Rebin Sulaka', 'Hussein Ali', 'Akam Hashem', 'Merchas Doski', 'Zaid Tahseen', 'Manaf Younis', 'Zidane Iqbal', 'Amir Al-Ammari', 'Ibrahim Bayesh', 'Ali Jasim', 'Youssef Amyn', 'Aimar Sher', 'Marko Farji', 'Osama Rashid', 'Ali Al-Hamadi', 'Aymen Hussein', 'Mohanad Ali'],
  NOR: ['Ørjan Nyland', 'Julian Ryerson', 'Leo Østigård', 'Kristoffer Ajer', 'Marcus Holmgren Pedersen', 'David Møller Wolfe', 'Torbjørn Heggem', 'Morten Thorsby', 'Martin Ødegaard', 'Sander Berge', 'Andreas Schjelderup', 'Patrick Berg', 'Erling Haaland', 'Alexander Sørloth', 'Aron Dønnum', 'Jørgen Strand Larsen', 'Antonio Nusa', 'Oscar Bobb'],
  ARG: ['Emiliano Martínez', 'Nahuel Molina', 'Cristian Romero', 'Nicolás Otamendi', 'Nicolás Tagliafico', 'Leonardo Balerdi', 'Enzo Fernández', 'Alexis Mac Allister', 'Rodrigo De Paul', 'Exequiel Palacios', 'Leandro Paredes', 'Nico Paz', 'Franco Mastantuono', 'Nico González', 'Lionel Messi', 'Lautaro Martínez', 'Julián Álvarez', 'Giuliano Simeone'],
  ALG: ['Alexis Guendouz', 'Ramy Bensebaini', 'Youcef Atal', 'Rayan Aït-Nouri', 'Mohamed Amine Tougai', 'Aïssa Mandi', 'Ismael Bennacer', 'Houssem Aouar', 'Hicham Boudaoui', 'Ramiz Zerrouki', 'Nabil Bentaleb', 'Farés Chaibi', 'Riyad Mahrez', 'Said Benrahma', 'Anis Hadj Moussa', 'Amine Gouiri', 'Baghdad Bounedjah', 'Mohammed Amoura'],
  AUT: ['Alexander Schlager', 'Patrick Pentz', 'David Alaba', 'Kevin Danso', 'Philipp Lienhart', 'Stefan Posch', 'Phillipp Mwene', 'Alexander Prass', 'Xaver Schlager', 'Marcel Sabitzer', 'Konrad Laimer', 'Florian Grillitsch', 'Nicolas Seiwald', 'Romano Schmid', 'Patrick Wimmer', 'Christoph Baumgartner', 'Michael Gregoritsch', 'Marko Arnautović'],
  JOR: ['Yazeed Abulaila', 'Ihsan Haddad', 'Mohammad Abu Hashish', 'Yazan Al-Arab', 'Abdallah Nasib', 'Saleem Obaid', 'Mohammad Abualnadi', 'Ibrahim Saadeh', 'Nizar Al-Rashdan', 'Noor Al-Rawabdeh', 'Mohannad Abu Taha', 'Amer Jamous', 'Musa Al-Taamari', 'Yazan Al-Naimat', 'Mahmoud Al-Mardi', 'Ali Olwan', 'Mohammad Abu Zrayq', 'Ibrahim Sabra'],
  POR: ['Diogo Costa', 'Jose Sa', 'Ruben Dias', 'João Cancelo', 'Diogo Dalot', 'Nuno Mendes', 'Gonçalo Inácio', 'Bernardo Silva', 'Bruno Fernandes', 'Ruben Neves', 'Vitinha', 'João Neves', 'Cristiano Ronaldo', 'Francisco Trincão', 'João Felix', 'Gonçalo Ramos', 'Pedro Neto', 'Rafael Leão'],
  COD: ['Lionel Mpasi', 'Aaron Wan-Bissaka', 'Axel Tuanzebe', 'Arthur Masuaku', 'Chancel Mbemba', 'Joris Kayembe', 'Charles Pickel', 'Ngal’ayel Mukau', 'Edo Kayembe', 'Samuel Moutoussamy', 'Noah Sadiki', 'Théo Bongonda', 'Meschack Elia', 'Yoane Wissa', 'Brian Cipenga', 'Fiston Mayele', 'Cédric Bakambu', 'Nathanaël Mbuku'],
  UZB: ['Utkir Yusupov', 'Farrukh Savfiev', 'Sherzod Nasrullaev', 'Umar Eshmurodov', 'Husniddin Aliqulov', 'Rustamjon Ashurmatov', 'Khojiakbar Alijonov', 'Abdukodir Khusanov', 'Odiljon Hamrobekov', 'Otabek Shukurov', 'Jamshid Iskanderov', 'Azizbek Turgunboev', 'Khojimat Erkinov', 'Eldor Shomurodov', 'Oston Urunov', 'Jaloliddin Masharipov', 'Igor Sergeev', 'Abbosbek Fayzullaev'],
  COL: ['Camilo Vargas', 'David Ospina', 'Dávinson Sánchez', 'Yerry Mina', 'Daniel Muñoz', 'Johan Mojica', 'Jhon Lucumí', 'Santiago Arias', 'Jefferson Lerma', 'Kevin Castaño', 'Richard Ríos', 'James Rodríguez', 'Juan Fernando Quintero', 'Jorge Carrascal', 'Jhon Arias', 'Jhon Córdoba', 'Luis Suárez', 'Luis Díaz'],
  ENG: ['Jordan Pickford', 'John Stones', 'Marc Guéhi', 'Ezri Konsa', 'Trent Alexander-Arnold', 'Reece James', 'Dan Burn', 'Jordan Henderson', 'Declan Rice', 'Jude Bellingham', 'Cole Palmer', 'Morgan Rogers', 'Anthony Gordon', 'Phil Foden', 'Bukayo Saka', 'Harry Kane', 'Marcus Rashford', 'Ollie Watkins'],
  CRO: ['Dominik Livaković', 'Duje Ćaleta-Car', 'Joško Gvardiol', 'Josip Stanišić', 'Luka Vušković', 'Josip Šutalo', 'Kristijan Jakić', 'Luka Modrić', 'Mateo Kovačić', 'Martin Baturina', 'Lovro Majer', 'Mario Pašalić', 'Petar Sučić', 'Ivan Perišić', 'Marco Pašalić', 'Ante Budimir', 'Andrej Kramarić', 'Franjo Ivanović'],
  GHA: ['Lawrence Ati Zigi', 'Tariq Lamptey', 'Mohammed Salisu', 'Alidu Seidu', 'Alexander Djiku', 'Gideon Mensah', 'Caleb Yirenkyi', 'Abdul Fatawu Issahaku', 'Thomas Partey', 'Salis Abdul Samed', 'Kamaldeen Sulemana', 'Mohammed Kudus', 'Iñaki Williams', 'Jordan Ayew', 'André Ayew', 'Joseph Paintsil', 'Osman Bukari', 'Antoine Semenyo'],
  PAN: ['Orlando Mosquera', 'Luis Mejía', 'Fidel Escobar', 'Andrés Andrade', 'Michael Amir Murillo', 'Eric Davis', 'José Córdoba', 'César Blackman', 'Cristian Martínez', 'Aníbal Godoy', 'Adalberto Carrasquilla', 'Édgar Bárcenas', 'Carlos Harvey', 'Ismael Díaz', 'José Fajardo', 'Cecilio Waterman', 'José Luis Rodríguez', 'Alberto Quintero']
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

  let playerList = officialPlayers[teamCode];

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
