import * as React from 'react';
import { TimerState } from '../../shared/response/TimerState';
import TimeInput from './TimeInput';
import backgroundApi from '../../shared/api/backgroundScriptApi';

interface TimerProps {
  timerState: TimerState;
  onAction: () => void;
}

const Timer = (props: TimerProps) => {
  const { timerState, onAction } = props;

  const onStart = () => {
    backgroundApi.startTimer();
    onAction();
  };

  const onStop = () => {
    backgroundApi.stopTimer();
    onAction();
  };

  return (
    <React.Fragment>
      <TimeInput
        isDisabled={timerState.status !== 'stopped'}
        initTimeInSeconds={timerState.interval}
      />
      {timerState.status !== 'running' && (
        <button onClick={onStart}>Start</button>
      )}
      {timerState.status !== 'stopped' && (
        <button onClick={onStop}>Stop</button>
      )}
    </React.Fragment>
  );
};

export default Timer;
