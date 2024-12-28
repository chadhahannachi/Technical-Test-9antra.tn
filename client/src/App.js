import './App.css';
import AdminInterface from './course/AdminInterface';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import LandingPage from './course/LandingPage';
import Home from './course/home';

function App() {
  return (
    <Router>
      <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/admininterface" element={<AdminInterface />} />
      <Route path="/landingpage" element={<LandingPage />} />
      </Routes>
    </Router>
    
  );
}

export default App;
