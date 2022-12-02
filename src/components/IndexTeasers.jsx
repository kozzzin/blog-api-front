import { useState, useEffect, useContext } from 'react';
import PostTeaser from './PostTeaser';
import { BlogContext } from '../BlogContext';
export default function IndexTeasers(props) {
  const [blogPosts,setBlogPosts] = useState([]);

  useEffect(() => {
    fetch('http://localhost:8888/blog', {
      method: 'GET',
      mode: 'cors',
    })
    .then(response => response.json())
    .then(data => {
      console.log(data);
      setBlogPosts(data);
    })
    .catch(err => console.log(err));
  },[]);

  return blogPosts.map(
    (el) => <PostTeaser key={el._id} post={el} /> 
  );
}

