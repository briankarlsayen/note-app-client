import React, {useState, useRef, useEffect} from 'react'
import Note from '../Note'
import axios from '../../axios'
import addIcon from '../../assets/icons/add.svg'
import deleteIcon from '../../assets/icons/delete.svg'
import editIcon from '../../assets/icons/edit.svg'
import noteOptionIcon from '../../assets/icons/note-options.svg'

export default function Home({notes, setNotes}) {
  const [inputText, setInputText] = useState('')
  const [hoveredItem, setHoveredItem] = useState()
  const [noteOption, setNoteOption] = useState('')
  const [isNoteEditing, setNoteEditing] = useState('')
  const [noteTextInput, setNoteTextInput] = useState('')
  const refNoteInput = useRef(null)

  const createNote = async(e) => {
    e.preventDefault()
    try {
    const newNote = await axios.post('/notes', {
      title: inputText,
      body: '',
      description: '',
    })
    if(newNote) {
      let newNoteData = newNote.data.note
      let noteList = [...notes, newNoteData]
      setNotes(noteList)
      setInputText('')
    }
    } catch(error) {
      console.log('error', error)
    }
  }
  const itemHovered = (item) => {
    if(!noteOption) return setHoveredItem(item.uuid)
  }
  const itemNotHovered = (item) => {
    if(!noteOption) setHoveredItem('')
  }

  const itemClicked = (note) => {
    setNoteOption(note.uuid)
    setHoveredItem(note.uuid)
    // setNoteEditing('')
  }
  const deleteNote = async(note) => {
    console.log('delete')
    try {
      const deleteNoteData = await axios.put(`/notes/delete/${note.uuid}`)
      if(!deleteNoteData) return console.log('error', error)
      const newNoteList = notes;
      const noteDeletedId = notes.findIndex(data => data.uuid === note.uuid)
      newNoteList.splice(noteDeletedId, 1)
      setNotes(newNoteList)
      setNoteOption('')
    } catch(error) {
      console.log('error', error)
    }
  }
  const editNote = async(note) => {
    setNoteEditing(note.uuid)
  }
  const saveEditNote = async() => {
    if(isNoteEditing) {
      try {
        // const editNoteData = await axios.put(`/notes/edit/${isNoteEditing}`, {
        //   title: noteTextInput,
        //   body: '',
        //   description: ''
        // })
        // if(!editNoteData) return console.log('error', error)
        // const newNoteList = notes;
        // const noteEditingId = notes.findIndex(note => note.uuid === isNoteEditing)
        // newNoteList[noteEditingId] = editNoteData.data
        // setNotes(newNoteList)
        setNoteEditing('')
      } catch(error) {
        console.log('error', error)
      }
    }
   
  }
  useEffect(() => {
    if(isNoteEditing) refNoteInput.current.focus()
  }, [isNoteEditing])
  
  return (
    <div className="home-container" onClick={e => e.target.className === "home-container" ? setNoteOption('') || setHoveredItem('') || saveEditNote() : null}>
      <h1 className="header item-header-margin">Note App</h1>
      <div className="home-note-container">
        {notes && notes.map(note => { 
          return (
            <div className='item-container' onMouseEnter={(e)=> itemHovered(note)} onMouseLeave={itemNotHovered}>
              <div className={`${note.uuid === hoveredItem ? 'note-opt item-hovered' : 'note-opt'}`}>
                <div className="item-add-container">
                  <img className="item-add-icon" src={addIcon} />
                </div>
                <div className={`${noteOption ? 'item-opt-container item-opt-active' : 'item-opt-container'}`} onClick={() => itemClicked(note)}>
                  <img className="item-opt-icon" src={noteOptionIcon} />
                </div>
              </div>
              { note.uuid === noteOption ? <NoteOptions note={note} deleteNote={deleteNote} editNote={editNote} /> : null }
                
              <Note key={note.uuid} 
                id={note.uuid} 
                title={note.title} 
                date={note.createdAt} 
                items={note.items} 
                isNoteEditing={isNoteEditing} 
                refNoteInput={refNoteInput} 
                setNoteTextInput={setNoteTextInput} 
                noteTextInput={noteTextInput} />
            </div>
          )
        })}
      </div>
      <NoteInput createNote={createNote} setInputText={setInputText} inputText={inputText} />
    </div>
  )
}

const NoteInput = ({createNote, setInputText, inputText}) => {
  return(
    <form className="home-note-container item-input-display" onSubmit={(e)=>createNote(e)}>
      <div className="item-input-margin"></div>  
      <input className='item-input' type='text' placeholder="Input new note" onChange={(e)=>setInputText(e.target.value)} value={inputText}/>
    </form>
  )
}

const NoteOptions = ({note, editNote, deleteNote}) => {
  return(
    <div className="note-opt-container note-opt-position"> 
      <div className="note-opt-item" onClick={()=>deleteNote(note)}>
        <img className='note-opt-icon' src={deleteIcon} />
        <p>Delete</p>
      </div>
      <div className="note-opt-item" onClick={() => editNote(note)}>
        <img className='note-opt-icon' src={editIcon} />
        <p>Edit</p>
      </div>
    </div>
  )
}