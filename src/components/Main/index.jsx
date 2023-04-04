import Reac, { useEffect } from 'react';
import { Routes, Route, useNavigate, Navigate, Outlet } from 'react-router-dom';
import Home from '../../containers/Home';
import Item from '../../containers/Item';
import Navbar from '../Navbar';
import userRestrict from '../../HOC/userRestrict';
import { accountLoginDetailsStore } from '../../store/AccountStore';
import { shallow } from 'zustand/shallow';

import NotFound from '../../containers/Error/NotFound';
import Profile from '../../containers/Profile';
function Main() {
  const { storeAccDetails } = accountLoginDetailsStore(
    (state) => state,
    shallow
  );

  useEffect(() => {
    storeAccDetails();
  }, []);

  return (
    <div className='note-app'>
      <Navbar />
      <Routes>
        <Route element={<PrivateRoute />}>
          // * eme
          <Route path='/item/:id' element={<Item />} />
          <Route path='/notes' element={<Home />} />
          <Route path='/profile' element={<Profile />} />
          <Route path='/' element={<Navigate to='/app/notes' replace />} />
        </Route>
        <Route path='/404' element={<NotFound />} />
        <Route path='*' element={<Navigate to='/404' replace />} />
      </Routes>
    </div>
  );
}

const PrivateRoute = () => {
  let userid = localStorage.getItem('token');

  return <>{userid ? <Outlet /> : <Navigate to='/app/login' />}</>;
};

// const NotFound = () => {
//   return(
//     <div>
//       <h1>Page not found</h1>
//     </div>
//   )
// }

export default Main;
