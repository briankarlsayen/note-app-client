import { useEffect, useState } from 'react';
import axios from '../../axios';
import BackBtn from '../../components/BackBtn';
import UploadImg from '../../components/UploadImg';

const Profile = () => {
  const [userData, setUserData] = useState();
  useEffect(() => {
    const getUserData = async () => {
      try {
        const result = await axios.get('/users');
        console.log('result', result);
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
    <div className='flex justify-center w-full h-full min-h-screen items-center'>
      <BackBtn />
      <div className='flex flex-col w-full max-w-lg'>
        <h2 className='pt-8 text-lg uppercase'>Profile</h2>
        <form className='pt-4'>
          <div className='flex pt-4 items-center'>
            {/* <label>Image</label>
            <input
              type='text'
              className='block w-full max-w-lg outline-none p-2 border border-slate-300 rounded-md text-sm'
            /> */}
            <img
              // src={}
              // src={userData.image}
              // src='https://img.freepik.com/free-vector/skull-cow-boho-composition_1284-35910.jpg?size=338&ext=jpg'
              alt='profile-img'
              className='w-32 h-32 bg-cover shadow-md'
            />
            <div className='flex gap-2 pt-4 pl-8'>
              <UploadImg />
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
            />
          </div>
          <div className='pt-4'>
            <label>Email</label>
            <input
              type='text'
              className='block w-full max-w-lg outline-none p-2 border border-slate-300 rounded-md text-sm'
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
