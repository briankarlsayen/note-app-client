import React from 'react'
import { useLocation } from 'react-router-dom'

function Skeleton({arrNum}) {
  // const skelArr = []
  // let newKey = 0 
  // for(let i = 0; arrNum >= i; i++) {
    
  //   console.log('newKey', newKey)
  //   console.log('i', i)
  //   skelArr.push(<SkeletonText newKey={newKey} fake={'1'}/>)
  //   newKey =+ 1
  // }    
  // return skelArr
  const location = useLocation()
  return(
    <SkeletonText />
  )
}

const SkeletonText = ()=> {
  return (
    <div className='max-w-[900px] w-full leading-normal'>
      <div className="ml-16 w-48 my-4 h-10 bg-gray-200 animate-pulse"></div>
      <div className='item-container align-middle items-center mb-1'>
        <div className='h-7 w-7 bg-gray-200 mr-2 rounded-sm animate-pulse'></div>
        <div className='h-7 w-7 bg-gray-200 mr-2 rounded-sm animate-pulse'></div>
        <div className='h-10 w-full bg-gray-200 rounded-sm animate-pulse'></div>
        <div className='item-list-margin'></div>
      </div>
      <div className='item-container align-middle items-center mb-1'>
        <div className='h-7 w-7 bg-gray-200 mr-2 rounded-sm animate-pulse'></div>
        <div className='h-7 w-7 bg-gray-200 mr-2 rounded-sm animate-pulse'></div>
        <div className='h-10 w-full bg-gray-200 rounded-sm animate-pulse'></div>
        <div className='item-list-margin'></div>
      </div>
      <div className='item-container align-middle items-center mb-1'>
        <div className='h-7 w-7 bg-gray-200 mr-2 rounded-sm animate-pulse'></div>
        <div className='h-7 w-7 bg-gray-200 mr-2 rounded-sm animate-pulse'></div>
        <div className='h-10 w-full bg-gray-200 rounded-sm animate-pulse'></div>
        <div className='item-list-margin'></div>
      </div>
    </div>
  )
} 

export default Skeleton