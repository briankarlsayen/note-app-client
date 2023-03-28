import React from 'react';
import { useNavigate } from 'react-router-dom';
import backIcon from '../../assets/icons/back.svg';

const BackBtn = () => {
  const navigate = useNavigate();

  return (
    <div
      onClick={() => navigate('/app/notes')}
      className='m-2 my-auto align-middle items-center flex hover:bg-gray-100 rounded-md cursor-pointer absolute left-0 top-2 w-20'
    >
      <img className='back-btn-icon' src={backIcon} />
      <p className='text-sm'>Back</p>
    </div>
  );
};

export default BackBtn;
