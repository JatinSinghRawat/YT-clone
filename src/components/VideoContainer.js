import React,{useEffect, useState} from 'react'
import VideoCard from './VideoCard';
import { YOUTUBE_VIDEO_URL } from "../utils/constants";
import { Link } from 'react-router-dom';

const VideoContainer = () => {
    const [videos,setVideos] = useState([]);
    const fetchVideos = async () => {
    const response = await fetch(YOUTUBE_VIDEO_URL, {});
    const data = await response.json();
    setVideos(data.items);
  };
  console.log(
  "API KEY:",
  process.env.REACT_APP_YOUTUBE_API_KEY
);
  useEffect(() => {
    fetchVideos();
  }, []);
  if(!videos){
    return <div>Loading...</div>
  }
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 p-4">
      {videos.length>0?(videos.map((video)=>
      <Link to={`/watch?v=` + video.id}>
        <VideoCard key = {video.id} Video = {video}/>
      </Link>
    )):(<></>)}
    </div>
  )
}

export default VideoContainer
