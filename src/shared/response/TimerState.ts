export type TimerState =
  | {
      status: 'stopped';
      interval: number;
    }
  | { status: 'running'; remaining: number }
  | { status: 'time-up' };
