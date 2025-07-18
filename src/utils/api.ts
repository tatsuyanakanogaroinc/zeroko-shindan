// 診断結果をGoogle Apps Scriptに送信するAPI関数

export interface QuizSubmissionData {
  nickname: string;
  userId?: string;
  result: {
    type: string;
    title: string;
    body: string;
    detail: string;
    usage: string;
    student: string;
    experienceTips?: string;
  };
  scores: {
    自発型: number;
    転機型: number;
    探求型: number;
    内省型: number;
  };
  answers: { questionId: number; selectedOption: number }[];
  userAgent?: string;
  ipAddress?: string;
}

// Google Apps ScriptのWebアプリURL（デプロイ後に取得）
const GOOGLE_APPS_SCRIPT_URL = 'YOUR_GOOGLE_APPS_SCRIPT_URL_HERE';

export const submitQuizResult = async (data: QuizSubmissionData): Promise<{ success: boolean; message?: string; error?: string }> => {
  try {
    // ユーザーエージェントを追加
    const submissionData = {
      ...data,
      userAgent: navigator.userAgent,
      timestamp: new Date().toISOString()
    };

    const response = await fetch(GOOGLE_APPS_SCRIPT_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(submissionData)
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const result = await response.json();
    return result;
  } catch (error) {
    console.error('診断結果の送信に失敗しました:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : '送信に失敗しました'
    };
  }
};

// 匿名IDを生成する関数
export const generateAnonymousId = (): string => {
  return 'user_' + Math.random().toString(36).substr(2, 9) + '_' + Date.now().toString(36);
};

// ローカルストレージから匿名IDを取得または生成
export const getOrCreateAnonymousId = (): string => {
  const storedId = localStorage.getItem('anonymousUserId');
  if (storedId) {
    return storedId;
  }
  
  const newId = generateAnonymousId();
  localStorage.setItem('anonymousUserId', newId);
  return newId;
}; 