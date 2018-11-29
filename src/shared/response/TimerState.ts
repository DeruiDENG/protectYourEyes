export type TimerState = {
    status: 'stopped'
} | { status: 'started', startTime: number, interval: number };