import React from 'react';
import Home from './pages/Home';
import ContextProvider from './context/Context';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Movies from './pages/Movies';
import Tvshows from './pages/Tvshows';
import Video from './pages/Video';

function App() {
  return (
    <ContextProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/video/:id/:mediaType/:title" element={<Video />} />
          <Route path="/movies" element={<Movies />} />
          <Route path="/tvshows" element={<Tvshows />} />
        </Routes>
      </Router>
    </ContextProvider>
  );
}

export default App;