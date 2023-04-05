import React from 'react';
import { useNavigate } from 'react-router-dom';
import backIcon from '../../assets/icons/back.svg';
import { itemDetailsStore } from '../../store/ItemsStore';
import { shallow } from 'zustand/shallow';

const BackBtn = () => {
  const navigate = useNavigate();
  const { clearState } = itemDetailsStore((state) => state, shallow);

  const handleBackBtn = () => {
    clearState();
    navigate('/app/notes');
  };

  return (
    <div
      onClick={handleBackBtn}
      className='my-auto flex items-center hover:bg-gray-100 rounded-md cursor-pointer h-12 px-2'
    >
      <img className='back-btn-icon' src={backIcon} />
      <p className='text-sm'>Back</p>
    </div>
  );
};

export default BackBtn;
