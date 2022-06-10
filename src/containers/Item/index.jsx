import React from 'react'
import { useEffect, useState } from 'react'
import axios from '../../axios'
import { useParams } from 'react-router-dom'

function Item() {
  const {id} = useParams();
  const [note, setNote] = useState()
  
  useEffect(() => {
    getNoteDetails()
  }, [])

  const getNoteDetails = async() => {
    try {
      const noteData = await axios.get(`/notes/${id}`)
      console.log('noteData', noteData)
      if(noteData) setNote(noteData.data)
    } catch(error) {

    }
  }
  return (
    <div className="home-container">
      <h1>Note App</h1>
      <div className="home-note-container">
        {note && note.items.map(item => {
          return <ItemList key={item.uuid} title={item.title} checked={item.checked} />
        })}
      </div>

    </div>
  )
}

const ItemList = ({title, checked}) => {
  return(
    <div className="note-contaner">
      <p className="title">{title}</p>
      <p>{checked}</p>
    </div>
  )
}

export default Item