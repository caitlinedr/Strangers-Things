import React, {useState} from 'react'
import { useParams } from 'react-router-dom'
import { Link } from 'react-router-dom';
import { buildApi } from '../api';
import { useHistory } from 'react-router';

const SendMessage = ({token}) => {
    const { postId } = useParams()
    const history = useHistory()
    const [content, setContent] = useState('')

    const postMessage = async(event) => {
        event.preventDefault()

        await buildApi({
            url: `posts/${postId}/messages`,
            body: {message: {content}},
            method: 'POST',
            token
        })
        history.push(`/posts/`)
    }

    return (
        <>
            <div id="form">
                <form onSubmit={postMessage}>
                    <h2>Send a Message</h2>
                    <div>
                        <input
                            type="text"
                            placeholder="content"
                            required
                            value={content}
                            onChange={(event) => setContent(event.target.value)}
                        ></input>
                    </div>
                    <button id="submit" type="submit">Send Message</button>
                </form>
            </div>
            
        </>
    )
}

const EditPost = ({token, posts}) => {
    const { postId } = useParams()
    const post = posts.find((post) => postId === post._id)

    const [title, setTitle] = useState(post.title)
    const [description, setDescription] = useState(post.description)
    const [price, setPrice] = useState(post.price)
    const [location, setLocation] = useState(post.location)
    const [willDeliver, setWillDeliver] = useState(post.willDeliver)
    
    const history = useHistory()

    const editThisPost = async(event) => {
        event.preventDefault()

        await buildApi({
            url: `posts/${postId}`,
            body: {post: {title, description, price, location, willDeliver}},
            method: 'PATCH',
            token,
        })
        history.push(`/posts`)
    }

    return (
        <>
            <div id="form">
                <form onSubmit={editThisPost}>
                    <h2>Edit Post</h2>
                    <div>
                        <input
                            type="text"
                            placeholder="title"
                            required
                            value={title}
                            onChange={(event) => setTitle(event.target.value)}
                        ></input>
                    </div>
                    <div>
                        <input
                            type="text"
                            placeholder="description"
                            required
                            value={description}
                            onChange={(event) => setDescription(event.target.value)}
                        ></input>
                    </div>
                    <div>
                        <input
                            type="text"
                            placeholder="price"
                            required
                            value={price}
                            onChange={(event) => setPrice(event.target.value)}
                        ></input>
                    </div>
                    <div>
                        <input
                            type="text"
                            placeholder="location"
                            required
                            value={location}
                            onChange={(event) => setLocation(event.target.value)}
                        ></input>
                    </div>
                    <div>
                    <input 
                        type="checkbox"
                        id="deliver"
                        name="deliver"
                        checked={willDeliver}
                        onChange={() => willDeliver ? setWillDeliver(false) : setWillDeliver(true)}
                        ></input>    
                        <label for="deliver">Willing to Deliver?</label>
                    </div>
                    <button id="submit" type="submit">Update Post</button>
                </form>
            </div>
        </>
    )
}

const Post = ({posts, token, isLoggedIn}) => {
    const [edit, setEdit] = useState(false)
    const [messageButton, setMessageButton] = useState(false)
    const { postId } = useParams()
    const history = useHistory()

    if(posts.length === 0){
        return null
    } 
    
    const post = posts.find((post) => postId === post._id)

    const deleteAPost = async(event) => {
        event.preventDefault()
        
       await buildApi({
            url: `posts/${postId}`,
            method: 'DELETE',
            token,
          })
        history.push('/posts')
    }

    if(post){
        return (
            <>
                <button id="back">
                    <Link to="/posts">Back to All Posts</Link>
                </button>
                <h3>{post.title}</h3>
                <div id="post-body">
                    <div>Posted by: {post.author.username}</div>
                    <div>Description: {post.description}</div>
                    <div>Price: {post.price}</div>
                    <div>Location: {post.location}</div>
                    <div>Delivers: {post.willDeliver ? 'Yes' : 'No'}</div>
                </div>
                {isLoggedIn 
                ? <button id="back">
                    <Link to="/users/me">Back to My Profile</Link>
                  </button>
                : null}
                <div id='action-item-div'>
                    {post.isAuthor && isLoggedIn
                    ? <><button onClick={deleteAPost} id="action-item">Delete</button>
                    <button id="action-item" onClick={() => edit ? setEdit(false) : setEdit(true)}>Edit</button></> 
                    : null}
                    {edit ? <EditPost token={token} posts={posts}/> : null}
                </div>
                <div id='action-item-div'>
                    {!post.isAuthor && isLoggedIn
                    ? <button id="action-item" onClick={() => messageButton ? setMessageButton(false): setMessageButton(true)}>Send a Message</button>
                : null}
                {messageButton ? <SendMessage token={token}/> : null}
                </div>
                <div>
                {post.isAuthor && isLoggedIn
                ? <>
                    <h5>Messages on this post:</h5>
                    {post.messages.map((message) => <div id="message-body" key='message._id'>{message.content}</div>)}
                  </>
                : null}
                </div>
            </>
        )
    } else {
        return <div></div>
    }
}

export default Post;