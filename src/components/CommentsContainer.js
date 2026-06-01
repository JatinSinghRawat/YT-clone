import React from "react";
import CommentList from "./CommentList";

const commentsData = [
  {
    name: "JSR",
    text: "Hey, How are you?",
    replies: [
      {
        name: "J",
        text: "I am good",
        replies: [],
      },
    ],
  },
  {
    name: "S",
    text: "Hey",
    replies: [],
  },
  {
    name: "S",
    text: "Hey",
    replies: [],
  },
  {
    name: "S",
    text: "Hey",
    replies: [
      {
        name: "J",
        text: "I am good",
        replies: [
          {
            name: "J",
            text: "I am good",
            replies: [
              {
                name: "J",
                text: "I am good",
                replies: [],
              },
            ],
          },
        ],
      },
    ],
  },
  {
    name: "S",
    text: "Hey",
    replies: [],
  },
  {
    name: "S",
    text: "Hey",
    replies: [],
  },
  {
    name: "S",
    text: "Hey",
    replies: [],
  },
];

const CommentsContainer = () => {
  return (
  <div className="text-xl font-bold">
    Comments:
    <CommentList comments={commentsData}/>
  </div>
)};

export default CommentsContainer;
