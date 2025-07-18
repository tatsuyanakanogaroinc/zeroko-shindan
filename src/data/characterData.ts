export interface Character {
  id: string;
  name: string;
  nickname: string;
  type: '自発型' | '転機型' | '探求型' | '内省型';
  color: string;
  gradientColors: string[];
  image: string;
  personality: string;
  catchphrase: string;
  description: string;
  strengths: string[];
  hobbies: string[];
  favoriteWords: string;
  emoji: string;
  bgPattern: string;
}

export const characters: Character[] = [
  {
    id: 'leader',
    name: 'アクト',
    nickname: 'チャレンジャー',
    type: '自発型',
    color: '#f04dff',
    gradientColors: ['#f04dff', '#ff6b9d'],
    image: '/characters/leader.svg',
    personality: '積極的で行動力抜群！',
    catchphrase: '「やってみなきゃ分からない！」',
    description: '新しいことに挑戦するのが大好きで、みんなを引っ張っていくリーダータイプ。失敗を恐れず、どんどん前に進んでいく勇気の持ち主です。',
    strengths: ['リーダーシップ', '実行力', 'ポジティブ思考', 'チームワーク'],
    hobbies: ['スポーツ', 'イベント企画', '新しい場所探索', 'チーム活動'],
    favoriteWords: '挑戦・行動・仲間・成長',
    emoji: '🔥',
    bgPattern: 'radial-gradient(circle at 20% 80%, #f04dff22 0%, transparent 50%), radial-gradient(circle at 80% 20%, #ff6b9d22 0%, transparent 50%)'
  },
  {
    id: 'change',
    name: 'ハルカ',
    nickname: 'エンパシー',
    type: '転機型',
    color: '#0ea5e9',
    gradientColors: ['#0ea5e9', '#38bdf8'],
    image: '/characters/change.svg',
    personality: '共感力が高く、変化を楽しむ！',
    catchphrase: '「みんなと一緒だから頑張れる！」',
    description: '人との出会いや新しい体験から刺激を受けて成長するタイプ。周りの人の気持ちに敏感で、みんなで一緒に変化していくことを大切にします。',
    strengths: ['共感力', '適応力', 'コミュニケーション', '協調性'],
    hobbies: ['友達との時間', '映画鑑賞', 'カフェ巡り', 'ボランティア'],
    favoriteWords: '共感・変化・つながり・成長',
    emoji: '🌊',
    bgPattern: 'radial-gradient(circle at 30% 70%, #0ea5e922 0%, transparent 50%), radial-gradient(circle at 70% 30%, #38bdf822 0%, transparent 50%)'
  },
  {
    id: 'research',
    name: 'ケント',
    nickname: 'シンカー',
    type: '探求型',
    color: '#22c55e',
    gradientColors: ['#22c55e', '#4ade80'],
    image: '/characters/labo.svg',
    personality: '知的好奇心旺盛な探究者！',
    catchphrase: '「なぜだろう？もっと知りたい！」',
    description: '興味を持ったことはとことん調べて、自分なりの答えを見つけるのが得意。じっくり考えて、納得してから行動する慎重派です。',
    strengths: ['分析力', '集中力', '論理思考', '継続力'],
    hobbies: ['読書', '実験', 'パズル', 'プログラミング'],
    favoriteWords: '探究・発見・理解・深掘り',
    emoji: '🔬',
    bgPattern: 'radial-gradient(circle at 25% 75%, #22c55e22 0%, transparent 50%), radial-gradient(circle at 75% 25%, #4ade8022 0%, transparent 50%)'
  },
  {
    id: 'reflection',
    name: 'ユメ',
    nickname: 'ドリーマー',
    type: '内省型',
    color: '#a855f7',
    gradientColors: ['#a855f7', '#c084fc'],
    image: '/characters/moon.svg',
    personality: '感受性豊かな芸術家気質！',
    catchphrase: '「心の声を大切にしたい」',
    description: '自分の気持ちや感情を大切にして、それを表現することが得意。静かな時間の中で、深く物事を考える繊細で優しい心の持ち主です。',
    strengths: ['感受性', '表現力', '創造性', '共感力'],
    hobbies: ['アート', '音楽', '詩・小説', '自然散策'],
    favoriteWords: '感性・表現・静寂・美しさ',
    emoji: '🌙',
    bgPattern: 'radial-gradient(circle at 40% 60%, #a855f722 0%, transparent 50%), radial-gradient(circle at 60% 40%, #c084fc22 0%, transparent 50%)'
  }
];

export const getCharacterByType = (type: string): Character => {
  return characters.find(char => char.type === type) || characters[0];
};

export const getCharacterById = (id: string): Character => {
  return characters.find(char => char.id === id) || characters[0];
};