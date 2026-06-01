import React,{useState} from 'react'
import Comment from './Comments';
import CommentList from './CommentList';

const CommentItem = ({comment}) => {
    const [showReplies,setShowReplies] = useState(false);
  return (
    <div>
        <Comment data={comment} />
        {comment.replies.length > 0 &&  
        <button className='font-normal text-sm ml-3 pl-2 border-l-2 border-gray-300'
        onClick={()=>setShowReplies(true)}
        >Show Replies</button>}

        { showReplies && 
            <div className='ml-2 pl-2 border-l-2'>
           <CommentList comments={comment.replies}/>
           <button className='font-normal text-sm ml-3'
        onClick={()=>setShowReplies(false)}
        >Hide Replies</button>
           </div>
        }
    </div>
  )
}

export default CommentItem
