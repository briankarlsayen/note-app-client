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
  const [isDragActive, setDragActive] = useState()

  const refNoteInput = useRef(null)  
  const dragItem = useRef();
  const dragOverItem = useRef();
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

  const isURL = (str) => {
    const pattern = new RegExp('^(https?:\\/\\/)?'+ // protocol
      '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|'+ // domain name
      '((\\d{1,3}\\.){3}\\d{1,3}))'+ // OR ip (v4) address
      '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*'+ // port and path
      '(\\?[;&a-z\\d%_.~+=-]*)?'+ // query string
      '(\\#[-a-z\\d_]*)?$','i'); // fragment locator
    return !!pattern.test(str);
  }

  const createItem = async(e) => {
    e.preventDefault()
    try {
      let params;
      if(isURL(inputText)) {
        console.log('bookmark')
        params = {
          noteUuid: id,
          title: inputText,
          body: '',
          type: 'Bookmark',
        }
      } else {
        params ={
          noteUuid: id,
          title: inputText,
          body: '',
          type: 'Text',
        }
      }

      const newItem = await axios.post('/items', params)
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
      const itemEditingId = items.findIndex(item => item.uuid === isItemEditing.uuid)
      newItemList[itemEditingId] = updatedData
      setItems(newItemList)

      // const finishItem = await axios.put(`/items/editcheck/${params.uuid}`)
      // if(!finishItem) return console.log('error', error)    
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
        if(e._reactName === "onSubmit") e.preventDefault()
        setItemOption('')
        const editData = {
          ...isItemEditing,
          title: editTextInput,
        }
        const newItemList = items;
        const itemEditingId = items.findIndex(item => item.uuid === isItemEditing.uuid)
        newItemList[itemEditingId] = editData
        setItems(newItemList)
        // const editNoteData = await axios.put(`/items/edit/${isItemEditing.uuid}`, editData)
        // if(!editNoteData) return console.log('error', error)
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

  const handleAddBtn = (index) => {
    const newAItem = {
      uuid: Date.now(),
      title: '',
      body: '',
      type: 'Text',
      checked: false,
    }
    const newItemArr = items;
    newItemArr.splice(index + 1, 0, newAItem)
    setItems(newItemArr)
    setItemEditing(newAItem)
  }

  const dragStart = (e, position) => {
    dragItem.current = position;
  };
 
  const dragEnter = (e, position) => {
    dragOverItem.current = position;
    setDragActive(position)
  };

  const drop = async(e) => {
    const refNote = items[dragOverItem.current];
    const {uuid} = items[dragItem.current]
    const refUuid = dragOverItem.current !== 0 ? refNote.uuid : null

    const copyListItems = [...items];
    const dragItemContent = copyListItems[dragItem.current];
    copyListItems.splice(dragItem.current, 1);
    copyListItems.splice(dragOverItem.current, 0, dragItemContent);
    dragItem.current = null;
    dragOverItem.current = null;
    setItems(copyListItems);
    setDragActive(null)

    const updatePosition = await axios.put(`/items/reposition/${ uuid }`, { refUuid: refUuid })
    if(!updatePosition) return console.log('error', error)
  };

  return (
    <div className="home-container" onClick={e => e.target.className === "home-container" ? saveEdit(e)  : null}>
      <div className="back-btn-container" onClick={()=>navigate('/app')}>
        <img className="back-btn-icon" src={backIcon} />
        <p>Back</p>
      </div>
      <h1 className="header item-header-margin">{note.title}</h1>
      <div className="home-note-container">
        {items && items.map((item, index) => {
          return (
            <div key={item.uuid} className="item-container" 
            onMouseEnter={(e)=> itemHovered(item)} 
            onMouseLeave={()=> setHoveredItem('')}
            onDragStart={(e) => dragStart(e, index)}
            onDragEnter={(e) => dragEnter(e, index)}
            onDragEnd={drop}
            draggable>
              <div className={`${item.uuid === hoveredItem ? 'note-opt item-hovered' : 'note-opt'}`}>
                <div className="item-add-container" onClick={()=>handleAddBtn(index)}>
                  <img className="item-add-icon" src={addIcon} />
                </div>
                <div className={`${itemOption ? 'item-opt-container item-opt-active' : 'item-opt-container'}`} onClick={() => itemClicked(item)}>
                  <img className="item-opt-icon" src={noteOptionIcon} />
                </div>
              </div>
              { item.uuid === itemOption ? <ItemOptions item={item} deleteItem={deleteItem} editItem={editItem} saveEditItem={saveEditItem} /> : null }

              { 
                item.type === "Text" && <ItemList 
                title={item.title} 
                checked={item.checked} 
                item={item} 
                finishItem={finishItem} 
                saveEditItem={saveEditItem} 
                refNoteInput={refNoteInput} 
                editTextInput={editTextInput} 
                setEditTextInput={setEditTextInput}
                isItemEditing={isItemEditing} 
                className={`${isDragActive === index ? 'item-drag-hovered note-container' : 'note-container'}`} 
                />
              }
              { 
                item.type === "Bookmark" && <ItemBookmark 
                url={item.title} 
                title={item.preview ? item.preview.title : item.title} 
                body={item.body} 
                description={item.preview ? item.preview.description : item.title} 
                image={item.preview ? item.preview.image.data : null }
                type={item.preview ? item.preview.type : null}
                imageUrl={item.preview ? item.preview.imageUrl : null}
                item={item} 
                isDragActive={isDragActive}
                index={index}
                className={`${isDragActive === index ? 'item-drag-hovered item-bookmark-container' : 'item-bookmark-container'}`}
                />
              }
              <div className='item-list-margin'></div>
            </div>
          )
        })}
      </div>
      <ItemInput createItem={createItem} setInputText={setInputText} inputText={inputText}/>
    </div>
  )
}

const ItemList = ({title, checked, item, finishItem, isItemEditing, refNoteInput, saveEditItem, setEditTextInput, editTextInput, className}) => {
  return(
    <div className="item-list-container" onSubmit={(e) => saveEditItem(e)}>
      { isItemEditing.uuid === item.uuid ? 
        <form className='home-note-container' onSubmit={(e) => saveEditItem({e, item})}>
          <input ref={refNoteInput} className='item-input' type='text' value={editTextInput} onChange={(e)=>setEditTextInput(e.target.value)}/>
        </form>
        :
        <div className={className} onClick={()=>finishItem(item)}>
          <p className={checked ? `title checked` : 'title'}>{title ? title : ""}</p>
        </div>
      }
    </div>
  )
}

const ItemBookmark = ({url, title, body, description, image, type, item, imageUrl, className}) => {
  function _arrayBufferToBase64( buffer ) {
    var binary = '';
    var bytes = new Uint8Array( buffer );
    var len = bytes.byteLength;
    for (var i = 0; i < len; i++) {
        binary += String.fromCharCode( bytes[ i ] );
    }
    return window.btoa( binary );
  }
  const base64String = _arrayBufferToBase64(image)
  let convertImg = `data:${type};base64,${base64String}`
  return(
    <div className={className}>
      <div className="item-bookmark" onClick={()=> window.open(url, "_blank")}>
      {/* <div onClick={()=> window.open(url, "_blank")} className={`${isDragActive === index ? 'item-drag-hovered item-bookmark' : 'item-bookmark'}`}> */}
        <div className="item-bookmark-left">
          <p className="item-bookmark-title">{title}</p>
          <p className="item-bookmark-description">{description}</p>
          <p className="item-bookmark-url">{url}</p>
        </div>
        { type && type === "url" ?
        <div className="item-bookmark-right">
          <img src={imageUrl} alt={title} />
        </div>:
        <div className="item-bookmark-right">
          <img src={convertImg} alt={title} />
        </div>
        }
        
      </div>
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