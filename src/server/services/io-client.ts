import * as socketio from 'socket.io';
import * as httpServer from 'http';

let client: socketio.Server;

export const initIO = (server: httpServer.Server) => {
    client = new socketio.Server(server);
};
export const getIO = () => client!;
