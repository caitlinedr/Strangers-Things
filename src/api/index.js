export const BASE_URL = 'https://strangers-things.herokuapp.com';
export const API = '/api';
export const COHORT = '/2104-ECE-RM-WEB-PT/';
export const API_URL = BASE_URL +  API + COHORT



export const buildApi = async (props) => {
    const {url, method, token, body} = props

    try {
        const options = {
            method: method ? method.toUpperCase() : 'GET',
            headers: {
                'Content-Type' : 'application/json'
            },
            body: JSON.stringify(body)
        }
        
        if(token) {
            options.headers['Authorization'] = `Bearer ${token}`
        }
    
        const response = await fetch(API_URL + url, options)
        const data = await response.json()
        
        if(data.error) {
            throw data.error
        }
        return data

    } catch (error) {
        console.error(error)
    }
}



