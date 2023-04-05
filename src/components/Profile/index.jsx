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
    <div
      className='relative flex items-center bg-gray-50 cursor-pointer hover:bg-gray-100 px-2 h-12'
      onClick={() => setDropShow(!isDropShow)}
    >
      <p className='px-0.5 font-semibold text-sm'>
        {userInfomation && `${userInfomation?.name}`}
      </p>
      <div className='relative z-10 flex items-center p-2 text-sm text-gray-600  border border-transparent rounded-md dark:text-white dark:bg-gray-800'>
        {userInfomation?.image ? (
          <div className='w-10 h-10'>
            <img
              src={userInfomation?.image}
              alt='profile-img'
              className='h-full w-full object-cover shadow-md rounded-full'
            />
          </div>
        ) : (
          <span className='font-bold w-10 h-10 bg-gray-400 text-white rounded-full flex items-center justify-center font-mono'>
            {userInfomation && `${userInfomation?.nameInitital}`}
          </span>
        )}
      </div>
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
    <div className='absolute z-20 w-56 py-2 top-12 right-4 overflow-hidden bg-white rounded-md shadow-xl dark:bg-gray-800 border border-slate-200'>
      <li
        className='flex items-center p-3 -mt-2 text-sm text-gray-600 transition-colors duration-200 transform 
      dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 dark:hover:text-white cursor-pointer'
        onClick={() => {
          setDropShow(false);
          navigate('/app/profile');
        }}
      >
        {userInfomation?.image ? (
          <div className='w-10 h-10'>
            <img
              src={userInfomation?.image}
              alt='profile-img'
              className='h-full w-full object-cover shadow-md rounded-full'
            />
          </div>
        ) : (
          <span className='font-bold w-10 h-10 bg-gray-400 text-white rounded-full flex items-center justify-center font-mono'>
            {userInfomation && `${userInfomation?.nameInitital}`}
          </span>
        )}
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
