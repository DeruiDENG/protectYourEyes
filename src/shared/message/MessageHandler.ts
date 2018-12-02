import { BackgroundMessageType } from './MessageType';
import { MessageTarget } from './MessageTarget';
import MessageSender = chrome.runtime.MessageSender;

export type MessageHandler = (
    sendResponse: (response: any) => void,
    payload?: object,
    sender?: MessageSender
  ) => void;

export const bindMessageHandlers = (
  messageHandlers: Array<{
    type: BackgroundMessageType;
    handler: MessageHandler;
    isAsync?: true;
  }>,
  messageTarget: MessageTarget
) => {
  chrome.runtime.onMessage.addListener((msg, sender, sendResponse) => {
    const { type, target, payload } = msg;
    const messageHandler = messageHandlers.find(
      messageHandlerItem => messageHandlerItem.type === type
    );
    if (messageHandler && target === messageTarget) {
      messageHandler.handler(sendResponse, payload, sender);
      if (messageHandler.isAsync === true) {
        // Return true to indicate you wish to send a response asynchronously
        return true;
      }
    }
  });
};
