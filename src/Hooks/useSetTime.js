import React, { useEffect, useState } from "react";

const useSetTime = (condition, currentStartTime) => {
  const [hour, setHour] = useState(0);
  const [minute, setMinute] = useState(0);
  const [second, setSecond] = useState(0);

  const startConcentrateTime = () => {
    const now = new Date(Date.now() - currentStartTime);

    setSecond(now.getUTCSeconds());
    setMinute(now.getUTCMinutes());
    setHour(now.getUTCHours());
  };

  useEffect(() => {
    if (condition === true) {
      startConcentrateTime();
      let timerId = setTimeout(() => {
        startConcentrateTime();
      }, 1000);

      return () => clearTimeout(timerId);
    }
  }, [condition, second]);

  return [hour, minute, second];
};

export default useSetTime;
