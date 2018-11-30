export type TimerState =
  | {
      status: "stopped";
      interval: number;
    }
  | { status: "started"; startTime: number; interval: number };
