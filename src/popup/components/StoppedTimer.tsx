import * as React from "react";
import TimeInput from "./TimeInput";

const DefaultInterval = 1200; // in seconds

interface Props {
  internal: number;
}

const StoppedTimer = (props: Props) => {
  const internal = props.internal ? props.internal : DefaultInterval;
  return <TimeInput timeInSeconds={internal} />;
};

export default StoppedTimer;
