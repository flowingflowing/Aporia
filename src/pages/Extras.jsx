import React, { useRef, useEffect } from 'react';

export default function Extras() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    let animationFrameId;

    // 마우스 위치 초기값 (화면 중앙)
    let mouse = { x: window.innerWidth / 2, y: window.innerHeight / 2 };

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    const onMouseMove = (e) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
    };

    window.addEventListener('resize', resize);
    window.addEventListener('mousemove', onMouseMove);
    resize();

    // 파동 설정
    const lines = 40; // 선의 개수
    let tick = 0;

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      // 선의 스타일 설정 (배경과 어우러지는 아주 옅은 먹색)
      ctx.strokeStyle = 'rgba(17, 17, 17, 0.15)';
      ctx.lineWidth = 1;

      for (let i = 0; i < lines; i++) {
        ctx.beginPath();
        
        for (let x = 0; x < canvas.width; x += 10) {
          // 수학적 파동 계산 (Sin 함수 중첩)
          // i와 tick을 이용해 각 선이 서로 다른 속도와 높이로 흐르게 함
          const shift = i * 0.1;
          const noise = Math.sin(x * 0.002 + tick + shift) * 50;
          const mouseEffect = Math.sin(x * 0.001 + mouse.x * 0.002) * (mouse.y * 0.1);
          
          const y = (canvas.height / 2) + noise + mouseEffect + (i - lines / 2) * 15;
          
          if (x === 0) {
            ctx.moveTo(x, y);
          } else {
            ctx.lineTo(x, y);
          }
        }
        ctx.stroke();
      }

      tick += 0.005; // 흐르는 속도
      animationFrameId = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      window.removeEventListener('resize', resize);
      window.removeEventListener('mousemove', onMouseMove);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <div style={styles.container}>
      <div style={styles.textOverlay}>
        <h2 style={styles.title}>SENSORY WAVES</h2>
        <p style={styles.description}>
          "나의 신체는 세계를 향한 열린 통로이며, <br />
          이곳에서 감각은 비로소 실존의 파동이 된다."
        </p>
      </div>
      <canvas ref={canvasRef} style={styles.canvas} />
      
      {/* 하단 장식 요소 */}
      <div style={styles.footerInfo}>
        INTERACTIVE GENERATIVE ART
      </div>
    </div>
  );
}

const styles = {
  container: {
    position: 'relative',
    width: '100%',
    height: '80vh',
    backgroundColor: 'var(--bg-color)',
    overflow: 'hidden',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    cursor: 'none',
  },
  canvas: {
    position: 'absolute',
    top: 0,
    left: 0,
    zIndex: 1,
  },
  textOverlay: {
    position: 'relative',
    zIndex: 2,
    textAlign: 'center',
    pointerEvents: 'none', 
  },
  title: {
    fontFamily: 'var(--font-heading)',
    fontSize: '2.5rem',
    letterSpacing: '10px',
    marginBottom: '20px',
    opacity: 0.8,
  },
  description: {
    fontFamily: 'var(--font-heading)',
    fontSize: '1rem',
    lineHeight: '1.8',
    fontStyle: 'italic',
    color: '#555',
  },
  footerInfo: {
    position: 'absolute',
    bottom: '40px',
    fontFamily: 'var(--font-body)',
    fontSize: '0.7rem',
    letterSpacing: '3px',
    color: '#aaa',
    zIndex: 2,
  }
};