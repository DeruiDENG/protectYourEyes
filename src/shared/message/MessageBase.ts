import { BackgroundMessageType } from './MessageType';
import { MessageTarget } from './MessageTarget';

export interface Message {
  type: BackgroundMessageType;
  target: MessageTarget;
  payload?: any;
}
