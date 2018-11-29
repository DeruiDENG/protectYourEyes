import {Message} from "./MessageBase";
import {MessageTarget} from "./MessageTarget";

export const sendMessageToBackground = <ResponseType>(message: Message): Promise<ResponseType | undefined> => {
    if (message.target !== MessageTarget.Background) {
        return Promise.resolve(undefined);
    }

    return new Promise(resolve => {
        chrome.runtime.sendMessage(message, function (response) {
            console.log(`Message from background: ${response}`);
            resolve(response);
        });
    });
};
