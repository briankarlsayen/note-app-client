import React from 'react'
import Item from '../Item'
import {useNavigate} from 'react-router-dom'

function Note({id, title, date, items}) {
  const navigate = useNavigate()
  const handleClick = () => {
    navigate(`/app/item/${id}`)
  }
  return (
    <div className='note-container' onClick={handleClick}>
      <div className="note-title">
        <h2 className="title">{title}</h2>
        {/* <p className="date">{date}</p> */}
      </div>
      
      {/* <Item /> */}
    </div>
  )
}

export default Note