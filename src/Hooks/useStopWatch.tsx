import { useEffect, useState } from "react";

const useStopWatch = (
  condition: boolean,
  currentStartTime: number
): [number, number, number] => {
  const [hour, setHour] = useState(0);
  const [minute, setMinute] = useState(0);
  const [second, setSecond] = useState(0);

  const startTime = () => {
    const now = new Date(Date.now() - currentStartTime);

    setSecond(now.getUTCSeconds());
    setMinute(now.getUTCMinutes());
    setHour(now.getUTCHours());
  };

  useEffect(() => {
    if (condition === true) {
      startTime();
      let timerId = setTimeout(() => {
        startTime();
      }, 1000);

      return () => clearTimeout(timerId);
    }
  }, [condition, second]);

  return [hour, minute, second];
};

export default useStopWatch;
