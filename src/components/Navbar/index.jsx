import React from 'react';
import Profile from '../Profile';
import { useLocation } from 'react-router-dom';
import BackBtn from '../BackBtn';

function Navbar() {
  const location = useLocation();
  const locationArr = location.pathname.split('/');

  const checkValidRoute = () => {
    const validLoc = ['item', 'profile'];
    if (validLoc.findIndex((loc) => loc === locationArr[2]) > -1) return true;
    return false;
  };

  return (
    <nav
      id='nav'
      className='flex w-full h-15 items-end align-middle justify-between px-2 pt-2'
    >
      {checkValidRoute() ? <BackBtn /> : <div></div>}
      <Profile />
    </nav>
  );
}

export default Navbar;
