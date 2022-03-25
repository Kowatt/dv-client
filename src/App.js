import React from "react"
import Home from "./elements/Home"
import Register from "./elements/Register"
import Login from "./elements/Login"
import { Route, BrowserRouter as Router, Routes } from "react-router-dom"
import Dashboard from "./elements/Dashboard"

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
    </Router>
  )
}

export default App
