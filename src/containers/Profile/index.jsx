import { useEffect, useState, useRef } from 'react';
import axios from '../../axios';
import BackBtn from '../../components/BackBtn';
import UploadImg from '../../components/UploadImg';
import { shallow } from 'zustand/shallow';
import { accountLoginDetailsStore } from '../../store/AccountStore';
import Navbar from '../../components/Navbar';

const Profile = () => {
  const { userInfomation, updateUser } = accountLoginDetailsStore(
    (state) => state,
    shallow
  );

  const inputRef = useRef(null);

  // console.log('userInfomation', userInfomation);
  const [user, setUser] = useState({
    name: '',
    email: '',
    image: '',
  });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    getUser();
  }, [userInfomation]);

  const getUser = () => {
    setUser({
      name: userInfomation.name,
      email: userInfomation.email,
      image: userInfomation.image,
    });
  };

  const updateField = (e) => {
    setUser({
      ...user,
      [e.target.name]: e.target.value,
    });
  };

  const submitFormHandler = async (e) => {
    e.preventDefault();
    await updateUser(user);
  };

  console.log('user', user);

  return (
    <div className='flex justify-center w-full h-full min-h-screen items-center'>
      {/* <Navbar /> */}
      <div className='flex flex-col w-full max-w-lg'>
        <h2 className='pt-8 text-lg uppercase'>Profile</h2>
        <form className='pt-4' onSubmit={submitFormHandler}>
          <div className='flex pt-4 items-center'>
            {/* <label>Image</label>
            <input
              type='text'
              className='block w-full max-w-lg outline-none p-2 border border-slate-300 rounded-md text-sm'
            /> */}
            <img
              // src={}
              src={user.image}
              // src='https://img.freepik.com/free-vector/skull-cow-boho-composition_1284-35910.jpg?size=338&ext=jpg'
              alt='profile-img'
              className='w-32 h-32 bg-cover shadow-md'
            />
            <div className='flex gap-2 pt-4 pl-8'>
              <UploadImg
                name={userInfomation.name}
                email={userInfomation.email}
                image={userInfomation.image}
                setUser={setUser}
                loading={loading}
                setLoading={setLoading}
                inputRef={inputRef}
              />
              {/* <button className='bg-blue-600 text-white p-2 rounded-md h-10'>
                Upload
              </button>
              <button className='bg-slate-300 text-gray-600 p-2 rounded-md h-10'>
                Delete
              </button> */}
            </div>
          </div>
          <div className='pt-4'>
            <label>Name</label>
            <input
              type='text'
              className='block w-full max-w-lg outline-none p-2 border border-slate-300 rounded-md text-sm'
              name='name'
              value={user.name}
              onChange={updateField}
            />
          </div>
          <div className='pt-4'>
            <label>Email</label>
            <input
              type='text'
              className='block w-full max-w-lg outline-none p-2 border border-slate-300 rounded-md text-sm'
              name='email'
              value={user.email}
              onChange={updateField}
            />
          </div>
          <button
            type='submit'
            className='bg-blue-600 text-white p-2 rounded-md h-10 mt-8 float-right'
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default Profile;
