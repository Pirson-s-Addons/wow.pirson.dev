// Languages of the Atlas (the game's, with esES and esMX as one Spanish) and the site's own texts.
// The addon's texts (src/data/atlas/locales.json, from its Locales/*.lua) cover the game words: level,
// rewards, objectives... These cover what only the site says: titles, descriptions, sections, calls to action.

export const LANGS = ['en', 'es', 'de', 'fr', 'it', 'pt', 'ru', 'ko', 'zh', 'tw'] as const;
export type Lang = (typeof LANGS)[number];
export type Section = 'dungeons' | 'quests' | 'items' | 'chains' | 'raids' | 'events' | 'tiers' | 'reputations' | 'search' | 'tutorials';

export const LANG: Record<Lang, { name: string; html: string; og: string; sections: Record<Section, string> }> = {
	en: { name: 'English', html: 'en', og: 'en_US', sections: { dungeons: 'dungeons', quests: 'quests', items: 'items', chains: 'quest-chains', raids: 'raids', events: 'events', tiers: 'tier-sets', reputations: 'reputations', search: 'search', tutorials: 'tutorials' } },
	es: { name: 'Español', html: 'es', og: 'es_ES', sections: { dungeons: 'mazmorras', quests: 'misiones', items: 'objetos', chains: 'cadenas', raids: 'bandas', events: 'eventos', tiers: 'conjuntos-de-tier', reputations: 'reputaciones', search: 'buscar', tutorials: 'tutoriales' } },
	de: { name: 'Deutsch', html: 'de', og: 'de_DE', sections: { dungeons: 'dungeons', quests: 'quests', items: 'gegenstaende', chains: 'questreihen', raids: 'schlachtzuege', events: 'weltereignisse', tiers: 'tier-sets', reputations: 'ruf', search: 'suche', tutorials: 'anleitungen' } },
	fr: { name: 'Français', html: 'fr', og: 'fr_FR', sections: { dungeons: 'donjons', quests: 'quetes', items: 'objets', chains: 'suites-de-quetes', raids: 'raids', events: 'evenements', tiers: 'ensembles-de-tier', reputations: 'reputations', search: 'recherche', tutorials: 'tutoriels' } },
	it: { name: 'Italiano', html: 'it', og: 'it_IT', sections: { dungeons: 'spedizioni', quests: 'missioni', items: 'oggetti', chains: 'catene', raids: 'incursioni', events: 'eventi', tiers: 'set-tier', reputations: 'reputazioni', search: 'cerca', tutorials: 'tutorial' } },
	pt: { name: 'Português', html: 'pt-BR', og: 'pt_BR', sections: { dungeons: 'masmorras', quests: 'missoes', items: 'itens', chains: 'cadeias', raids: 'raides', events: 'eventos', tiers: 'conjuntos-de-tier', reputations: 'reputacoes', search: 'busca', tutorials: 'tutoriais' } },
	ru: { name: 'Русский', html: 'ru', og: 'ru_RU', sections: { dungeons: 'подземелья', quests: 'задания', items: 'предметы', chains: 'цепочки', raids: 'рейды', events: 'события', tiers: 'комплекты-тира', reputations: 'репутация', search: 'поиск', tutorials: 'обучение' } },
	ko: { name: '한국어', html: 'ko', og: 'ko_KR', sections: { dungeons: '던전', quests: '퀘스트', items: '아이템', chains: '연계-퀘스트', raids: '공격대', events: '이벤트', tiers: '티어-세트', reputations: '평판', search: '검색', tutorials: '튜토리얼' } },
	zh: { name: '简体中文', html: 'zh-CN', og: 'zh_CN', sections: { dungeons: '地下城', quests: '任务', items: '物品', chains: '任务链', raids: '团队副本', events: '节日活动', tiers: '套装', reputations: '声望', search: '搜索', tutorials: '教程' } },
	tw: { name: '繁體中文', html: 'zh-TW', og: 'zh_TW', sections: { dungeons: '地城', quests: '任務', items: '物品', chains: '任務鏈', raids: '團隊副本', events: '節慶活動', tiers: '套裝', reputations: '聲望', search: '搜尋', tutorials: '教學' } },
};

type Texts = {
	homeTitle: string;
	homeDesc: string;
	homeLead: string;
	newDungeons: string;
	classicDungeons: string;
	dungeonTitle: string; // %1 dungeon, %2 levels
	dungeonDesc: string; // %1 quests, %2 bosses, %3 dungeon, %4 levels
	questTitle: string;
	questDesc: string; // %1 quest, %2 level
	itemTitle: string;
	itemDesc: string;
	chainTitle: string;
	chainDesc: string; // %1 chain, %2 steps
	droppedBy: string;
	rewardOf: string;
	neededFor: string;
	chance: string;
	chainSteps: string; // %1 steps
	inDungeon: string;
	wholeChain: string;
	money: string;
	ctaTitle: string;
	ctaText: string;
	ctaCurse: string;
	ctaDiscord: string;
	language: string;
	atlas: string;
	wings: Record<string, string>;
};

