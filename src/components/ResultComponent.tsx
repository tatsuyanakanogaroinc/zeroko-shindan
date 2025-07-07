import React from 'react';
import { QuizResult, QuizScores } from '../types/quiz';
import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js';
import { quizResults } from '../data/quizData';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

interface ResultComponentProps {
  result: QuizResult;
  scores: QuizScores;
  onRestart: () => void;
}

const ResultComponent: React.FC<ResultComponentProps> = ({ result, scores, onRestart }) => {
  const chartData = {
    labels: ['自発型', '転機型', '探求型', '内省型'],
    datasets: [
      {
        label: 'スコア',
        data: [scores.自発型, scores.転機型, scores.探求型, scores.内省型],
        backgroundColor: [
          'rgba(240, 77, 255, 0.8)',
          'rgba(14, 165, 233, 0.8)',
          'rgba(34, 197, 94, 0.8)',
          'rgba(168, 85, 247, 0.8)'
        ],
        borderColor: [
          'rgba(240, 77, 255, 1)',
          'rgba(14, 165, 233, 1)',
          'rgba(34, 197, 94, 1)',
          'rgba(168, 85, 247, 1)'
        ],
        borderWidth: 2,
        borderRadius: 8,
      }
    ]
  };

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: {
        display: false
      },
      tooltip: {
        backgroundColor: 'rgba(0, 0, 0, 0.8)',
        titleColor: 'white',
        bodyColor: 'white',
        borderColor: 'rgba(255, 255, 255, 0.2)',
        borderWidth: 1,
        cornerRadius: 8,
        displayColors: false,
        callbacks: {
          label: function(context: any) {
            return `スコア: ${context.parsed.y}`;
          }
        }
      }
    },
    scales: {
      y: {
        beginAtZero: true,
        grid: {
          color: 'rgba(0, 0, 0, 0.1)'
        },
        ticks: {
          color: '#6B7280'
        }
      },
      x: {
        grid: {
          display: false
        },
        ticks: {
          color: '#6B7280',
          font: {
            weight: 'bold' as const
          }
        }
      }
    }
  };

  // 一番スコアが高いタイプを取得
  const maxType = Object.entries(scores).reduce((a, b) => (a[1] >= b[1] ? a : b))[0] as keyof typeof scores;

  // displayNameとjobsをquizResultsから取得
  const displayName = quizResults[maxType]?.displayName || maxType;
  const jobs = quizResults[maxType]?.jobs || [];
  const jobsDetail = quizResults[maxType]?.jobsDetail || '';

  // キャラクター画像マップ
  const characterMap: Record<string, { label: string; img: string }> = {
    '自発型': { label: '🔥リーダーくん', img: '/characters/leader.svg' },
    '転機型': { label: '🌊応援サポーター', img: '/characters/change.svg' },
    '探求型': { label: '🔬研究マスター', img: '/characters/labo.svg' },
    '内省型': { label: '🌙ムードメーカー', img: '/characters/moon.svg' },
  };

  return (
    <div className="flex items-center justify-center" style={{ minHeight: '100vh', padding: '2rem 0' }}>
      <div className="quiz-card" style={{ maxWidth: '800px', width: '100%' }}>
        {/* 結果タイトル */}
        <div className="text-center mb-8">
          <h1 className="text-3xl gradient-text mb-4">
            🎉 診断結果
          </h1>
          <h2 className="text-2xl text-gray-800 mb-2" style={{ fontWeight: '700' }}>
            {result.title}
          </h2>
          <p className="text-lg text-gray-600">
            {result.body}
          </p>
        </div>

        {/* スコアグラフ */}
        <div className="mb-8">
          <h3 className="text-xl text-gray-800 mb-4 text-center" style={{ fontWeight: '600' }}>
            📊 あなたの成長タイプスコア
          </h3>
          <div className="chart-container">
            <Bar data={chartData} options={chartOptions} />
          </div>
        </div>

        {/* 一番多いタイプのキャラクターと説明 */}
        <div className="mb-8 text-center">
          <div style={{ marginBottom: '0.5rem' }}>
            <img
              src={characterMap[maxType].img}
              alt={characterMap[maxType].label}
              style={{ width: '120px', height: '120px', objectFit: 'contain', margin: '0 auto' }}
            />
          </div>
          <div style={{ fontSize: '2rem', fontWeight: 'bold', marginBottom: '0.5rem' }}>
            {characterMap[maxType].label}（{displayName}）
          </div>
          <div style={{ fontSize: '1.3rem', fontWeight: '600', marginBottom: '0.5rem', color: '#4B5563' }}>
            {quizResults[maxType]?.title || result.title}
          </div>
          <div style={{ fontSize: '1.1rem', color: '#6B7280', marginBottom: '0.5rem' }}>
            {quizResults[maxType]?.body || result.body}
          </div>
        </div>

        {/* 4つのカードを2列グリッドで綺麗に並べる */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          {/* おすすめの職業 */}
          <div className="bg-gradient-to-r from-indigo-50 via-purple-50 to-pink-50 rounded-xl p-6 border border-indigo-200 shadow-md flex flex-col justify-between h-full">
            <div>
              <div style={{ fontWeight: '600', color: '#667eea', fontSize: '1.1rem', marginBottom: '0.3rem' }}>
                💼 おすすめの職業
              </div>
              <div style={{ color: '#374151', fontSize: '1rem', marginBottom: '0.5rem' }}>
                {jobs.length > 0 ? jobs.join(' / ') : '（該当なし）'}
              </div>
              <div style={{ color: '#6B7280', fontSize: '0.98rem', lineHeight: 1.7 }}>
                {jobsDetail}
              </div>
            </div>
          </div>

          {/* 詳細解説 */}
          <div className="bg-gradient-to-r from-indigo-50 via-purple-50 to-pink-50 rounded-xl p-6 border border-indigo-200 shadow-md flex flex-col justify-between h-full">
            <div>
              <h4 className="text-lg text-gray-800 mb-3" style={{ fontWeight: '600' }}>
                💭 詳細解説
              </h4>
              <p className="text-gray-700" style={{ lineHeight: '1.6' }}>
                {result.detail}
              </p>
            </div>
          </div>

          {/* ゼロ高での活用方法 */}
          <div className="bg-gradient-to-r from-green-50 via-teal-50 to-lime-50 rounded-xl p-6 border border-green-200 shadow-md flex flex-col justify-between h-full">
            <div>
              <h4 className="text-lg text-gray-800 mb-3" style={{ fontWeight: '600' }}>
                🎯 ゼロ高での活用方法
              </h4>
              <p className="text-gray-700" style={{ lineHeight: '1.6' }}>
                {result.usage}
              </p>
            </div>
          </div>

          {/* あなたへのメッセージ */}
          <div className="bg-gradient-to-r from-purple-50 via-pink-50 to-yellow-50 rounded-xl p-6 border border-purple-200 shadow-md flex flex-col justify-between h-full">
            <div>
              <h4 className="text-lg text-gray-800 mb-3" style={{ fontWeight: '600' }}>
                💌 あなたへのメッセージ
              </h4>
              <p className="text-gray-700" style={{ lineHeight: '1.6' }}>
                {result.student}
              </p>
            </div>
            {result.experienceTips && (
              <div className="mt-4 bg-gradient-to-r from-yellow-50 to-yellow-100 rounded-lg p-4 border border-yellow-200">
                <h4 className="text-base text-gray-800 mb-2" style={{ fontWeight: '600' }}>
                  🌟 インターンでのヒント
                </h4>
                <p className="text-gray-700" style={{ lineHeight: '1.6' }}>
                  {result.experienceTips}
                </p>
              </div>
            )}
          </div>
        </div>

        {/* アクションボタン */}
        <div className="flex flex-col gap-4 justify-center" style={{ gap: '1rem' }}>
          <button
            onClick={onRestart}
            className="btn-primary"
          >
            🔄 もう一度診断する
          </button>
          
          <button
            onClick={() => {
              const text = `私の成長タイプは「${result.type}」です！\n\n${result.title}\n${result.body}\n\n#成長タイプ診断`;
              const url = encodeURIComponent(window.location.href);
              window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${url}`, '_blank');
            }}
            className="btn-secondary"
          >
            📱 結果をシェア
          </button>
        </div>

        {/* フッター */}
        <div className="mt-8 text-center text-sm text-gray-500">
          <p>この診断結果を参考に、あなたらしい成長を続けてください！</p>
        </div>
      </div>
    </div>
  );
};

export default ResultComponent; 