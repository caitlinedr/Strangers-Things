import React from 'react'
import { Link } from 'react-router-dom';

const MyProfile = ({isLoggedIn, user}) => {

    if(!isLoggedIn) {
        return null
    }

    const posts = user.posts.filter((post) => post.active === true)
    const messagesFromMe = user.messages.filter((message) => message.fromUser.username === user.username)
    const messagesToMe = user.messages.filter((message) => message.fromUser.username !== user.username)
    
    return (<>
        <h3>My Posts</h3>
        {posts.length > 0
         ? posts.map((post) => {
                return (
                    <div id="posts" key={post._id}>
                        <h5>{post.title}</h5>
                        <div>{post.description}</div>
                        <div id="view-post-div">
                            <button id="view-post">
                                <Link to={`/posts/${post._id}`}>View Post</Link> 
                            </button>
                        </div>
                    </div>
                )
            })
        
        : <h5>Oops! You have no posts :(</h5>}
        <h3>Messages to Me:</h3>
        {messagesToMe.length > 0
        ? messagesToMe.map((message) => {
            return (
                <div id="messages" key={message._id}>
                    <div id='message-title'><strong>From: {message.fromUser.username}</strong></div>
                    <div>Post: {message.post.title}</div>
                    <div id='message-content'>{message.content}</div>
                </div>
            )
        }) : <h5>You have no messages</h5>}
        <h3>Messages from Me:</h3>
        {messagesFromMe.length > 0
        ? messagesFromMe.map((message) => {
            return (
                <div id="messages" key={message._id}>
                    <div id='message-title'><strong>{message.post.title}</strong></div>
                    <div id='message-content'>{message.content}</div>
                </div>
            )
        }) : <h5>You have not sent any messages</h5>}
    </>)
}

export default MyProfile;

