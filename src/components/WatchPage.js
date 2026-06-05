import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { closeMiniMenu, openMiniMenu } from "../utils/NavSlice";
import { useSearchParams } from "react-router-dom";
import { getYoutubeVideoUrl, YOUTUBE_VIDEO_URL } from "../utils/constants";
import { Link } from "react-router-dom";
import VideoCard from "./VideoCard";
import CommentsContainer from "./CommentsContainer";
import LiveChat from "./LiveChat";
const WatchPage = () => {
  const dispatch = useDispatch();
  const [searchParams] = useSearchParams();

  const [singleVideo, setSingleVideo] = useState(null);
  const [videos,setVideos] = useState([]);
  const [channelDetails, setChannelDetails] = useState(null);
  const [comments, setComments] = useState([]);
  const [showMore, setShowMore] = useState(false);

  const queryParams = searchParams.get("v");

  const getSubscribers = (count) => {
    const viewUnits = [
      { label: "B", value: 1000000000 },
      { label: "M", value: 1000000 },
      { label: "K", value: 1000 },
    ];

    for (const unit of viewUnits) {
      const interval = count / unit.value;

      if (interval >= 1) {
        const rounded = Number(interval.toFixed(2));

        return `${
          Number.isInteger(rounded) ? Math.floor(rounded) : rounded
        }${unit.label}`;
      }
    }

    return count.toString();
  };

  const getPublishedAgo = (publishedAt) => {
    const seconds = Math.floor((Date.now() - new Date(publishedAt)) / 1000);

    const timeUnits = [
      { label: "year", value: 31536000 },
      { label: "month", value: 2592000 },
      { label: "day", value: 86400 },
      { label: "hour", value: 3600 },
      { label: "minute", value: 60 },
    ];

    for (const unit of timeUnits) {
      const interval = Math.floor(seconds / unit.value);

      if (interval >= 1) {
        return `${interval} ${unit.label}${interval > 1 ? "s" : ""} ago`;
      }
    }
  };

  const getVideo = async () => {
    const response = await fetch(
      `https://youtube.googleapis.com/youtube/v3/videos?part=snippet,contentDetails,statistics&id=${queryParams}&key=${process.env.REACT_APP_YOUTUBE_API_KEY}`,
    );

    const data = await response.json();

    setSingleVideo(data.items?.[0]);

    return data.items?.[0];
  };

  const getChannelDetails = async (id) => {
    const response = await fetch(
      `https://youtube.googleapis.com/youtube/v3/channels?part=snippet,statistics&id=${id}&key=${process.env.REACT_APP_YOUTUBE_API_KEY}`,
    );

    const data = await response.json();

    setChannelDetails(data.items?.[0]);
  };

  const getComments = async (id) => {
    const response = await fetch(
      `https://youtube.googleapis.com/youtube/v3/commentThreads?part=snippet,replies&videoId=${id}&maxResults=100&key=${process.env.REACT_APP_YOUTUBE_API_KEY}`,
    );

    const data = await response.json();

    setComments(data.items || []);
  };
  const fetchVideos = async () => {
      const response = await fetch(
          getYoutubeVideoUrl("")
        );
      const data = await response.json();
      setVideos(data.items);
    };

  useEffect(() => {
    dispatch(closeMiniMenu());

    const loadData = async () => {
      fetchVideos();
      const videoData = await getVideo();

      if (videoData) {
        getChannelDetails(videoData.snippet.channelId);

        getComments(videoData.id);
      }
    };

    loadData();

    return () => {
      dispatch(openMiniMenu());
    };
  }, []);
  // console.log("queryParams",queryParams);
  if (!singleVideo || !channelDetails) {
    return <div>Loading...</div>;
  }
  const subscribersCount = getSubscribers(
    channelDetails.statistics.subscriberCount,
  );
  const firstIndexOfn = singleVideo.snippet.description.indexOf("\n");
  const likesCount = getSubscribers(singleVideo.statistics.likeCount);
  const releasedAt = getPublishedAgo(singleVideo.snippet.publishedAt);
  const viewCount = getSubscribers(singleVideo.statistics.viewCount);
  let filteredVideos = videos.filter(
  (video) => video.id !== queryParams
);

// Suppose description is:

// const text =
// `Hello bro
// Visit http://google.com now
// Bye`;


// Goal:

// We want this:

// Hello bro
// Visit https://google.com now
// Bye


// Where:

// * URL becomes clickable (`<a>`)
// * `http` becomes `https`
// * line breaks (`\n`) still appear

// ---

// ## Full mental model

// We are doing **3 transformations**:

// ### Step 1: Break big string into lines (`split("\n")`)

// Input:

// Hello bro\nVisit http://google.com now\nBye

// React ignores `\n`, so if we render directly:
// <p>{text}</p>
// Output:
// Hello bro Visit http://google.com now Bye
// Everything comes in one line.

// So we split at `\n`:
// text.split("\n")
// Think of `.split()` like scissors ✂️.
// JS cuts wherever `\n` appears.
// Result:
// [
//  "Hello bro",
//  "Visit http://google.com now",
//  "Bye"
// ]

// Now every line becomes separate.
// Then:
// .map((line, index) => (
//   <p key={index}>

// Each line becomes a paragraph.

// Example:
// <p>Hello bro</p>
// <p>Visit http://google.com now</p>
// <p>Bye</p>

// That is how new lines appear.

// Important:

// We are NOT adding `\n` back.
// We convert:
// \n
// into:
// <p>
// which naturally moves text to next line.

// # Step 2: Find URLs using regex
// For each line:
// Example:
// Visit http://google.com now
// We use regex:
// const urlRegex =
//  /(https?:\/\/[^\s]+|www\.[^\s]+|bit\.ly\/[^\s]+)/g;
// Regex means:
// ### Match:
// http://...
// https://...
// www....
// bit.ly/...

// Breaking it:

// ### `https?`
// Means:
// http
// or
// https
// Why?
// Because:
// s?
// means:
// > "s" optional
// ---

// ### `:\/\/`

// Matches:
// ://
// slashes are special in regex, so we escape them.

// ### `[^\s]+`
// This means:
// \s means whitespaces break and ^ not
// > Keep reading until space not whitespace as url doesn't have spaces
// Example:
// http://google.com hello
// It stops at:
// space after com
// Result:// http://google.com

// ### `|`

// Means: OR
// So regex says:
// Find:
// http://...
// OR
// https://...
// OR
// www....
// OR
// bit.ly/...

// ---

// # Step 3: Split line around URLs

// This is the magic step.
// We do:line.split(urlRegex)

// Example line:
// Visit http://google.com now

// Regex detects:
// http://google.com

// JS cuts around it.
// Result:
// [
//  "Visit ",
//  "http://google.com",
//  " now"
// ]

// Important:
// Regex only identifies URL.
// Everything else becomes leftover text.
// So:
// Visit

// was never matched by regex.

// It survives because split cuts **around URL**.

// Think:
// Visit | http://google.com | now

// ## Why URL remains after split?

// Normally:
// .split(regex)
// removes separator.
// Example:
// "a,b,c".split(",")

// Result:// ["a","b","c"]
// Comma disappears.
// Same:
// "Visit http://google.com now"
// .split(/https?:\/\/[^\s]+/)
// Result:
// [
//  "Visit ",
//  " now"
// ]
// URL disappears.
// BUT:We use parentheses: (...)
// This is called **capturing group**.
// It tells JS:
// > Keep matched URL too.
// So:
// .split(
//  /(https?:\/\/[^\s]+)/g
// )
// Result:
// [
//  "Visit ",
//  "http://google.com",
//  " now"
// ]
// Now URL survives.


// # Step 4: Loop through parts & Check if part is URL
// Now we map:.map((part, i) => {

// We ask:

// part.match(urlRegex)


// ### First part
//1.  "Visit "
// Regex:
// ❌ no URL
// So:
// return part;
// Meaning:
// Keep normal text.

// ### Second part
// "http://google.com"

// Regex:
// ✅ URL found
// Now:
// Convert:
// http://
// to:
// https://
// Then:
// return (
//   <a href={secureUrl}>
//     {secureUrl}
//   </a>
// )
// Meaning:
// Replace text with clickable link.

// ### Third part
// " now"
// Not URL.
// So:
// return part;
// Keep text.

// # Final React output

// React receives:
// [
//  "Visit ",
//  <a
//    href="https://google.com"
//  >
//    https://google.com
//  </a>,
//  " now"
// ]

// Rendered result:
// Visit https://google.com now
// where only URL is clickable.

// ### Summary in one sentence
// We:
// 1. `split("\n")` → convert description into lines
// 2. `split(urlRegex)` → cut each line into **text + URL pieces**
// 3. `return part` → keep normal text unchanged
// 4. `return <a>` → replace URL text with clickable link
// 5. wrap every line in `<p>` → preserve new lines visually

  filteredVideos = filteredVideos.slice(0,30)
  const formatDescription = (text) => {
  const urlRegex =
    /(https?:\/\/[^\s]+|www\.[^\s]+|bit\.ly\/[^\s]+)/g;

  return text.split("\n").map((line, index) => (
    <p key={index} className="mb-1">
      {line.split(urlRegex).map((part, i) => {
        if (urlRegex.test(part)) {
          let secureUrl = part;

          // convert http -> https
          if (
            secureUrl.startsWith("http://")
          ) {
            secureUrl =
              secureUrl.replace(
                "http://",
                "https://"
              );
          }

          // add https if missing
          if (
            !secureUrl.startsWith(
              "https://"
            )
          ) {
            secureUrl = `https://${secureUrl}`;
          }

          return (
            <a
              key={i}
              href={secureUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 underline"
            >
              {secureUrl}
            </a>
          );
        }

        return part;
      })}
    </p>
  ));
};
  return (
    <div className="flex gap-4 px-6 w-full">
      {/* left Side */}
  <div className="flex-1 max-w-full">
    <div className="w-[700px]">
      <iframe
        className="rounded-xl w-full"
        height="415"
        src={`https://www.youtube.com/embed/${queryParams}`}
        title="YouTube video player"
        allowFullScreen
      />

      <h2 className="text-xl font-bold mt-3 break-words leading-7">
        {singleVideo.snippet.title}
      </h2>
    </div>
    <div className="flex items-center justify-between mt-4 w-[560px]">
  
  <div className="flex items-center gap-4">
    <img
      src={channelDetails.snippet.thumbnails.default.url}
      className="rounded-full w-12 h-12"
      alt="channel-logo"
    />

    <div>
      <h4 className="font-semibold text-sm">
        {channelDetails.snippet.title}
      </h4>

      <h6 className="text-sm text-gray-600">
        {subscribersCount} subscribers
      </h6>
    </div>

    <button className="bg-black text-white rounded-full px-4 py-2 font-semibold text-sm">
      Subscribe
    </button>
  </div>

  <div className="flex items-center gap-3 text-sm">
    
    <div className="bg-gray-200 rounded-full px-4 py-2 flex items-center gap-2">
      
      <button>
        <img
          src="https://cdn-icons-png.freepik.com/512/6611/6611465.png"
          className="w-7 h-7"
          alt="like"
        />
      </button>

      <h6 className="font-medium">
        {likesCount}
      </h6>

      <span className="text-gray-500">
        |
      </span>

      <button>
        <div className="w-7 h-7 overflow-hidden">
          <img
            src="https://purepng.com/public/uploads/large/black-and-white-dislike-symbol-grf.png"
            alt="dislike"
            className="w-full h-full object-cover"
          />
        </div>
      </button>
    </div>

    {/* Share */}
    <button className="bg-gray-200 rounded-full px-4 py-2 flex items-center gap-2">
      <img
        src="https://w7.pngwing.com/pngs/198/287/png-transparent-share-icon-computer-icons-logo-shares-miscellaneous-angle-text.png"
        className="w-5 h-5"
        alt="share"
      />

      <span className="font-medium">
        Share
      </span>
    </button>
  </div>
</div>

    <div className="mt-6 bg-gray-300 px-4 py-3 w-[560px] rounded-lg">
      <p className="text-sm font-bold">
        <span>{viewCount} views</span>
        <span> • Premiered {releasedAt}</span>
      </p>

      <div className="text-sm break-words">
  {showMore
    ? formatDescription(
        singleVideo.snippet.description
      )
    : formatDescription(
        singleVideo.snippet.description.slice(
          0,
          firstIndexOfn
        ) + "...."
      )}
</div>

      <button
        className="text-gray-500 font-bold"
        onClick={() =>
          setShowMore(!showMore)
        }
      >
        {showMore
          ? "Show less"
          : "Show more"}
      </button>
    </div>

    <div className="w-[560px] mt-6">
      {/* <h3 className="font-bold text-xl mb-4">
        {comments.length} Comments
      </h3> */}
      <CommentsContainer/>

    </div>
  </div>

  {/* Right Side */}
  <div className="w-full">
    <LiveChat/>
    <div className="w-full">
    <div className="flex flex-col gap-3">
      <h4 className="mt-3 text-3xl font-bold text-gray-500 text-center">More for You</h4>
      {filteredVideos.map((video) => (
        <Link
          key={video.id}
          to={`/watch?v=${video.id}`}
        >
          <VideoCard Video={video} watchPage={true} />
        </Link>
      ))}
    </div>
  </div>
  </div>
  
</div>
  );
};

export default WatchPage;
