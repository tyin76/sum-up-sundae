import { BrowserRouter, Routes, Route } from 'react-router-dom';
import CreateJoin from './pages/CreateJoin.js';
import Header from './components/Header.js';
import './App.css';
import HomePage from './pages/HomePage.js'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/createJoin" element={<Header children={<CreateJoin/>}/>} /> 
      </Routes>
    </BrowserRouter>
  );
}

export default App;
