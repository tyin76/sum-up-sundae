import { BrowserRouter, Routes, Route } from 'react-router-dom';
import CreateJoin from './pages/CreateJoin.js';
import Header from './components/Header.js';
import './App.css';
import HomePage from './pages/HomePage.js'
import ViewGroup from './pages/ViewGroup.js';
import UserSumUp from './pages/UserSumUp.js'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/createJoin" element={<Header children={<CreateJoin/>}/>} /> 
        <Route path='/viewGroup' element={<Header height='15vh' children={<ViewGroup />} />}> </Route>
        <Route path='/userSumUp/:email' element={<Header height='15vh' children={<UserSumUp />} />}> </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
