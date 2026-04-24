import { io } from "socket.io-client";
const SERVER_URL = 'http://localhost:8181';
/* const socket = io(SERVER_URL, {
    auth: (cb) => {
        cb({token: localStorage.getItem('auth-token')})
    }
}); */

let socket = null;

export function connectSocket(){
    if(socket?.connected) return socket;

    socket = io(SERVER_URL, {
        auth: (cb) => {
            cb({token: localStorage.getItem('auth-token')})
        }
    })

    socket.on('connect', () => {
        console.log('Connected to server:', socket.id);
    })


    return socket
}



socket.on('connect_error', (error) => {
    console.log('Connection error:', error.message);
})

export default socket;