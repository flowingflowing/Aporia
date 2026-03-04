import { Link, useLocation } from 'react-router-dom';

export default function Navbar() {
  const location = useLocation();

  // 현재 경로와 일치하면 활성화(active) 스타일을 적용하는 헬퍼 함수
  const getLinkStyle = (path) => {
    return location.pathname === path 
      ? { ...styles.link, ...styles.activeLink } 
      : styles.link;
  };

  return (
    <nav style={styles.nav}>
      <div style={styles.container}>
        {/* 포스터의 영문 타이틀을 로고로 활용 */}
        <Link to="/" style={styles.logo}>
          THE SOCIETY FOR<br />CONTEMPORARY AESTHETICS
        </Link>
        
        <div style={styles.links}>
          <Link to="/about" style={getLinkStyle('/about')}>About</Link>
          <Link to="/members" style={getLinkStyle('/members')}>Members</Link>
          <Link to="/stats" style={getLinkStyle('/stats')}>Stats</Link>
          <Link to="/extras" style={getLinkStyle('/extras')}>Extras</Link>
        </div>
      </div>
    </nav>
  );
}

const styles = {
  nav: {
    backgroundColor: 'var(--bg-color)',
    borderBottom: '1px solid var(--border-color)', // 얇은 하단 실선
    padding: '24px 0',
  },
  container: {
    maxWidth: '1000px',
    margin: '0 auto',
    padding: '0 20px',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    flexWrap: 'wrap', // 모바일 화면에서 자연스럽게 줄바꿈되도록 설정
    gap: '20px',
  },
  logo: {
    fontFamily: 'var(--font-heading)',
    fontSize: '1.2rem',
    fontWeight: '700',
    color: 'var(--text-color)',
    textDecoration: 'none',
    lineHeight: '1.2',
    letterSpacing: '2px',
  },
  links: {
    display: 'flex',
    gap: '24px',
    alignItems: 'center',
  },
  link: {
    fontFamily: 'var(--font-body)',
    fontSize: '0.85rem',
    color: '#888', // 비활성 링크는 옅은 회색
    textDecoration: 'none',
    textTransform: 'uppercase',
    letterSpacing: '1px',
    transition: 'color 0.2s ease',
  },
  activeLink: {
    color: 'var(--text-color)', // 활성 링크는 검은색
    fontWeight: '700',
    borderBottom: '1px solid var(--text-color)', // 텍스트 아래 얇은 선으로 강조
    paddingBottom: '2px',
  }
};