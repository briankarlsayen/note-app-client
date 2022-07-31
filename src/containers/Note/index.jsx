import {useNavigate} from 'react-router-dom'
import TextareaAutosize from 'react-textarea-autosize';

function Note({id, title, date, items, isNoteEditing, refNoteInput, noteTextInput, setNoteTextInput, saveEditNote, className}) {
  const navigate = useNavigate()
  const handleClick = () => {
    navigate(`/app/item/${id}`)
  }
  return (
    <div className="item-list-container" key={id}>
      { isNoteEditing && isNoteEditing.uuid === id ? 
        <form className='home-note-container' onBlur={(e) => saveEditNote(e)}>
          <TextareaAutosize ref={refNoteInput} className='item-input' type='text' value={noteTextInput} onChange={(e)=>setNoteTextInput(e.target.value)} maxLength={255}/>
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