import { useEffect, useState } from 'react';
import backgroundScriptApi from '../../shared/api/backgroundScriptApi';
import { TimerState } from '../../shared/response/TimerState';

const initialState = { count: 0 };

export function useTimerState(): { state: TimerState; syncState: () => void } {
  const [timerState, setTimerState] = useState<TimerState>(null);

  const fetchTimerState = async () => {
    const timerStateFromBackground = await backgroundScriptApi.getTimerState();
    setTimerState(timerStateFromBackground);
  };

  useEffect(() => {
    fetchTimerState();
  }, []);

  return {
    state: timerState,
    syncState: () => {
      fetchTimerState();
    },
  };
}
