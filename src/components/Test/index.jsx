import React from 'react'
import {Routes, Route, useNavigate} from 'react-router-dom';
import Dummy from './Dummy'
import Navbar from '../Navbar';
function Test() {
  const navigate = useNavigate()
  return (
    <div>
      <Navbar />
      <button onClick={()=>navigate('/dummy/test')}>Goto</button>
      <Routes>
        <Route path="/test" element={<Dummy />} />
      </Routes>
    </div>
  )
}

export default Test