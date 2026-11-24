// Languages of the Atlas (the game's, with esES and esMX as one Spanish) and the site's own texts.
// The addon's texts (src/data/atlas/locales.json, from its Locales/*.lua) cover the game words: level,
// rewards, objectives... These cover what only the site says: titles, descriptions, sections, calls to action.

export const LANGS = ['en', 'es', 'de', 'fr', 'it', 'pt', 'ru', 'ko', 'zh', 'tw'] as const;
export type Lang = (typeof LANGS)[number];
export type Section = 'dungeons' | 'quests' | 'items' | 'chains';

export const LANG: Record<Lang, { name: string; html: string; og: string; sections: Record<Section, string> }> = {
	en: { name: 'English', html: 'en', og: 'en_US', sections: { dungeons: 'dungeons', quests: 'quests', items: 'items', chains: 'quest-chains' } },
	es: { name: 'Español', html: 'es', og: 'es_ES', sections: { dungeons: 'mazmorras', quests: 'misiones', items: 'objetos', chains: 'cadenas' } },
	de: { name: 'Deutsch', html: 'de', og: 'de_DE', sections: { dungeons: 'dungeons', quests: 'quests', items: 'gegenstaende', chains: 'questreihen' } },
	fr: { name: 'Français', html: 'fr', og: 'fr_FR', sections: { dungeons: 'donjons', quests: 'quetes', items: 'objets', chains: 'suites-de-quetes' } },
	it: { name: 'Italiano', html: 'it', og: 'it_IT', sections: { dungeons: 'spedizioni', quests: 'missioni', items: 'oggetti', chains: 'catene' } },
	pt: { name: 'Português', html: 'pt-BR', og: 'pt_BR', sections: { dungeons: 'masmorras', quests: 'missoes', items: 'itens', chains: 'cadeias' } },
	ru: { name: 'Русский', html: 'ru', og: 'ru_RU', sections: { dungeons: 'подземелья', quests: 'задания', items: 'предметы', chains: 'цепочки' } },
	ko: { name: '한국어', html: 'ko', og: 'ko_KR', sections: { dungeons: '던전', quests: '퀘스트', items: '아이템', chains: '연계-퀘스트' } },
	zh: { name: '简体中文', html: 'zh-CN', og: 'zh_CN', sections: { dungeons: '地下城', quests: '任务', items: '物品', chains: '任务链' } },
	tw: { name: '繁體中文', html: 'zh-TW', og: 'zh_TW', sections: { dungeons: '地城', quests: '任務', items: '物品', chains: '任務鏈' } },
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
