import { useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom';
import axios from '../../axios'

function ChangePassword() {
  const {id} = useParams();
  const navigate = useNavigate()
  const [ showResponseMsg, setResponseMsg ] = useState({
    success: '',
    message: '',
  })
  const [ passwordParams, setPasswordParams ] = useState({
    newPassword: '',
    confirmPassword: ''
  })
  const updateField = e => {
    setPasswordParams({
      ...passwordParams,
      [e.target.name]: e.target.value
    });
  };

  const submitFormHandler = async(e) => {
    e.preventDefault()
    try {
      if(passwordParams.newPassword !== passwordParams.confirmPassword) return setResponseMsg({success: false, message: 'Password does not match'})
      setResponseMsg({success: true, message: 'Password match'})
      const changePassword = await axios.put(`/users/changepassword/${id}`, { password: passwordParams.newPassword })
      if(!changePassword.data.success) return console.log(forgotPassword.data.message)
      setPasswordParams({
        newPassword: '',
        confirmPassword: ''
      })
      setResponseMsg(forgotPassword.data)
    } catch(error) {
      console.log('error', error)
      if(!error.response.data.success) setResponseMsg(error.response.data)
    }
  }
  const toLogin = () => {
    navigate('/app/login')
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
                    <h2 className="text-4xl font-bold text-center text-gray-700 dark:text-white">Change Password</h2>
                    <p className="mt-3 text-gray-500 dark:text-gray-300">Enter your new password.</p>
                </div>

                <div className="mt-8">
                  <form onSubmit={e=>submitFormHandler(e)}>
                    <div>
                      <label htmlFor="newPassword" className="block mb-2 text-sm text-gray-600 dark:text-gray-200">New password</label>
                      <input type="password" name="newPassword" id="newPassword" placeholder="******" className="input-field"  value={passwordParams.newPassword} onChange={updateField} />
                    </div>
                    <div className="mt-6">
                      <label htmlFor="confirmPassword" className="block mb-2 text-sm text-gray-600 dark:text-gray-200">Retype password</label>
                      <input type="password" name="confirmPassword" id="confirmPassword" placeholder="******" className="input-field"  value={passwordParams.confirmPassword} onChange={updateField} />
                    </div>
                    <div className="mt-6">
                      <button
                          className="login-btn">
                          Send Request
                      </button>
                    </div>
                    <p className={`my-2 text-sm text-center ${!showResponseMsg.success ? 'text-red-500' : 'text-green-400'}`}>{showResponseMsg.message}</p>
                  </form>
                  <p className="mt-6 text-sm text-center text-gray-400 cursor-pointer">Remembered your password? <span onClick={toLogin} className="login-redirect">Login</span>.</p>
                </div>
              </div> 
          </div>
        </div>
    </div>
  )
}

export default ChangePassword