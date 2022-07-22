import React from 'react'
import Profile from '../Profile'
function Navbar() {
  return (
    <div className="flex flex-col-reverse w-full items-end min-h-[5vh] align-middle">
      <Profile />
    </div>
  )
}

export default Navbar