import { useEffect, useState, useRef } from 'react';
import UploadImg from '../../components/UploadImg';
import { shallow } from 'zustand/shallow';
import { accountLoginDetailsStore } from '../../store/AccountStore';

const Profile = () => {
  const { userInfomation, updateUser } = accountLoginDetailsStore(
    (state) => state,
    shallow
  );

  const inputRef = useRef(null);

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

  return (
    <div className='flex justify-center w-full h-full min-h-[calc(100vh-3.5rem)] px-4 md:px-0'>
      <div className='flex flex-col w-full max-w-2xl'>
        <h2 className='pt-4 text-lg font-bold text-gray-700 dark:text-white'>
          Edit Profile
        </h2>
        <form className='pt-4' onSubmit={submitFormHandler}>
          <div className='flex md:flex-row flex-col gap-4 md:gap-8'>
            <div className='flex flex-col items-center'>
              <div className='w-60 h-60'>
                {user.image ? (
                  <img
                    src={user.image}
                    alt='profile-img'
                    className='h-full w-full object-cover shadow-md rounded-full'
                  />
                ) : (
                  <span className='font-bold w-full h-full bg-gray-400 text-white rounded-full flex items-center justify-center font-mono p-4 text-7xl'>
                    {userInfomation && `${userInfomation?.nameInitital}`}
                  </span>
                )}
              </div>
              <div className='flex gap-2 pt-4'>
                <UploadImg
                  name={userInfomation.name}
                  email={userInfomation.email}
                  image={userInfomation.image}
                  setUser={setUser}
                  loading={loading}
                  setLoading={setLoading}
                  inputRef={inputRef}
                />
              </div>
            </div>
            <div className='flex-col w-full'>
              <div>
                <label className='block mb-2 text-sm text-gray-600 dark:text-gray-200'>
                  Name
                </label>
                <input
                  type='text'
                  className='input-field'
                  name='name'
                  value={user.name}
                  onChange={updateField}
                />
              </div>
              <div className='pt-4'>
                <label className='block mb-2 text-sm text-gray-600 dark:text-gray-200'>
                  Email
                </label>
                <input
                  type='text'
                  className='input-field'
                  name='email'
                  value={user.email}
                  onChange={updateField}
                />
              </div>
            </div>
          </div>
          <button
            type='submit'
            className='text-white bg-blue-500 py-2 px-4 flex gap-2 rounded-md cursor-pointer items-center hover:bg-blue-600 float-right mt-6'
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default Profile;
