import * as React from 'react';
import { useEffect, useState } from 'react';
import backgroundApi from '../../shared/api/backgroundScriptApi';
import { secondsToTime, timeToSeconds } from '../utils/time';

interface Props {
  initTimeInSeconds: number; // Time in seconds
  isDisabled: boolean;
}

const TimeInput = (props: Props) => {
  const { initTimeInSeconds, isDisabled } = props;
  const { seconds, minutes } = secondsToTime(initTimeInSeconds);
  const minuteTime = useTime(minutes);
  const secondTime = useTime(seconds, [0, 59]);

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
        maxLength={2}
        size={2}
        disabled={isDisabled}
        value={minuteTime.displayTime}
        {...minuteTime.handlers}
      />
      <span>: </span>
      <input
        type="text"
        maxLength={2}
        size={2}
        disabled={isDisabled}
        value={secondTime.displayTime}
        {...secondTime.handlers}
      />
    </div>
  );
};

function useTime(time: number, range?: [number, number]) {
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
    if (!Number.isInteger(numberValue)) {
      return;
    }

    if (range && (numberValue < range[0] || numberValue > range[1])) {
      return;
    }

    setTimeInput(numberValue);
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
