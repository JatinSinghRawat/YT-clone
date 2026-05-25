import React from 'react'

const VideoCard = ({Video}) => {
    //cluttered & repeated version
    // const getpublishedAgo = (publishedAt) =>{
    //     let publishedAgo = "";
    //     const publishedAtInMilliSeconds = new Date()-new Date(Video.snippet.publishedAt);
    //     const publishedInSecondsAgo = publishedAtInMilliSeconds/1000;
    //     if(publishedInSecondsAgo<60){
    //         publishedAgo = (Math.trunc(publishedInSecondsAgo)).toString() + " seconds ago";
    //         return publishedAgo;
    //     }   
    //     const publishedInMinutesAgo = publishedInSecondsAgo/60;
    //     if(publishedInMinutesAgo<60){
    //         publishedAgo = (Math.trunc(publishedInMinutesAgo)).toString() + " minutes ago";
    //         return publishedAgo;
    //     }
    //     const publishedInHoursAgo = publishedInMinutesAgo/60;
    //     if(publishedInMinutesAgo<24){
    //         publishedAgo = (Math.trunc(publishedInHoursAgo)).toString() + " hours ago";
    //         return publishedAgo;
    //     }
    //     const publishedInDaysAgo = publishedInHoursAgo/24;
    //     if(publishedInDaysAgo<30){
    //         publishedAgo = (Math.trunc(publishedInDaysAgo)).toString() + " days ago";
    //         return publishedAgo;
    //     }
    //     const publishedInMonthsAgo = publishedInDaysAgo/30;
    //     if(publishedInMonthsAgo<12){
    //         publishedAgo = (Math.trunc(publishedInMonthsAgo)).toString() + " months ago";
    //         return publishedAgo;
    //     }
    //     const publishedInYearsAgo = publishedInMonthsAgo/12;
    //     publishedAgo = (Math.trunc(publishedInYearsAgo)).toString() + " years ago";
    //     return publishedAgo;
    // }

    //views count function
const getViews = (viewCount) => {
  const viewUnits = [
    { label: "B", value: 1000*1000*1000},
    { label: "M", value: 1000*1000 },
    { label: "K", value: 1000 },
  ];

  for (const unit of viewUnits) {
    const interval = viewCount / unit.value;

    if (interval >= 1) {
      const rounded = Number(interval.toFixed(2)); //.toFixed returns a string that's why wrap it in number
        // Suppose number was 1.23483843903 then this will .toFixed(2) means 1.23 will return by doing Number()
        // then we will get 1.23 and if it 1.00 then we have 1 it will remove unnecessary zeroes
        //so if it was 1.20 then it will be 1.2
      return `${Number.isInteger(rounded)//to check whether the number is whole after rounded if Number.isInteger(1) then true
        //if it is isInteger(1.23) then flase
        ? Math.floor(rounded)
        : rounded
      }${unit.label}`;
    }
  }

  return viewCount.toString();
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
    const releasedAt = getPublishedAgo(Video.snippet.publishedAt);
    const viewCount = getViews(Video.statistics.viewCount)
  return (
    <div className='mt-3 cursor-pointer'>
      <img src={Video.snippet.thumbnails.medium.url} alt="thumbnail"
      className='rounded-xl'/>
      <div className='flex flex-col'>
      <h3 className='font-bold leading-snug line-clamp-2'>{Video.snippet.title}</h3>
      <h4 className='text-gray-500'>{Video.snippet.channelTitle}</h4>
      <div className="flex items-center text-gray-500 text-sm gap-2">
        <span>{viewCount} views</span>
        <span>•</span>
        <span>{releasedAt}</span>
      </div>
      </div>
    </div>
  )
}

export default VideoCard
