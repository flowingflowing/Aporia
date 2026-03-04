import { useState } from 'react';

export default function CharacterCard({ character }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div style={styles.card}>
      <h3 style={styles.name}>{character.name}</h3>
      <p style={styles.info}>
        {character.affiliation} {character.major}
      </p>
      <div style={styles.badges}>
        <span style={styles.badge}>{character.membership_type}</span>
        <span style={styles.badge}>{character.degree_type}</span>
      </div>
      
      <button 
        onClick={() => setIsOpen(!isOpen)} 
        style={styles.button}
      >
        {isOpen ? '소개 닫기 ▲' : '소개 보기 ▼'}
      </button>

      {isOpen && (
        <div style={styles.description}>
          <p>{character.short_desc || '등록된 소개가 없습니다.'}</p>
        </div>
      )}
    </div>
  );
}

const styles = {
  card: {
    border: '1px solid #ddd',
    borderRadius: '8px',
    padding: '16px',
    width: '280px',
    backgroundColor: '#fff',
    boxShadow: '0 2px 4px rgba(0,0,0,0.05)'
  },
  name: { margin: '0 0 8px 0', fontSize: '1.25rem' },
  info: { margin: '0 0 12px 0', fontSize: '0.9rem', color: '#666' },
  badges: { display: 'flex', gap: '8px', marginBottom: '16px' },
  badge: {
    padding: '4px 8px',
    borderRadius: '4px',
    backgroundColor: '#f0f0f0',
    fontSize: '0.8rem',
    fontWeight: 'bold',
    color: '#333'
  },
  button: {
    width: '100%',
    padding: '8px',
    cursor: 'pointer',
    backgroundColor: '#333',
    color: 'white',
    border: 'none',
    borderRadius: '4px',
    fontWeight: 'bold'
  },
  description: {
    marginTop: '12px',
    paddingTop: '12px',
    borderTop: '1px solid #eee',
    fontSize: '0.9rem',
    lineHeight: '1.5',
    color: '#444'
  }
};