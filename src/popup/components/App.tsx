import * as React from "react";
import { useTimerState } from "../hooks/useTimerState";
import StoppedTimer from "./StoppedTimer";

const App = () => {
  const timerState = useTimerState();
  console.log("Timer State:");
  console.log(timerState);

  if (timerState) {
    return (
      <div>
        <h4>Protect Your Eyes</h4>
        <div>{JSON.stringify(timerState)}</div>
        <StoppedTimer internal={null} />
      </div>
    );
  }

  return null;
};

export default App;
