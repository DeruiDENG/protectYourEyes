export interface TimerState {
  status: 'stopped' | 'running' | 'time-up';
  interval: number;
}
