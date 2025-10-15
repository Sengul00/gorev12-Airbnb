import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { BrowserRouter, Route, Routes } from 'react-router'
import Home from './components/Home'
import Detail from './components/Detail'
import Add from './components/Add'
import Edit from './components/Edit'
import Delete from './components/Delete'
import Lists from './components/Lists'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path='/lists/:id' element={<Lists/>}/>
        <Route path="/homes/:id" element={<Detail/>}/>
        <Route path="/homes/add" element={<Add/>}/>
        <Route path="/homes/:id/edit" element={<Edit/>}/>
        <Route path="/homes/:id/delete" element={<Delete/>}/>
      </Routes>
    </BrowserRouter>
  </StrictMode>,
)
