import React from "react";
import { useDispatch } from "react-redux";
import { toggleMenu } from "../utils/NavSlice";

const OverlaySidebar = ({ isMenuOpen }) => {
  const dispatch = useDispatch();
  const toggleMenuHandler = () => {
    dispatch(toggleMenu());
  };

  return (
    <div
      className={`fixed 
 top-2 left-0 h-screen
w-64
bg-white z-50 shadow-xl
transform transition-transform duration-300 ease-in-out
${isMenuOpen ? "translate-x-0" : "-translate-x-full"}
`}
    >
      <div className="flex">
        <img
          src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAOEAAADhCAMAAAAJbSJIAAAARVBMVEX///8jHyAgHB0MAAUOBQikpKQpJSadnZ309PUAAAAIAADZ2Nj8/Pyop6cYExXBwMAtKSpta2xpZ2draWpfXV7BwcGvrq77CGWbAAABG0lEQVR4nO3cwXKCMBQFUApFTQAVtf3/Ty3tsKhLZpKSxnP+4M57JCwyt2kAAAAAAAAAAAAAAADgFQ1TX4ZpyJJvvIXYlSGGecyQcI5v5Yi39AGHsHeqJyH9ovYljXAZ4qeEm9W/pc29pCHmOGma8R7iexky3RbLovbHMvR5bnwAAAAAAAAAANhkPJUhV77hcT2U4frI8mToI5zbUpzDJX3A06Hd+7neL22X/mHbpbDXl+mHeOz2DvUk9skT1j/D+r/DZYiVn6UvcB9+2/tnZpUrHgAAAAAAAAAAbDBMe5ftrXK17M619yZq2f1bGfpLp5JGmKWDtv6E9W9p/SfNz22xdxn7Kl/LbuW9+gAAAAAAAAAAAAAAAPCffAHLSDTi5JU+gwAAAABJRU5ErkJggg=="
          alt="burger-menu"
          className="w-10 object-contain cursor-pointer ml-5"
          onClick={() => toggleMenuHandler()}
        />
        <img
          src="https://upload.wikimedia.org/wikipedia/commons/thumb/b/b8/YouTube_Logo_2017.svg/1280px-YouTube_Logo_2017.svg.png"
          alt="yt-logo"
          className="w-[6rem] object-contain col-span-1 ml-[1rem]"
        />
      </div>
      <ul className="space-y-4 pt-7 ml-3 text-xl">
        <li>
          🏠
          <span className="text-sm ml-2 font-bold">Home</span>
        </li>
        <li>
          🎬
          <span className="text-sm ml-2 font-bold">Shorts</span>
        </li>
        <li>
          📺
          <span className="text-sm ml-2 font-bold">Subscriptions</span>
        </li>
        <li>
          👤
          <span className="text-sm ml-2 font-bold">You</span>
        </li>
      </ul>

      <hr className="my-4" />

      <ul className="space-y-4 pt-2 text-xl ml-3">
        <li>
          🎵
          <span className="text-sm ml-2 font-bold">Music</span>
        </li>
        <li>
          {" "}
          🎮
          <span className="text-sm ml-2 font-bold">Gaming</span>
        </li>
        <li>
          {" "}
          ⚽<span className="text-sm ml-2 font-bold">Sports</span>
        </li>
        <li>
          {" "}
          📰
          <span className="text-sm ml-2 font-bold">News</span>
        </li>
      </ul>
    </div>
  );
};

export default OverlaySidebar;
