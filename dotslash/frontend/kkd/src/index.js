import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
//import Home from './components/Home';
import Login from './components/Login';
import Register from './components/register';
import Spinwheel from './components/Spinwheel';
import Compiler from './components/Compiler'; // Import the Compiler component
//import { Leaderboard } from './components/users';

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/spinwheel" element={<Spinwheel />} />
        <Route path="/compiler" element={<Compiler />} /> {/* Define the route for compiler */}
      </Routes>
    </Router>
  );
}

ReactDOM.render(<App />, document.getElementById('root'));
