import React,{useEffect, useState} from 'react'
import VideoCard from './VideoCard';
import { YOUTUBE_VIDEO_URL } from "../utils/constants";
import { Link } from 'react-router-dom';

const VideoContainer = () => {
    const [videos,setVideos] = useState([]);
    // const [changeCheck,setChangeCheck] = useState("Hey, I didn't change");
    const fetchVideos = async () => {
    const response = await fetch(YOUTUBE_VIDEO_URL, {});
    const data = await response.json();
    setVideos(data.items);
    // console.log("VideoContainer",data.items)
  };
// setChangeCheck("Hey, I changed");
// console.log(changeCheck);
  useEffect(() => {
    fetchVideos();
  }, []);
  if(!videos){
    return <div>Loading...</div>
  }
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 p-4">
      {videos.length>0?(videos.map((video)=>
      <Link key = {video.id}  to={`/watch?v=` + video.id}>
        <VideoCard Video = {video}/>
      </Link>
    )):(<></>)}
    </div>
  )
}

export default VideoContainer
