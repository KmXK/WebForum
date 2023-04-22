import { io } from 'socket.io-client';

export const socket = io('http://localhost:3000', {
    autoConnect: false
});

export function connectSocket(data: [message: string, handler: (...args: any[]) => void][]): (() => void) {
    data.forEach(element => {
        socket.on(element[0], element[1]);
    });

    socket.connect();

    return () => {
        data.forEach(element => {
            socket.off(element[0], element[1]);
        });

        socket.disconnect();
    }
}