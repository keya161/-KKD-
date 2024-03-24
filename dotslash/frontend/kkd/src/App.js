// App.js

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from '.frontend/kkd/src/components/Home.jsx';
import Login from '.frontend/kkd/src/components/Login.jsx';
import Register from '.frontend/kkd/src/components/Register.jsx';

function App() {
  return (
    <Router>
      <Routes path = "/" element={<Home/>}>
        <Route path="/" exact component={Home} />
        <Route path="/login" component={Login} />
        <Route path="/register" component={Register} />
      </Routes>
    </Router>
  );
}

export default App;
