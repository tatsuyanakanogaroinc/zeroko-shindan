// Google Apps Script for 成長タイプ診断結果記録
// このコードをGoogle Apps Scriptエディタにコピーして使用してください

function doPost(e) {
  try {
    // リクエストデータを取得
    const data = JSON.parse(e.postData.contents);
    
    // スプレッドシートを取得（スプレッドシートIDを設定してください）
    const spreadsheetId = 'YOUR_SPREADSHEET_ID_HERE'; // ここにスプレッドシートIDを設定
    const sheet = SpreadsheetApp.openById(spreadsheetId).getActiveSheet();
    
    // 現在の日時を取得
    const timestamp = new Date();
    
    // 記録するデータを準備
    const rowData = [
      timestamp,                    // 診断日時
      data.nickname || '',          // ニックネーム
      data.userId || '匿名',        // ユーザーID（匿名の場合）
      data.result.type,            // 診断結果タイプ
      data.result.title,           // 結果タイトル
      data.scores.自発型,          // 自発型スコア
      data.scores.転機型,          // 転機型スコア
      data.scores.探求型,          // 探求型スコア
      data.scores.内省型,          // 内省型スコア
      data.userAgent || '',        // ユーザーエージェント
      data.ipAddress || '',        // IPアドレス（取得可能な場合）
      JSON.stringify(data.answers) // 回答データ（JSON形式）
    ];
    
    // スプレッドシートにデータを追加
    sheet.appendRow(rowData);
    
    // 成功レスポンス
    return ContentService
      .createTextOutput(JSON.stringify({ success: true, message: '診断結果が記録されました' }))
      .setMimeType(ContentService.MimeType.JSON);
      
  } catch (error) {
    // エラーレスポンス
    return ContentService
      .createTextOutput(JSON.stringify({ 
        success: false, 
        error: error.toString() 
      }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

function doGet(e) {
  // ヘルスチェック用
  return ContentService
    .createTextOutput(JSON.stringify({ status: 'OK', message: '成長タイプ診断API' }))
    .setMimeType(ContentService.MimeType.JSON);
}

// スプレッドシートのヘッダーを設定する関数
function setupHeaders() {
  const spreadsheetId = 'YOUR_SPREADSHEET_ID_HERE'; // ここにスプレッドシートIDを設定
  const sheet = SpreadsheetApp.openById(spreadsheetId).getActiveSheet();
  
  const headers = [
    '診断日時',
    'ニックネーム',
    'ユーザーID',
    '診断結果タイプ',
    '結果タイトル',
    '自発型スコア',
    '転機型スコア',
    '探求型スコア',
    '内省型スコア',
    'ユーザーエージェント',
    'IPアドレス',
    '回答データ'
  ];
  
  sheet.getRange(1, 1, 1, headers.length).setValues([headers]);
  
  // ヘッダー行のスタイルを設定
  const headerRange = sheet.getRange(1, 1, 1, headers.length);
  headerRange.setBackground('#4285f4');
  headerRange.setFontColor('white');
  headerRange.setFontWeight('bold');
  
  // 列幅を自動調整
  sheet.autoResizeColumns(1, headers.length);
} 