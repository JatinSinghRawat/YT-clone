import React from 'react'

const Message = ({name, message}) => {
  return (
    <div className='flex items-center'>
      <img
          src="https://www.iconpacks.net/icons/2/free-user-icon-3296-thumb.png"
          alt="user-icon"
          className="w-10 col-span-2 justify-self-center self-center"
        />
      <span className='mx-2 font-bold'>{name}</span>
      <span>{message}</span>
    </div>
  )
}

export default Message
