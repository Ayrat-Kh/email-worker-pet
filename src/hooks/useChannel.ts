import { useEffect, useRef, useState } from 'react';
import { io, Socket } from 'socket.io-client';

export const useChannel = <T extends unknown>({ event }: { event: string }) => {
    const [data, setData] = useState<T | null>(null);
    useEffect(() => {
        if (!window.io) {
            window.io = io({ autoConnect: false });
        }
        const socket = window.io as Socket;

        if (socket.disconnected) {
            socket.connect();
        }

        const observer = (message: T) => setData(message);

        socket.on(event, observer);
        return () => void socket.off(event, observer);
    }, [setData]);

    return { data };
};
