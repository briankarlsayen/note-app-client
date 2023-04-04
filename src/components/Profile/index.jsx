import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { shallow } from 'zustand/shallow';
import { accountLoginDetailsStore } from '../../store/AccountStore';

export default function Profile() {
  const [isDropShow, setDropShow] = useState(false);
  const navigate = useNavigate();

  const { userInfomation, logoutUser } = accountLoginDetailsStore(
    (state) => state,
    shallow
  );

  const logoutHandler = async () => {
    if (userInfomation?.gauth) {
      google.accounts.id.revoke(userInfomation.gauth.sub, (done) => {
        console.log(done.error);
      });
      // google.accounts.id.disableAutoSelect();
      // google.accounts.id.cancel();
    }
    await logoutUser();

    localStorage.removeItem('token');
    navigate('/app/login');
    setDropShow(false);
  };

  return (
    <div className='relative flex items-center bg-gray-50 pr-2'>
      <p className='px-0.5'>{userInfomation && `${userInfomation?.name}`}</p>
      <button
        onClick={() => setDropShow(!isDropShow)}
        className='relative z-10 flex items-center p-2 text-sm w-12 h-12
      text-gray-600 bg-gray-50 border border-transparent rounded-md dark:text-white dark:bg-gray-800'
      >
        <span className='font-bold w-full h-full bg-gray-400 text-white rounded-full flex items-center justify-center font-mono p-4'>
          {userInfomation && `${userInfomation?.nameInitital}`}
        </span>
      </button>
      {isDropShow && (
        <DropDown
          logoutHandler={logoutHandler}
          userInfomation={userInfomation}
          navigate={navigate}
          setDropShow={setDropShow}
        />
      )}
    </div>
  );
}

const DropDown = ({ logoutHandler, userInfomation, navigate, setDropShow }) => {
  return (
    <div className='absolute z-20 w-56 py-2 top-12 right-4 overflow-hidden bg-white rounded-md shadow-xl dark:bg-gray-800'>
      <li
        className='flex items-center p-3 -mt-2 text-sm text-gray-600 transition-colors duration-200 transform 
      dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 dark:hover:text-white cursor-pointer'
        onClick={() => {
          setDropShow(false);
          navigate('/app/profile');
        }}
      >
        <span className='font-bold w-10 h-10 bg-gray-400 text-white rounded-full flex items-center justify-center font-mono'>
          {userInfomation && `${userInfomation?.nameInitital}`}
        </span>
        <div className='mx-1'>
          <h1 className='text-sm font-semibold text-gray-700 dark:text-gray-200'>
            {userInfomation && `${userInfomation?.name}`}
          </h1>
          <p className='text-sm text-gray-500 dark:text-gray-400'>
            {userInfomation && userInfomation?.email}
          </p>
        </div>
      </li>
      <hr className='border-gray-200 dark:border-gray-700 ' />

      {/* <li
        className='block px-4 py-3 text-sm text-gray-600 capitalize transition-colors duration-200 transform dark:text-gray-300
       hover:bg-gray-100 dark:hover:bg-gray-700 dark:hover:text-white'
      >
        view profile
      </li> */}

      <li
        onClick={logoutHandler}
        className='block px-4 py-3 text-sm text-gray-600 capitalize transition-colors duration-200 
      transform dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 dark:hover:text-white cursor-pointer'
      >
        Sign Out
      </li>
    </div>
  );
};
