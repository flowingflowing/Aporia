import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';

// 페이지 컴포넌트 임포트
import Home from './pages/Home';
import Members from './pages/Members';
import Stats from './pages/Stats';
import Extras from './pages/Extras';
import About from './pages/About';

function App() {
  return (
    <BrowserRouter basename={import.meta.env.BASE_URL}>
      <Navbar />
      <div style={{ padding: '20px' }}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/members" element={<Members />} />
          <Route path="/stats" element={<Stats />} />
          <Route path="/extras" element={<Extras />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;