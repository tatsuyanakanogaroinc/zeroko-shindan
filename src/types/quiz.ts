export type GrowthType = '自発型' | '転機型' | '探求型' | '内省型';

export interface QuizOption {
  text: string;
  type: GrowthType;
  weight: number;
}

export interface QuizQuestion {
  id: number;
  question: string;
  options: QuizOption[];
}

export interface QuizResult {
  type: GrowthType | string; // ミックスタイプの場合は文字列
  title: string;
  body: string;
  detail: string;
  usage: string;
  student: string;
  experienceTips?: string;
}

export interface QuizScores {
  自発型: number;
  転機型: number;
  探求型: number;
  内省型: number;
} 