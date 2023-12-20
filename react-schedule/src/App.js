import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './views/login';
import { getCurrentUser } from './serevices/userService';
import React, { useEffect, useState } from 'react';
import Home from './views/home';
import Navbar from './components/navbar';
import Report from './views/report';
import UpdatePass from './views/updatePass';
import Signup from './views/signup';



function App() {
  const [user, setUser] = useState();

  useEffect(() => {
    setUser(getCurrentUser())
  }, [])
  return (
    <div className="App">
      {!user && <Login></Login>}
      {user && (
        <Router>
          <Navbar user={user} ></Navbar>
          <Routes>
            <Route exat path="/" element={<Home user={user} />} />
            <Route path="/report" element={<Report user={user} />} />
            <Route path="/update-password" element={<UpdatePass user={user} />} />
            {user.admin && <Route path="/signup" element={<Signup user={user} />} />}
          </Routes>
        </Router>
      )
      }
    </div>
  );
}

export default App;
