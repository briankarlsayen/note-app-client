import React from 'react';
import { Routes, Route, useNavigate, Navigate } from 'react-router-dom';
import Home from '../../containers/Home';
import Item from '../../containers/Item';
import Navbar from '../Navbar';
import userRestrict from '../../HOC/userRestrict';

import NotFound from '../../containers/Error/NotFound';
function Main() {
  return (
    <div className='note-app'>
      <Navbar />
      <Routes>
        <Route path='/item/:id' element={<Item />} />
        <Route path='/notes' element={<Home />} />
        <Route path='/404' element={<NotFound />} />
        <Route path='/' element={<Navigate to='/app/notes' replace />} />
        <Route path='*' element={<Navigate to='/404' replace />} />
      </Routes>
    </div>
  );
}

// const NotFound = () => {
//   return(
//     <div>
//       <h1>Page not found</h1>
//     </div>
//   )
// }

export default userRestrict(Main);
