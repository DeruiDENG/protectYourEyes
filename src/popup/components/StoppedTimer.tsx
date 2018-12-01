import * as React from 'react';
import TimeInput from './TimeInput';

interface Props {
  internal: number;
  onStart: () => void;
}

const StoppedTimer = (props: Props) => {
  return <TimeInput timeInSeconds={props.internal} />;
};

export default StoppedTimer;
