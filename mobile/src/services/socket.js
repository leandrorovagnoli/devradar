import socketio from 'socket.io-client';
import { BASE_URL } from 'react-native-dotenv';

const socket = socketio(BASE_URL, {
    autoConnect: false,
});

function connect(latitude, longitude, techs) {
    socket.io.opts.query = {
        latitude,
        longitude,
        techs
    }
    socket.connect();
}

function disconnect() {
    if (socket.connected)
        socket.disconnect();
}

function subscribeToNewDevs(subscribeFunction) {
    socket.on('new-dev', subscribeFunction);
}

export {
    connect,
    disconnect,
    subscribeToNewDevs,
}