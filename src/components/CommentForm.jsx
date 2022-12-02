import { useState, useEffect } from 'react';
export default function CommentForm(props) {
  const [comment,setComment] = useState('');
  const [success,setSuccess] = useState(false);


  // USE JWT TOKEN AS NAME OF USER, DECODE IT ON SERVER SIDE
  // SAVE NME OF USER TO GREET HIM!

  function sendComment(e) {
    e.preventDefault();
    console.log(comment);
    console.log(JSON.stringify(comment));
    fetch(
      `http://localhost:8888/comment/${props.postId}`,
      {
        method: 'POST',
        mode: 'cors',
        headers: { 
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + window.localStorage.getItem('token')
        },
        body: JSON.stringify({
          text: comment,
          post: props.postId
        })
      }
    )
    .then(res => res.json())
    .then(data => {
      console.log(data);
      props.setComments(data);
      setSuccess(true);
    })
    .catch(err => console.log(err));
  } 
  if (!window.localStorage.getItem('token')) {
    return ''
  } else {
    return (
      <>
      {
        success ?
          'Your comment has been sent' :
            <form onSubmit={sendComment}>
              <div className="field">
                <label className="label">Comment this</label>
                <div className="control">
                  <textarea
                    className="textarea"
                    placeholder="Say something" 
                    value={comment}
                    onChange={e => setComment(e.target.value)}
                  />
                </div>
              </div>
              <input type="submit" className="button is-info" value="Post" /> 
            </form>
      }
  
      </>
    )
  }
}

