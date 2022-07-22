import React, { useState } from 'react'
import {useNavigate} from 'react-router-dom'
import axios from '../../axios'

function Login() {
  const navigate = useNavigate()
  const [ loginParams, setLoginParams] = useState({
    username: '',
    password: '',
  })
  const [ showResponseMsg, setResponseMsg ] = useState({
    success: '',
    message: '',
  })

  const updateField = e => {
    setLoginParams({
      ...loginParams,
      [e.target.name]: e.target.value
    });
  };
  const handleClick = () => {
    navigate(`/app/register`)
  }

  const submitFormHandler = async(e) => {
    e.preventDefault()
    try {
      const login = await axios.post('/users/login', loginParams)
      if(!login) return console.log('error', login)
      setLoginParams({
          username: '',
          password: ''
      })
      if(!login.data.success) return console.log(login.data.message)
      localStorage.setItem('token', login.data.token)
      navigate(`/app/notes`)
    } catch(error) {
      console.log('error', error)
      if(!error.response.data.success) setResponseMsg(error.response.data)
    }
  }
  return (
    <div className="bg-white dark:bg-gray-900">
        <div className="flex justify-center h-screen">
            <div className="hidden bg-cover lg:block lg:w-2/3" style={{backgroundImage: `url(https://images.unsplash.com/photo-1512314889357-e157c22f938d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1471&q=80)`}} >
                <div className="flex items-center h-full px-20 bg-gray-900 bg-opacity-40">
                    <div>
                        <h2 className="text-4xl font-bold text-white">Note app</h2>
                        
                        <p className="max-w-xl mt-3 text-gray-300">We’re more than a doc. Or a table. Customize note app to work the way you do.</p>
                    </div>
                </div>
            </div>
            
            <div className="flex items-center w-full max-w-md px-6 mx-auto lg:w-2/6">
                <div className="flex-1">
                    <div className="text-center">
                        <h2 className="text-4xl font-bold text-center text-gray-700 dark:text-white">Login</h2>
                        <p className="mt-3 text-gray-500 dark:text-gray-300">Login to access your account</p>
                    </div>

                    <div className="mt-8">
                        <form onSubmit={e=>submitFormHandler(e)}>
                            <div>
                                <label htmlFor="username" className="block mb-2 text-sm text-gray-600 dark:text-gray-200">Email Address</label>
                                <input type="email" name="username" id="username" placeholder="example@example.com" className="input-field"  value={loginParams.username} onChange={updateField} />
                            </div>
                            <div className="mt-6">
                                <div className="flex justify-between mb-2">
                                    <label htmlFor="password" className="text-sm text-gray-600 dark:text-gray-200">Password</label>
                                    <a href="#" className="text-sm text-gray-400 focus:text-blue-500 hover:text-blue-500 hover:underline">Forgot password?</a>
                                </div>

                                <input type="password" name="password" id="password" placeholder="Your Password" className="input-field"  value={loginParams.password} onChange={updateField} />
                            </div>
                            <p className={`my-2 text-sm text-center ${!showResponseMsg.success ? 'text-red-500' : 'text-green-400'}`}>{showResponseMsg.message}</p>
                            <div className="mt-62">
                                <button
                                    className="login-btn">
                                    Sign in
                                </button>
                            </div>
                        </form>

                        <p className="mt-6 text-sm text-center text-gray-400">Don&#x27;t have an account yet? <span href="#" onClick={handleClick} className="login-redirect">Register</span>.</p>
                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}

export default Login