import {MessageTarget} from "../shared/message/MessageTarget";
import {BackgroundMessageType} from "../shared/message/MessageType";
import {bindMessageHandlers, MessageHandler} from "../shared/message/MessageHandler";

const messageHandlers: Array<{ type: BackgroundMessageType, handler: MessageHandler, isAsync?: true }> = [
    {
        type: BackgroundMessageType.SayHello,
        handler: (sendResponse: any, payload: { name: string }) => {
            console.log(`Hello, ${payload.name}`);
        }
    },
    {
        type: BackgroundMessageType.StartTimer,
        handler: (sendResponse: any, payload: { minutes: number }) => {
            console.log(`Start timer: ${payload.minutes} counting...`);
        }
    },
];

const initBackground = () => {
    bindMessageHandlers(messageHandlers, MessageTarget.Background);
};

initBackground();
