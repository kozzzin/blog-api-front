import { useState, useEffect } from 'react';
export default function PostTeaser(props) {
  const [commentsCount,setCommentsCount] = useState(0);
  useEffect(() => {
    fetch(`http://localhost:8888/comment/${props.post._id}`)
    .then(response => response.json())
    .then(comments => {
      setCommentsCount(comments.length)
    })
    .catch(err => console.log(err));
  },[]);

  return (
    <div className='blog-post'>
      <h3 className='title is-3'>{props.post.title}</h3>
      <h4 className='subtitle is-4'>{props.post.teaser}</h4>
      <ul className='post-info block'>
        <li>Author: {props.post.author ? props.post.author.username : 'Admin'}</li>
        <li>Category: {props.post.category ? props.post.category.name : 'No category'}</li>
        <li>Posted: {new Date(props.post.createdAt).toLocaleString()}</li>
        <li>Comments: { commentsCount }</li>
      </ul>
      <a href={`/post/${props.post._id}`}><button className='button is-info'>Read more...</button></a>
    </div>
  );
}