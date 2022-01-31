import { AppEvents } from '../../app/events';
import { Server as SocketIOServer, Socket } from 'socket.io';
import { getJobs } from './job-service';

export const registerListeners = (io: SocketIOServer): void => {
    io.on('connection', async (socket: Socket) => {
        console.log('user connected', socket.id);

        const jobs = await getJobs();
        socket.emit(AppEvents.JobUpdated, jobs);

        io.on('disconnect', () => {
            console.log('user disconnected', socket.id);
        });
    });
};