// %1, %2... are filled by fmt()
export const T: Record<Lang, Texts> = {
	en: {
		homeTitle: 'WoW Forever dungeons: quests, bosses & loot',
		homeDesc: 'Every WoW Forever dungeon with its quests, quest chains, bosses, loot and maps, in 10 languages.',
		homeLead: 'Every quest, chain, boss and drop of every WoW Forever dungeon, from the data of Dungeon Quest Atlas.',
		newDungeons: 'New in WoW Forever',
		classicDungeons: 'Classic dungeons',
		dungeonTitle: '%1 quests, bosses & loot (%2) - WoW Forever',
		dungeonDesc: '%1 quests and %2 bosses of %3 (level %4) in WoW Forever: quest chains, rewards, loot with drop chances and the map.',
		questTitle: '%1 - WoW Forever quest',
		questDesc: '%1 (level %2) in WoW Forever: objective, rewards, where it starts and ends, and its quest chain.',
		itemTitle: '%1 - WoW Forever item',
		itemDesc: 'Where to get %1 in WoW Forever: the bosses that drop it, their drop chance and the quests that give it.',
		chainTitle: '%1: the full quest chain (WoW Forever)',
		chainDesc: 'The full %1 quest chain in WoW Forever, %2 steps: where each one starts, its level and rewards.',
		droppedBy: 'Dropped by',
		rewardOf: 'Quest reward',
		neededFor: 'Needed for',
		chance: 'Drop chance',
		chainSteps: '%1 steps',
		inDungeon: 'Dungeon',
		wholeChain: 'See the whole chain',
		money: 'Money',
		ctaTitle: 'Take the atlas into the game',
		ctaText: 'Dungeon Quest Atlas shows all of this in game: your quests with their status, the chains, the bosses and their loot, and map pins to the quest givers and the entrances. Free.',
		ctaCurse: 'Download on CurseForge',
		ctaDiscord: 'Join the Discord',
		language: 'Language',
		atlas: 'Atlas',
		wings: { SM_GY: 'Graveyard', SM_LIB: 'Library', SM_ARM: 'Armory', SM_CATH: 'Cathedral', DM_E: 'East', DM_W: 'West', DM_N: 'North', STRAT_LIVE: 'Main Gate', STRAT_UD: 'Service Gate', LBRS: 'Lower', UBRS: 'Upper' },
	},
	es: {
		homeTitle: 'Mazmorras de WoW Forever: misiones, jefes y botín',
		homeDesc: 'Todas las mazmorras de WoW Forever con sus misiones, cadenas, jefes, botín y mapas, en 10 idiomas.',
		homeLead: 'Cada misión, cadena, jefe y botín de cada mazmorra de WoW Forever, con los datos de Dungeon Quest Atlas.',
		newDungeons: 'Nuevas en WoW Forever',
		classicDungeons: 'Mazmorras clásicas',
		dungeonTitle: '%1: misiones, jefes y botín (%2) - WoW Forever',
		dungeonDesc: '%1 misiones y %2 jefes de %3 (nivel %4) en WoW Forever: cadenas, recompensas, botín con probabilidades y el mapa.',
		questTitle: '%1 - Misión de WoW Forever',
		questDesc: '%1 (nivel %2) en WoW Forever: objetivo, recompensas, dónde empieza y dónde se entrega, y su cadena.',
		itemTitle: '%1 - Objeto de WoW Forever',
		itemDesc: 'Dónde conseguir %1 en WoW Forever: los jefes que lo sueltan, su probabilidad y las misiones que lo dan.',
		chainTitle: '%1: la cadena de misiones completa (WoW Forever)',
		chainDesc: 'La cadena completa de %1 en WoW Forever, %2 pasos: dónde empieza cada uno, su nivel y sus recompensas.',
		droppedBy: 'Lo suelta',
		rewardOf: 'Recompensa de misión',
		neededFor: 'Se necesita para',
		chance: 'Probabilidad',
		chainSteps: '%1 pasos',
		inDungeon: 'Mazmorra',
		wholeChain: 'Ver la cadena completa',
		money: 'Dinero',
		ctaTitle: 'Llévate el atlas al juego',
		ctaText: 'Dungeon Quest Atlas te muestra todo esto en el juego: tus misiones con su estado, las cadenas, los jefes y su botín, y marcas en el mapa a quien da cada misión y a las entradas. Gratis.',
		ctaCurse: 'Descargar en CurseForge',
		ctaDiscord: 'Únete al Discord',
		language: 'Idioma',
		atlas: 'Atlas',
		wings: { SM_GY: 'Cementerio', SM_LIB: 'Biblioteca', SM_ARM: 'Armería', SM_CATH: 'Catedral', DM_E: 'Este', DM_W: 'Oeste', DM_N: 'Norte', STRAT_LIVE: 'Puerta principal', STRAT_UD: 'Puerta de servicio', LBRS: 'Inferior', UBRS: 'Superior' },
	},
	de: {
		homeTitle: 'WoW Forever Dungeons: Quests, Bosse & Beute',
		homeDesc: 'Alle Dungeons von WoW Forever mit Quests, Questreihen, Bossen, Beute und Karten, in 10 Sprachen.',
		homeLead: 'Jede Quest, Questreihe, jeder Boss und jede Beute aller Dungeons von WoW Forever, aus den Daten von Dungeon Quest Atlas.',
		newDungeons: 'Neu in WoW Forever',
		classicDungeons: 'Klassische Dungeons',
		dungeonTitle: '%1: Quests, Bosse & Beute (%2) - WoW Forever',
		dungeonDesc: '%1 Quests und %2 Bosse in %3 (Stufe %4) in WoW Forever: Questreihen, Belohnungen, Beute mit Dropchancen und die Karte.',
		questTitle: '%1 - Quest in WoW Forever',
		questDesc: '%1 (Stufe %2) in WoW Forever: Ziel, Belohnungen, wo sie beginnt und endet, und ihre Questreihe.',
		itemTitle: '%1 - Gegenstand in WoW Forever',
		itemDesc: 'Wo es %1 in WoW Forever gibt: die Bosse, die ihn fallen lassen, ihre Dropchance und die Quests, die ihn geben.',
		chainTitle: '%1: die ganze Questreihe (WoW Forever)',
		chainDesc: 'Die ganze Questreihe %1 in WoW Forever, %2 Schritte: wo jeder beginnt, seine Stufe und Belohnungen.',
		droppedBy: 'Beute von',
		rewardOf: 'Questbelohnung',
		neededFor: 'Benötigt für',
		chance: 'Dropchance',
		chainSteps: '%1 Schritte',
		inDungeon: 'Dungeon',
		wholeChain: 'Ganze Questreihe ansehen',
		money: 'Geld',
		ctaTitle: 'Nimm den Atlas mit ins Spiel',
		ctaText: 'Dungeon Quest Atlas zeigt dir all das im Spiel: deine Quests mit ihrem Status, die Questreihen, die Bosse und ihre Beute, und Kartenmarkierungen zu Questgebern und Eingängen. Kostenlos.',
		ctaCurse: 'Auf CurseForge herunterladen',
		ctaDiscord: 'Zum Discord',
		language: 'Sprache',
		atlas: 'Atlas',
		wings: { SM_GY: 'Friedhof', SM_LIB: 'Bibliothek', SM_ARM: 'Waffenkammer', SM_CATH: 'Kathedrale', DM_E: 'Ost', DM_W: 'West', DM_N: 'Nord', STRAT_LIVE: 'Haupttor', STRAT_UD: 'Dienstboteneingang', LBRS: 'Untere', UBRS: 'Obere' },
	},
	fr: {
		homeTitle: 'Donjons de WoW Forever : quêtes, boss et butin',
		homeDesc: 'Tous les donjons de WoW Forever avec leurs quêtes, suites de quêtes, boss, butin et cartes, en 10 langues.',
		homeLead: 'Chaque quête, suite, boss et butin de chaque donjon de WoW Forever, avec les données de Dungeon Quest Atlas.',
		newDungeons: 'Nouveautés de WoW Forever',
		classicDungeons: 'Donjons classiques',
		dungeonTitle: '%1 : quêtes, boss et butin (%2) - WoW Forever',
		dungeonDesc: '%1 quêtes et %2 boss de %3 (niveau %4) dans WoW Forever : suites de quêtes, récompenses, butin avec taux de drop et la carte.',
		questTitle: '%1 - Quête de WoW Forever',
		questDesc: '%1 (niveau %2) dans WoW Forever : objectif, récompenses, où elle commence et se termine, et sa suite de quêtes.',
		itemTitle: '%1 - Objet de WoW Forever',
		itemDesc: 'Où obtenir %1 dans WoW Forever : les boss qui le lâchent, leur taux de drop et les quêtes qui le donnent.',
		chainTitle: '%1 : la suite de quêtes complète (WoW Forever)',
		chainDesc: 'La suite de quêtes complète %1 dans WoW Forever, %2 étapes : où chacune commence, son niveau et ses récompenses.',
		droppedBy: 'Butin de',
		rewardOf: 'Récompense de quête',
		neededFor: 'Nécessaire pour',
		chance: 'Taux de drop',
		chainSteps: '%1 étapes',
		inDungeon: 'Donjon',
		wholeChain: 'Voir toute la suite',
		money: 'Argent',
		ctaTitle: "Emportez l'atlas dans le jeu",
		ctaText: 'Dungeon Quest Atlas vous montre tout cela en jeu : vos quêtes et leur état, les suites, les boss et leur butin, et des repères sur la carte vers les donneurs de quêtes et les entrées. Gratuit.',
		ctaCurse: 'Télécharger sur CurseForge',
		ctaDiscord: 'Rejoindre le Discord',
		language: 'Langue',
		atlas: 'Atlas',
		wings: { SM_GY: 'Cimetière', SM_LIB: 'Bibliothèque', SM_ARM: 'Armurerie', SM_CATH: 'Cathédrale', DM_E: 'Est', DM_W: 'Ouest', DM_N: 'Nord', STRAT_LIVE: 'Porte principale', STRAT_UD: 'Entrée de service', LBRS: 'Bas', UBRS: 'Haut' },
	},
	it: {
		homeTitle: 'Spedizioni di WoW Forever: missioni, boss e bottino',
		homeDesc: 'Tutte le spedizioni di WoW Forever con missioni, catene, boss, bottino e mappe, in 10 lingue.',
		homeLead: 'Ogni missione, catena, boss e bottino di ogni spedizione di WoW Forever, dai dati di Dungeon Quest Atlas.',
		newDungeons: 'Novità di WoW Forever',
		classicDungeons: 'Spedizioni classiche',
		dungeonTitle: '%1: missioni, boss e bottino (%2) - WoW Forever',
		dungeonDesc: '%1 missioni e %2 boss di %3 (livello %4) in WoW Forever: catene di missioni, ricompense, bottino con probabilità e la mappa.',
		questTitle: '%1 - Missione di WoW Forever',
		questDesc: '%1 (livello %2) in WoW Forever: obiettivo, ricompense, dove inizia e dove si consegna, e la sua catena.',
		itemTitle: '%1 - Oggetto di WoW Forever',
		itemDesc: 'Dove trovare %1 in WoW Forever: i boss che lo rilasciano, la probabilità e le missioni che lo danno.',
		chainTitle: '%1: la catena di missioni completa (WoW Forever)',
		chainDesc: 'La catena completa di %1 in WoW Forever, %2 passi: dove inizia ognuno, il suo livello e le ricompense.',
		droppedBy: 'Bottino di',
		rewardOf: 'Ricompensa della missione',
		neededFor: 'Serve per',
		chance: 'Probabilità',
		chainSteps: '%1 passi',
		inDungeon: 'Spedizione',
		wholeChain: 'Vedi tutta la catena',
		money: 'Denaro',
		ctaTitle: "Porta l'atlante nel gioco",
		ctaText: 'Dungeon Quest Atlas ti mostra tutto questo nel gioco: le tue missioni con il loro stato, le catene, i boss e il loro bottino, e indicatori sulla mappa per chi dà le missioni e per gli ingressi. Gratis.',
		ctaCurse: 'Scarica su CurseForge',
		ctaDiscord: 'Entra nel Discord',
		language: 'Lingua',
		atlas: 'Atlante',
		wings: { SM_GY: 'Cimitero', SM_LIB: 'Biblioteca', SM_ARM: 'Armeria', SM_CATH: 'Cattedrale', DM_E: 'Est', DM_W: 'Ovest', DM_N: 'Nord', STRAT_LIVE: 'Porta principale', STRAT_UD: 'Ingresso di servizio', LBRS: 'Inferiore', UBRS: 'Superiore' },
	},
	pt: {
		homeTitle: 'Masmorras de WoW Forever: missões, chefes e saque',
		homeDesc: 'Todas as masmorras de WoW Forever com missões, cadeias, chefes, saque e mapas, em 10 idiomas.',
		homeLead: 'Cada missão, cadeia, chefe e saque de cada masmorra de WoW Forever, com os dados do Dungeon Quest Atlas.',
		newDungeons: 'Novidades de WoW Forever',
		classicDungeons: 'Masmorras clássicas',
		dungeonTitle: '%1: missões, chefes e saque (%2) - WoW Forever',
		dungeonDesc: '%1 missões e %2 chefes de %3 (nível %4) em WoW Forever: cadeias de missões, recompensas, saque com chance de drop e o mapa.',
		questTitle: '%1 - Missão de WoW Forever',
		questDesc: '%1 (nível %2) em WoW Forever: objetivo, recompensas, onde começa e termina, e sua cadeia de missões.',
		itemTitle: '%1 - Item de WoW Forever',
		itemDesc: 'Onde conseguir %1 em WoW Forever: os chefes que o derrubam, a chance de drop e as missões que o dão.',
		chainTitle: '%1: a cadeia de missões completa (WoW Forever)',
		chainDesc: 'A cadeia completa de %1 em WoW Forever, %2 etapas: onde cada uma começa, seu nível e recompensas.',
		droppedBy: 'Saque de',
		rewardOf: 'Recompensa de missão',
		neededFor: 'Necessário para',
		chance: 'Chance de drop',
		chainSteps: '%1 etapas',
		inDungeon: 'Masmorra',
		wholeChain: 'Ver a cadeia completa',
		money: 'Dinheiro',
		ctaTitle: 'Leve o atlas para o jogo',
		ctaText: 'O Dungeon Quest Atlas mostra tudo isso no jogo: suas missões com o estado, as cadeias, os chefes e o saque, e marcadores no mapa para quem dá as missões e para as entradas. Grátis.',
		ctaCurse: 'Baixar no CurseForge',
		ctaDiscord: 'Entre no Discord',
		language: 'Idioma',
		atlas: 'Atlas',
		wings: { SM_GY: 'Cemitério', SM_LIB: 'Biblioteca', SM_ARM: 'Arsenal', SM_CATH: 'Catedral', DM_E: 'Leste', DM_W: 'Oeste', DM_N: 'Norte', STRAT_LIVE: 'Portão principal', STRAT_UD: 'Entrada de serviço', LBRS: 'Inferior', UBRS: 'Superior' },
	},
	ru: {
		homeTitle: 'Подземелья WoW Forever: задания, боссы и добыча',
		homeDesc: 'Все подземелья WoW Forever с заданиями, цепочками, боссами, добычей и картами на 10 языках.',
		homeLead: 'Каждое задание, цепочка, босс и добыча всех подземелий WoW Forever по данным Dungeon Quest Atlas.',
		newDungeons: 'Новое в WoW Forever',
		classicDungeons: 'Классические подземелья',
		dungeonTitle: '%1: задания, боссы и добыча (%2) - WoW Forever',
		dungeonDesc: '%1 заданий и %2 боссов: %3 (уровень %4) в WoW Forever. Цепочки заданий, награды, добыча с шансами выпадения и карта.',
		questTitle: '%1 - задание WoW Forever',
		questDesc: '%1 (уровень %2) в WoW Forever: цель, награды, где начинается и где сдается, и его цепочка.',
		itemTitle: '%1 - предмет WoW Forever',
		itemDesc: 'Где получить %1 в WoW Forever: боссы, с которых он падает, шанс выпадения и задания, которые его дают.',
		chainTitle: '%1: вся цепочка заданий (WoW Forever)',
		chainDesc: 'Вся цепочка заданий «%1» в WoW Forever, шагов: %2. Где начинается каждый, его уровень и награды.',
		droppedBy: 'Добыча с',
		rewardOf: 'Награда за задание',
		neededFor: 'Нужно для',
		chance: 'Шанс',
		chainSteps: 'Шагов: %1',
		inDungeon: 'Подземелье',
		wholeChain: 'Вся цепочка',
		money: 'Деньги',
		ctaTitle: 'Возьмите атлас в игру',
		ctaText: 'Dungeon Quest Atlas показывает все это в игре: ваши задания и их состояние, цепочки, боссов и их добычу, метки на карте к тем, кто дает задания, и к входам. Бесплатно.',
		ctaCurse: 'Скачать на CurseForge',
		ctaDiscord: 'Наш Discord',
		language: 'Язык',
		atlas: 'Атлас',
		wings: { SM_GY: 'Кладбище', SM_LIB: 'Библиотека', SM_ARM: 'Оружейная', SM_CATH: 'Собор', DM_E: 'Восток', DM_W: 'Запад', DM_N: 'Север', STRAT_LIVE: 'Главные ворота', STRAT_UD: 'Черный ход', LBRS: 'Нижняя', UBRS: 'Верхняя' },
	},
	ko: {
		homeTitle: 'WoW Forever 던전: 퀘스트, 우두머리, 전리품',
		homeDesc: 'WoW Forever의 모든 던전과 퀘스트, 연계 퀘스트, 우두머리, 전리품, 지도를 10개 언어로.',
		homeLead: 'Dungeon Quest Atlas의 데이터로 정리한 WoW Forever 모든 던전의 퀘스트, 연계, 우두머리, 전리품.',
		newDungeons: 'WoW Forever 신규',
		classicDungeons: '클래식 던전',
		dungeonTitle: '%1: 퀘스트, 우두머리, 전리품 (%2) - WoW Forever',
		dungeonDesc: 'WoW Forever %3 (레벨 %4)의 퀘스트 %1개와 우두머리 %2명: 연계 퀘스트, 보상, 획득 확률이 있는 전리품과 지도.',
		questTitle: '%1 - WoW Forever 퀘스트',
		questDesc: 'WoW Forever의 %1 (레벨 %2): 목표, 보상, 시작과 완료 위치, 연계 퀘스트.',
		itemTitle: '%1 - WoW Forever 아이템',
		itemDesc: 'WoW Forever에서 %1 얻는 곳: 떨어뜨리는 우두머리, 획득 확률, 보상으로 주는 퀘스트.',
		chainTitle: '%1: 전체 연계 퀘스트 (WoW Forever)',
		chainDesc: 'WoW Forever의 %1 전체 연계 퀘스트, %2단계: 각 단계의 시작 위치, 레벨, 보상.',
		droppedBy: '획득처',
		rewardOf: '퀘스트 보상',
		neededFor: '필요한 퀘스트',
		chance: '획득 확률',
		chainSteps: '%1단계',
		inDungeon: '던전',
		wholeChain: '전체 연계 보기',
		money: '골드',
		ctaTitle: '아틀라스를 게임 속으로',
		ctaText: 'Dungeon Quest Atlas는 이 모든 것을 게임 안에서 보여 줍니다: 퀘스트와 진행 상태, 연계 퀘스트, 우두머리와 전리품, 퀘스트 제공자와 입구로 가는 지도 표시. 무료.',
		ctaCurse: 'CurseForge에서 받기',
		ctaDiscord: 'Discord 참여',
		language: '언어',
		atlas: '아틀라스',
		wings: { SM_GY: '묘지', SM_LIB: '도서관', SM_ARM: '무기고', SM_CATH: '대성당', DM_E: '동쪽', DM_W: '서쪽', DM_N: '북쪽', STRAT_LIVE: '정문', STRAT_UD: '후문', LBRS: '하층', UBRS: '상층' },
	},
	zh: {
		homeTitle: 'WoW Forever 地下城：任务、首领与掉落',
		homeDesc: 'WoW Forever 所有地下城的任务、任务链、首领、掉落和地图，共 10 种语言。',
		homeLead: '基于 Dungeon Quest Atlas 的数据，收录 WoW Forever 每个地下城的任务、任务链、首领和掉落。',
		newDungeons: 'WoW Forever 新增',
		classicDungeons: '经典地下城',
		dungeonTitle: '%1：任务、首领与掉落（%2）- WoW Forever',
		dungeonDesc: 'WoW Forever %3（等级 %4）的 %1 个任务和 %2 个首领：任务链、奖励、带掉落几率的战利品和地图。',
		questTitle: '%1 - WoW Forever 任务',
		questDesc: 'WoW Forever 任务 %1（等级 %2）：目标、奖励、起点与交付地点，以及任务链。',
		itemTitle: '%1 - WoW Forever 物品',
		itemDesc: '在 WoW Forever 中如何获得 %1：掉落它的首领、掉落几率以及奖励它的任务。',
		chainTitle: '%1：完整任务链（WoW Forever）',
		chainDesc: 'WoW Forever 中 %1 的完整任务链，共 %2 步：每一步的起点、等级和奖励。',
		droppedBy: '掉落自',
		rewardOf: '任务奖励',
		neededFor: '用于任务',
		chance: '掉落几率',
		chainSteps: '%1 步',
		inDungeon: '地下城',
		wholeChain: '查看完整任务链',
		money: '金钱',
		ctaTitle: '把图鉴带进游戏',
		ctaText: 'Dungeon Quest Atlas 在游戏中显示这一切：你的任务及其状态、任务链、首领和掉落，以及指向任务发布者和入口的地图标记。免费。',
		ctaCurse: '在 CurseForge 下载',
		ctaDiscord: '加入 Discord',
		language: '语言',
		atlas: '图鉴',
		wings: { SM_GY: '墓地', SM_LIB: '图书馆', SM_ARM: '军械库', SM_CATH: '大教堂', DM_E: '东', DM_W: '西', DM_N: '北', STRAT_LIVE: '正门', STRAT_UD: '后门', LBRS: '下层', UBRS: '上层' },
	},
	tw: {
		homeTitle: 'WoW Forever 地城：任務、首領與戰利品',
		homeDesc: 'WoW Forever 所有地城的任務、任務鏈、首領、戰利品和地圖，共 10 種語言。',
		homeLead: '根據 Dungeon Quest Atlas 的資料，收錄 WoW Forever 每個地城的任務、任務鏈、首領和戰利品。',
		newDungeons: 'WoW Forever 新增',
		classicDungeons: '經典地城',
		dungeonTitle: '%1：任務、首領與戰利品（%2）- WoW Forever',
		dungeonDesc: 'WoW Forever %3（等級 %4）的 %1 個任務和 %2 個首領：任務鏈、獎勵、附掉落機率的戰利品和地圖。',
		questTitle: '%1 - WoW Forever 任務',
		questDesc: 'WoW Forever 任務 %1（等級 %2）：目標、獎勵、起點與交付地點，以及任務鏈。',
		itemTitle: '%1 - WoW Forever 物品',
		itemDesc: '在 WoW Forever 中如何取得 %1：掉落它的首領、掉落機率以及獎勵它的任務。',
		chainTitle: '%1：完整任務鏈（WoW Forever）',
		chainDesc: 'WoW Forever 中 %1 的完整任務鏈，共 %2 步：每一步的起點、等級和獎勵。',
		droppedBy: '掉落自',
		rewardOf: '任務獎勵',
		neededFor: '用於任務',
		chance: '掉落機率',
		chainSteps: '%1 步',
		inDungeon: '地城',
		wholeChain: '查看完整任務鏈',
		money: '金錢',
		ctaTitle: '把圖鑑帶進遊戲',
		ctaText: 'Dungeon Quest Atlas 在遊戲中顯示這一切：你的任務及其狀態、任務鏈、首領和戰利品，以及指向任務發布者和入口的地圖標記。免費。',
		ctaCurse: '在 CurseForge 下載',
		ctaDiscord: '加入 Discord',
		language: '語言',
		atlas: '圖鑑',
		wings: { SM_GY: '墓地', SM_LIB: '圖書館', SM_ARM: '軍械庫', SM_CATH: '大教堂', DM_E: '東', DM_W: '西', DM_N: '北', STRAT_LIVE: '正門', STRAT_UD: '後門', LBRS: '下層', UBRS: '上層' },
	},
};

