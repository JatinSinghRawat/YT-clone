import React from 'react'
import MiniSidebar from './MiniSidebar';
import { toggleMenu } from '../utils/NavSlice'
import { useDispatch } from 'react-redux'
const Head = () => {
    const dispatch = useDispatch();
  const toggleMenuHandler = () => {
    dispatch(toggleMenu());
  }
  return (
    <>
    <div className="fixed w-full h-14 top-0 bg-white grid grid-cols-12 py-2 z-10">
  <div className='col-span-2 flex items-center'>
    <img
      src='data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAOEAAADhCAMAAAAJbSJIAAAARVBMVEX///8jHyAgHB0MAAUOBQikpKQpJSadnZ309PUAAAAIAADZ2Nj8/Pyop6cYExXBwMAtKSpta2xpZ2draWpfXV7BwcGvrq77CGWbAAABG0lEQVR4nO3cwXKCMBQFUApFTQAVtf3/Ty3tsKhLZpKSxnP+4M57JCwyt2kAAAAAAAAAAAAAAADgFQ1TX4ZpyJJvvIXYlSGGecyQcI5v5Yi39AGHsHeqJyH9ovYljXAZ4qeEm9W/pc29pCHmOGma8R7iexky3RbLovbHMvR5bnwAAAAAAAAAANhkPJUhV77hcT2U4frI8mToI5zbUpzDJX3A06Hd+7neL22X/mHbpbDXl+mHeOz2DvUk9skT1j/D+r/DZYiVn6UvcB9+2/tnZpUrHgAAAAAAAAAAbDBMe5ftrXK17M619yZq2f1bGfpLp5JGmKWDtv6E9W9p/SfNz22xdxn7Kl/LbuW9+gAAAAAAAAAAAAAAAPCffAHLSDTi5JU+gwAAAABJRU5ErkJggg=='
      alt='burger-menu'
      className='w-10 object-contain mx-[2rem] cursor-pointer'
      onClick={toggleMenuHandler}
    />

    <img
      src="https://upload.wikimedia.org/wikipedia/commons/thumb/b/b8/YouTube_Logo_2017.svg/1280px-YouTube_Logo_2017.svg.png"
      alt='yt-logo'
      className='w-24 object-contain'
    />
  </div>

  <div className='flex justify-center items-center col-span-8'>
    <input
      type="text"
      className='h-9 border border-gray-300 border-r-0 rounded-l-full w-[60%] focus:outline-none focus:border-blue-400 px-4'
    />
    <button className='border border-gray-300 bg-gray-200 rounded-r-full h-9 px-2'>
      🔍
    </button>
  </div>

  <img
    src="https://www.iconpacks.net/icons/2/free-user-icon-3296-thumb.png"
    alt="user-icon"
    className='w-10 col-span-2 justify-self-center self-center'
  />
</div>

<MiniSidebar />
    </>
  )
}

export default Head
