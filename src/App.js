import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './index.css';
import Home from './components/Home';
import Schedule from './components/Schedule';
import React from 'react';

function App() {
  return (
    <Router>
        <div className='App'>
          <Routes>
            <Route path='/' element={<Home />}></Route>
            <Route exact path='schedule' element={<Schedule />}></Route>
            this is sample 
          </Routes>
        </div>
      </Router>
  );
}

export default App;
