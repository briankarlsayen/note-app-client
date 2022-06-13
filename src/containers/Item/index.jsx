import React from 'react'
import { useEffect, useState } from 'react'
import axios from '../../axios'
import { useParams, useNavigate } from 'react-router-dom'
import addIcon from '../../assets/icons/add.svg'
import noteOptionIcon from '../../assets/icons/note-options.svg'
import backIcon from '../../assets/icons/back.svg'

function Item({notes}) {
  const {id} = useParams();
  const [items, setItems] = useState()
  const [inputText, setInputText] = useState('')
  const [note, setNote] = useState({})
  const [hoveredItem, setHoveredItem] = useState()
  
  const navigate = useNavigate()

  useEffect(() => {
    getItemDetails()
    getNote()
  }, [])

  const getItemDetails = async() => {
    try {
      const itemData = await axios.get(`/items/getbynote/${id}`)
      if(itemData) setItems(itemData.data)
    } catch(error) {

    }
  }
  const getNote = async() => {
    try {
      const noteData = await axios.get(`/notes/${id}`)
      setNote(noteData.data)
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
      const finishItem = await axios.put(`/items/editcheck/${params.uuid}`)
      const newItemList = []
      items.map(item => {
        if(item.uuid !== finishItem.data.item.uuid) newItemList.push(item)
      })
      setItems([...newItemList, finishItem.data.item])
    } catch(error) {
      console.log('error', error)
    }
  }
  const itemHovered = (item) => {
    setHoveredItem(item.uuid)
  }
  return (
    <div className="home-container">
      <div className="back-btn-container" onClick={()=>navigate('/app')}>
        <img className="back-btn-icon" src={backIcon} />
        <p>Back</p>
      </div>
      <h1 className="header item-header-margin">{note.title}</h1>
      <div className="home-note-container">
        {items && items.map(item => {
          return (
            <div className='item-container' onMouseEnter={(e)=> itemHovered(item)} onMouseLeave={()=> setHoveredItem('')}>
              <div className={`${item.uuid === hoveredItem ? 'note-opt item-hovered' : 'note-opt'}`}>
                <div className="item-add-container">
                  <img className="item-add-icon" src={addIcon} />
                </div>
                <div className="item-opt-container">
                  <img className="item-opt-icon" src={noteOptionIcon} />
                </div>
              </div>
              <ItemList key={item.uuid} title={item.title} checked={item.checked} item={item} finishItem={finishItem}/>
            </div>
          )
        })}
      </div>
      <ItemInput createItem={createItem} setInputText={setInputText} inputText={inputText}/>
    </div>
  )
}

const ItemList = ({title, checked, item, finishItem}) => {
  return(
    <div className="item-list-container">
      <div className="note-container" onClick={()=>finishItem(item)}>
          <p className={checked ? `title checked` : 'title'}>{title}</p>
      </div>
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

export default Item