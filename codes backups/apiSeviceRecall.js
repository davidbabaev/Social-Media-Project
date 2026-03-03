
const URL = 'http://localhost:8181';

const getToken = () => localStorage.getItem('auth-token')

const httpRequest = async (endpoint, method, body) => {

    const token = getToken();

    const headers = {
        "Content-Type": "application/json",
    }

    if(token){
        headers['auth-token'] = token
    }

    const options = {
        headers,
        method,
    }
    
    if(body){
        options.body = JSON.stringify(body)
    }

    const response = await fetch(URL+endpoint, options)
    
    if(!response.ok) {
        return console.log(response.statusText);
    }

    return await response.json();
}

export const loginUser = async (data) => httpRequest('/users/login', 'POST', data)
export const registerUser = async (data) => httpRequest('/users', "POST", data)