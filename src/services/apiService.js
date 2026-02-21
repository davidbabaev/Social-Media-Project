const BASE_URL = "http://localhost:8181";

// get token from localStorage
const getToken = () => localStorage.getItem("token");

// general helper for all API calls
const httpRequest = async (endpoint, method = "GET", body = null) => {
    const headers = {
        "Content-Type": "application/json",
    };

    // if we have a token, attach it
    const token = getToken();
    if(token) {
        headers["auth-token"] = token
    }

    const config = {
        method,
        headers,
    };

    // only add body for requests that send data
    if(body){
        config.body = JSON.stringify(body);
    };

    const response = await fetch(`${BASE_URL}${endpoint}`, config);

    if(!response.ok){
        const errorMessage = await response.text();
        throw new Error(errorMessage);
    };

    return await response.json();
}