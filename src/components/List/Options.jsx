import React from 'react'
import deleteIcon from '../../assets/icons/delete.svg'
import editIcon from '../../assets/icons/edit.svg'

const Options = ({list, editList, deleteList}) => {
  return(
    <div key={list.uuid} className="note-opt-container note-opt-position"> 
      <div className="note-opt-item" onClick={() => editList(list)}>
        <img className='note-opt-icon' src={editIcon} />
        <p>Edit</p>
      </div>
      <div className="note-opt-item" onClick={()=>deleteList(list)}>
        <img className='note-opt-icon' src={deleteIcon} />
        <p>Delete</p>
      </div>
    </div>
  )
}

export default Options