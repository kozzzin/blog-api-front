import React from 'react';
import { useEffect, useState, useContext } from 'react';
import {  useLoaderData } from "react-router-dom";
import CommentForm from './CommentForm';

export default function SinglePost(props) { 
  const [initPost, initComments] = useLoaderData();
  const [comments,setComments] = useState([]);
  const [post,setPost] = useState({});

  useEffect(() => {
    setPost(initPost);
    setComments(initComments);
  },[]);

  return (
    <>
      <div className='blog-post'>
        <h1 className='title is-1'>{ post.title }</h1>
        <p>{ post.text }</p>
        <ul className='post-info block'>
          <li>Author: {post.author ? post.author.username : 'Admin'}</li>
          <li>Category: {post.category ? post.category.name : 'No category'}</li>
          <li>Posted: {new Date(post.createdAt).toLocaleString()}</li>
        </ul>
        <div className='post-comments'>
              <hr />
              <h4 className='title is-4'>Comments:</h4>
              {
                comments.map(
                  comment => <div className='comment' key={comment._id}>  
                    <span className="comment-author">{comment.author ? comment.author.username : 'Admin'}</span>
                    <span className='comment-text'>{comment.text}</span>
                    <span className='comment-date'>{new Date(comment.createdAt).toLocaleString()}</span>
                  </div>
                )
              }
              <CommentForm setComments={setComments} postId={post._id} />
        </div>
      </div>
    </>
  )
}