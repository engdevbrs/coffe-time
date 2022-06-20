import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import'./App.css';
import Home from './components/home';
import Menu from './components/layouts/navbar';
import Footer from './components/layouts/footer';
import React, { useState } from 'react';
import Login from './components/login';
import Carta from './components/carta';
import Pedidos from './components/pedidos';


function App() {

  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path='' element= { <Menu/>}>
            <Route index element= { <Home />} />
            <Route path='cartera' element= { <Carta /> } />
            <Route path='login' element= { <Login /> } />
            <Route path='pedidos' element= { <Pedidos /> } />
            <Route path='*' element={ <Navigate replace to = "/"/> } />
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
