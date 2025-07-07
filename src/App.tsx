import { useState } from 'react';
import { QuizQuestion, QuizResult, QuizScores } from './types/quiz';
import { quizQuestions } from './data/quizData';
import { calculateScores, determineResult, getResultData } from './utils/quizLogic';
import QuizComponent from './components/QuizComponent';
import ResultComponent from './components/ResultComponent';
import StartComponent from './components/StartComponent';

type QuizState = 'start' | 'quiz' | 'result';

function shuffleArray<T>(array: T[]): T[] {
  const arr = [...array];
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

function App() {
  const [currentState, setCurrentState] = useState<QuizState>('start');
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<{ questionId: number; selectedOption: number }[]>([]);
  const [result, setResult] = useState<QuizResult | null>(null);
  const [scores, setScores] = useState<QuizScores | null>(null);
  const [shuffledQuestions, setShuffledQuestions] = useState<QuizQuestion[]>([]);

  const handleStartQuiz = () => {
    // 質問と選択肢をシャッフル
    const shuffled = shuffleArray(quizQuestions).map(q => ({
      ...q,
      options: shuffleArray(q.options)
    }));
    setShuffledQuestions(shuffled);
    setCurrentState('quiz');
    setCurrentQuestion(0);
    setAnswers([]);
    setResult(null);
    setScores(null);
  };

  const handleAnswerSelect = (selectedOption: number) => {
    const newAnswers = [...answers];
    const existingAnswerIndex = newAnswers.findIndex(a => a.questionId === shuffledQuestions[currentQuestion].id);
    if (existingAnswerIndex >= 0) {
      newAnswers[existingAnswerIndex].selectedOption = selectedOption;
    } else {
      newAnswers.push({
        questionId: shuffledQuestions[currentQuestion].id,
        selectedOption
      });
    }
    setAnswers(newAnswers);
  };

  const handleNextQuestion = () => {
    if (currentQuestion < shuffledQuestions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      // 診断完了
      const finalScores = calculateScores(answers, shuffledQuestions);
      const resultType = determineResult(finalScores);
      const resultData = getResultData(resultType);
      setScores(finalScores);
      setResult(resultData);
      setCurrentState('result');
    }
  };

  const handleRestart = () => {
    setCurrentState('start');
    setCurrentQuestion(0);
    setAnswers([]);
    setResult(null);
    setScores(null);
    setShuffledQuestions([]);
  };

  return (
    <div style={{ 
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'
    }}>
      <div className="container" style={{ padding: '2rem 1rem' }}>
        {currentState === 'start' && (
          <StartComponent onStart={handleStartQuiz} />
        )}
        {currentState === 'quiz' && shuffledQuestions.length > 0 && (
          <QuizComponent
            question={shuffledQuestions[currentQuestion]}
            currentQuestion={currentQuestion + 1}
            totalQuestions={shuffledQuestions.length}
            selectedOption={answers.find(a => a.questionId === shuffledQuestions[currentQuestion].id)?.selectedOption}
            onAnswerSelect={handleAnswerSelect}
            onNext={handleNextQuestion}
          />
        )}
        {currentState === 'result' && result && scores && (
          <ResultComponent
            result={result}
            scores={scores}
            onRestart={handleRestart}
          />
        )}
      </div>
    </div>
  );
}

export default App; 