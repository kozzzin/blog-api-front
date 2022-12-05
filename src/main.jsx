import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';
import IndexTeasers from './components/IndexTeasers';
import LoginForm from './components/login';
import SignupForm from './components/signup';
import SinglePost from './components/SinglePost';
import Categories from './components/Categories';
import SingleCategory from './components/SingleCategory';

import {
  createBrowserRouter,
  RouterProvider,
  Route,
  useLoaderData
} from "react-router-dom";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <p>Horror, it's error!</p>,
    children: [
      {
        path: '/',
        element: <IndexTeasers />,
      },
      {
        path: '/login',
        element: <LoginForm />,
      },
      {
        path: '/signup',
        element: <SignupForm />,
      },
      {
        path: '/categories',
        element: <Categories />,
        loader: async function() {
          return fetch(
            'http://localhost:8888/category',
            {
              mode: 'cors'
            }
          ).then(res => res.json());
        }
      },
      {
        path: '/categories/:id',
        element: <SingleCategory />,
        loader: async function({ params }) {
          return fetch(
            `http://localhost:8888/category/${params.id}`,
            {
              mode: 'cors'
            }
          ).then(res => res.json())
        }
      },
      {
        path: '/post/:id',
        element: <SinglePost />,
        loader: async function({ params }) {
          const post = await fetch(
            `http://localhost:8888/blog/${params.id}`,
            {
              mode: 'cors'
            }
          ).then(res => res.json());
          const comments = await fetch(`http://localhost:8888/comment/${post._id}`)
            .then(response => response.json());
        
          return [ post, comments ];
        }
      },
    ]
  },

]);



ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
      <RouterProvider router={router} />
  </React.StrictMode>
);
