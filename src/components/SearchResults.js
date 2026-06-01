import React, { useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";

const SearchResults = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const query = searchParams.get("query");
  const [searchResults, setSearchResults] = useState(null);
  useEffect(() => {
    getSearchResults();
  }, []);
  const getSearchResults = async () => {
    const response = await fetch(
      `https://youtube.googleapis.com/youtube/v3/search?part=snippet&maxResults=25&q=${query}&key=${process.env.REACT_APP_YOUTUBE_API_KEY}`,
    );
    const data = await response.json();
    console.log("searchresults", data.items);
    setSearchResults(data.items);
  };
  //optimized version
  const getPublishedAgo = (publishedAt) => {
    const seconds = Math.floor((Date.now() - new Date(publishedAt)) / 1000);

    const timeUnits = [
      { label: "year", value: 60 * 60 * 24 * 365 },
      { label: "month", value: 60 * 60 * 24 * 30 },
      { label: "day", value: 60 * 60 * 24 },
      { label: "hour", value: 60 * 60 },
      { label: "minute", value: 60 },
      { label: "second", value: 1 },
    ];

    for (const unit of timeUnits) {
      const interval = Math.floor(seconds / unit.value);

      if (interval >= 1) {
        return `${interval} ${unit.label}${interval > 1 ? "s" : ""} ago`;
      }
    }
  };
  return (
    <div>
      {searchResults &&
        searchResults.map((video) => {
          return (
            <Link key={video.id.videoId} to={`/watch?v=` + video.id.videoId} className="cursor-pointer">
            <div className="mx-2 my-2 px-2 py-4 rounded-lg flex hover:bg-gray-100">
              <img
                src={video.snippet.thumbnails.high.url}
                alt="thumbnail"
                className="rounded-lg"
              />
              <div className="mt-2 ml-5 flex-col ">
                <h2 className="text-xl font-bold">
                  {video.snippet.title}
                </h2>
                <h6 className="font-normal text-sm text-gray-400">{getPublishedAgo(video.snippet.publishedAt)}</h6>
                 <h6 className="mt-2 font-bold text-gray-500 text-md">{video.snippet.channelTitle}</h6>
                 <h6 className="mt-2 font-normal text-gray-500 text-md">{video.snippet.description}</h6>
              </div>
            </div>
            </Link>
          );
        })}
    </div>
  );
};

export default SearchResults;