export const fmt = (s: string, ...args: (string | number)[]) => s.replace(/%(\d)/g, (_, i) => String(args[+i - 1] ?? ''));

// WoW format strings from the addon (%d, %s, %%, and |c...|r colour codes)
export const wow = (s: string, ...args: (string | number)[]) => {
	let i = 0;
	return s.replace(/\|c[0-9a-fA-F]{8}|\|r/g, '').replace(/%(%|[ds])/g, (m, k) => (k === '%' ? '%' : String(args[i++] ?? '')));
};

// URL slug in the language's own script: Latin letters lose their accents, other scripts stay whole
// (й keeps its breve, Hangul syllables are recomposed)
export const slug = (s: string) =>
	s
		.normalize('NFKD')
		.replace(/(\p{Script=Latin})\p{M}+/gu, '$1')
		.normalize('NFC')
		.replace(/ß/g, 'ss')
		.toLowerCase()
		.replace(/['’`]/g, '')
		.replace(/[^\p{L}\p{N}]+/gu, '-')
		.replace(/^-+|-+$/g, '');

// Class names as the game writes them (the addon takes them from the client, so it has none)
const CLASS_KEYS = ['WARRIOR', 'PALADIN', 'HUNTER', 'ROGUE', 'PRIEST', 'SHAMAN', 'MAGE', 'WARLOCK', 'DRUID'];
const CLASS_NAMES: Record<Lang, string> = {
	en: 'Warrior,Paladin,Hunter,Rogue,Priest,Shaman,Mage,Warlock,Druid',
	es: 'Guerrero,Paladín,Cazador,Pícaro,Sacerdote,Chamán,Mago,Brujo,Druida',
	de: 'Krieger,Paladin,Jäger,Schurke,Priester,Schamane,Magier,Hexenmeister,Druide',
	fr: 'Guerrier,Paladin,Chasseur,Voleur,Prêtre,Chaman,Mage,Démoniste,Druide',
	it: 'Guerriero,Paladino,Cacciatore,Ladro,Sacerdote,Sciamano,Mago,Stregone,Druido',
	pt: 'Guerreiro,Paladino,Caçador,Ladino,Sacerdote,Xamã,Mago,Bruxo,Druida',
	ru: 'Воин,Паладин,Охотник,Разбойник,Жрец,Шаман,Маг,Чернокнижник,Друид',
	ko: '전사,성기사,사냥꾼,도적,사제,주술사,마법사,흑마법사,드루이드',
	zh: '战士,圣骑士,猎人,潜行者,牧师,萨满祭司,法师,术士,德鲁伊',
	tw: '戰士,聖騎士,獵人,盜賊,牧師,薩滿,法師,術士,德魯伊',
};
export const className = (lang: Lang, key: string) => CLASS_NAMES[lang].split(',')[CLASS_KEYS.indexOf(key)] ?? key;

// Phase 3 texts: raids, events, tier sets, reputations, search. %1, %2 as in T.
type Texts2 = {
	raidTitle: string; // %1 raid
	raidDesc: string; // %1 raid, %2 players
	eventTitle: string;
	eventDesc: string; // %1 event, %2 quests
	tiersDesc: string;
	repsTitle: string;
	repsDesc: string;
	searchTitle: string;
	searchLabel: string;
	searchNone: string;
	yearly: string; // %1 date, %2 days
	monthly: string; // %1 days
	more: string;
	items: string;
};
export const T2: Record<Lang, Texts2> = {
	en: {
		raidTitle: '%1: bosses, loot and attunement - WoW Forever',
		raidDesc: '%1, the %2-player WoW Forever raid: when it opens, its bosses, their loot and the attunement.',
		eventTitle: '%1: every quest (WoW Forever)',
		eventDesc: 'The %2 quests of %1 in WoW Forever: levels, rewards and where each one starts.',
		tiersDesc: 'Tier 0 and Tier 0.5 sets of every class in WoW Forever: each piece, the boss that drops it and the quests of Tier 0.5.',
		repsTitle: 'New WoW Forever reputations',
		repsDesc: 'The new reputations of WoW Forever: where to earn them, their side and their rewards.',
		searchTitle: 'Search the atlas',
		searchLabel: 'Dungeon, quest, item…',
		searchNone: 'Nothing matches the search.',
		yearly: 'Every year from %1, for about %2 days',
		monthly: 'Every month from the first Sunday, for about %1 days',
		more: 'More in the atlas',
		items: 'Items',
	},
	es: {
		raidTitle: '%1: jefes, botín y requisito - WoW Forever',
		raidDesc: '%1, la banda de %2 jugadores de WoW Forever: cuándo abre, sus jefes, su botín y el requisito para entrar.',
		eventTitle: '%1: todas las misiones (WoW Forever)',
		eventDesc: 'Las %2 misiones de %1 en WoW Forever: niveles, recompensas y dónde empieza cada una.',
		tiersDesc: 'Conjuntos de Tier 0 y Tier 0.5 de cada clase en WoW Forever: cada pieza, el jefe que la suelta y las misiones del Tier 0.5.',
		repsTitle: 'Reputaciones nuevas de WoW Forever',
		repsDesc: 'Las reputaciones nuevas de WoW Forever: dónde se consiguen, de qué facción son y sus recompensas.',
		searchTitle: 'Buscar en el atlas',
		searchLabel: 'Mazmorra, misión, objeto…',
		searchNone: 'Nada coincide con la búsqueda.',
		yearly: 'Cada año desde el %1, unos %2 días',
		monthly: 'Cada mes desde el primer domingo, unos %1 días',
		more: 'Más en el atlas',
		items: 'Objetos',
	},
	de: {
		raidTitle: '%1: Bosse, Beute und Zugangsquest - WoW Forever',
		raidDesc: '%1, der Schlachtzug für %2 Spieler in WoW Forever: wann er öffnet, seine Bosse, ihre Beute und der Zugang.',
		eventTitle: '%1: alle Quests (WoW Forever)',
		eventDesc: 'Die %2 Quests von %1 in WoW Forever: Stufen, Belohnungen und wo jede beginnt.',
		tiersDesc: 'Tier-0- und Tier-0.5-Sets jeder Klasse in WoW Forever: jedes Teil, der Boss, der es fallen lässt, und die Quests für Tier 0.5.',
		repsTitle: 'Neue Rufe in WoW Forever',
		repsDesc: 'Die neuen Rufe in WoW Forever: wo man sie verdient, ihre Fraktion und ihre Belohnungen.',
		searchTitle: 'Im Atlas suchen',
		searchLabel: 'Dungeon, Quest, Gegenstand…',
		searchNone: 'Nichts passt zur Suche.',
		yearly: 'Jedes Jahr ab dem %1, etwa %2 Tage',
		monthly: 'Jeden Monat ab dem ersten Sonntag, etwa %1 Tage',
		more: 'Mehr im Atlas',
		items: 'Gegenstände',
	},
	fr: {
		raidTitle: '%1 : boss, butin et accès - WoW Forever',
		raidDesc: '%1, le raid à %2 joueurs de WoW Forever : son ouverture, ses boss, leur butin et la quête d’accès.',
		eventTitle: '%1 : toutes les quêtes (WoW Forever)',
		eventDesc: 'Les %2 quêtes de %1 dans WoW Forever : niveaux, récompenses et où chacune commence.',
		tiersDesc: 'Ensembles Tier 0 et Tier 0.5 de chaque classe dans WoW Forever : chaque pièce, le boss qui la lâche et les quêtes du Tier 0.5.',
		repsTitle: 'Nouvelles réputations de WoW Forever',
		repsDesc: 'Les nouvelles réputations de WoW Forever : où les gagner, leur camp et leurs récompenses.',
		searchTitle: 'Chercher dans l’atlas',
		searchLabel: 'Donjon, quête, objet…',
		searchNone: 'Aucun résultat.',
		yearly: 'Chaque année à partir du %1, environ %2 jours',
		monthly: 'Chaque mois à partir du premier dimanche, environ %1 jours',
		more: 'Plus dans l’atlas',
		items: 'Objets',
	},
	it: {
		raidTitle: '%1: boss, bottino e accesso - WoW Forever',
		raidDesc: '%1, l’incursione da %2 giocatori di WoW Forever: quando apre, i boss, il loro bottino e l’accesso.',
		eventTitle: '%1: tutte le missioni (WoW Forever)',
		eventDesc: 'Le %2 missioni di %1 in WoW Forever: livelli, ricompense e dove inizia ognuna.',
		tiersDesc: 'Set Tier 0 e Tier 0.5 di ogni classe in WoW Forever: ogni pezzo, il boss che lo rilascia e le missioni del Tier 0.5.',
		repsTitle: 'Nuove reputazioni di WoW Forever',
		repsDesc: 'Le nuove reputazioni di WoW Forever: dove guadagnarle, la fazione e le ricompense.',
		searchTitle: 'Cerca nell’atlante',
		searchLabel: 'Spedizione, missione, oggetto…',
		searchNone: 'Nessun risultato.',
		yearly: 'Ogni anno dal %1, per circa %2 giorni',
		monthly: 'Ogni mese dalla prima domenica, per circa %1 giorni',
		more: 'Altro nell’atlante',
		items: 'Oggetti',
	},
	pt: {
		raidTitle: '%1: chefes, saque e sintonização - WoW Forever',
		raidDesc: '%1, o raide de %2 jogadores de WoW Forever: quando abre, os chefes, o saque e a sintonização.',
		eventTitle: '%1: todas as missões (WoW Forever)',
		eventDesc: 'As %2 missões de %1 em WoW Forever: níveis, recompensas e onde cada uma começa.',
		tiersDesc: 'Conjuntos Tier 0 e Tier 0.5 de cada classe em WoW Forever: cada peça, o chefe que a derruba e as missões do Tier 0.5.',
		repsTitle: 'Novas reputações de WoW Forever',
		repsDesc: 'As novas reputações de WoW Forever: onde conquistá-las, a facção e as recompensas.',
		searchTitle: 'Buscar no atlas',
		searchLabel: 'Masmorra, missão, item…',
		searchNone: 'Nada corresponde à busca.',
		yearly: 'Todo ano a partir de %1, por cerca de %2 dias',
		monthly: 'Todo mês a partir do primeiro domingo, por cerca de %1 dias',
		more: 'Mais no atlas',
		items: 'Itens',
	},
	ru: {
		raidTitle: '%1: боссы, добыча и допуск - WoW Forever',
		raidDesc: '%1 — рейд WoW Forever на %2 игроков: когда открывается, боссы, их добыча и допуск.',
		eventTitle: '%1: все задания (WoW Forever)',
		eventDesc: 'Задания события «%1» в WoW Forever (%2): уровни, награды и где начинается каждое.',
		tiersDesc: 'Комплекты тира 0 и тира 0.5 для каждого класса в WoW Forever: каждый предмет, босс, с которого он падает, и задания тира 0.5.',
		repsTitle: 'Новые репутации WoW Forever',
		repsDesc: 'Новые репутации WoW Forever: где их получить, их фракция и награды.',
		searchTitle: 'Поиск по атласу',
		searchLabel: 'Подземелье, задание, предмет…',
		searchNone: 'Ничего не найдено.',
		yearly: 'Каждый год с %1, около %2 дн.',
		monthly: 'Каждый месяц с первого воскресенья, около %1 дн.',
		more: 'Еще в атласе',
		items: 'Предметы',
	},
	ko: {
		raidTitle: '%1: 우두머리, 전리품, 입장 조건 - WoW Forever',
		raidDesc: 'WoW Forever의 %2인 공격대 %1: 개방일, 우두머리, 전리품, 입장 조건.',
		eventTitle: '%1: 모든 퀘스트 (WoW Forever)',
		eventDesc: 'WoW Forever %1의 퀘스트 %2개: 레벨, 보상, 시작 위치.',
		tiersDesc: 'WoW Forever 모든 직업의 티어 0과 티어 0.5 세트: 각 부위, 떨어뜨리는 우두머리, 티어 0.5 퀘스트.',
		repsTitle: 'WoW Forever 신규 평판',
		repsDesc: 'WoW Forever의 신규 평판: 얻는 곳, 진영, 보상.',
		searchTitle: '아틀라스 검색',
		searchLabel: '던전, 퀘스트, 아이템…',
		searchNone: '검색 결과가 없습니다.',
		yearly: '매년 %1부터 약 %2일',
		monthly: '매달 첫 일요일부터 약 %1일',
		more: '아틀라스 더 보기',
		items: '아이템',
	},
	zh: {
		raidTitle: '%1：首领、掉落与进入条件 - WoW Forever',
		raidDesc: 'WoW Forever 的 %2 人团队副本 %1：开放时间、首领、掉落和进入条件。',
		eventTitle: '%1：全部任务（WoW Forever）',
		eventDesc: 'WoW Forever 中 %1 的 %2 个任务：等级、奖励和每个任务的起点。',
		tiersDesc: 'WoW Forever 各职业的 T0 和 T0.5 套装：每个部件、掉落它的首领以及 T0.5 任务。',
		repsTitle: 'WoW Forever 新声望',
		repsDesc: 'WoW Forever 的新声望：在哪里获得、所属阵营及奖励。',
		searchTitle: '搜索图鉴',
		searchLabel: '地下城、任务、物品…',
		searchNone: '没有匹配的结果。',
		yearly: '每年 %1 起，约 %2 天',
		monthly: '每月第一个星期日起，约 %1 天',
		more: '图鉴中的更多内容',
		items: '物品',
	},
	tw: {
		raidTitle: '%1：首領、戰利品與進入條件 - WoW Forever',
		raidDesc: 'WoW Forever 的 %2 人團隊副本 %1：開放時間、首領、戰利品和進入條件。',
		eventTitle: '%1：全部任務（WoW Forever）',
		eventDesc: 'WoW Forever 中 %1 的 %2 個任務：等級、獎勵和每個任務的起點。',
		tiersDesc: 'WoW Forever 各職業的 T0 和 T0.5 套裝：每個部件、掉落它的首領以及 T0.5 任務。',
		repsTitle: 'WoW Forever 新聲望',
		repsDesc: 'WoW Forever 的新聲望：在哪裡取得、所屬陣營及獎勵。',
		searchTitle: '搜尋圖鑑',
		searchLabel: '地城、任務、物品…',
		searchNone: '沒有符合的結果。',
		yearly: '每年 %1 起，約 %2 天',
		monthly: '每月第一個星期日起，約 %1 天',
		more: '圖鑑中的更多內容',
		items: '物品',
	},
};

// Intro of a dungeon page, built from its data (no invented text). %1.. as in fmt().
type Intro = {
	kind: [classic: string, forever: string]; // %1 name, %2 levels
	only: [alliance: string, horde: string]; // appended to the first sentence
	bosses: string; // %1 bosses, %2 first, %3 last, %4 quests
	split: string; // %1 alliance quests, %2 horde quests
	best: string; // %1 item, %2 quest
	chains: string; // %1 quests that need a chain
};
export const INTRO: Record<Lang, Intro> = {
	en: { kind: ['%1 is a classic WoW Forever dungeon for levels %2', '%1 is one of the new WoW Forever dungeons, for levels %2'], only: [', for the Alliance only', ', for the Horde only'], bosses: 'It has %1 bosses, from %2 to %3, and %4 quests', split: ' (%1 for the Alliance and %2 for the Horde)', best: 'The best quest reward is %1, from %2.', chains: '%1 of its quests need earlier steps of a chain: pick them up before you go in.' },
	es: { kind: ['%1 es una mazmorra clásica de WoW Forever para niveles %2', '%1 es una de las mazmorras nuevas de WoW Forever, para niveles %2'], only: [', solo para la Alianza', ', solo para la Horda'], bosses: 'Tiene %1 jefes, de %2 a %3, y %4 misiones', split: ' (%1 de la Alianza y %2 de la Horda)', best: 'La mejor recompensa de misión es %1, de %2.', chains: '%1 de sus misiones piden pasos anteriores de una cadena: cógelos antes de entrar.' },
	de: { kind: ['%1 ist ein klassischer Dungeon in WoW Forever für Stufe %2', '%1 ist einer der neuen Dungeons von WoW Forever, für Stufe %2'], only: [', nur für die Allianz', ', nur für die Horde'], bosses: 'Er hat %1 Bosse, von %2 bis %3, und %4 Quests', split: ' (%1 für die Allianz und %2 für die Horde)', best: 'Die beste Questbelohnung ist %1, aus %2.', chains: '%1 seiner Quests brauchen frühere Schritte einer Questreihe: hol sie dir, bevor du hineingehst.' },
	fr: { kind: ['%1 est un donjon classique de WoW Forever pour les niveaux %2', '%1 est l’un des nouveaux donjons de WoW Forever, pour les niveaux %2'], only: [', pour l’Alliance uniquement', ', pour la Horde uniquement'], bosses: 'Il compte %1 boss, de %2 à %3, et %4 quêtes', split: ' (%1 pour l’Alliance et %2 pour la Horde)', best: 'La meilleure récompense de quête est %1, de %2.', chains: '%1 de ses quêtes demandent des étapes précédentes d’une suite : prenez-les avant d’entrer.' },
	it: { kind: ['%1 è una spedizione classica di WoW Forever per i livelli %2', '%1 è una delle nuove spedizioni di WoW Forever, per i livelli %2'], only: [', solo per l’Alleanza', ', solo per l’Orda'], bosses: 'Ha %1 boss, da %2 a %3, e %4 missioni', split: ' (%1 per l’Alleanza e %2 per l’Orda)', best: 'La migliore ricompensa di missione è %1, da %2.', chains: '%1 delle sue missioni richiedono passi precedenti di una catena: prendili prima di entrare.' },
	pt: { kind: ['%1 é uma masmorra clássica de WoW Forever para os níveis %2', '%1 é uma das novas masmorras de WoW Forever, para os níveis %2'], only: [', só para a Aliança', ', só para a Horda'], bosses: 'Tem %1 chefes, de %2 a %3, e %4 missões', split: ' (%1 da Aliança e %2 da Horda)', best: 'A melhor recompensa de missão é %1, de %2.', chains: '%1 das suas missões pedem etapas anteriores de uma cadeia: pegue-as antes de entrar.' },
	ru: { kind: ['%1 — классическое подземелье WoW Forever для уровней %2', '%1 — одно из новых подземелий WoW Forever для уровней %2'], only: [', только для Альянса', ', только для Орды'], bosses: 'В нем %1 боссов, от %2 до %3, и %4 заданий', split: ' (%1 для Альянса и %2 для Орды)', best: 'Лучшая награда за задание — %1, из «%2».', chains: 'Для %1 его заданий нужны предыдущие шаги цепочки: возьмите их до входа.' },
	ko: { kind: ['%1: 레벨 %2용 WoW Forever 클래식 던전', '%1: 레벨 %2용 WoW Forever 신규 던전'], only: [' (얼라이언스 전용)', ' (호드 전용)'], bosses: '우두머리 %1명(%2부터 %3까지)과 퀘스트 %4개가 있습니다', split: ' (얼라이언스 %1개, 호드 %2개)', best: '가장 좋은 퀘스트 보상은 %2의 %1입니다.', chains: '퀘스트 %1개는 연계의 이전 단계가 필요합니다. 들어가기 전에 받아 두세요.' },
	zh: { kind: ['%1 是 WoW Forever 的经典地下城，适合 %2 级', '%1 是 WoW Forever 的新地下城之一，适合 %2 级'], only: ['，仅限联盟', '，仅限部落'], bosses: '共有 %1 个首领（从 %2 到 %3）和 %4 个任务', split: '（联盟 %1 个，部落 %2 个）', best: '最好的任务奖励是 %1，来自“%2”。', chains: '其中 %1 个任务需要先完成任务链的前置步骤：进本前先接好。' },
	tw: { kind: ['%1 是 WoW Forever 的經典地城，適合 %2 級', '%1 是 WoW Forever 的新地城之一，適合 %2 級'], only: ['，僅限聯盟', '，僅限部落'], bosses: '共有 %1 個首領（從 %2 到 %3）和 %4 個任務', split: '（聯盟 %1 個，部落 %2 個）', best: '最好的任務獎勵是 %1，來自「%2」。', chains: '其中 %1 個任務需要先完成任務鏈的前置步驟：進本前先接好。' },
};
