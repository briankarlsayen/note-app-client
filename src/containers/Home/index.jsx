import React, {useState} from 'react'
import Note from '../Note'
import axios from '../../axios'

export default function Home({notes, setNotes}) {
  const [inputText, setInputText] = useState('')
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
  console.log('inputText', inputText)
  return (
    <div className="home-container">
      <h1 className="header">Note App</h1>
      <div className="home-note-container">
        {notes && notes.map(note => { 
          return <Note key={note.uuid} id={note.uuid} title={note.title} date={note.createdAt} items={note.items}/>
        })}
      </div>
      <form className="home-note-container" onSubmit={(e)=>createNote(e)}>
        <input className='note-input' type='text' placeholder="Input new note" onChange={(e)=>setInputText(e.target.value)} value={inputText}/>
      </form>
    </div>
  )
}