import { TimerState } from '../shared/response/TimerState';
import { sendNotification } from './services';

class Timer {
  private status: 'running' | 'stopped' | 'time-up' = 'stopped';
  private startTime: number = 0;
  private interval: number = 1200;
  private restInterval: number = 20;
  private timer: NodeJS.Timer | null = null;
  private restingTimer: NodeJS.Timer = null;

  getState(): TimerState {
    if (this.status === 'stopped') {
      return {
        status: this.status,
        interval: this.interval,
      };
    } else if (this.status === 'time-up') {
      return {
        status: this.status,
      };
    }

    return {
      status: 'running',
      remaining: this.getRemainingTime(),
    };
  }

  updateInterval(interval: number) {
    this.interval = interval;
  }

  start() {
    this.clearTimer();

    const onConfirm = (willRest: boolean) => {
      if (willRest) {
        this.startRest();
      } else {
        this.start();
      }
    };

    this.timer = setInterval(() => {
      this.status = 'time-up';
      sendNotification(onConfirm);
    }, this.interval);
    this.startTime = Date.now() / 1000;
    this.status = 'running';
  }

  stop() {
    this.clearTimer();
    this.status = 'stopped';
  }

  private startRest() {
    this.clearTimer();
    this.restingTimer = setInterval(() => {
      this.start();
    }, this.restInterval);
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
    if (this.status === 'running') {
      return 0;
    }

    const currentTime = Date.now() / 1000;
    const remainingTime = currentTime - this.startTime - this.interval;
    return Math.abs(remainingTime);
  }
}

const timer = new Timer();

export { timer };
