import React, { useEffect, useState } from 'react';
import { RegisterLogin, Posts, Post, MyProfile, NewPost} from './';
import { Link, Route } from 'react-router-dom';
import { buildApi } from '../api';

// FETCH FUNCTIONS

const fetchUser = async(token) => {
  const {data} = await buildApi({
    url: 'users/me',
    token
  })
  return data
}

const fetchPosts = async(token) => {
  const {
      data: {posts},
  } = await buildApi({
      url: '/posts',
      token
  })
  return posts
}

// APP COMPONENT

const App = () => {
  const [token, setToken] = useState('')
  const [user, setUser] = useState({})
  const [posts, setPosts] = useState([])
  
  const isLoggedIn = user.username !== undefined

  // USE EFFECT

  useEffect(async() => {
    if(!token) {
      setToken(localStorage.getItem('token'))
      return
    }
    const data = await fetchUser(token)
    const fetchedPosts = await fetchPosts(token)
    setPosts(fetchedPosts)
    setUser(data)
  }, [token])

  useEffect(async() => {
    if (posts.length === 0) {
        const fetchedPosts = await fetchPosts(token)
        setPosts(fetchedPosts)
    }
})

  // HELPER FUNCTION

  function handleLogOut() {
    localStorage.removeItem('token')
    setToken('')
    setUser({})
  }

  // RETURN

  return (
    <>
      <div className="header">
        <h1>Stranger's Things</h1>
      </div>
      <div id="nav">
        {isLoggedIn ? <button className="nav"><Link to="/">HOME</Link></button> : null}
        {isLoggedIn ? <button className="nav"><Link to="/users/me">MY PROFILE</Link></button> : null}
        <button className="nav"><Link to='/posts'>POSTS</Link></button>
        {isLoggedIn ? <button className="nav" id="logout" onClick={handleLogOut}><Link to="/login">LOG OUT</Link></button> : null}
      </div>
      <Route exact path="/">
        {isLoggedIn ? (
          <>
              <h2>Welcome Back, {user.username}!</h2>
          </>
        ) : (
          <>
          <div className="initial-home">
            <button id="initial-register">
              <Link to="/register">REGISTER</Link>
            </button>
          </div>
          <div className='initial-home'>
            <button id='initial-login'>
              <Link to="/login">LOGIN</Link>
            </button>
          </div>
          </>
        )}
      </Route>
      <Route exact path="/posts">
        <Posts posts={posts} isLoggedIn={isLoggedIn} />
      </Route>
      <Route exact path="/posts/add">
          <NewPost token={token}/>
      </Route>
      <Route path="/posts/:postId">
        <Post posts={posts} token={token} isLoggedIn={isLoggedIn} />
      </Route>
      <Route path="/users/me">
          <MyProfile isLoggedIn={isLoggedIn} user={user}/>
      </Route>
      <Route path="/register">
        <RegisterLogin setToken={setToken} action="register" />
      </Route>
      <Route path="/login">
      <RegisterLogin setToken={setToken} action="login" />
      </Route>
    </>
  )
}

export default App;