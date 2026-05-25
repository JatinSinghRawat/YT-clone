import React from 'react'
import { useSelector } from 'react-redux'
const MiniSidebar = () => {
  const {closeMiniMenu} = useSelector(store => store.sidebarNavigation);
  if(closeMiniMenu){
    return null;
  }
  return (
    <div className='fixed top-14 left-3 w-[5rem] bg-white flex flex-col gap-8 h-screen pt-4 z-20'>
      <div className='flex flex-col items-center text-xl'>
        <span>🏠</span>
        <h4 className='text-sm'>Home</h4>
      </div>

      <div className='flex flex-col items-center text-xl'>
        <span>🎬</span>
        <h4 className='text-sm'>Shorts</h4>
      </div>

      <div className='flex flex-col items-center text-xl'>
        <span>📺</span>
        <h4 className='text-sm'>Subscriptions</h4>
      </div>

      <div className='flex flex-col items-center text-xl'>
        <span>👤</span>
        <h4 className='text-sm'>You</h4>
      </div>
    </div>
  )
}

export default MiniSidebar