import * as React from "react";
import { TimerState } from "../../shared/response/TimerState";
import StoppedTimer from "./StoppedTimer";

interface TimerProps {
  timerState: TimerState;
}

const Timer = (props: TimerProps) => {
  const { timerState } = props;
  if (timerState.status === "stopped") {
    return <StoppedTimer internal={timerState.interval} />;
  }

  return <div>Timer is started</div>;
};

export default Timer;
