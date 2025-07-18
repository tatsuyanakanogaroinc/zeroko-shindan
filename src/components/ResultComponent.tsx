import React, { useState } from 'react';
import { QuizResult, QuizScores, GrowthType } from '../types/quiz';
import { submitQuizResult, getOrCreateAnonymousId, QuizSubmissionData } from '../utils/api';
import { getCharacterByType } from '../data/characterData';
import type { Character } from '../data/characterData';
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

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

function getResultCharacters(type: string): Character[] {
  // ミックスタイプは「・」区切り
  const types = type.split('・') as GrowthType[];
  return types.map((t) => getCharacterByType(t));
}

interface ResultComponentProps {
  result: QuizResult;
  scores: QuizScores;
  answers: { questionId: number; selectedOption: number }[];
  nickname: string;
  onRestart: () => void;
}

const ResultComponent: React.FC<ResultComponentProps> = ({ result, scores, answers, nickname, onRestart }) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [submitMessage, setSubmitMessage] = useState('');

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

  // キャラクター取得
  const resultCharacters = getResultCharacters(result.type);

  // 診断結果を送信する関数
  const handleSubmitResult = async () => {
    setIsSubmitting(true);
    setSubmitStatus('idle');
    setSubmitMessage('');

    try {
      const userId = getOrCreateAnonymousId();
      
      const submissionData: QuizSubmissionData = {
        nickname,
        userId,
        result,
        scores,
        answers
      };

      const response = await submitQuizResult(submissionData);
      
      if (response.success) {
        setSubmitStatus('success');
        setSubmitMessage('診断結果が記録されました！');
      } else {
        setSubmitStatus('error');
        setSubmitMessage(response.error || '送信に失敗しました');
      }
    } catch (error) {
      setSubmitStatus('error');
      setSubmitMessage('送信に失敗しました');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="flex items-center justify-center" style={{ minHeight: '100vh', padding: '2rem 0' }}>
      <div className="quiz-card" style={{ maxWidth: '800px', width: '100%' }}>
        {/* 結果タイトル */}
        <div className="text-center mb-8">
          <div className="flex justify-center gap-4 mb-6">
            {resultCharacters.map((character, idx) => (
              <div 
                key={character.id}
                className="relative animate-float"
                style={{ animationDelay: `${idx * 0.2}s` }}
              >
                <div 
                  className="w-20 h-20 rounded-full flex items-center justify-center shadow-lg"
                  style={{ 
                    background: `linear-gradient(135deg, ${character.color}dd, ${character.color}aa)`,
                  }}
                >
                  <img
                    src={character.image}
                    alt={character.name}
                    className="w-14 h-14"
                    style={{ 
                      filter: 'brightness(1.1) drop-shadow(0 2px 4px rgba(0,0,0,0.2))'
                    }}
                  />
                </div>
                <div 
                  className="absolute -top-1 -right-1 w-6 h-6 rounded-full flex items-center justify-center text-sm animate-bounce"
                  style={{ backgroundColor: character.color }}
                >
                  {character.emoji}
                </div>
                <div className="mt-2 text-center">
                  <div className="text-sm font-bold" style={{ color: character.color }}>
                    {character.name}
                  </div>
                  <div className="text-xs text-gray-600">
                    {character.nickname}
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          <h1 className="text-4xl gradient-text mb-4 font-extrabold">
            🎉 診断結果発表！
          </h1>
          
          <div className="mb-4">
            <h2 className="text-3xl font-bold mb-2" style={{ 
              color: resultCharacters[0].color,
              textShadow: '0 2px 4px rgba(0,0,0,0.1)'
            }}>
              {result.title}
            </h2>
            <p className="text-lg text-gray-700 font-medium">
              {result.body}
            </p>
          </div>

          {/* タイプの特徴表示 */}
          <div className="flex flex-wrap justify-center gap-2 mb-4">
            <span className="px-3 py-1 rounded-full text-sm font-medium text-white bg-purple-500">
              #{result.type}
            </span>
          </div>

          {/* キャッチフレーズ */}
          <div className="bg-gradient-to-r from-gray-50 to-white rounded-2xl p-4 shadow-inner">
            <p className="text-lg font-medium text-gray-700 italic">
              {resultCharacters[0].catchphrase}
            </p>
          </div>
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

        {/* キャラクター詳細情報 */}
        <div className="mb-8">
          <div className="bg-gradient-to-r from-gray-50 to-white rounded-2xl p-6 shadow-lg border border-gray-100">
            <div className="flex items-center justify-center mb-4">
              <h3 className="text-xl font-bold text-gray-800 flex items-center">
                <span className="mr-2">{resultCharacters[0]?.emoji || '🌟'}</span>
                {result.type}タイプの特徴
              </h3>
            </div>
            
            <div className="text-center">
              <p className="text-lg text-gray-700 font-medium">
                {result.body}
              </p>
            </div>
          </div>
        </div>

        {/* 詳細説明 */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <div className="space-y-4">
            <div className="bg-gradient-primary rounded-xl p-6">
              <h4 className="text-lg text-gray-800 mb-3" style={{ fontWeight: '600' }}>
                💭 詳細解説
              </h4>
              <p className="text-gray-700" style={{ lineHeight: '1.6' }}>
                {result.detail}
              </p>
            </div>

            <div className="bg-gradient-green rounded-xl p-6">
              <h4 className="text-lg text-gray-800 mb-3" style={{ fontWeight: '600' }}>
                🎯 活用方法
              </h4>
              <p className="text-gray-700" style={{ lineHeight: '1.6' }}>
                {result.usage}
              </p>
            </div>
          </div>

          <div className="space-y-4">
            <div className="bg-gradient-purple rounded-xl p-6">
              <h4 className="text-lg text-gray-800 mb-3" style={{ fontWeight: '600' }}>
                💌 あなたへのメッセージ
              </h4>
              <p className="text-gray-700" style={{ lineHeight: '1.6' }}>
                {result.student}
              </p>
            </div>

            {/* 適職情報 */}
            <div className="bg-gradient-yellow rounded-xl p-6">
              <h4 className="text-lg text-gray-800 mb-3" style={{ fontWeight: '600' }}>
                💼 向いている職業
              </h4>
              <div className="flex flex-wrap gap-2 mb-3">
                {(result as any).jobs?.map((job: string, index: number) => (
                  <span 
                    key={index}
                    className="px-3 py-1 bg-yellow-200 text-yellow-800 rounded-full text-sm font-medium"
                  >
                    {job}
                  </span>
                ))}
              </div>
              <p className="text-gray-700 text-sm" style={{ lineHeight: '1.6' }}>
                {(result as any).jobsDetail}
              </p>
            </div>
          </div>
        </div>

        {/* 成長のヒント */}
        <div className="mb-8">
          <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl p-6 border border-blue-100">
            <h4 className="text-lg text-gray-800 mb-3 text-center" style={{ fontWeight: '600' }}>
              🌱 成長のヒント
            </h4>
            <div className="text-center">
              <p className="text-gray-700">
                あなたの{result.type}としての特性を活かして、自分らしい成長を続けていきましょう！
              </p>
            </div>
          </div>
        </div>

        {/* 送信状態表示 */}
        {submitStatus !== 'idle' && (
          <div className="mb-6 p-4 rounded-lg text-center" style={{
            backgroundColor: submitStatus === 'success' ? 'rgba(34, 197, 94, 0.1)' : 'rgba(239, 68, 68, 0.1)',
            border: `1px solid ${submitStatus === 'success' ? '#22c55e' : '#ef4444'}`
          }}>
            <p style={{
              color: submitStatus === 'success' ? '#22c55e' : '#ef4444',
              fontWeight: '600'
            }}>
              {submitMessage}
            </p>
          </div>
        )}

        {/* アクションボタン */}
        <div className="flex flex-col gap-4 justify-center" style={{ gap: '1rem' }}>
          <button
            onClick={handleSubmitResult}
            disabled={isSubmitting}
            className="btn-primary"
            style={{
              opacity: isSubmitting ? 0.7 : 1,
              cursor: isSubmitting ? 'not-allowed' : 'pointer'
            }}
          >
            {isSubmitting ? '📤 送信中...' : '📊 結果を記録する'}
          </button>
          
          <button
            onClick={onRestart}
            className="btn-secondary"
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