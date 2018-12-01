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
    type: BackgroundMessageType.StartTimer,
    handler: (sendResponse: any, payload: { minutes: number }) => {
      timer.start();
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
