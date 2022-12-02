import { useEffect, useState } from "react";
import * as React from "react";


export default function SignupForm() {
  const [user,setUser] = useState({username: "", password: "", confirmPassword: ""});
  const [success,setSuccess] = useState(false);

  function sendData(e) {
    e.preventDefault();
    console.log(user);
    console.log(JSON.stringify(user));
    if (user.password !== user.confirmPassword) return alert('passwords should be equal');
    fetch(
      'http://localhost:8888/user/register',
      {
        method: 'POST',
        mode: 'cors',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(user)
      }
    )
    .then(res => res.json())
    .then(data => {
      setSuccess(true);
      console.log(data);
    })
    .catch(err => console.log(err));
  } 

  return (
    <>
      {
        success ?
        'Congratulations' :
        <form onSubmit={sendData}>
          <div className="field">
            <label className="label">Name</label>
            <div className="control">
              <input
                className="input is-medium"
                type="text"
                name="username"
                placeholder="user"
                value={user.username}
                onChange={e => setUser({...user, username:e.target.value})}
                />
            </div>
          </div>
          <div className="field">
            <label className="label">Password</label>
            <div className="control">
              <input 
                className="input is-medium"
                type="password"
                name="password"
                placeholder="password" 
                value={user.password}
                onChange={e => setUser({...user, password:e.target.value})}
              />
            </div>
          </div>
          <div className="field">
            <label className="label">Confirm password</label>
            <div className="control">
              <input 
                className="input is-medium"
                type="password"
                name="confirmPassword"
                placeholder="Confirm password" 
                value={user.confirmPassword}
                onChange={e => setUser({...user, confirmPassword:e.target.value})}
              />
            </div>
          </div>
          <input type="submit" className="button is-info" value="login" />
        </form>
      }
    </>
  );
}