import React, { useContext } from "react";
import Home from './pages/Home';
import Dashboard from './pages/Dashboard';
import Login from './pages/Login';

import './App.css';

import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ContextBody } from './context/Context'

function App() {

  return (
    <ContextBody>
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/admin" element={<Login />} />
          <Route path="/dashboard" element={<Dashboard />} /> 

          {/* {
              localStorage.getItem("token") !== null || undefined || "" ? 
              <Route path="/dashboard" element={<Dashboard />} /> && console.log("test-one")
              : <Route path="*" element={<Home />} /> && console.log("test-none")
          } */}

          <Route path="*" element={<Home />} />
        </Routes>
      </BrowserRouter>
    </div>
    </ContextBody>
  );
}

export default App;
