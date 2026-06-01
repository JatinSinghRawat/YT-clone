import React from 'react'

const Comment = ({data}) => {
  return (
    <div className='flex bg-gray-200 px-2 py-2 rounded-lg shadow-sm mt-2'>
      <img className='w-8 h-8'
       alt="user" src="https://www.iconpacks.net/icons/2/free-user-icon-3296-thumb.png"/>
        <div className='ml-2 text-sm'>
            <p className='font-bold'>{data.name}</p>
            <p className='font-normal'>{data.text}</p>
        </div>
    </div>
  )
}

export default Comment
