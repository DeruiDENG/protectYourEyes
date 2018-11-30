import { useState, useEffect } from "react";
import { TimerState } from "../../shared/response/TimerState";
import backgroundScriptApi from "../../shared/api/backgroundScriptApi";

export function useTimerState(): TimerState {
  const [timerState, setTimerState] = useState<TimerState>(null);

  const fetchTimerState = async () => {
    const timerState = await backgroundScriptApi.getTimerState();
    setTimerState(timerState);
  };

  useEffect(() => {
    fetchTimerState();
  }, []);

  return timerState;
}
