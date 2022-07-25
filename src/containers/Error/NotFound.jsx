import React from 'react'
import { useNavigate } from 'react-router-dom'

function NotFound() {
  const navigate = useNavigate()
  return (
    <div className='w-full h-screen flex flex-col justify-start items-center text-center'>
      <div className='my-auto items-center justify-center'>
        <h2 className='text-2xl pb-5'>This page does not exist</h2>
        <button onClick={() => navigate('/app/notes')} className='p-2 bg-blue-500 hover:bg-blue-600 text-white rounded-sm text-sm'>Back to content</button>
      </div>
    </div>
  )
}

export default NotFound