import React, { useState } from 'react';

interface NicknameComponentProps {
  onSubmit: (nickname: string) => void;
}

const NicknameComponent: React.FC<NicknameComponentProps> = ({ onSubmit }) => {
  const [nickname, setNickname] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!nickname.trim()) {
      setError('ニックネームを入力してください');
      return;
    }
    setError('');
    onSubmit(nickname.trim());
  };

  return (
    <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' }}>
      <form onSubmit={handleSubmit} style={{ background: '#fff', borderRadius: 16, boxShadow: '0 2px 16px rgba(0,0,0,0.08)', padding: '2rem', maxWidth: 340, width: '100%' }}>
        <h2 style={{ fontSize: '1.5rem', fontWeight: 700, marginBottom: '1.5rem', textAlign: 'center' }}>ニックネームを入力してください</h2>
        <input
          type="text"
          value={nickname}
          onChange={e => setNickname(e.target.value)}
          placeholder="例：たっちゃん"
          style={{
            width: '100%',
            padding: '0.75rem 1rem',
            fontSize: '1.1rem',
            borderRadius: 8,
            border: '1px solid #ddd',
            marginBottom: '1rem',
            outline: 'none',
            boxSizing: 'border-box'
          }}
          maxLength={20}
          autoFocus
        />
        {error && <div style={{ color: '#ef4444', marginBottom: '1rem', textAlign: 'center' }}>{error}</div>}
        <button
          type="submit"
          style={{
            width: '100%',
            background: 'linear-gradient(90deg, #667eea 0%, #764ba2 100%)',
            color: '#fff',
            fontWeight: 600,
            fontSize: '1.1rem',
            border: 'none',
            borderRadius: 8,
            padding: '0.75rem',
            cursor: 'pointer',
            boxShadow: '0 1px 4px rgba(0,0,0,0.06)'
          }}
        >
          診断結果を見る
        </button>
      </form>
    </div>
  );
};

export default NicknameComponent; 