import * as React from "react";
import { TimerState } from "../../shared/response/TimerState";

const DefaultInterval = 1200; // in seconds

interface TimerProps {
  timerState: TimerState;
}

const Timer = (props: TimerProps) => {
  const { timerState } = props;
};
