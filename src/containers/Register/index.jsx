import React, { useState } from 'react'
import {useNavigate} from 'react-router-dom'
import axios from '../../axios'
function Register() {
  const navigate = useNavigate()
  const [ registerParams, setRegisterParams] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    mobileNo: ''
  })
  const [ showResponseMsg, setResponseMsg ] = useState('')
  const updateField = e => {
    setRegisterParams({
      ...registerParams,
      [e.target.name]: e.target.value
    });
  };

  const updateMobileField = e => {
    if(e.target.value.length <= 11){
      setRegisterParams({
        ...registerParams,
        [e.target.name]: e.target.value
      });
    }
  }; 

  const handleClick = () => {
    navigate(`/app/login`)
  }

  const submitFormHandler = async(e) => {
    e.preventDefault()
    try {
      const register = await axios.post('/users/register', registerParams)
      if(!register) return console.log('error', register)
      setRegisterParams({
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        mobileNo: ''
      })
      console.log('register', register)
      setResponseMsg(register.data)
    } catch(error) {
      console.log('error', error)
      if(error.response.data.message) {
        setResponseMsg(error.response.data)
      } else {
        setResponseMsg({success: false, message: 'Please fill up all fields'})
      }
    }
  }
  
  return (
    <div className="bg-white dark:bg-gray-900">
        <div className="flex justify-center h-screen">
            <div className="hidden bg-cover lg:block lg:w-2/3" style={{backgroundImage: `url(https://images.unsplash.com/photo-1501504905252-473c47e087f8?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1074&q=80)`}} >
                <div className="flex items-center h-full px-20 bg-gray-900 bg-opacity-40">
                    <div>
                        <h2 className="text-4xl font-bold text-white">Note app</h2>
                        <p className="max-w-xl mt-3 text-gray-300">Notes no longer need to take forever to load, they aren’t limited to text and image, formatting options are now almost effortless, and organization options have been modified to make it easier to find what you are looking for a lot faster.</p>
                    </div>
                </div>
            </div>
            
            <div className="flex items-center w-full max-w-md px-6 mx-auto lg:w-2/6">
                <div className="flex-1">
                    <div className="text-center">
                        <h2 className="text-4xl font-bold text-center text-gray-700 dark:text-white">Register</h2>
                        
                        <p className="mt-3 text-gray-500 dark:text-gray-300">Register and be part of the note app community</p>
                    </div>

                    <div className="mt-8">
                        <form onSubmit={e=>submitFormHandler(e)}>
                            <div>
                                <label htmlFor="firstName" className="block mb-2 text-sm text-gray-600 dark:text-gray-200">First Name</label>
                                <input type="text" name="firstName" id="firstName" placeholder="Juan" className="input-field" value={registerParams.firstName} onChange={updateField} />
                            </div>
                            <div className="mt-2">
                                <label htmlFor="lastName" className="block mb-2 text-sm text-gray-600 dark:text-gray-200">Last Name</label>
                                <input type="text" name="lastName" id="lastName" placeholder="Luna" className="input-field" value={registerParams.lastName} onChange={updateField} />
                            </div>
                            <div className="mt-2">
                                <label htmlFor="email" className="block mb-2 text-sm text-gray-600 dark:text-gray-200">Email Address</label>
                                <input type="email" name="email" id="email" placeholder="juanluns@example.com" className="input-field" value={registerParams.email} onChange={updateField} />
                            </div>
                            <div className="mt-2">
                                <label htmlFor="mobileNo" className="block mb-2 text-sm text-gray-600 dark:text-gray-200">Mobile Number</label>
                                <input type="number" name="mobileNo" id="mobileNo" placeholder="09xxxxxxxxx" maxLength={Number(11)} className="input-field" value={registerParams.mobileNo} onChange={updateMobileField} />
                            </div>

                            <div className="mt-2">
                                <label htmlFor="password" className="text-sm text-gray-600 dark:text-gray-200">Password</label>
                                <input type="password" name="password" id="password" placeholder="Your Password" className="input-field" value={registerParams.password} onChange={updateField} />
                            </div>
                            <p className={`my-2 text-sm text-center ${!showResponseMsg.success ? 'text-red-500' : 'text-green-400'}`}>{showResponseMsg.message}</p>
                            <div className="mt-6">
                                <button type="submit" className="login-btn"> Sign in </button>
                            </div>

                        </form>
                        <p className="mt-6 text-sm text-center text-gray-400">Already have an account? <span href="#" onClick={handleClick} className="login-redirect">Login</span>.</p>
                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}

export default Register