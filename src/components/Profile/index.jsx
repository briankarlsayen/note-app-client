import React, { useState } from 'react'
import {useNavigate} from 'react-router-dom'

const Profile = () => {
  const [ isDropShow, setDropShow ] = useState(false)
  const navigate = useNavigate()
  const logoutHandler = () => {
    localStorage.removeItem('token');
    navigate('/app/login')
    setDropShow(false)
  }
  return(
    <div className="flex justify-center">
      <div className="relative inline-block">
          <button onClick={() => setDropShow(!isDropShow)} className="relative z-10 flex items-center p-2 text-sm text-gray-600 bg-white border border-transparent rounded-md focus:border-blue-500 focus:ring-opacity-40 dark:focus:ring-opacity-40 focus:ring-blue-300 dark:focus:ring-blue-400 focus:ring dark:text-white dark:bg-gray-800 focus:outline-none">
              <p className='px-2 font-sm'>Juan Luna</p>
              <span className="font-bold w-10 h-10 bg-gray-400 text-white rounded-full flex items-center justify-center font-mono">JL</span>
          </button>
          { isDropShow && 
          <div className="absolute right-0 z-20 w-56 py-2 mt-2 overflow-hidden bg-white rounded-md shadow-xl dark:bg-gray-800">
              <a href="#" className="flex items-center p-3 -mt-2 text-sm text-gray-600 transition-colors duration-200 transform dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 dark:hover:text-white">
                  <span className="font-bold w-10 h-10 bg-gray-400 text-white rounded-full flex items-center justify-center font-mono">JL</span>
                  <div className="mx-1">
                    <h1 className="text-sm font-semibold text-gray-700 dark:text-gray-200">Jane Doe</h1>
                    <p className="text-sm text-gray-500 dark:text-gray-400">janedoe@exampl.com</p>
                  </div>
              </a>
              <hr className="border-gray-200 dark:border-gray-700 " />
              
              <a href="#" className="block px-4 py-3 text-sm text-gray-600 capitalize transition-colors duration-200 transform dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 dark:hover:text-white">
                  view profile
              </a>
              

              <a onClick={logoutHandler} href="#" className="block px-4 py-3 text-sm text-gray-600 capitalize transition-colors duration-200 transform dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 dark:hover:text-white">
                  Sign Out
              </a>
          </div>
          }
          
      </div>
    </div>
  )
}

export default Profile