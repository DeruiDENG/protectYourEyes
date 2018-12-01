import * as React from 'react';
import { useTimerState } from '../hooks/useTimerState';
import Timer from './Timer';

const App = () => {
  const timerState = useTimerState();
  if (timerState) {
    return (
      <div>
        <h4>Protect Your Eyes</h4>
        <div>{JSON.stringify(timerState)}</div>
        <Timer timerState={timerState} />
      </div>
    );
  }

  return null;
};

export default App;
