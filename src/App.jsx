import { useState, useEffect } from 'react';
import './App.css';
import { Outlet } from "react-router-dom";
import Navbar from './components/Navbar';
import { BlogContext } from './BlogContext';


// LOAD ALL POSTS
// DONT GET EACH OTHER ON CLICKING READ MORE
// WE HAVE ALREADY ALL POSTS
// HOW TO PRESERVE STATE ??

// USER ZONE
// main page
// -- navbar + logib
// post page
// -- comment form
// -- reply to comment?
// login page?

// IF LOGGED IN AS ADMIN? how to figure that?
// add delete button to comments !

// ADMIN ZONE
// all posts page + edit + visibility checkbox + delete button
// adding / editing post page // delete button
// login form



/*

!!!! HERE WORKS GREAT FOR LEAVING COMENTS

fetch('http://localhost:8888/comment/6380f6edd4962a27aad486cc', {
    method: 'POST',
    mode: 'cors',
    headers: {
        'Authorization': 'Bearer ' + localStorage.getItem('token'),
        'Content-Type': 'application/json',
    },
    body: JSON.stringify({
        text: 'Fetch this on',
        post: '6380f6edd4962a27aad486cc'
    })
}).then(res => res.json()).then(data => console.log(data)).catch(err => console.log(err));

*/


function App() {
  return (
    <>
        <Navbar />
        <div className="App">
          <Outlet />
        </div>
    </>
  )
}







function BlogPost(props) {
  if (!!props.post) {
    console.log('ok')
  }

  return (
    <div className='blog-post'>
      <h3>{props.post.title}</h3>
      <h4>{props.post.teaser}</h4>
      <p>{props.post.text}</p>
      <ul>
        <li>{props.post.author ? props.post.author.username : 'Admin'}</li>
        <li>{props.post.category ? props.post.category.name : ''}</li>
        <li>{new Date(props.post.createdAt).toLocaleString()}</li>
      </ul>
      <hr />
      <h3>Comments:</h3>
      <div className='comments'>
        <Comments postId={props.post._id} />
      </div>
    </div>
  );
}

function Comments(props) {
  const [comments,setComments] = useState([]);
  useEffect(() => {
    fetch(`http://localhost:8888/comment/${props.postId}`)
    .then(response => response.json())
    .then(comments => {
      console.log(comments);
      setComments(comments)
    })
    .catch(err => console.log(err));
  },[]);
  return (
    <div className='comments'>
      {
        comments.length > 0 ?
          comments.map(
            comment => <ul key={comment._id}>
              <li className='comment-text'>
                { comment.text }
              </li>
              <li className='comment-author'>
                { comment.author ? comment.author.username : 'Admin' }
              </li>
              <li className='comment-date'>
                { new Date(comment.createdAt).toLocaleString() }
              </li>
            </ul>
          ) : 'NO COMMENTS YET'
      }
    </div>
  );
}

export default App
