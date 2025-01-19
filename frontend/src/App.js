import { BrowserRouter, Routes, Route } from 'react-router-dom';
import CreateJoin from './pages/CreateJoin.js';
import './App.css';
import HomePage from './pages/HomePage.js'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/createJoin" element={<CreateJoin />} /> 
      </Routes>
    </BrowserRouter>
  );
}

export default App;
