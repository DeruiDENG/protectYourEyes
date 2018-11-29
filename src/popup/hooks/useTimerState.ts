import { useState, useEffect } from "react";
import { TimerState } from "../../shared/response/TimerState";

export function useTimerState() {
  const [timerState, setTimerState] = useState<TimerState>(null);
}
