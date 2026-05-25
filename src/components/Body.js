import React from 'react'
import { Outlet } from 'react-router-dom'

const Body = () => {
  return (
    <div className='flex ml-[8rem] mt-[4rem]'>
       <Outlet/>
    </div>
  )
}

export default Body
