import { TimerState } from "../shared/response/TimerState";

class Timer {
  private status: "running" | "stopped" = "stopped";
  private startTime: number = 0;
  private interval: number = 1200;
  private timer: NodeJS.Timer | null = null;

  getState(): TimerState {
    if (this.status === "stopped") {
      return {
        status: this.status,
        interval: this.interval
      };
    }

    return {
      status: "running",
      remaining: this.getRemainingTime()
    };
  }

  updateInterval(interval: number) {
    this.interval = interval;
  }

  start() {
    if (this.timer) {
      clearInterval(this.timer);
    }

    this.timer = setInterval(() => {
      console.log("Time is up!");
    }, this.interval);
    this.startTime = Date.now() / 1000;
    this.status = "running";
  }

  stop() {
    if (this.timer) {
      clearInterval(this.timer);
    }

    this.timer = null;
    this.status = "stopped";
  }

  private getRemainingTime(): number {
    if (this.status === "running") {
      return 0;
    }

    const currentTime = Date.now() / 1000;
    const remainingTime = currentTime - this.startTime - this.interval;
    return Math.abs(remainingTime);
  }
}

const timer = new Timer();

export { timer };
