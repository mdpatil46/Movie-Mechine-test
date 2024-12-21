
import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './Component/Navbar';
import PopularMovie from './Pages/PopularMovie';
import SingleMovie from './Pages/SingleMovie';
import TopRatedMovie from './Pages/TopRatedMovie';
import UpcomingMovie from './Pages/UpcomingMovie';
import SearchPage from './Pages/SearchMovie';

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<PopularMovie />} />
        <Route path="/top-rated" element={<TopRatedMovie />} />
        <Route path="/upcoming" element={<UpcomingMovie />} />
        <Route path="/single-movie/:movieId" element={<SingleMovie />} />
        <Route path ="/search" element={<SearchPage />} />
      </Routes>
    </Router>
  );
}

export default App;
