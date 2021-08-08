import React, {useState} from 'react'
import { Link } from 'react-router-dom';

const searchPosts = (post, searchTerm) => {
    const searchTermLower = searchTerm.toLowerCase();

    const {
        description,
        location,
        title,
        author: { username },
        price,
    } = post;

    const itemsToMatch = [description, location, title, username, price];
    
    for (const field of itemsToMatch) {
        if (field.toLowerCase().includes(searchTermLower)) {
            return true;
        }
    }

    return false;
};

const Posts = ({posts, isLoggedIn}) => {
    const [searchQuery, setSearchQuery] = useState('')

    const postsToDisplay = 
        searchQuery.length > 0 
        ? posts.filter((post) => searchPosts(post, searchQuery)) 
        : posts 

    if(posts.length === 0){
        return null
    } 

    return (
        <>
            <div id="search">
                <input
                    type='text'
                    placeholder='search posts'
                    value={searchQuery}
                    onChange={(event) => {setSearchQuery(event.target.value)}}
                />
            </div>
            
            <div id="login-div">
                <h2>Posts</h2>
                <button id="login"><Link to="/login">Back to Login</Link></button>
            </div>
            {isLoggedIn 
            ? <><div id="new-post-div">
                <button id="new-post">
                    <Link to='/posts/add'>Create New Post</Link>
                </button>
             </div>
             <div id="view-my-posts">
             <button id="my-posts"><Link to="users/me">View My Posts</Link></button>
            </div></>
            : null}
            {postsToDisplay.map((post) => (
                <div id="posts" key={post._id}>
                <h5>{post.title}</h5>
                <div>Posted by: {post.author.username}</div>
                <div>Description: {post.description}</div>
                <div id="view-post-div">
                    <button id="view-post">
                        <Link to={`/posts/${post._id}`}>View Post</Link> 
                    </button>
                </div>
            </div>
            ))}
        </>
    )
}

export default Posts;