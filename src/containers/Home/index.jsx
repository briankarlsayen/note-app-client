import React, {useState} from 'react'
import Note from '../Note'
import {useEffect} from 'react';
import axios from '../../axios'

export default function Home() {
  const [notes, setNotes] = useState()
  useEffect(() => {
    getNotes()
  },[])
  const getNotes = async() => {
    try {
      const getNotes = await axios.get('/notes')
      setNotes(getNotes.data)
    } catch(error) {
      console.log('error', error)
    }
  }
  console.log('notes', notes)
  return (
    <div className="home-container">
      <h1>Note App</h1>
      <div className="home-note-container">
        {notes && notes.map(note => { 
          return <Note key={note.uuid} id={note.uuid} title={note.title} date={note.createdAt} items={note.items}/>
        })}
      </div>
    </div>
  )
}