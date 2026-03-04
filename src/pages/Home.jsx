import { useState, useEffect } from 'react';

export default function Home() {
  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

  // 카운트다운 로직 (목표: 3/7 SAT 22:00)
  function calculateTimeLeft() {
    // 시스템 연도 기준 3월 7일 22시로 설정
    const targetDate = new Date(`2026-03-07T22:00:00+09:00`).getTime();
    const now = new Date().getTime();
    const difference = targetDate - now;

    if (difference > 0) {
      return {
        days: String(Math.floor(difference / (1000 * 60 * 60 * 24))).padStart(2, '0'),
        hours: String(Math.floor((difference / (1000 * 60 * 60)) % 24)).padStart(2, '0'),
        minutes: String(Math.floor((difference / 1000 / 60) % 60)).padStart(2, '0'),
        seconds: String(Math.floor((difference / 1000) % 60)).padStart(2, '0'),
      };
    }
    return null; // 개장 시간 이후
  }

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div style={styles.container}>
      {/* 동적 애니메이션을 위한 전역 스타일 주입 */}
      <style>
        {`
          @keyframes fadeIn {
            from { opacity: 0; transform: translateY(20px); }
            to { opacity: 1; transform: translateY(0); }
          }
          @keyframes drawLineVertical {
            from { height: 0; }
            to { height: 100%; }
          }
          @keyframes drawLineHorizontal {
            from { width: 0; }
            to { width: 100%; }
          }
          @keyframes pulseText {
            0%, 100% { opacity: 1; }
            50% { opacity: 0.5; }
          }
        `}
      </style>

      {/* 예술적 동적 요소: 배경을 가로지르는 얇은 교차 선 */}
      <div style={{ ...styles.bgLine, ...styles.verticalLine }}></div>
      <div style={{ ...styles.bgLine, ...styles.horizontalLine }}></div>

      <div style={styles.contentWrapper}>
        {/* 좌측: 포스터 이미지 */}
        <div style={styles.imageSection}>
          <img 
            src="poster4.png" 
            alt="Society for Contemporary Aesthetics" 
            style={styles.poster} 
          />
        </div>

        {/* 우측: 타이포그래피 및 카운트다운 */}
        <div style={styles.textSection}>
          <h1 style={styles.title}>
            APORIA
          </h1>
          
          <div style={styles.divider}></div>

          <div style={styles.countdownSection}>
            <p style={styles.countdownLabel}>GRAND OPENING</p>
            {timeLeft ? (
              <div style={styles.timerBlock}>
                <div style={styles.timeUnit}>
                  <span style={styles.timeNum}>{timeLeft.days}</span>
                  <span style={styles.timeText}>DAYS</span>
                </div>
                <span style={styles.timeColon}>:</span>
                <div style={styles.timeUnit}>
                  <span style={styles.timeNum}>{timeLeft.hours}</span>
                  <span style={styles.timeText}>HRS</span>
                </div>
                <span style={styles.timeColon}>:</span>
                <div style={styles.timeUnit}>
                  <span style={styles.timeNum}>{timeLeft.minutes}</span>
                  <span style={styles.timeText}>MIN</span>
                </div>
                <span style={styles.timeColon}>:</span>
                <div style={styles.timeUnit}>
                  <span style={styles.timeNum}>{timeLeft.seconds}</span>
                  <span style={styles.timeText}>SEC</span>
                </div>
              </div>
            ) : (
              <div style={styles.openMessage}>NOW OPEN</div>
            )}
          </div>

          <div style={styles.storySection}>
            <p style={styles.storyText}>
              그곳에서 우리는 스스로를 '감각하는 지성'이라 칭했다. 갓 스물을 넘긴 나의 치기 어린 지성은 '현대미학연구회'라는 이름이 풍기는 지독하게 매혹적인 아우라에 속절없이 잠식당했다. 고서의 묵은내와 값비싼 와인 향이 뒤섞인 공기 속에서 나는 마침내 선택받았다는 선민의식에 취해 있었다.
            </p>
            <div style={styles.storyDivider}>⋯</div>
            <p style={styles.storyText}>
              나는 기꺼이 그들의 언어를 체화했다. 집단적인 향락은 학술 활동이, 동료의 신음은 실존적 현존의 발현이, 권력자에게 몸을 여는 행위는 숭고한 헌신이 되었다. 나는 타락을 예술으로 정당화하는 법을 배웠다.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

const styles = {
  container: {
    position: 'relative',
    minHeight: '80vh',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
    padding: '40px 20px',
  },
  // 배경 교차 선 (포스터의 십자 모티프 반영)
  bgLine: {
    position: 'absolute',
    backgroundColor: 'rgba(17, 17, 17, 0.1)', // 매우 옅은 먹색
    zIndex: -1,
  },
  verticalLine: {
    left: '50%',
    top: 0,
    width: '1px',
    animation: 'drawLineVertical 2.5s cubic-bezier(0.8, 0, 0.2, 1) forwards',
  },
  horizontalLine: {
    top: '50%',
    left: 0,
    height: '1px',
    animation: 'drawLineHorizontal 2.5s cubic-bezier(0.8, 0, 0.2, 1) forwards',
  },
  contentWrapper: {
    display: 'flex',
    flexWrap: 'wrap',
    maxWidth: '1200px',
    width: '100%',
    gap: '60px',
    alignItems: 'center',
    justifyContent: 'center',
    animation: 'fadeIn 1.5s ease-out',
  },
  imageSection: {
    flex: '1 1 400px',
    display: 'flex',
    justifyContent: 'center',
  },
  poster: {
    maxWidth: '100%',
    height: 'auto',
    boxShadow: '0 20px 40px rgba(0,0,0,0.05)', // 포스터가 종이처럼 보이도록 미세한 그림자 추가
    filter: 'contrast(1.05) grayscale(10%)', // 에디토리얼 무드를 위한 필터
  },
  textSection: {
    flex: '1 1 500px',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
  },
  title: {
    fontFamily: 'Cafe24Danjeonghae, var(--font-heading)',
    fontSize: 'clamp(2rem, 10vw, 3rem)', 
    lineHeight: '1.1',
    letterSpacing: '4px',
    color: 'var(--text-color)',
    marginBottom: '30px',
  },
  divider: {
    width: '40px',
    height: '1px',
    backgroundColor: 'var(--border-color)',
    marginBottom: '40px',
  },
  countdownSection: {
    marginBottom: '50px',
  },
  countdownLabel: {
    fontFamily: 'var(--font-body)',
    fontSize: '0.85rem',
    letterSpacing: '3px',
    color: '#666',
    marginBottom: '16px',
    textTransform: 'uppercase',
  },
  timerBlock: {
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
    fontFamily: 'var(--font-heading)',
  },
  timeUnit: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    minWidth: '60px',
  },
  timeNum: {
    fontSize: '2.5rem',
    color: 'var(--text-color)',
    lineHeight: '1',
  },
  timeText: {
    fontSize: '0.7rem',
    letterSpacing: '2px',
    color: '#888',
    marginTop: '8px',
  },
  timeColon: {
    fontSize: '2rem',
    color: '#ccc',
    paddingBottom: '20px',
    animation: 'pulseText 2s infinite', // 콜론 깜빡임 효과
  },
  openMessage: {
    fontFamily: 'var(--font-heading)',
    fontSize: '2rem',
    letterSpacing: '5px',
    color: 'var(--text-color)',
    animation: 'pulseText 3s infinite',
  },
  storySection: {
    borderLeft: '1px solid var(--border-color)', // 에디토리얼 인용구 스타일의 좌측 선
    paddingLeft: '24px',
    marginTop: '10px',
    maxWidth: '500px', // 가독성을 위해 텍스트 줄바꿈 너비 제한
    animation: 'fadeIn 2s ease-out 0.5s both', // 타이틀보다 약간 늦게 나타나는 효과
  },
  storyTitle: {
    fontFamily: 'var(--font-heading)',
    fontSize: '1.2rem',
    fontWeight: '700',
    marginBottom: '16px',
    letterSpacing: '1px',
    color: 'var(--text-color)',
  },
  storyText: {
    fontFamily: 'var(--font-body)', // 명조체를 적용하여 소설적인 분위기 연출
    fontSize: '0.95rem',
    fontStyle: 'italic',
    lineHeight: '1.8',
    color: '#333',
    marginBottom: '12px',
    wordBreak: 'keep-all', // 한국어 단어가 중간에 잘리지 않도록 보호
  },
  storyDivider: {
    textAlign: 'center',
    color: '#999',
    margin: '20px 0',
    letterSpacing: '4px',
    fontSize: '1.2rem',
  },
};