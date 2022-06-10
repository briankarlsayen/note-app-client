import React from 'react'
import { useEffect, useState } from 'react'
import axios from '../../axios'
import { useLocation } from 'react-router-dom'

function Item() {
  const [items, setItems] = useState([])
  useEffect(() => {
    getItemsByNote()
  }, [])

  let location = useLocation();
  console.log('location', location)

  const getItemsByNote = async() => {
    try {
      const itemData = await axios.get(`/items/getbynote/${location}`)
      if(itemData) {
        setItems(itemData.data)
      }
      console.log('itemData', itemData)
    } catch(error) {
      console.log('error', error)
    }
  }
  return (
    <div>
      {items && items.map(item => {
        return <ItemList key={item.uuid} title={item.title} checked={item.checked} />
      })}
    </div>
  )
}

const ItemList = ({title, checked}) => {
  return(
    <div>
      <p>{title}</p>
      <p>{checked}</p>
    </div>
  )
}

export default Item