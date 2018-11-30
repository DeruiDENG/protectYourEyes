import { MessageTarget } from "../shared/message/MessageTarget";
import { BackgroundMessageType } from "../shared/message/MessageType";
import {
  bindMessageHandlers,
  MessageHandler
} from "../shared/message/MessageHandler";
import { timer } from "./timer";

const messageHandlers: Array<{
  type: BackgroundMessageType;
  handler: MessageHandler;
  isAsync?: true;
}> = [
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
  {
    type: BackgroundMessageType.GetState,
    handler: (sendResponse: any) => {
      sendResponse(timer.getState());
    }
  },
  {
    type: BackgroundMessageType.UpdateInterval,
    handler: (sendResponse: any, payload: { intervalInSeconds: number }) => {
      const { intervalInSeconds } = payload;
      if (intervalInSeconds > 0) {
        timer.updateInterval(payload.intervalInSeconds);
      }
    }
  }
];

const initBackground = () => {
  bindMessageHandlers(messageHandlers, MessageTarget.Background);
};

initBackground();
