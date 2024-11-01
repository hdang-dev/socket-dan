import { emitEvent, onEvent } from ".";
import { Message, User } from "../interfaces";

export const emitMessage = (message: Message, roomId: string) => {
    emitEvent('DATA', { type: 'message', message }, roomId);
};

export const onMessage = (handler: (message: Message) => void) => {
    onEvent('DATA', data => {
        const { type, message } = data as { type: string, message: Message; };
        if (type === 'message') {
            handler(message);
        }
    });
};

// export function receiveMessage(event: "JOIN_ROOM", roomId: string): void;
// export function emitEvent(event: "LEAVE_ROOM", roomId: string): void;
// export function emitEvent<T>(event: "DATA", data: T, roomId: string): void;

