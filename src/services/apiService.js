const BASE_URL = 'http://localhost:8181';

const getToken = () => localStorage.getItem('auth-token');

const httpRequest = async (endpoint, method, body) => {
    
    const token = getToken();

    // headers
    const headers = {
        "Content-Type": "application/json"
    }

    if(token){
        headers['auth-token'] = token;
    }

    // options
    const options = {
        method,
        headers,
    }

    if(body){
        options.body = JSON.stringify(body);
    }

    const response = await fetch(BASE_URL + endpoint, options)

    if(!response.ok){
        throw new Error(response.statusText);
    }

    return await response.json();
}

// Users Requests
export const loginUser = (userData) => httpRequest('/users/login', 'POST', userData);
export const registerUser = (userData) => httpRequest('/users', 'POST', userData);
export const getAllUsers = () => httpRequest('/users', 'GET');
export const getSingleUser = (id) => httpRequest(`/users/${id}`, 'GET');
export const updateUser = (id, userData) => httpRequest(`/users/${id}`, 'PUT', userData);
export const deleteUser = (id) => httpRequest(`/users/${id}`, 'DELETE');
export const followUnfollowUser = (id) => httpRequest(`/users/${id}/follow`, 'PATCH');
export const banUser = (id) => httpRequest(`/users/${id}/ban`, 'PATCH');
export const promoteUser = (id) => httpRequest(`/users/${id}/promote`, 'PATCH');

// Cards Requests
export const getAllCards = () => httpRequest('/cards', 'GET');
export const getCard = (id) => httpRequest(`/cards/${id}`, 'GET');
export const createCard = (cardData) => httpRequest('/cards', 'POST', cardData);
export const updateCard = (id ,cardData) => httpRequest(`/cards/${id}`, 'PUT', cardData);
export const deleteCard = (id) => httpRequest(`/cards/${id}`, 'DELETE');
export const likeUnlikeCard = (id) => httpRequest(`/cards/${id}`, 'PATCH');
export const addComment = (id, cardData) => httpRequest(`/cards/${id}/comments`, 'PATCH', cardData);
export const removeComment = (id, commentId) => httpRequest(`/cards/${id}/comments/${commentId}`, 'PATCH');
export const getFeedCards = () => httpRequest(`/cards/feed`, 'GET');
export const banCard = (id) => httpRequest(`/cards/${id}/ban`, 'PATCH');


// Notifications Requests
export const getNotifications = () => httpRequest(`/notifications`, 'GET');
export const markNotificationsAsRead = () => httpRequest(`/notifications`, 'PATCH');
export const deleteOneNotification = (id) => httpRequest(`/notifications/${id}`, 'DELETE');
