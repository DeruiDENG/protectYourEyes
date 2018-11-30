import * as React from "react";
import { useState } from "react";
import { secondsToTime } from "../utils/time";
import { bool } from "prop-types";

interface Props {
  timeInSeconds: number; // Time in seconds
}

const TimeInput = (props: Props) => {
  const { timeInSeconds } = props;
  const { seconds, minutes } = secondsToTime(timeInSeconds);

  return (
    <div>
      <input type="text" {...useTime(minutes, () => {})} />
      <span>: </span>
      <input type="text" {...useTime(seconds, () => {}, [0, 59])} />
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
    value: String(timeInput),
    onChange
  };
}

export default TimeInput;
