import React from "react"
import Home from "./elements/Home"
import Register from "./elements/Register"
import Login from "./elements/Login"
import LoginTest from "./elements/LoginTest"
import { Route, BrowserRouter as Router, Routes } from "react-router-dom"
import Dashboard from "./elements/Dashboard"
import FolderPage from "./elements/FolderPage"

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/logintest" element={<LoginTest />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/dashboard/folder/:key" element={<FolderPage />} />
      </Routes>
    </Router>
  )
}

export default App
