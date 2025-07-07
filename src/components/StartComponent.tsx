import React from 'react';

interface StartComponentProps {
  onStart: () => void;
}

const StartComponent: React.FC<StartComponentProps> = ({ onStart }) => {
  return (
    <div className="flex items-center justify-center bg-gradient-to-br from-indigo-200 via-purple-100 to-pink-100" style={{ minHeight: '100vh' }}>
      <div className="quiz-card text-center shadow-xl rounded-2xl p-10" style={{ background: 'rgba(255,255,255,0.95)', maxWidth: 480, width: '100%' }}>
        <div className="mb-8">
          <h1 className="text-4xl gradient-text mb-4 font-extrabold" style={{ letterSpacing: '0.05em' }}>
            🌱 ゼロ高成長タイプ診断
          </h1>
          <p className="text-xl text-gray-600 mb-6">
            あなたらしい成長スタイルを見つけよう！
          </p>
        </div>

        <div className="space-y-6 mb-8">
          <div className="flex items-center justify-center space-x-4 text-sm text-gray-600">
            <div className="flex items-center space-x-2">
              <span style={{ width: '16px', height: '16px', backgroundColor: '#f04dff', borderRadius: '50%', display: 'inline-block' }}></span>
              <span>自発型</span>
            </div>
            <div className="flex items-center space-x-2">
              <span style={{ width: '16px', height: '16px', backgroundColor: '#0ea5e9', borderRadius: '50%', display: 'inline-block' }}></span>
              <span>転機型</span>
            </div>
            <div className="flex items-center space-x-2">
              <span style={{ width: '16px', height: '16px', backgroundColor: '#22c55e', borderRadius: '50%', display: 'inline-block' }}></span>
              <span>探求型</span>
            </div>
            <div className="flex items-center space-x-2">
              <span style={{ width: '16px', height: '16px', backgroundColor: '#a855f7', borderRadius: '50%', display: 'inline-block' }}></span>
              <span>内省型</span>
            </div>
          </div>

          <div className="bg-gradient-to-r from-indigo-100 via-purple-100 to-pink-100 rounded-xl p-6 border border-indigo-200">
            <h3 className="text-lg mb-3 text-gray-800 font-semibold">
              📝 診断について
            </h3>
            <ul className="text-left text-gray-600 space-y-2" style={{ fontSize: '1rem', listStyle: 'disc', paddingLeft: '1.2em' }}>
              <li>全10問の質問に答えてください</li>
              <li>直感で答えるのがおすすめです</li>
              <li>約3分で完了できます</li>
              <li>結果は4つの成長タイプで判定されます</li>
            </ul>
          </div>
        </div>

        <button
          onClick={onStart}
          className="btn-primary text-lg py-4 px-10 rounded-full shadow-md transition-transform hover:scale-105"
          style={{ fontSize: '20px', fontWeight: 700, background: 'linear-gradient(90deg, #667eea 0%, #f04dff 100%)', color: 'white', border: 'none' }}
        >
          🚀 診断を始める
        </button>

        <div className="mt-12">
          <div className="text-center mb-4 text-gray-700 font-semibold" style={{ fontSize: '1.1rem' }}>
            ▼ 診断結果イメージ
          </div>
          <div className="flex flex-col items-center justify-center">
            <div className="rounded-xl shadow-md p-6 bg-white/90" style={{ maxWidth: 320, width: '100%' }}>
              <img src="/characters/leader.svg" alt="リーダーくん" style={{ width: 80, height: 80, objectFit: 'contain', margin: '0 auto 0.5rem' }} />
              <div style={{ fontSize: '1.3rem', fontWeight: 'bold', marginBottom: '0.3rem' }}>🔥リーダーくん（自発型）</div>
              <div style={{ fontSize: '1.1rem', color: '#4B5563', marginBottom: '0.2rem' }}>挑戦の旗を掲げるリーダータイプ</div>
              <div style={{ fontSize: '0.98rem', color: '#6B7280' }}>
                自ら動き出す力が強く、周囲に影響を与える存在。エネルギーと実行力が際立ちます。
              </div>
            </div>
          </div>
        </div>

        <div className="mt-8 text-sm text-gray-500">
          <p>あなたの成長スタイルを発見して、</p>
          <p>今後の学びや経験に活かしましょう！</p>
        </div>
      </div>
    </div>
  );
};

export default StartComponent; 