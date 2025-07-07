import React from 'react';
import { QuizQuestion } from '../types/quiz';

interface QuizComponentProps {
  question: QuizQuestion;
  currentQuestion: number;
  totalQuestions: number;
  selectedOption: number | undefined;
  onAnswerSelect: (optionIndex: number) => void;
  onNext: () => void;
}

const QuizComponent: React.FC<QuizComponentProps> = ({
  question,
  currentQuestion,
  totalQuestions,
  selectedOption,
  onAnswerSelect,
  onNext
}) => {
  const progress = (currentQuestion / totalQuestions) * 100;

  return (
    <div className="flex items-center justify-center" style={{ minHeight: '100vh' }}>
      <div className="quiz-card" style={{ maxWidth: '600px', width: '100%' }}>
        {/* プログレスバー */}
        <div className="mb-6">
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm text-gray-600" style={{ fontWeight: '500' }}>
              質問 {currentQuestion} / {totalQuestions}
            </span>
            <span className="text-sm text-gray-500">
              {Math.round(progress)}%
            </span>
          </div>
          <div className="progress-bar">
            <div 
              className="progress-fill"
              style={{ width: `${progress}%` }}
            ></div>
          </div>
        </div>

        {/* 質問 */}
        <div className="mb-8">
          <h2 className="text-2xl text-gray-800 mb-6" style={{ fontWeight: '700', lineHeight: '1.4' }}>
            {question.question}
          </h2>
        </div>

        {/* 選択肢 */}
        <div className="space-y-4 mb-8">
          {question.options.map((option, index) => (
            <div
              key={index}
              className={`option-card ${
                selectedOption === index ? 'selected' : ''
              }`}
              onClick={() => onAnswerSelect(index)}
            >
              <div className="flex items-start space-x-3">
                <div style={{
                  width: '24px',
                  height: '24px',
                  borderRadius: '50%',
                  border: `2px solid ${selectedOption === index ? '#f04dff' : '#d1d5db'}`,
                  backgroundColor: selectedOption === index ? '#f04dff' : 'transparent',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginTop: '2px'
                }}>
                  {selectedOption === index && (
                    <div style={{
                      width: '8px',
                      height: '8px',
                      backgroundColor: 'white',
                      borderRadius: '50%'
                    }}></div>
                  )}
                </div>
                <span className="text-gray-700" style={{ lineHeight: '1.5' }}>
                  {option.text}
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* 次へボタン */}
        <div className="flex justify-end">
          <button
            onClick={onNext}
            disabled={selectedOption === undefined}
            className={`btn-primary ${
              selectedOption === undefined 
                ? 'opacity-50 cursor-not-allowed' 
                : ''
            }`}
            style={{
              transform: selectedOption === undefined ? 'none' : 'translateY(0)'
            }}
          >
            {currentQuestion === totalQuestions ? '結果を見る' : '次へ'}
          </button>
        </div>

        {/* ヒント */}
        <div className="mt-6 text-center">
          <p className="text-sm text-gray-500">
            💡 直感で選んでみてください！
          </p>
        </div>
      </div>
    </div>
  );
};

export default QuizComponent; 