import React, { useState } from 'react';
import { QuizResult, QuizScores } from '../types/quiz';
import { submitQuizResult, getOrCreateAnonymousId, QuizSubmissionData } from '../utils/api';
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

const typeIcons: Record<string, string> = {
  '自発型': '/icons/rocket.svg',
  '転機型': '/icons/handshake.svg',
  '探求型': '/icons/search.svg',
  '内省型': '/icons/heart.svg',
};

function getResultIcons(type: string) {
  // ミックスタイプは「・」区切り
  const types = type.split('・');
  return types.map((t) => typeIcons[t] || typeIcons['自発型']);
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

  // アイコン取得
  const icons = getResultIcons(result.type);

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
          <div style={{ display: 'flex', justifyContent: 'center', gap: '1rem', marginBottom: '1rem' }}>
            {icons.map((icon, idx) => (
              <img
                key={icon + idx}
                src={icon}
                alt="タイプアイコン"
                style={{ width: 64, height: 64, objectFit: 'contain', background: '#f9fafb', borderRadius: 16, border: '1px solid #eee', boxShadow: '0 2px 8px rgba(0,0,0,0.06)' }}
              />
            ))}
          </div>
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

        {/* 詳細説明 */}
        <div className="grid grid-cols-2 gap-6 mb-8">
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

            {result.experienceTips && (
              <div className="bg-gradient-yellow rounded-xl p-6">
                <h4 className="text-lg text-gray-800 mb-3" style={{ fontWeight: '600' }}>
                  🌟 インターンでのヒント
                </h4>
                <p className="text-gray-700" style={{ lineHeight: '1.6' }}>
                  {result.experienceTips}
                </p>
              </div>
            )}
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