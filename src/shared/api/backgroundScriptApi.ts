import { sendMessageToBackground } from '../message/messageSend';
import { MessageTarget } from '../message/MessageTarget';
import { BackgroundMessageType } from '../message/MessageType';
import { TimerState } from '../response/TimerState';

const apiList = {
  startTimer: () => {
    return sendMessageToBackground<void>({
      target: MessageTarget.Background,
      type: BackgroundMessageType.StartTimer,
      payload: {},
    });
  },
  stopTimer: () => {
    return sendMessageToBackground<void>({
      target: MessageTarget.Background,
      type: BackgroundMessageType.StopTimer,
      payload: {},
    });
  },
  getTimerState: () => {
    return sendMessageToBackground<TimerState>({
      target: MessageTarget.Background,
      type: BackgroundMessageType.GetState,
      payload: {},
    });
  },
  updateInterval: (intervalInSeconds: number) => {
    return sendMessageToBackground<void>({
      target: MessageTarget.Background,
      type: BackgroundMessageType.UpdateInterval,
      payload: { intervalInSeconds },
    });
  },
};

export default apiList;
