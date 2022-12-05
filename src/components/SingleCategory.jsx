import {useLoaderData} from "react-router-dom";
import PostTeaser from "./PostTeaser";

export default function SingleCategory(props) {
  const categoryContent = useLoaderData();
  return (
    <>
      <h2 className="title is-1">{categoryContent.category}</h2>
        {
          categoryContent.posts.map(
            (post) => {
              return <PostTeaser post={post} key={post._id} />
            }
          )
        }
    </>
  )
} 