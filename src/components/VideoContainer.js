import React, { useEffect, useState } from "react";
import VideoCard from "./VideoCard";
import { getYoutubeVideoUrl } from "../utils/constants";
import { Link } from "react-router-dom";

const VideoContainer = () => {
  const [videos, setVideos] = useState([]);
  const [nextPageToken, setNextPageToken] = useState("");
  const [loading, setLoading] = useState(false);
  // const [changeCheck,setChangeCheck] = useState("Hey, I didn't change");
  const fetchVideos = async () => {
  if (loading) return;

  setLoading(true);

  const response = await fetch(
    getYoutubeVideoUrl(nextPageToken)
  );

  const data = await response.json();
  console.log(data);

  setVideos(prev => [...prev, ...data.items]);

  setNextPageToken(data.nextPageToken);

  setLoading(false);
};

  // setChangeCheck("Hey, I changed");
  // console.log(changeCheck);
  useEffect(() => {
    fetchVideos();
  }, []);

  useEffect(() => {
  const handleScroll = () => {
    if (
      window.innerHeight + window.scrollY >=
      document.documentElement.scrollHeight - 200
    ) {
      fetchVideos();
    }
  };

  window.addEventListener("scroll", handleScroll);

  return () => {
    window.removeEventListener("scroll", handleScroll);
  };
}, [nextPageToken, loading]);
  if (!videos) {
    return <div>Loading...</div>;
  }
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 p-4">
      {videos.length > 0 ? (
        videos.map((video) => (
          <Link key={video.id} to={`/watch?v=` + video.id}>
            <VideoCard Video={video} watchPage={false} />
          </Link>
        ))
      ) : (
        <></>
      )}
    </div>
  );
};

//Infinite Scroll Implementation
// # Infinite Scroll Summary (YouTube Clone)

// ## Goal

// Load more videos automatically when the user reaches the bottom of the page instead of showing only the first 50 videos.

// ---

// # Problem with Current Approach

// Currently:

// ```js
// https://youtube.googleapis.com/youtube/v3/videos?...&maxResults=50
// ```

// returns only the first page of videos.

// Even though `maxResults=50`, YouTube does **not** provide unlimited videos.

// After the first 50 videos, YouTube returns:

// ```js
// {
//   items: [...],
//   nextPageToken: "CAUQAA"
// }
// ```

// The `nextPageToken` is used to fetch the next set of videos.

// ---

// # States Added

// ```js
// const [videos, setVideos] = useState([]);
// const [nextPageToken, setNextPageToken] = useState("");
// const [loading, setLoading] = useState(false);
// ```

// ### videos

// Stores all fetched videos.

// Example:

// ```text
// First API Call -> 50 videos
// Second API Call -> 50 videos

// Total = 100 videos
// ```

// ---

// ### nextPageToken

// Stores the token returned by YouTube.

// Example:

// ```js
// "CAUQAA"
// "CBQQAA"
// "CCgQAA"
// ```

// Used to request the next page.

// ---

// ### loading

// Prevents multiple API calls from happening simultaneously.

// Without it:

// ```text
// User scrolls quickly
// ↓
// 3 API calls fire
// ↓
// Duplicate requests
// ```

// ---

// # Dynamic URL Function

// Instead of:

// ```js
// export const YOUTUBE_VIDEO_URL = "...";
// ```

// Use:

// ```js
// export const getYoutubeVideoUrl = (pageToken = "") =>
//   `https://youtube.googleapis.com/youtube/v3/videos?part=snippet,contentDetails,statistics&chart=mostPopular&regionCode=IN&maxResults=50&pageToken=${pageToken}&key=${process.env.REACT_APP_YOUTUBE_API_KEY}`;
// ```

// ### Why?

// Every new request needs a different page token.

// ---

// # Fetching More Videos

// ```js
// const fetchVideos = async () => {
//   if (loading) return;

//   setLoading(true);

//   const response = await fetch(
//     getYoutubeVideoUrl(nextPageToken)
//   );

//   const data = await response.json();

//   setVideos(prev => [...prev, ...data.items]);

//   setNextPageToken(data.nextPageToken);

//   setLoading(false);
// };
// ```

// ---

// # Why Use

// ```js
// setVideos(prev => [...prev, ...data.items]);
// ```

// Instead of:

// ```js
// setVideos(data.items);
// ```

// Because:

// ```js
// setVideos(data.items);
// ```

// replaces old videos.

// We want:

