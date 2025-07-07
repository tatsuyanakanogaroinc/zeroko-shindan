import { QuizScores } from '../types/quiz';
import { quizResults } from '../data/quizData';
import { QuizQuestion } from '../types/quiz';

export const calculateScores = (answers: { questionId: number; selectedOption: number }[], questions: QuizQuestion[]): QuizScores => {
  const scores: QuizScores = {
    自発型: 0,
    転機型: 0,
    探求型: 0,
    内省型: 0
  };

  answers.forEach(answer => {
    const question = questions.find(q => q.id === answer.questionId);
    if (question) {
      const selectedOption = question.options[answer.selectedOption];
      scores[selectedOption.type] += selectedOption.weight;
    }
  });

  return scores;
};

export const determineResult = (scores: QuizScores): string => {
  const maxScore = Math.max(...Object.values(scores));
  const maxTypes = Object.entries(scores)
    .filter(([_, score]) => score === maxScore)
    .map(([type, _]) => type);

  if (maxTypes.length === 1) {
    return maxTypes[0];
  } else if (maxTypes.length === 2) {
    return `${maxTypes[0]}・${maxTypes[1]}`;
  } else if (maxTypes.length === 3) {
    return `${maxTypes[0]}・${maxTypes[1]}・${maxTypes[2]}`;
  } else {
    // 4つ同点の場合は最初のタイプを返す
    return maxTypes[0];
  }
};

export const getResultData = (resultType: string) => {
  return quizResults[resultType] || quizResults["自発型"];
};

export const getScorePercentage = (score: number, maxPossibleScore: number): number => {
  return Math.round((score / maxPossibleScore) * 100);
}; 