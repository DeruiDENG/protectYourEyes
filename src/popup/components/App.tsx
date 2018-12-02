import * as React from 'react';
import { useTimerState } from '../hooks/useTimerState';
import Timer from './Timer';

const App = () => {
  const { state, syncState } = useTimerState();
  if (state) {
    const { status } = state;
    return (
      <div>
        <h4>Protect Your Eyes</h4>
        <div>{JSON.stringify(state)}</div>
        <Timer timerState={state} onAction={syncState} />
      </div>
    );
  }

  return null;
};

export default App;
