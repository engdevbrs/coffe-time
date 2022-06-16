import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import'./App.css';
import Home from './components/home';
import Menu from './components/layouts/navbar';
import Footer from './components/layouts/footer';
import React, { useState } from 'react';
import Login from './components/login';

function App() {
  const [token, setToken] = useState();
  if(!token) {
    return <Login setToken={setToken} />
  }
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path='' element= { <Menu/>}>
            <Route index element= { <Home />} />
            <Route path='*' element={ <Navigate replace to = "/"/> } />
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
