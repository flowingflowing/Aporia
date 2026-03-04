export default function CharacterModal({ character, onClose }) {
  if (!character) return null;

  return (
    <div style={styles.overlay} onClick={onClose}>
      <div style={styles.businessCard} onClick={(e) => e.stopPropagation()}>
        
        <div style={styles.cardHeader}>
          <span style={styles.orgName}>THE SOCIETY FOR CONTEMPORARY AESTHETICS</span>
          <button onClick={onClose} style={styles.closeBtn}>✕</button>
        </div>
        
        <div style={styles.cardBody}>
          <div style={styles.profileSection}>
            
            {/* 텍스트 정보 영역 */}
            <div style={styles.textSection}>
              <h2 style={styles.name}>{character.name}</h2>
              <div style={styles.infoGrid}>
                <div style={styles.infoColumn}>
                  <span style={styles.infoLabel}>AFFILIATION</span>
                  <span style={styles.infoValue}>{character.affiliation}</span>
                </div>
                <div style={styles.infoColumn}>
                  <span style={styles.infoLabel}>MAJOR</span>
                  <span style={styles.infoValue}>{character.major}</span>
                </div>
                <div style={styles.infoColumn}>
                  <span style={styles.infoLabel}>STATUS</span>
                  <span style={styles.infoValue}>
                    {character.degree_type} · {character.membership_type}
                  </span>
                </div>
              </div>
            </div>

            {/* 증명사진 / 로고 영역 */}
            <div style={styles.imageSection}>
              {character.image_url ? (
                <img 
                  src={character.image_url} 
                  alt={character.name} 
                  style={styles.profileImage} 
                />
              ) : (
                <div style={styles.placeholderLogo}>SCA</div>
              )}
            </div>

          </div>
        </div>
        
        <div style={styles.cardFooter}>
          {character.short_desc ? (
            <p style={styles.descText}>{character.short_desc}</p>
          ) : (
            <p style={styles.emptyDesc}>기록된 인물 정보가 없습니다.</p>
          )}
        </div>

      </div>
    </div>
  );
}

const styles = {
  overlay: {
    position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
    backgroundColor: 'rgba(250, 250, 250, 0.85)',
    backdropFilter: 'blur(6px)',
    display: 'flex', justifyContent: 'center', alignItems: 'center',
    zIndex: 1000,
    padding: '20px',
  },
  businessCard: {
    backgroundColor: 'var(--bg-color)',
    border: '1px solid var(--border-color)',
    width: '100%',
    maxWidth: '560px', // 이미지가 들어갈 공간을 위해 너비 살짝 증가
    boxShadow: '15px 15px 0px rgba(17, 17, 17, 0.05)',
    display: 'flex',
    flexDirection: 'column',
  },
  cardHeader: {
    display: 'flex', justifyContent: 'space-between', alignItems: 'center',
    padding: '20px 24px',
    borderBottom: '1px solid var(--border-color)',
  },
  orgName: {
    fontFamily: 'var(--font-heading)',
    fontSize: '0.7rem',
    letterSpacing: '2px',
    color: '#666',
  },
  closeBtn: {
    background: 'none', border: 'none', fontSize: '1.2rem', 
    cursor: 'pointer', color: 'var(--text-color)', padding: 0, lineHeight: '1',
  },
  cardBody: {
    padding: '40px 24px',
  },
  profileSection: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    gap: '20px',
    flexWrap: 'wrap-reverse', // 모바일에서 이미지가 위로 올라가도록 설정
  },
  textSection: {
    flex: '1 1 250px',
  },
  name: { 
    fontFamily: 'var(--font-heading)',
    margin: '0 0 32px 0', 
    fontSize: '2.5rem',
    letterSpacing: '4px',
    fontWeight: '700',
  },
  infoGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(120px, 1fr))',
    gap: '24px',
  },
  infoColumn: {
    display: 'flex', flexDirection: 'column', gap: '6px',
  },
  infoLabel: {
    fontSize: '0.65rem', letterSpacing: '1px', color: '#888',
    fontFamily: 'var(--font-body)',
  },
  infoValue: {
    fontSize: '0.95rem', fontWeight: '500', color: 'var(--text-color)',
    fontFamily: 'var(--font-body)', wordBreak: 'keep-all',
  },
  // 신규 추가: 이미지 섹션 스타일
  imageSection: {
    flex: '0 0 100px', // 고정 너비
    height: '130px',   // 증명사진 비율 (3:4)
    border: '1px solid var(--border-color)',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F7F7F7',
    overflow: 'hidden',
  },
  profileImage: {
    width: '100%',
    height: '100%',
    objectFit: 'cover',
    filter: 'grayscale(100%) contrast(1.1)', // 흑백 및 대비 강조 효과
  },
  placeholderLogo: {
    fontFamily: 'var(--font-heading)',
    fontSize: '1.5rem',
    letterSpacing: '2px',
    color: '#CCC',
  },
  cardFooter: {
    padding: '24px',
    backgroundColor: 'rgba(17, 17, 17, 0.02)',
    borderTop: '1px dashed #ccc',
    minHeight: '120px',
  },
  descText: { 
    whiteSpace: 'pre-wrap', margin: 0, lineHeight: '1.8',
    fontSize: '0.9rem', color: '#333', fontFamily: 'var(--font-heading)',
  },
  emptyDesc: {
    color: '#aaa', margin: 0, fontStyle: 'italic', fontSize: '0.9rem',
  }
};