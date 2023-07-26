import React from 'react'
import Home from './pages/home-page'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Expenses from './pages/expense-page'
function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="expense" element={<Expenses />} />
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App
