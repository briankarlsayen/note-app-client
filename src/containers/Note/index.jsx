import React from 'react'
import Item from '../Item'
import {useNavigate} from 'react-router-dom'
import { useState } from 'react'

function Note({id, title, date, items, isNoteEditing, refNoteInput}) {
  const [noteTextInput, setNoteTextInput] = useState(title)
  const navigate = useNavigate()
  const handleClick = () => {
    navigate(`/app/item/${id}`)
  }
  return (
    <div className="item-list-container">
      { isNoteEditing === id ? 
        <div className='home-note-container'>
          <input ref={refNoteInput} className='item-input' type='text' value={title} onChange={(e)=>setNoteTextInput(e.target.value)}/>
        </div>
        :
        <div className='note-container' onClick={handleClick}>
          <div className="note-title"> 
            <h2 className="title">{title}</h2>
          </div>
        </div>
          }

      <div className='item-list-margin'></div>
    </div>
   
  )
}

export default Note