// ```text
// 50 + 50 + 50 = 150 videos
// ```

// not:

// ```text
// only latest 50 videos
// ```

// ---

// # Initial Data Load

// ```js
// useEffect(() => {
//   fetchVideos();
// }, []);
// ```

// Runs once when component mounts.

// Loads the first 50 videos.

// ---

// # Infinite Scroll Logic

// ```js
// useEffect(() => {
//   const handleScroll = () => {
//     if (
//       window.innerHeight + window.scrollY >=
//       document.documentElement.scrollHeight - 200
//     ) {
//       fetchVideos();
//     }
//   };

//   window.addEventListener("scroll", handleScroll);

//   return () => {
//     window.removeEventListener("scroll", handleScroll);
//   };
// }, [loading, nextPageToken]);
// ```

// ---

// # Browser Properties Used

// ## `window`

// Represents the browser window.

// Examples:

// ```js
// window.alert()
// window.location
// window.scrollY
// window.innerHeight
// ```

// ---

// ## `window.innerHeight`

// Visible height of browser viewport.

// Example:

// ```text
// 800px
// ```

// Returns:

// ```js
// 800
// ```

// ---

// ## `window.scrollY`

// How far user has scrolled vertically.

// Example:

// ```text
// 1200px
// ```

// Returns:

// ```js
// 1200
// ```

// ---

// ## `document.documentElement.scrollHeight`

// Total height of the webpage.

// Example:

// ```text
// 3500px
// ```

// Returns:

// ```js
// 3500
// ```

// ---

// # Bottom Detection Formula

// ```js
// window.innerHeight + window.scrollY
// ```

// Calculates:

// ```text
// Current bottom position of viewport
// ```

// Example:

// ```text
// Viewport Height = 800
// Scrolled = 2500

// Current Bottom = 3300
// ```

// ---

// Compare with:

// ```js
// document.documentElement.scrollHeight - 200
// ```

// Example:

// ```text
// 3500 - 200 = 3300
// ```

// Condition:

// ```js
// 3300 >= 3300
// ```

// Result:

// ```text
// Load More Videos
// ```

// ---

// # Why Use `-200`?

// ```js
// scrollHeight - 200
// ```

// Loads data before reaching the exact bottom.

// Without it:

// ```text
// Reach Bottom
// ↓
// Wait
// ↓
// API Request
// ↓
// Videos Appear
// ```

// With it:

// ```text
// 200px Before Bottom
// ↓
// API Starts
// ↓
// Videos Ready Before User Reaches End
// ```

// Better user experience.

// ---

// # Why Cleanup the Effect?

// ```js
// return () => {
//   window.removeEventListener("scroll", handleScroll);
// };
// ```

// React executes cleanup:

// 1. When component unmounts.
// 2. Before running effect again.

// Without cleanup:

// ```text
// Render 1 → Listener 1
// Render 2 → Listener 2
// Render 3 → Listener 3
// ```

// One scroll:

// ```text
// API Call
// API Call
// API Call
// ```

// Causing duplicate requests and memory leaks.

// ---

// # Empty Page Token Behavior

// ### First Request

// ```js
// pageToken = "";
// ```

// or

// ```js
// No pageToken parameter
// ```

// Both fetch the first page.

// Example response:

// ```js
// {
//   items:[...],
//   nextPageToken:"CAUQAA"
// }
// ```

// ---

// ### Second Request

// ```js
// pageToken="CAUQAA"
// ```

// Fetches next 50 videos.

// ---

// # Important Improvement

// When YouTube stops providing pages:

// ```js
// nextPageToken === undefined
// ```

// or

// ```js
// nextPageToken === null
// ```

// stop fetching:

// ```js
// if (!nextPageToken && videos.length > 0) return;
// ```

// Otherwise you may repeatedly request the same data or waste API quota.

// ---

// # Better Industry Standard

// Current approach:

// ```js
// window.addEventListener("scroll")
// ```

// Works and is good for learning.

// Modern production apps often use:

// ```js
// IntersectionObserver
// ```

// Benefits:

// * Better performance
// * No constant scroll calculations
// * Easier infinite scrolling
// * Common interview topic

// A good learning path is:

// ```text
// 1. Learn Scroll Events
// 2. Implement Infinite Scroll
// 3. Learn IntersectionObserver
// 4. Replace Scroll Events
// ```

// This gives you a solid understanding of both how browsers detect scrolling and how production-grade infinite scrolling is typically built.


export default VideoContainer;
