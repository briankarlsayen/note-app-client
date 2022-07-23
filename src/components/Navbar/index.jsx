import React from 'react'
import Profile from '../Profile'
import { useNavigate ,useLocation } from 'react-router-dom'
import backIcon from '../../assets/icons/back.svg'

function Navbar() {
  const navigate = useNavigate()
  const location = useLocation()
  return (
    <div className="flex w-full items-end min-h-[5vh] align-middle justify-between">
      { location.pathname !== '/app/notes' ?  
        <div onClick={()=>navigate('/app/notes')} className="m-2 px-2 py-1 my-auto align-middle items-center flex hover:bg-gray-100 rounded-md cursor-pointer">
          <img className="back-btn-icon" src={backIcon} />
          <p className='text-sm'>Back</p>
        </div> : <div></div>
      }
      <Profile />
    </div>
  )
}

export default Navbar