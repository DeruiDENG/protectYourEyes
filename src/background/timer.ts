import { TimerState } from "../shared/response/TimerState";

class Timer {
  private status: "started" | "stopped" = "stopped";
  private startTime: number = 0;
  private interval: number = 0;
  private timer: NodeJS.Timer | null = null;

  getState(): TimerState {
    if (this.status === 'stopped') {
      return {
        status: this.status
      }
    }

    return {
      status: 'started',
      startTime: this.startTime,
      interval: this.interval,
    };
  }

  start() {
    if (this.timer) {
      clearInterval(this.timer);
    }

    this.timer = setInterval(() => {
      console.log("Time is up!");
    }, this.interval);
    status = 'start';
  }

  stop() {
    if (this.timer) {
      clearInterval(this.timer);
    }

    this.timer = null;
    status = 'stop';
  }
}

const timer = new Timer();

export { timer };
