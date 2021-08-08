import React, { useState } from 'react';
import { buildApi } from '../api';
import { Link, useHistory } from 'react-router-dom'

const RegisterLogin = ({setToken, action}) => {
    
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')

    const login = action === 'login'
    const title = login ? 'Login' : 'Register'
    const linkTo = login ? 'register' : 'login'
    const newTitle = login ? 'New User? Register Here' : 'Returning User? Login'
    const history = useHistory()

    const handleSubmit = async (event) => {
        event.preventDefault()

    const data = await buildApi({
        url: `users/${action}`,
        body: {user: {username, password}},
        method: 'POST'
    })

    const token = data.data.token

    if(token) {
        localStorage.setItem('token', token)
        setToken(token)
        history.push('/')
    }
} 

    return (
        <>
            <div id="form">
                <form onSubmit={handleSubmit}>
                    <h2>{title}</h2>
                    <div>
                        <input
                            type="text"
                            placeholder="username"
                            required
                            value={username}
                            onChange={(event) => setUsername(event.target.value)}
                        ></input>
                    </div>
                    <div>
                        <input
                            type="password"
                            placeholder="password"
                            required
                            value={password}
                            onChange={(event) => setPassword(event.target.value)}
                        ></input>
                    </div>
                    <button id="submit" type="submit">{title}</button>
                    <div id="or">or</div>
                    <div>
                        <button id="opposite">
                            <Link to={`/${linkTo}`}>{newTitle}</Link>
                        </button> 
                    </div>
                </form>
            </div>
            
        </>
    )
}

export default RegisterLogin;