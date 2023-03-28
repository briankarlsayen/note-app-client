import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from '../../axios';
import jwtDecode from 'jwt-decode';

export default function Profile() {
  const [isDropShow, setDropShow] = useState(false);
  const [userData, setUserData] = useState('');
  const navigate = useNavigate();

  const logoutHandler = async () => {
    const user = await axios('/users');
    if (!user) console.log('unable to get data');
    if (user.data?.gauth) {
      google.accounts.id.revoke(user.data?.gauth.sub, (done) => {
        console.log(done.error);
      });
      // google.accounts.id.disableAutoSelect();
      // google.accounts.id.cancel();
    }

    localStorage.removeItem('token');
    navigate('/app/login');
    setDropShow(false);
  };

  useEffect(() => {
    const getUserData = async () => {
      try {
        const result = await axios.get('/users');
        const data = {
          ...result.data,
        };
        setUserData(result.data);
      } catch (error) {
        console.log('error', error);
      }
    };
    getUserData();
  }, []);

  return (
    <div className='relative flex items-center bg-gray-50 pr-2'>
      <p className='px-0.5'>{userData && `${userData.name}`}</p>
      <button
        onClick={() => setDropShow(!isDropShow)}
        className='relative z-10 flex items-center p-2 text-sm w-12 h-12
      text-gray-600 bg-gray-50 border border-transparent rounded-md dark:text-white dark:bg-gray-800'
      >
        <span className='font-bold w-full h-full bg-gray-400 text-white rounded-full flex items-center justify-center font-mono p-4'>
          {userData && `${userData.name[0]}`}
        </span>
      </button>
      {isDropShow && (
        <DropDown
          logoutHandler={logoutHandler}
          userData={userData}
          navigate={navigate}
        />
      )}
    </div>
  );
}

const DropDown = ({ logoutHandler, userData, navigate }) => {
  return (
    <div className='absolute z-20 w-56 py-2 top-12 right-4 overflow-hidden bg-white rounded-md shadow-xl dark:bg-gray-800'>
      <li
        className='flex items-center p-3 -mt-2 text-sm text-gray-600 transition-colors duration-200 transform 
      dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 dark:hover:text-white cursor-pointer'
        onClick={() => navigate('/app/profile')}
      >
        <span className='font-bold w-10 h-10 bg-gray-400 text-white rounded-full flex items-center justify-center font-mono'>
          {userData && `${userData.name[0]}`}
        </span>
        <div className='mx-1'>
          <h1 className='text-sm font-semibold text-gray-700 dark:text-gray-200'>
            {userData && `${userData.name}`}
          </h1>
          <p className='text-sm text-gray-500 dark:text-gray-400'>
            {userData && userData.email}
          </p>
        </div>
      </li>
      <hr className='border-gray-200 dark:border-gray-700 ' />

      <li
        className='block px-4 py-3 text-sm text-gray-600 capitalize transition-colors duration-200 transform dark:text-gray-300
       hover:bg-gray-100 dark:hover:bg-gray-700 dark:hover:text-white'
      >
        view profile
      </li>

      <li
        onClick={logoutHandler}
        className='block px-4 py-3 text-sm text-gray-600 capitalize transition-colors duration-200 
      transform dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 dark:hover:text-white'
      >
        Sign Out
      </li>
    </div>
  );
};
