import * as React from 'react';
import { useEffect, useState } from 'react';
import backgroundApi from '../../shared/api/backgroundScriptApi';
import { secondsToTime, timeToSeconds } from '../utils/time';

interface Props {
  timeInSeconds: number; // Time in seconds
}

const TimeInput = (props: Props) => {
  const { timeInSeconds } = props;
  const { seconds, minutes } = secondsToTime(timeInSeconds);
  const minuteTime = useTime(minutes, () => null);
  const secondTime = useTime(seconds, () => null, [0, 59]);

  useEffect(
    () => {
      const updatedSeconds = timeToSeconds({
        minutes: minuteTime.time,
        seconds: secondTime.time,
      });
      backgroundApi.updateInterval(updatedSeconds);
    },
    [minuteTime, secondTime]
  );

  return (
    <div>
      <input
        type="text"
        value={minuteTime.displayTime}
        {...minuteTime.handlers}
      />
      <span>: </span>
      <input
        type="text"
        value={secondTime.displayTime}
        {...secondTime.handlers}
      />
    </div>
  );
};

function useTime(
  time: number,
  onValidChange: (time: number) => any,
  range?: [number, number]
) {
  const getFormattedTime = (timeString: string): string => {
    if (timeString.length === 1) {
      timeString = `0${timeString}`;
    }

    return timeString;
  };

  const [timeInput, setTimeInput] = useState(time);

  const onChange = (event: React.SyntheticEvent<HTMLInputElement>) => {
    const { value } = event.target as HTMLInputElement;
    const numberValue = Number(value);
    if (range && (numberValue < range[0] || numberValue > range[1])) {
      return;
    }

    setTimeInput(numberValue);
    onValidChange(numberValue);
  };

  return {
    time: timeInput,
    displayTime: String(timeInput),
    handlers: {
      onChange,
    },
  };
}

export default TimeInput;
