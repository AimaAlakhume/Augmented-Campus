import React from 'react';
import { HashRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Welcome } from './pages/Welcome';
import { Home } from './pages/Home';
import { Explore } from './pages/Explore';
import { Create } from './pages/Create';
import { Profile } from './pages/Profile';
import { HuntDetail } from './pages/HuntDetail';
import { ActiveHunt } from './pages/ActiveHunt';
import { HuntProvider } from './context/HuntContext';

const App: React.FC = () => {
  return (
    <HuntProvider>
      <HashRouter>
        <Routes>
          <Route path="/" element={<Welcome />} />
          <Route path="/home" element={<Home />} />
          <Route path="/explore" element={<Explore />} />
          <Route path="/create" element={<Create />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/hunt/:id" element={<HuntDetail />} />
          <Route path="/hunt/:id/active" element={<ActiveHunt />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </HashRouter>
    </HuntProvider>
  );
};

export default App;