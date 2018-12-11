import * as React from "react";
import { useState, useEffect } from "react";
import { secondsToTime, timeToSeconds } from "../utils/time";
import backgroundApi from "../../shared/api/backgroundScriptApi";

interface Props {
  timeInSeconds: number; // Time in seconds
}

const TimeInput = (props: Props) => {
  const { timeInSeconds } = props;
  const { seconds, minutes } = secondsToTime(timeInSeconds);
  const minuteTime = useTime(minutes, () => {});
  const secondTime = useTime(seconds, () => {}, [0, 59]);

  useEffect(
    () => {
      const seconds = timeToSeconds({
        minutes: minuteTime.time,
        seconds: secondTime.time
      });
      backgroundApi.updateInterval(seconds);
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
  const getFormattedTime = (time: string): string => {
    if (time.length === 1) {
      time = `0${time}`;
    }

    return time;
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
      onChange
    }
  };
}

export default TimeInput;
