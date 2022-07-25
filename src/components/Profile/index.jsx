import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from '../../axios'

export default function Profile() {
  const [ isDropShow, setDropShow ] = useState(false)
  const [userData, setUserData] = useState('')
  const navigate = useNavigate()

  const logoutHandler = () => {
    localStorage.removeItem('token');
    navigate('/app/login')
    setDropShow(false)
  }

  useEffect(() => {
    const getUserData = async() => {
      try {
        const result = await axios.get('/users')
        const data = {
          ...result.data,
        }
        setUserData(result.data)
      } catch(error) {
        console.log('error', error)
      }
    }
    getUserData()

  }, [])

  return(      
    <div className="relative inline-block bg-gray-50">
      <button onClick={() => setDropShow(!isDropShow)} className="relative z-10 flex items-center p-2 text-sm text-gray-600 bg-gray-50 border border-transparent rounded-md dark:text-white dark:bg-gray-800">
        <p className='px-2'>{userData && `${userData.firstName} ${userData.lastName}`}</p>
        <span className="font-bold w-10 h-10 bg-gray-400 text-white rounded-full flex items-center justify-center font-mono">{userData && `${userData.firstName[0]}${userData.lastName[0]}`}</span>
      </button>
      { isDropShow && <DropDown logoutHandler={logoutHandler} userData={userData}/> }
        
    </div>
  )
}

const DropDown = ({logoutHandler, userData}) => {
  return(
    <div className="absolute right-0 z-20 w-56 py-2 mt-2 overflow-hidden bg-white rounded-md shadow-xl dark:bg-gray-800">
      <li className="flex items-center p-3 -mt-2 text-sm text-gray-600 transition-colors duration-200 transform dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 dark:hover:text-white">
        <span className="font-bold w-10 h-10 bg-gray-400 text-white rounded-full flex items-center justify-center font-mono">{userData && `${userData.firstName[0]}${userData.lastName[0]}`}</span>
        <div className="mx-1">
          <h1 className="text-sm font-semibold text-gray-700 dark:text-gray-200">{userData && `${userData.firstName} ${userData.lastName}`}</h1>
          <p className="text-sm text-gray-500 dark:text-gray-400">{userData && userData.email}</p>
        </div>
      </li>
      <hr className="border-gray-200 dark:border-gray-700 " />
      
      <li className="block px-4 py-3 text-sm text-gray-600 capitalize transition-colors duration-200 transform dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 dark:hover:text-white">
        view profile
      </li>
      

      <li onClick={logoutHandler} className="block px-4 py-3 text-sm text-gray-600 capitalize transition-colors duration-200 transform dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 dark:hover:text-white">
        Sign Out
      </li>
    </div>
  )
}