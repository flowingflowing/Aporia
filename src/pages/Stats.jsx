import { useEffect, useState } from 'react';
import { supabase } from '../utils/supabase';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
} from 'chart.js';
import { Bar, Doughnut, Pie } from 'react-chartjs-2';

// Chart.js 필수 컴포넌트 등록 및 전역 폰트 설정
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement
);
ChartJS.defaults.font.family = 'var(--font-body)';
ChartJS.defaults.color = 'var(--text-color)';

export default function Stats() {
  const [data, setData] = useState({ degrees: {}, memberships: {}, affiliations: {}, majors: {} });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const { data: characters, error } = await supabase
          .from('characters')
          .select('degree_type, membership_type, affiliation, major');

        if (error) throw error;

        const stats = characters.reduce(
          (acc, cur) => {
            if (cur.degree_type) acc.degrees[cur.degree_type] = (acc.degrees[cur.degree_type] || 0) + 1;
            if (cur.membership_type) acc.memberships[cur.membership_type] = (acc.memberships[cur.membership_type] || 0) + 1;
            if (cur.affiliation) acc.affiliations[cur.affiliation] = (acc.affiliations[cur.affiliation] || 0) + 1;
            if (cur.major) acc.majors[cur.major] = (acc.majors[cur.major] || 0) + 1;
            return acc;
          },
          { degrees: {}, memberships: {}, affiliations: {}, majors: {} }
        );

        setData(stats);
      } catch (error) {
        console.error('통계 데이터 로딩 오류:', error.message);
      } finally {
        setLoading(false);
      }
    };
    fetchStats();
  }, []);

  if (loading) return <div style={styles.loading}>데이터를 불러오는 중입니다...</div>;

  const sortedMajors = Object.entries(data.majors).sort((a, b) => b[1] - a[1]);
  const majorLabels = sortedMajors.map(item => item[0]);
  const majorValues = sortedMajors.map(item => item[1]);

  // 차트 데이터 구성 (검정 비중 축소, 1px 테두리 디자인 적용)
  const membershipChartData = {
    labels: Object.keys(data.memberships),
    datasets: [{
      data: Object.values(data.memberships),
      backgroundColor: ['#333333', '#E0E0E0'], // 짙은 회색과 밝은 회색 대비
      borderWidth: 1,
      borderColor: '#FAFAFA',
    }],
  };

  const degreeChartData = {
    labels: Object.keys(data.degrees),
    datasets: [{
      label: '인원 수',
      data: Object.values(data.degrees),
      backgroundColor: 'rgba(17, 17, 17, 0.05)', // 거의 투명한 배경
      borderColor: '#111111', // 1px 얇은 실선 테두리
      borderWidth: 1,
    }],
  };

  const affiliationChartData = {
    labels: Object.keys(data.affiliations),
    datasets: [{
      data: Object.values(data.affiliations),
      backgroundColor: ['#555555', '#999999', '#DDDDDD', '#F5F5F5'], // 부드러운 그라데이션 그레이
      borderWidth: 1,
      borderColor: '#111111',
    }],
  };

  const majorChartData = {
    labels: majorLabels,
    datasets: [{
      label: '인원 수',
      data: majorValues,
      backgroundColor: 'rgba(17, 17, 17, 0.05)', // 거의 투명한 배경
      borderColor: '#111111', // 1px 얇은 실선 테두리
      borderWidth: 1,
    }],
  };

  // 공통 옵션 설정
  const commonOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: { legend: { display: false } },
    scales: {
      x: { grid: { display: false } },
      y: { grid: { color: '#EEEEEE' }, ticks: { stepSize: 1 } }
    }
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.pageTitle}>Statistics</h2>
      
      <div style={styles.gridContainer}>
        
        {/* 1. 회원 구분 비율 */}
        <div style={styles.chartBox}>
          <h3 style={styles.chartTitle}>회원 구분 비율</h3>
          <div style={styles.pieContainer}>
            <Doughnut data={membershipChartData} options={{ maintainAspectRatio: false }} />
          </div>
        </div>

        {/* 2. 학위 구분별 분포 */}
        <div style={styles.chartBox}>
          <h3 style={styles.chartTitle}>학위 구분별 분포</h3>
          <div style={styles.barContainer}>
            <Bar data={degreeChartData} options={commonOptions} />
          </div>
        </div>

        {/* 3. 소속 대학 분포 */}
        <div style={styles.chartBox}>
          <h3 style={styles.chartTitle}>소속 대학 분포</h3>
          <div style={styles.pieContainer}>
            <Pie data={affiliationChartData} options={{ maintainAspectRatio: false }} />
          </div>
        </div>

        {/* 4. 전공 분포 (많은 순) */}
        <div style={styles.chartBox}>
          <h3 style={styles.chartTitle}>전공 분포 (많은 순)</h3>
          <div style={styles.barContainer}>
            <Bar 
              data={majorChartData} 
              options={{ 
                ...commonOptions,
                indexAxis: 'y', 
                scales: { 
                  x: { grid: { color: '#EEEEEE' }, ticks: { stepSize: 1 } }, 
                  y: { grid: { display: false } } 
                } 
              }} 
            />
          </div>
        </div>

      </div>
      
      <p style={styles.footerNote}>
        * 본 통계는 데이터베이스의 실시간 정보를 바탕으로 집계되었습니다.
      </p>
    </div>
  );
}

const styles = {
  container: {
    maxWidth: '1000px',
    margin: '0 auto',
    padding: '40px 20px',
  },
  pageTitle: {
    fontSize: '2rem',
    fontFamily: 'var(--font-heading)',
    borderBottom: '1px solid var(--border-color)',
    paddingBottom: '20px',
    marginBottom: '40px',
    textTransform: 'uppercase',
    letterSpacing: '2px',
  },
  gridContainer: {
    display: 'flex',
    flexWrap: 'wrap',
    gap: '40px',
  },
  chartBox: {
    flex: '1 1 400px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: '20px 0',
    borderTop: '1px solid var(--border-color)',
  },
  chartTitle: {
    fontFamily: 'var(--font-heading)',
    fontSize: '1.2rem',
    marginBottom: '20px',
    width: '100%',
    textAlign: 'center',
  },
  pieContainer: {
    position: 'relative',
    height: '250px',
    width: '100%',
    maxWidth: '250px',
  },
  barContainer: {
    position: 'relative',
    height: '250px',
    width: '100%',
  },
  loading: { 
    textAlign: 'center', 
    padding: '40px', 
    fontFamily: 'var(--font-heading)' 
  },
  footerNote: { 
    marginTop: '60px', 
    color: '#666', 
    fontSize: '0.9rem', 
    textAlign: 'center',
    borderTop: '1px solid #ddd',
    paddingTop: '20px'
  }
};