import React, {useState, useRef, useEffect} from 'react'
import {useNavigate} from 'react-router-dom'
import Note from '../Note'
import axios from '../../axios'
import addIcon from '../../assets/icons/add.svg'
import deleteIcon from '../../assets/icons/delete.svg'
import editIcon from '../../assets/icons/edit.svg'
import noteOptionIcon from '../../assets/icons/note-options.svg'
import Skeleton from '../../components/Skeleton'
import Upload from '../UploadImage'
import Navbar from '../../components/Navbar'
import Options from '../../components/List/Options'
import InputBar from '../../components/List/InputBar'

export default function Home() {
  const [inputText, setInputText] = useState('')
  const [hoveredItem, setHoveredItem] = useState()
  const [noteOption, setNoteOption] = useState('')
  const [isNoteEditing, setNoteEditing] = useState('')
  const [noteTextInput, setNoteTextInput] = useState('')
  const [isRefUuid, setRefUuid] = useState('')
  const refNoteInput = useRef(null)
  const dragItem = useRef();
  const dragOverItem = useRef();
  const [isDragActive, setDragActive] = useState()
  const [notes, setNotes] = useState()
  const navigate = useNavigate()

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

  const createNote = async(e) => {
    e.preventDefault()
    try {

      const uuidParams = notes.length ? notes.slice(-1) : '';

      const newNote = await axios.post('/notes', {
        title: inputText,
        body: '',
        description: '',
        refUuid: notes.length ? uuidParams[0].uuid: uuidParams,
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
  const itemNotHovered = () => {
    if(!noteOption) setHoveredItem('')
  }

  const itemClicked = (note) => {
    if(note.uuid === noteOption) {
      setNoteOption('')
    } else {
      setNoteOption(note.uuid)
      setHoveredItem(note.uuid)
    }
  }
  const deleteNote = async(note) => {
    try {
      const newNoteList = notes;
      const noteDeletedId = notes.findIndex(data => data.uuid === note.uuid)
      newNoteList.splice(noteDeletedId, 1)
      setNotes(newNoteList)
      const deleteNoteData = await axios.put(`/notes/delete/${note.uuid}`)
      if(!deleteNoteData) return console.log('error', error)
      setNoteOption('')
    } catch(error) {
      console.log('error', error)
    }
  }
  const editNote = async(note) => {
    setNoteEditing(note)
  }
  const saveEditNote = async(e) => {
    if(isNoteEditing) {
      if(e.type === 'submit') e.preventDefault()
      setNoteOption('')
      const newNoteList = notes;
      const noteEditingId = notes.findIndex(note => note.uuid === isNoteEditing.uuid)

      if(isRefUuid) {
        try {
          const editData = {
            title: noteTextInput,
            refUuid: isRefUuid,
            body: '',
            description: '',
            type: 'Text',
            checked: false,
          }
          
          const createNewNote = await axios.post('/notes', editData)
          if(!createNewNote) return console.log('error', error)

          newNoteList[noteEditingId] = createNewNote.data.note
          setNotes(newNoteList)
          setRefUuid('')
          setNoteEditing(null)
        } catch (error) {
          console.log('error', error)
        }
      } else {
        try {          
          const editData = {
            ...isNoteEditing,
            title: noteTextInput,
          }
          
          const editingId = notes.findIndex(note => note.uuid === isNoteEditing.uuid)
          newNoteList[editingId] = editData
          setNotes(newNoteList)
          const editNoteData = await axios.put(`/notes/edit/${isNoteEditing.uuid}`, editData)
          if(!editNoteData) return console.log('error', error)
          setNoteEditing(null)
        } catch(error) {
          console.log('error', error)
        }
      }
    }
  }
  useEffect(() => {
    if(isNoteEditing) {
      setNoteTextInput(isNoteEditing.title)
      refNoteInput.current.focus()
    }
  }, [isNoteEditing])

  const handleAddBtn = (index) => {
    const uuidParams = notes.length ? notes[index].uuid : '';
    const newAItem = {
      uuid: Date.now(),
      title: '',
      body: '',
      type: 'Text',
      checked: false,
    }

    setRefUuid(uuidParams)
    const newItemArr = notes;
    newItemArr.splice(index + 1, 0, newAItem)
    setNotes(newItemArr)
    setNoteEditing(newAItem)
  }

  const dragStart = (e, position) => {
    dragItem.current = position;
  };
 
  const dragEnter = (e, position) => {
    dragOverItem.current = position;
    setDragActive(position)
  };

  const drop = async(e) => {
    const refNote = notes[dragOverItem.current];
    const {uuid} = notes[dragItem.current]
    const refUuid = dragOverItem.current !== 0 ? refNote.uuid : null

    const copyListItems = [...notes];
    const dragItemContent = copyListItems[dragItem.current];
    copyListItems.splice(dragItem.current, 1);
    copyListItems.splice(dragOverItem.current, 0, dragItemContent);
    dragItem.current = null;
    dragOverItem.current = null;
    setNotes(copyListItems);
    setDragActive(null)

    const updatePosition = await axios.put(`/notes/reposition/${ uuid }`, { refUuid: refUuid })
    if(!updatePosition) return console.log('error', error)
  };

  const handleOptionClick = (e) => {
    console.log('click', e.target.classList)
    const restrictClass = [ "item-input", "note-opt-icon", "item-opt-icon", "item-opt-active", "note-opt-item" ]
    let restrict = true;
    for(let item1 of restrictClass) {
      for(let item2 of e.target.classList) {
        if(item1 === item2) restrict = false;
      }
    }
    if(noteOption) {
      if(restrict) {
        if(e.target.className !== "item-opt-container") {
          setNoteOption('')
          setHoveredItem('')
          // TODO save only if changed
          saveEditNote(e)
        }
      }
    }
  }

  return (
    <div className="home-container" 
    onMouseDown={ e=> handleOptionClick(e) }>
      {/* <Upload /> */}
      {/* <Logout logoutHandler={logoutHandler} /> */}
      <div className="container-margin">
        { notes ? 
          <div className="home-note-container">
            <div className="flex flex-row-reverse">
              <h1 className="header">Note App</h1>
            </div>
            {notes.map((note, index) => { 
              return (
                <div key={note.uuid} className='item-container'
                onMouseEnter={(e)=> itemHovered(note)} 
                onMouseLeave={itemNotHovered}
                onDragStart={(e) => dragStart(e, index)}
                onDragEnter={(e) => dragEnter(e, index)}
                onDragEnd={drop}
                draggable>
                  <div className={`${note.uuid === hoveredItem ? 'note-opt item-hovered' : 'note-opt'}`}>
                    <div className="item-add-container" onClick={()=>handleAddBtn(index)}>
                      <img className="item-add-icon" src={addIcon} />
                    </div>
                    <div className={`${noteOption ? 'item-opt-container item-opt-active' : 'item-opt-container'}`} onClick={() => itemClicked(note)}>
                      <img className="item-opt-icon" src={noteOptionIcon} />
                    </div>
                  </div>
                  { note.uuid === noteOption ? <Options list={note} deleteList={deleteNote} editList={editNote} /> : null }
                    
                  <Note key={note.uuid}
                    id={note.uuid} 
                    title={note.title} 
                    date={note.createdAt} 
                    items={note.items} 
                    isNoteEditing={isNoteEditing} 
                    refNoteInput={refNoteInput} 
                    setNoteTextInput={setNoteTextInput} 
                    noteTextInput={noteTextInput} 
                    saveEditNote={saveEditNote}
                    className={`${isDragActive === index ? 'item-drag-hovered note-container' : 'note-container'}`} 
                    />
                </div>
              )
            })}
            <InputBar createList={createNote} setInputText={setInputText} inputText={inputText} />
          </div> : <Skeleton />
        }
      </div>
      
    </div>
  )
}

const Logout = ({logoutHandler}) => {
  return(
    <div className='h-full absolute bg-red-200'>
    </div>
  )
}