export default function About() {
  return (
    <div style={styles.container}>
      {/* 상단 헤더 섹션 */}
      <header style={styles.header}>
        <div style={styles.since}>Since 1985</div>
        <h1 style={styles.mainTitle}>[한국예술대학교 현대미학연구회]</h1>
        <h2 style={styles.slogan}>“Aisthesis: 감각된 진리로서의 美”</h2>
      </header>

      {/* 본문 섹션 */}
      <div style={styles.content}>
        <section style={styles.section}>
          <p style={styles.introText}>
            본 연구회는 1985년, 관념 속에 박제된 기성 미학의 한계를 극복하고 ‘살아있는 예술’의 본질을 성찰하고자 본교의 석학들과 신진 연구자들이 뜻을 모아 설립되었습니다. 창립 이래 ‘이론과 실천의 유기적 조화’라는 사명 아래, 동시대 예술 현장의 역동적인 층위와 다변화된 미적 경험을 학문적 담론의 장으로 승화시키는 데 진력해 왔습니다.
          </p>
        </section>

        <div style={styles.grid}>
          {/* 연구 지향점 섹션 */}
          <section style={styles.gridSection}>
            <h3 style={styles.sectionTitle}>■ 연구 지향점</h3>
            <p style={styles.bodyText}>
              단순한 이론적 사유를 넘어, 예술적 향유의 근원적 토대인 <strong>身體와 知覺</strong>에 관한 현상학적 고찰을 심화하는 데 주력합니다.
            </p>
            <p style={styles.bodyText}>
              우리는 신체를 물리적 실체를 넘어 세계와 교감하며 미적 가치를 생성하는 주체, 즉 <strong>‘감각하는 살(la chair sentante)’</strong>로 재정의합니다. 이를 바탕으로 고전 미학의 숭고미부터 현대 미디어 아트의 기술적 물성, 그리고 퍼포먼스 아티스트의 실존적 현존에 이르기까지 미학적 스펙트럼 전반을 학제적 관점에서 탐구하며, 텍스트 너머에 존재하는 감각의 아카이브를 구축하고 있습니다.
            </p>
          </section>

          {/* 입회 안내 섹션 */}
          <section style={styles.gridSection}>
            <h3 style={styles.sectionTitle}>■ 입회 안내</h3>
            <p style={styles.bodyText}>
              학술적 엄밀성과 소수 정예의 깊이 있는 교류를 유지하기 위하여 <strong>기존 정회원의 추천을 통한 선발제</strong>를 원칙으로 합니다.
            </p>
            <p style={styles.bodyText}>
              미학적 사유의 지평을 넓히고 예술에 대한 숭고한 열정을 공유할 본교 예술인들의 참여를 기대합니다.
            </p>
          </section>
        </div>
        <div style={styles.office}>
              <p>[사무국] 한국예술대학교 현대미학연구회 운영위원회</p>
              <p>[위원장] 안상현 (인문예술대학 미학과 정교수)</p>
              <p>[실무총괄] 한명진 (인문예술대학원 예술경영학 박사과정)</p>
        </div>
      </div>
    </div>
  );
}

const styles = {
  container: {
    maxWidth: '1000px',
    margin: '0 auto',
    padding: '60px 20px',
    animation: 'fadeIn 1.5s ease-out',
  },
  header: {
    textAlign: 'center',
    marginBottom: '80px',
    borderBottom: '1px solid var(--border-color)',
    paddingBottom: '40px',
  },
  since: {
    fontSize: '0.8rem',
    letterSpacing: '3px',
    color: '#888',
    marginBottom: '20px',
  },
  mainTitle: {
    fontFamily: 'var(--font-heading)',
    fontSize: '1.8rem',
    marginBottom: '16px',
    color: 'var(--text-color)',
  },
  slogan: {
    fontFamily: 'var(--font-heading)',
    fontSize: '1.2rem',
    fontStyle: 'italic',
    color: '#333',
    fontWeight: '400',
  },
  content: {
    lineHeight: '1.8',
  },
  section: {
    marginBottom: '60px',
  },
  introText: {
    fontSize: '1.05rem',
    textAlign: 'justify',
    wordBreak: 'keep-all',
    color: '#222',
  },
  grid: {
    display: 'flex',
    flexWrap: 'wrap',
    gap: '60px',
    borderTop: '1px solid var(--border-color)',
    paddingTop: '50px',
  },
  gridSection: {
    flex: '1 1 400px',
  },
  sectionTitle: {
    fontFamily: 'var(--font-heading)',
    fontSize: '1.1rem',
    marginBottom: '24px',
    letterSpacing: '1px',
  },
  bodyText: {
    fontFamily: 'var(--font-body)',
    fontSize: '0.95rem',
    color: '#333',
    marginBottom: '20px',
    textAlign: 'justify',
    wordBreak: 'keep-all',
  },
  office: {
    marginTop: '60px',
    fontSize: '0.85rem',
    color: '#666',
    borderTop: '1px solid #eee',
    paddingTop: '20px',
    lineHeight: '1.5',
  }
};