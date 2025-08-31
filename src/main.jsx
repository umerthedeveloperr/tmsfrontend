// React entrypoint
import React from 'react'
 import { createRoot } from 'react-dom/client'
 import { BrowserRouter, Routes, Route } from 'react-router-dom'
 import App from './App'
 import './styles/style.css'
 createRoot(document.getElementById('root')).render(
 <BrowserRouter>
 <Routes>
 <Route path="/*" element={<App/>} />
 </Routes>
 </BrowserRouter>
 )