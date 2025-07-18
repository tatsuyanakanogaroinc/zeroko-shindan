# 成長タイプ診断 - スプレッドシート連携セットアップガイド

## 概要
このガイドでは、診断結果をGoogleスプレッドシートに自動記録するシステムのセットアップ方法を説明します。

## セットアップ手順

### 1. Googleスプレッドシートの作成

1. [Google Sheets](https://sheets.google.com)にアクセス
2. 新しいスプレッドシートを作成
3. スプレッドシートのURLからIDを取得
   - URL例: `https://docs.google.com/spreadsheets/d/1BxiMVs0XRA5nFMdKvBdBZjgmUUqptlbs74OgvE2upms/edit`
   - ID: `1BxiMVs0XRA5nFMdKvBdBZjgmUUqptlbs74OgvE2upms`

### 2. Google Apps Scriptの設定

1. [Google Apps Script](https://script.google.com)にアクセス
2. 「新しいプロジェクト」をクリック
3. プロジェクト名を「成長タイプ診断API」に変更
4. `google-apps-script.js`の内容をコピーして貼り付け
5. スプレッドシートIDを設定:
   ```javascript
   const spreadsheetId = 'YOUR_SPREADSHEET_ID_HERE'; // ここに実際のIDを設定
   ```

### 3. Google Apps Scriptのデプロイ

1. 「デプロイ」→「新しいデプロイ」をクリック
2. 「種類の選択」で「ウェブアプリ」を選択
3. 以下の設定を行う:
   - **説明**: 成長タイプ診断API
   - **次のユーザーとして実行**: 自分
   - **アクセスできるユーザー**: 全員
4. 「デプロイ」をクリック
5. 表示されるURLをコピー（例: `https://script.google.com/macros/s/AKfycbz.../exec`）

### 4. フロントエンドの設定

1. `src/utils/api.ts`を開く
2. `GOOGLE_APPS_SCRIPT_URL`を実際のURLに変更:
   ```typescript
   const GOOGLE_APPS_SCRIPT_URL = 'https://script.google.com/macros/s/YOUR_SCRIPT_ID/exec';
   ```

### 5. スプレッドシートのヘッダー設定

1. Google Apps Scriptエディタに戻る
2. `setupHeaders`関数を選択
3. 「実行」ボタンをクリック
4. 初回実行時は権限を許可

### 6. 動作確認

1. アプリケーションを起動
2. 診断を実行
3. 結果画面で「結果を記録する」ボタンをクリック
4. スプレッドシートにデータが追加されることを確認

## 記録されるデータ

| 列 | 内容 | 例 |
|---|---|---|
| 診断日時 | 診断実行日時 | 2024-01-15 14:30:25 |
| ユーザーID | 匿名ID | user_abc123_xyz789 |
| 診断結果タイプ | 判定されたタイプ | 自発型 |
| 結果タイトル | 結果のタイトル | 行動力のリーダー |
| 自発型スコア | 自発型の得点 | 8 |
| 転機型スコア | 転機型の得点 | 5 |
| 探求型スコア | 探求型の得点 | 3 |
| 内省型スコア | 内省型の得点 | 4 |
| ユーザーエージェント | ブラウザ情報 | Mozilla/5.0... |
| IPアドレス | IPアドレス | 192.168.1.1 |
| 回答データ | 全回答のJSON | [{"questionId":1,"selectedOption":2},...] |

## 管理者向け機能

### データ分析
- スプレッドシートのデータを活用して統計分析
- 各タイプの分布や傾向を把握
- 回答パターンの分析

### プライバシー保護
- 個人情報は記録されません
- 匿名IDのみで識別
- 必要に応じてデータを削除可能

## トラブルシューティング

### よくある問題

1. **CORSエラー**
   - Google Apps Scriptの設定で「全員」にアクセス許可
   - フロントエンドのURLが正しく設定されているか確認

2. **権限エラー**
   - Google Apps Scriptの実行権限を確認
   - スプレッドシートの編集権限を確認

3. **データが記録されない**
   - ブラウザの開発者ツールでネットワークタブを確認
   - エラーメッセージを確認

### デバッグ方法

1. ブラウザの開発者ツールを開く
2. コンソールタブでエラーメッセージを確認
3. ネットワークタブでAPIリクエストの詳細を確認

## カスタマイズ

### 追加データの記録
`google-apps-script.js`の`rowData`配列に新しい列を追加

### データ形式の変更
スプレッドシートのヘッダーとデータ構造を調整

### セキュリティ強化
- APIキーの追加
- レート制限の実装
- データ検証の強化

## サポート

問題が発生した場合は、以下を確認してください：
1. 設定手順の見直し
2. ブラウザの開発者ツールでのエラー確認
3. Google Apps Scriptのログ確認 