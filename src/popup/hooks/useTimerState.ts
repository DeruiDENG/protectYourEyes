import { useEffect, useState } from 'react';
import backgroundScriptApi from '../../shared/api/backgroundScriptApi';
import { TimerState } from '../../shared/response/TimerState';

const initialState = { count: 0 };

// function reducer(state, action) {
//   switch (action.type) {
//     case 'reset':
//       return initialState;
//     case 'increment':
//       return { count: state.count + 1 };
//     case 'decrement':
//       return { count: state.count - 1 };
//     default:
//       // A reducer must always return a valid state.
//       // Alternatively you can throw an error if an invalid action is dispatched.
//       return state;
//   }
// }

export function useTimerState(): TimerState {
  const [timerState, setTimerState] = useState<TimerState>(null);

  const fetchTimerState = async () => {
    const timerStateFromBackground = await backgroundScriptApi.getTimerState();
    setTimerState(timerStateFromBackground);
  };

  useEffect(() => {
    fetchTimerState();
  }, []);

  return timerState;
}
