import React, { useEffect } from 'react'
import {useNavigate} from 'react-router-dom'

function Note({id, title, date, items, isNoteEditing, refNoteInput, noteTextInput, setNoteTextInput, saveEditNote, className}) {
  // useEffect(() => {
  //   if(isNoteEditing.uuid === id) setNoteTextInput(title)
  // }, [isNoteEditing])
  // console.log('isNoteEditing.uuid === id', isNoteEditing.uuid === id)
  // console.log('id', id)

  const navigate = useNavigate()
  const handleClick = () => {
    navigate(`/app/item/${id}`)
  }
  return (
    <div className="item-list-container" key={id}>
      { isNoteEditing && isNoteEditing.uuid === id ? 
        <form className='home-note-container' onSubmit={(e) => saveEditNote(e)}>
          <input ref={refNoteInput} className='item-input' type='text' value={noteTextInput} onChange={(e)=>setNoteTextInput(e.target.value)}/>
        </form>
        :
        <div className={className} onClick={handleClick}>
          <h2 className="title">{title}</h2>
        </div>
      }
      <div className='item-list-margin'></div>
    </div>
  )
}

export default Note