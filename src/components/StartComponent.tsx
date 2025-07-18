import React, { useState, useEffect } from 'react';
import { getAllCharacters, Character } from '../data/characterData';

interface StartComponentProps {
  onStart: () => void;
}

const StartComponent: React.FC<StartComponentProps> = ({ onStart }) => {
  const [currentCharacter, setCurrentCharacter] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const characters = getAllCharacters();

  useEffect(() => {
    setIsVisible(true);
    const interval = setInterval(() => {
      setCurrentCharacter((prev) => (prev + 1) % characters.length);
    }, 3000);
    return () => clearInterval(interval);
  }, [characters.length]);

  return (
    <div className="flex items-center justify-center bg-gradient-to-br from-indigo-200 via-purple-100 to-pink-100" style={{ minHeight: '100vh', padding: '1rem' }}>
      <div 
        className={`quiz-card text-center shadow-2xl rounded-3xl p-8 transition-all duration-1000 ${isVisible ? 'opacity-100 transform translate-y-0' : 'opacity-0 transform translate-y-8'}`} 
        style={{ 
          background: 'rgba(255,255,255,0.95)', 
          maxWidth: 520, 
          width: '100%',
          backdropFilter: 'blur(10px)',
          border: '1px solid rgba(255,255,255,0.3)'
        }}
      >
        {/* ヘッダー部分 */}
        <div className="mb-8">
          <div className="flex justify-center mb-4">
            <div className="relative">
              <h1 className="text-5xl gradient-text font-extrabold" style={{ 
                letterSpacing: '0.05em',
                background: 'linear-gradient(135deg, #667eea 0%, #764ba2 50%, #f04dff 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text'
              }}>
                🌱 成長タイプ診断
              </h1>
              <div className="absolute -top-2 -right-2 animate-bounce">
                ✨
              </div>
            </div>
          </div>
          <p className="text-xl text-gray-700 mb-2 font-medium">
            あなたらしい成長スタイルを見つけよう！
          </p>
          <p className="text-sm text-gray-500">
            ゼロ高生のための個性診断
          </p>
        </div>

        {/* キャラクター紹介部分 */}
        <div className="mb-8">
          <div 
            className="rounded-3xl p-6 shadow-lg border-2 transition-all duration-500"
            style={{ 
              background: `linear-gradient(135deg, ${characters[currentCharacter].color}15, ${characters[currentCharacter].color}08)`,
              borderColor: characters[currentCharacter].color + '40'
            }}
          >
            <div className="flex justify-center mb-4">
              <div className="relative">
                <div 
                  className="w-24 h-24 rounded-full flex items-center justify-center shadow-lg animate-float"
                  style={{ 
                    background: `linear-gradient(135deg, ${characters[currentCharacter].color}dd, ${characters[currentCharacter].color}aa)`,
                  }}
                >
                  <img 
                    src={characters[currentCharacter].image} 
                    alt={characters[currentCharacter].name}
                    className="w-16 h-16 transition-all duration-500 hover:scale-110"
                    style={{ 
                      filter: 'brightness(1.1) drop-shadow(0 2px 4px rgba(0,0,0,0.2))'
                    }} 
                  />
                </div>
                <div 
                  className="absolute -top-1 -right-1 w-8 h-8 rounded-full flex items-center justify-center text-lg animate-bounce"
                  style={{ backgroundColor: characters[currentCharacter].color }}
                >
                  {characters[currentCharacter].emoji}
                </div>
              </div>
            </div>
            
            <div className="text-center space-y-2">
              <div className="flex items-center justify-center space-x-2">
                <h3 className="text-xl font-bold" style={{ color: characters[currentCharacter].color }}>
                  {characters[currentCharacter].name}
                </h3>
                <span className="text-sm px-2 py-1 rounded-full text-white font-medium" style={{ backgroundColor: characters[currentCharacter].color }}>
                  {characters[currentCharacter].nickname}
                </span>
              </div>
              
              <p className="text-sm font-medium text-gray-700">
                {characters[currentCharacter].personality.join(' • ')}
              </p>
              
              <p className="text-sm text-gray-600 italic">
                {characters[currentCharacter].catchphrase}
              </p>
              
              <div className="flex flex-wrap justify-center gap-2 mt-3">
                {characters[currentCharacter].strengths.slice(0, 3).map((strength: string, index: number) => (
                  <span 
                    key={index}
                    className="text-xs px-2 py-1 rounded-full text-white"
                    style={{ backgroundColor: characters[currentCharacter].color + 'aa' }}
                  >
                    {strength}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* 統計情報 */}
        <div className="mb-8">
          <div className="grid grid-cols-3 gap-4 mb-6">
            <div className="bg-gradient-to-br from-pink-100 to-pink-50 rounded-xl p-4 shadow-sm">
              <div className="text-2xl font-bold text-pink-600">10</div>
              <div className="text-xs text-gray-600">質問数</div>
            </div>
            <div className="bg-gradient-to-br from-blue-100 to-blue-50 rounded-xl p-4 shadow-sm">
              <div className="text-2xl font-bold text-blue-600">3分</div>
              <div className="text-xs text-gray-600">所要時間</div>
            </div>
            <div className="bg-gradient-to-br from-green-100 to-green-50 rounded-xl p-4 shadow-sm">
              <div className="text-2xl font-bold text-green-600">4+</div>
              <div className="text-xs text-gray-600">タイプ数</div>
            </div>
          </div>

          <div className="bg-gradient-to-r from-indigo-50 via-purple-50 to-pink-50 rounded-2xl p-6 border border-indigo-100 shadow-inner">
            <h3 className="text-lg mb-4 text-gray-800 font-bold flex items-center justify-center">
              <span className="mr-2">🎯</span>
              診断の特徴
            </h3>
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div className="flex items-center space-x-2">
                <span className="text-green-500">✓</span>
                <span className="text-gray-700">直感的な回答</span>
              </div>
              <div className="flex items-center space-x-2">
                <span className="text-green-500">✓</span>
                <span className="text-gray-700">個性重視の判定</span>
              </div>
              <div className="flex items-center space-x-2">
                <span className="text-green-500">✓</span>
                <span className="text-gray-700">詳細な結果分析</span>
              </div>
              <div className="flex items-center space-x-2">
                <span className="text-green-500">✓</span>
                <span className="text-gray-700">将来への活用法</span>
              </div>
            </div>
          </div>
        </div>

        {/* 4つのタイプ紹介 */}
        <div className="mb-8">
          <h3 className="text-lg font-bold text-gray-800 mb-4">🌟 4つの成長タイプ</h3>
          <div className="grid grid-cols-2 gap-3">
            {characters.map((char: Character, index: number) => (
              <div 
                key={char.id}
                className={`p-3 rounded-xl transition-all duration-300 cursor-pointer hover:scale-105 ${
                  currentCharacter === index ? 'shadow-lg' : 'shadow-sm'
                }`}
                style={{ 
                  background: currentCharacter === index 
                    ? `linear-gradient(135deg, ${char.color}20, ${char.color}10)` 
                    : 'rgba(255,255,255,0.7)',
                  border: currentCharacter === index ? `2px solid ${char.color}` : '1px solid rgba(0,0,0,0.1)'
                }}
                onClick={() => setCurrentCharacter(index)}
              >
                <div className="flex items-center justify-center mb-2">
                  <span className="text-lg">{char.emoji}</span>
                </div>
                <div className="text-xs font-bold mb-1" style={{ color: char.color }}>
                  {char.name}
                </div>
                <div className="text-xs text-gray-600">
                  {char.type}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* スタートボタン */}
        <div className="mb-8">
          <button
            onClick={onStart}
            className="relative overflow-hidden group transition-all duration-300 hover:scale-105 hover:shadow-xl"
            style={{ 
              fontSize: '18px', 
              fontWeight: 700, 
              background: 'linear-gradient(135deg, #667eea 0%, #764ba2 50%, #f04dff 100%)', 
              color: 'white', 
              border: 'none',
              borderRadius: '50px',
              padding: '16px 40px',
              position: 'relative'
            }}
          >
            <span className="relative z-10 flex items-center justify-center">
              <span className="mr-2 text-xl">🚀</span>
              診断をスタート！
            </span>
            <div className="absolute inset-0 bg-gradient-to-r from-pink-400 to-purple-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          </button>
          <p className="text-xs text-gray-500 mt-3">
            ※ 回答データは匿名で統計目的のみに使用されます
          </p>
        </div>

        {/* 結果プレビュー */}
        <div className="mb-6">
          <div className="text-center mb-4">
            <h4 className="text-lg font-bold text-gray-700 flex items-center justify-center">
              <span className="mr-2">📊</span>
              診断結果の例
            </h4>
            <p className="text-sm text-gray-500">こんな詳細な分析が得られます</p>
          </div>
          
          <div className="bg-gradient-to-br from-white to-gray-50 rounded-2xl p-6 shadow-lg border border-gray-100">
            <div className="flex items-center justify-center mb-4">
              <img 
                src={characters[currentCharacter].image} 
                alt={characters[currentCharacter].name}
                className="w-16 h-16 mr-4"
              />
              <div className="text-left">
                <div className="text-lg font-bold" style={{ color: characters[currentCharacter].color }}>
                  {characters[currentCharacter].name}
                </div>
                <div className="text-sm text-gray-600">
                  {characters[currentCharacter].type}タイプ
                </div>
              </div>
            </div>
            
            <div className="space-y-3">
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-600">適職分析</span>
                <span className="text-green-600 font-semibold">✓ 含まれます</span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-600">成長アドバイス</span>
                <span className="text-green-600 font-semibold">✓ 含まれます</span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-600">スコア詳細</span>
                <span className="text-green-600 font-semibold">✓ 含まれます</span>
              </div>
            </div>
          </div>
        </div>

        {/* フッター */}
        <div className="text-center">
          <div className="flex items-center justify-center space-x-4 text-xs text-gray-400 mb-2">
            <span>🎓 ゼロ高生専用</span>
            <span>•</span>
            <span>🔒 プライバシー保護</span>
            <span>•</span>
            <span>📱 スマホ対応</span>
          </div>
          <p className="text-xs text-gray-500">
            あなたらしい成長の道筋を見つけましょう
          </p>
        </div>
      </div>
    </div>
  );
};

export default StartComponent; 