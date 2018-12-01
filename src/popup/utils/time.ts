export function secondsToTime(
  numSeconds: number
): { minutes: number; seconds: number } {
  const minutes = Math.floor(numSeconds / 60);
  const seconds = numSeconds - minutes * 60;

  return {
    minutes,
    seconds,
  };
}

export function timeToSeconds({
  minutes,
  seconds,
}: {
  minutes: number;
  seconds: number;
}) {
  return minutes * 60 + seconds;
}
