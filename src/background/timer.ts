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
  private restStartTime: number = 0;
  private interval: number = 1200;
  private restInterval: number = 21;
  private timer: NodeJS.Timer | null = null;
  private restingTimer: NodeJS.Timer = null;

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

    const onConfirm = (willRest: boolean) => {
      if (willRest) {
        this.startRest();
      } else {
        this.start();
      }
    };

    if (this.isTimeUp()) {
      this.status = 'time-up';
      clearInterval(this.timer);
      sendNotification(onConfirm);
      setTimeUpBadgeText();
    } else {
      setRemainingTimeBadgeText(this.getRemainingTime());
    }
  };

  private restingTick = () => {
    if (this.status !== 'time-up') {
      return;
    }

    if (this.isRestTimeUp()) {
      clearInterval(this.restingTimer);
      this.start();
    } else {
      setRemainingTimeBadgeText(this.getRestRemainingTime(), 'green');
    }
  };

  private isTimeUp() {
    return this.getRemainingTime() === 0;
  }

  private isRestTimeUp() {
    return this.getRestRemainingTime() === 0;
  }

  private startRest() {
    this.clearTimer();
    this.restStartTime = Date.now() / 1000;
    this.restingTimer = setInterval(() => {
      this.restingTick();
    }, 1000);
  }

  private clearTimer() {
    if (this.timer) {
      clearInterval(this.timer);
      this.timer = null;
    }

    if (this.restingTimer) {
      clearInterval(this.restingTimer);
      this.restingTimer = null;
    }
  }
  private getRemainingTime(): number {
    const currentTime = Date.now() / 1000;
    const remainingTime = this.startTime + this.interval - currentTime;
    return remainingTime > 0 ? remainingTime : 0;
  }

  private getRestRemainingTime(): number {
    const currentTime = Date.now() / 1000;
    const remainingTime = this.restStartTime + this.restInterval - currentTime;
    return remainingTime > 0 ? remainingTime : 0;
  }
}

const timer = new Timer();

export { timer };
