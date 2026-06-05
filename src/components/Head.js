import React, { useEffect, useState } from "react";
import MiniSidebar from "./MiniSidebar";
import { toggleMenu } from "../utils/NavSlice";
import { useDispatch, useSelector } from "react-redux";
import { cacheResults } from "../utils/SearchSlice";
const Head = () => {
  const dispatch = useDispatch();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const [showSugggestions, setShowSuggestions] = useState(false);
  const [suggestQueries, setSuggestedQueries] = useState([]);
  const cache = useSelector((store) => store.search);
  const toggleMenuHandler = () => {
    dispatch(toggleMenu());
  };

  const handleArrowKey = (e) => {
    if (!suggestQueries.length) return;

    if (e.key === "ArrowDown") {
      setSelectedIndex((prev) =>{
        const next = Math.min(prev+1,suggestQueries.length-1);
        setSearchQuery(suggestQueries[next]);
        return next;
      }
      );
    }

    if (e.key === "ArrowUp") {
      setSelectedIndex((prev) => {
        const next = Math.max(prev-1,0);
        setSearchQuery(suggestQueries[next]);
        return next;
      });
    }
    if(e.key === "Enter"){
      const query = searchQuery;
      window.location.href=`/results?query=${encodeURIComponent(query)}`;
    }
  };

  const getSearchSuggestions = async () => {
    const response = await fetch(
      `http://suggestqueries.google.com/complete/search?client=chrome&ds=yt&q=${searchQuery}`,
    );
    const data = await response.json();
    setSuggestedQueries(data[1]);
    console.log(data[1]);
    dispatch(
      cacheResults({
        [searchQuery]: data[1],
      }),
    );
  };

  useEffect(() => {
    // console.log(searchQuery);
    if (searchQuery === "") {
      return;
    }
    if (cache[searchQuery]) {
      setSuggestedQueries(cache[searchQuery]);
      return;
    }
    const timer = setTimeout(() => getSearchSuggestions(), 200);
    return () => {
      clearTimeout(timer);
    };
  }, [searchQuery]);
  return (
    <>
      <div className="fixed w-full h-14 top-0 bg-white grid grid-cols-12 py-2 z-10">
        <div className="col-span-2 flex items-center">
          <img
            src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAOEAAADhCAMAAAAJbSJIAAAARVBMVEX///8jHyAgHB0MAAUOBQikpKQpJSadnZ309PUAAAAIAADZ2Nj8/Pyop6cYExXBwMAtKSpta2xpZ2draWpfXV7BwcGvrq77CGWbAAABG0lEQVR4nO3cwXKCMBQFUApFTQAVtf3/Ty3tsKhLZpKSxnP+4M57JCwyt2kAAAAAAAAAAAAAAADgFQ1TX4ZpyJJvvIXYlSGGecyQcI5v5Yi39AGHsHeqJyH9ovYljXAZ4qeEm9W/pc29pCHmOGma8R7iexky3RbLovbHMvR5bnwAAAAAAAAAANhkPJUhV77hcT2U4frI8mToI5zbUpzDJX3A06Hd+7neL22X/mHbpbDXl+mHeOz2DvUk9skT1j/D+r/DZYiVn6UvcB9+2/tnZpUrHgAAAAAAAAAAbDBMe5ftrXK17M619yZq2f1bGfpLp5JGmKWDtv6E9W9p/SfNz22xdxn7Kl/LbuW9+gAAAAAAAAAAAAAAAPCffAHLSDTi5JU+gwAAAABJRU5ErkJggg=="
            alt="burger-menu"
            className="w-10 object-contain mx-[2rem] cursor-pointer"
            onClick={toggleMenuHandler}
          />

          <img
            src="https://upload.wikimedia.org/wikipedia/commons/thumb/b/b8/YouTube_Logo_2017.svg/1280px-YouTube_Logo_2017.svg.png"
            alt="yt-logo"
            className="w-24 object-contain"
          />
        </div>

        <div className="relative col-span-8 flex justify-center">
          <div className="relative w-full max-w-2xl px-2">
            <div className="flex items-center">
              <input
                type="text"
                className="h-10 w-full border border-gray-300 border-r-0 rounded-l-full px-4 focus:outline-none focus:border-blue-400"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onFocus={() => setShowSuggestions(true)}
                onBlur={() =>
                  setTimeout(() => {
                    setShowSuggestions(false);
                  }, 200)
                }
                onKeyDown={handleArrowKey}
              />

              <button className="h-10 px-5 bg-gray-200 border border-gray-300 rounded-r-full"
              onClick={()=>window.location.href=`/results?query=${encodeURIComponent(searchQuery)}`}>
                🔍
              </button>
            </div>
            {showSugggestions && (
              <ul className="absolute w-[88%] mt-1 bg-white border border-gray-300 rounded-lg shadow-lg z-50">
                {suggestQueries.slice(0, 10).map((s, index) => {
                  return (
                    <a href={`/results?query=${encodeURIComponent(s)}`}>
                      <li
                        key={index}
                        className={`
          px-4 py-2 hover:bg-gray-100 ${selectedIndex === index?"bg-gray-200":"hover:bg-gray-200"}`}
                      >
                        {s}
                      </li>
                    </a>
                  );
                })}
              </ul>
            )}
          </div>
        </div>

        <img
          src="https://www.iconpacks.net/icons/2/free-user-icon-3296-thumb.png"
          alt="user-icon"
          className="w-10 col-span-2 justify-self-center self-center"
        />
      </div>

      <MiniSidebar />
    </>
  );
};

export default Head;
