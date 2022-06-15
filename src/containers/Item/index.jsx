import React from 'react'
import { useEffect, useState, useRef } from 'react'
import axios from '../../axios'
import { useParams, useNavigate } from 'react-router-dom'
import addIcon from '../../assets/icons/add.svg'
import noteOptionIcon from '../../assets/icons/note-options.svg'
import backIcon from '../../assets/icons/back.svg'
import deleteIcon from '../../assets/icons/delete.svg'
import editIcon from '../../assets/icons/edit.svg'

function Item() {
  const {id} = useParams();
  const [items, setItems] = useState()
  const [inputText, setInputText] = useState('')
  const [note, setNote] = useState({})
  const [hoveredItem, setHoveredItem] = useState()
  const [itemOption, setItemOption] = useState('')
  const [isItemEditing, setItemEditing] = useState('')
  const [editTextInput, setEditTextInput] = useState('')

  const refNoteInput = useRef(null)  
  const navigate = useNavigate()

  useEffect(() => {
    getItemDetails()
    getNote()
  }, [])

  useEffect(() => {
    if(isItemEditing) {
      setEditTextInput(isItemEditing.title)
      refNoteInput.current.focus()
    }
  }, [isItemEditing])

  const getItemDetails = async() => {
    try {
      const itemData = await axios.get(`/items/getbynote/${id}`)
      if(itemData) return setItems(itemData.data)
    } catch(error) {
      console.log('error', error)
    }
  }
  const getNote = async() => {
    try {
      const noteData = await axios.get(`/notes/${id}`)
      return setNote(noteData.data)
    } catch(error) {
      console.log('error', error)
    }
  }

  const createItem = async(e) => {
    e.preventDefault()
    try {
    const newItem = await axios.post('/items', {
      noteUuid: id,
      title: inputText,
      body: '',
      type: 'Text',
    })
    if(newItem) {
      let newItemData = newItem.data.item
      setItems([...items, newItemData])
      setInputText('')
    }
    } catch(error) {
      console.log('error', error)
    }
  }
  const finishItem = async(params) => {
    try {
      const updatedData = {
        ...params,
        checked: !params.checked,
      }
      const newItemList = items;
      const itemEditingId = items.findIndex(item => item.uuid === params.uuid)
      newItemList[itemEditingId] = updatedData
      setItems(newItemList)

      const finishItem = await axios.put(`/items/editcheck/${params.uuid}`)
      if(!finishItem) return console.log('error', error)    
    } catch(error) {
      console.log('error', error)
    }
  }
  const itemHovered = (item) => {
    setHoveredItem(item.uuid)
  }
  const itemClicked = (note) => {
    setItemOption(note.uuid)
    setHoveredItem(note.uuid)
  }
  const deleteItem = async(item) => {
    try {
      const newItemList = items;
      const itemDeletedId = items.findIndex(data => data.uuid === item.uuid)
      newItemList.splice(itemDeletedId, 1)
      setItems(newItemList)
      const deleteItemData = await axios.put(`/items/delete/${item.uuid}`)
      if(!deleteItemData) return console.log('error', error)
      setItemOption('')
    } catch(error) {
      console.log('error', error)
    }
  }
  const saveEditItem = async(e) => {
    if(isItemEditing) {
      try {
        e.preventDefault()
        setItemOption('')
        const editData = {
          ...isItemEditing,
          title: editTextInput,
        }
        const newItemList = items;
        const itemEditingId = items.findIndex(item => item.uuid === item.uuid)
        newItemList[itemEditingId] = editData
        setItems(newItemList)
        const editNoteData = await axios.put(`/items/edit/${isItemEditing.uuid}`, editData)
        if(!editNoteData) return console.log('error', error)
        setItemEditing('')
      } catch(error) {
        console.log('error', error)
      }
    }
  }
  const editItem = async(item) => {
    setItemEditing(item)
  }
  const saveEdit = (e) => {
    setItemOption('')
    setHoveredItem('')
    saveEditItem(e)
  }
  return (
    <div className="home-container" onClick={e => e.target.className === "home-container" ? saveEdit(e)  : null}>
      <div className="back-btn-container" onClick={()=>navigate('/app')}>
        <img className="back-btn-icon" src={backIcon} />
        <p>Back</p>
      </div>
      <h1 className="header item-header-margin">{note.title}</h1>
      <div className="home-note-container">
        {items && items.map(item => {
          return (
            <div key={item.uuid} className='item-container' onMouseEnter={(e)=> itemHovered(item)} onMouseLeave={()=> setHoveredItem('')}>
              <div className={`${item.uuid === hoveredItem ? 'note-opt item-hovered' : 'note-opt'}`}>
                <div className="item-add-container">
                  <img className="item-add-icon" src={addIcon} />
                </div>
                <div className={`${itemOption ? 'item-opt-container item-opt-active' : 'item-opt-container'}`} onClick={() => itemClicked(item)}>
                  <img className="item-opt-icon" src={noteOptionIcon} />
                </div>
              </div>
              { item.uuid === itemOption ? <ItemOptions item={item} deleteItem={deleteItem} editItem={editItem} saveEditItem={saveEditItem} /> : null }

              <ItemList title={item.title} 
              checked={item.checked} 
              item={item} 
              finishItem={finishItem} 
              saveEditItem={saveEditItem} 
              refNoteInput={refNoteInput} 
              editTextInput={editTextInput} 
              setEditTextInput={setEditTextInput}
              isItemEditing={isItemEditing}
              />
            </div>
          )
        })}
      </div>
      <ItemInput createItem={createItem} setInputText={setInputText} inputText={inputText}/>
    </div>
  )
}

const ItemList = ({title, checked, item, finishItem, isItemEditing, refNoteInput, saveEditItem, setEditTextInput, editTextInput}) => {
  return(
    <div className="item-list-container" onSubmit={(e) => saveEditItem(e)}>
      { isItemEditing.uuid === item.uuid ? 
        <form className='home-note-container' onSubmit={(e) => saveEditItem({e, item})}>
          <input ref={refNoteInput} className='item-input' type='text' value={editTextInput} onChange={(e)=>setEditTextInput(e.target.value)}/>
        </form>
        :
        <div className='note-container' onClick={()=>finishItem(item)}>
          <p className={checked ? `title checked` : 'title'}>{title}</p>
        </div>
      }
      <div className='item-list-margin'></div>
    </div>
  )
}

const ItemInput = ({createItem, setInputText, inputText}) => {
  return(
    <form className="home-note-container item-input-display" onSubmit={(e)=>createItem(e)}>
      <div className="item-input-margin"></div>      
      <input className='item-input' type='text' placeholder="Input new note" onChange={(e)=>setInputText(e.target.value)} value={inputText}/>
    </form>
  )
}

const ItemOptions = ({item, editItem, deleteItem}) => {
  return(
    <div className="note-opt-container note-opt-position"> 
      <div className="note-opt-item" onClick={()=>deleteItem(item)}>
        <img className='note-opt-icon' src={deleteIcon} />
        <p>Delete</p>
      </div>
      <div className="note-opt-item" onClick={() => editItem(item)}>
        <img className='note-opt-icon' src={editIcon} />
        <p>Edit</p>
      </div>
    </div>
  )
}
export default Item