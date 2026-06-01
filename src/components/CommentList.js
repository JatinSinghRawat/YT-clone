import React from 'react'
import CommentItem from './CommentItem';

const CommentList = ({comments}) => {
  return comments.map((comment,index)=>
    <div key={index}>
        <CommentItem comment={comment}/>
    </div>
)
}

export default CommentList
