import { useEffect, useState } from 'react';
import { supabase } from '../utils/supabase';
import CharacterModal from '../components/CharacterModal';

export default function Members() {
  const [characters, setCharacters] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedChar, setSelectedChar] = useState(null);

  useEffect(() => {
    const fetchCharacters = async () => {
      try {
        const { data, error } = await supabase
          .from('characters')
          .select('*')
          .order('created_at', { ascending: false });
        if (error) throw error;
        setCharacters(data);
      } catch (error) {
        console.error(error.message);
      } finally {
        setLoading(false);
      }
    };
    fetchCharacters();
  }, []);

  if (loading) return <div style={styles.loading}>데이터를 불러오는 중입니다...</div>;

  return (
    <div style={styles.container}>
      <h2 style={styles.pageTitle}>Members</h2>
      
      <div style={styles.listContainer}>
        {characters.length === 0 ? (
          <div style={styles.empty}>등록된 학회원이 없습니다.</div>
        ) : (
          characters.map((char) => (
            <div 
              key={char.id} 
              onClick={() => setSelectedChar(char)}
              style={styles.listItem}
            >
              <div style={styles.nameBlock}>
                <span style={styles.name}>{char.name}</span>
                <span style={styles.degree}>{char.degree_type}</span>
              </div>
              <div style={styles.infoBlock}>
                {char.affiliation} {char.major}
              </div>
              <div style={styles.membershipBlock}>
                {char.membership_type}
              </div>
            </div>
          ))
        )}
      </div>

      {}
      <CharacterModal 
        character={selectedChar} 
        onClose={() => setSelectedChar(null)} 
      />
    </div>
  );
}

const styles = {
  container: {
    maxWidth: '900px',
    margin: '0 auto',
    padding: '40px 20px',
  },
  pageTitle: {
    fontSize: '2rem',
    fontFamily: 'var(--font-heading)',
    borderBottom: '1px solid var(--border-color)',
    paddingBottom: '20px',
    marginBottom: '20px',
    textTransform: 'uppercase',
    letterSpacing: '2px',
  },
  listContainer: {
    display: 'flex',
    flexDirection: 'column',
    borderTop: '1px solid var(--border-color)', // 리스트 상단 굵은 선
  },
  listItem: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: '20px 0',
    borderBottom: '1px solid #ddd', // 리스트 간 얇은 선
    cursor: 'pointer',
    flexWrap: 'wrap',
    gap: '10px',
  },
  nameBlock: {
    flex: '1 1 200px',
    display: 'flex',
    alignItems: 'baseline',
    gap: '12px',
  },
  name: {
    fontSize: '1.2rem',
    fontFamily: 'var(--font-heading)',
    fontWeight: 'bold',
  },
  degree: { fontSize: '0.85rem', color: '#555' },
  infoBlock: {
    flex: '2 1 300px',
    fontSize: '0.95rem',
    color: '#333',
  },
  membershipBlock: {
    flex: '0 1 100px',
    textAlign: 'right',
    fontSize: '0.85rem',
    letterSpacing: '1px',
  },
  loading: { textAlign: 'center', padding: '40px', fontFamily: 'var(--font-heading)' },
  empty: { padding: '20px 0', color: '#777' }
};