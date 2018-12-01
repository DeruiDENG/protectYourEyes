import * as React from 'react';
import { useTimerState } from '../hooks/useTimerState';
import Timer from './Timer';
import StoppedTimer from "./StoppedTimer";

const App = () => {
  const timerState = useTimerState();
  if (timerState) {
    return (
      <div>
        <h4>Protect Your Eyes</h4>
        <div>{JSON.stringify(timerState)}</div>
        {timerState.status === 'stopped' && (
          <StoppedTimer internal={timerState.interval} />
        )}
        <Timer timerState={timerState} />
      </div>
    );
  }

  return null;
};

export default App;
