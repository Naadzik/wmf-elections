import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Layout from './components/layout/Layout';
import Home from './pages/Home';
import About from './pages/About';
import Elections from './pages/Elections';
import ElectionDetail from './pages/ElectionDetail';
import Candidates from './pages/Candidates';
import CandidateProfile from './pages/CandidateProfile';
import BoardComposition from './pages/BoardComposition';
import Trends from './pages/Trends';
import MapPage from './pages/Map';

export default function App() {
  return (
    <BrowserRouter basename="/wmf-elections">
      <Routes>
        <Route element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="about" element={<About />} />
          <Route path="elections" element={<Elections />} />
          <Route path="elections/:id" element={<ElectionDetail />} />
          <Route path="candidates" element={<Candidates />} />
          <Route path="candidates/:id" element={<CandidateProfile />} />
          <Route path="board" element={<BoardComposition />} />
          <Route path="trends" element={<Trends />} />
          <Route path="map" element={<MapPage />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
