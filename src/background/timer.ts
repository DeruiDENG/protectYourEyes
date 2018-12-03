import { TimerState } from '../shared/response/TimerState';
import {
  sendNotification,
  setRemainingTimeBadgeText,
  setTimeUpBadgeText,
  clearBadgeText,
} from './services';

class Timer {
  private status: 'running' | 'stopped' | 'time-up' = 'stopped';
  private startTime: number = 0;
  private interval: number = 1200;
  private timer: NodeJS.Timer | null = null;

  getState(): TimerState {
    return {
      status: this.status,
      interval: this.interval,
    };
  }

  updateInterval(interval: number) {
    this.interval = interval;
  }

  start() {
    this.clearTimer();
    this.timer = setInterval(this.tick, 1000);
    this.startTime = Date.now() / 1000;
    this.status = 'running';
  }

  stop() {
    this.clearTimer();
    clearBadgeText();
    this.status = 'stopped';
  }

  private tick = () => {
    if (this.status !== 'running') {
      return;
    }

    const onConfirm = () => {
      this.start();
    };

    if (this.isTimeUp()) {
      this.status = 'time-up';
      this.clearTimer();
      sendNotification(onConfirm);
      setTimeUpBadgeText();
    } else {
      setRemainingTimeBadgeText(this.getRemainingTime());
    }
  };

  private isTimeUp() {
    return this.getRemainingTime() === 0;
  }

  private clearTimer() {
    if (this.timer) {
      clearInterval(this.timer);
      this.timer = null;
    }
  }

  private getRemainingTime(): number {
    const currentTime = Date.now() / 1000;
    const remainingTime = this.startTime + this.interval - currentTime;
    return remainingTime > 0 ? remainingTime : 0;
  }
}

const timer = new Timer();

export { timer };
