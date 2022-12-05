import { useLoaderData } from "react-router-dom";

export default function Categories() {
  const categories = useLoaderData();
  return (
    <>
      <h1 className="title is-1">Categories</h1>
      <ul>
      { categories
        .filter(cat => cat.postsCount > 0)
        .map(cat => {
          return <li key={cat._id}>
            <a href={`/categories/${cat._id}`}>{ cat.name } ({ cat.postsCount })</a>
          </li>
        })
      }
      </ul>
    </>
  )
}