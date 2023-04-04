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
    <div
      id='nav'
      className='flex w-full h-12 items-end align-middle justify-between'
    >
      {checkValidRoute() ? <BackBtn /> : <div></div>}
      <Profile />
    </div>
  );
}

export default Navbar;
