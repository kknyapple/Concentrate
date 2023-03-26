import { useEffect, useState } from "react";

const useStopWatch = (condition: boolean, currentStartTime: number) => {
  const [time, setTime] = useState(new Date(0));

  const updateTime = () => {
    setTime(new Date(Date.now() - currentStartTime));
  };

  useEffect(() => {
    if (condition) {
      updateTime();
      let timerId = setInterval(() => {
        updateTime();
      }, 1000);

      return () => clearInterval(timerId);
    }
  }, [condition]);

  const hour = time.getUTCHours();
  const minute = time.getUTCMinutes();
  const second = time.getUTCSeconds();

  return [hour, minute, second];
};

export default useStopWatch;
