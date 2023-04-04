import React from 'react';
import axios from '../../axios';
import { useNavigate } from 'react-router-dom';

function Logout() {
  const navigate = useNavigate();
  const clickHandler = async () => {
    const logout = await axios.post('/users/logout');
    if (!logout) console.log('unable to log out');
    console.log('logging out...');
    google.accounts.id.revoke('101739625312065879982', (done) => {
      console.log(done.error);
    });
    navigate(`/app/login`);
  };
  return (
    <div>
      <button
        onClick={clickHandler}
        class='flex-1 px-4 py-2 mx-2 font-semibold select-none rounded-md text-white bg-red-500 hover:bg-red-600'
      >
        Logout
      </button>
    </div>
  );
}

export default Logout;
