import React, { useEffect, useState } from 'react';
import { buildApi } from '../api';
import { useHistory } from 'react-router';


const NewPost = ({token}) => {
    const [title, setTitle] = useState('')
    const [description, setDescription] = useState('')
    const [price, setPrice] = useState('')
    const [location, setLocation] = useState('')
    const [willDeliver, setWillDeliver] = useState(false)
    const history = useHistory()

    const submitNewPost = async(event) => {
        event.preventDefault()
        
        await buildApi({
            url: 'posts/',
            body: {post: {title, description, price, location, willDeliver}},
            method: 'POST',
            token
          })
          history.push('/posts')
    }

    return (
        <>
            <div id="form">
                <form onSubmit={submitNewPost}>
                    <h2>Create New Post</h2>
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
                        <label htmlFor="deliver">Willing to Deliver?</label>
                    </div>
                    <button id="submit" type="submit">Create Post</button>
                </form>
            </div>
        </>
    )
}

export default NewPost;