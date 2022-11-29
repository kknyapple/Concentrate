import React from "react";
import { useState, useEffect } from "react";
import styled from "styled-components";
import { useRecoilState } from "recoil";

import { pauseClicked } from "../../../recoil/concentrate";

const RestTime = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-left: 40px;
  padding-right: 40px;
`;

const Title = styled.p``;
const Time = styled.p``;

const RestTimeComponent = () => {
  const [pause, setPause] = useRecoilState(pauseClicked);
  const [hour, setHour] = useState(0);
  const [minute, setMinute] = useState(0);
  const [second, setSecond] = useState(0);

  useEffect(() => {
    if (pause === true) setTimeout(() => setSecond(second + 1), 1000);

    if (second > 59) {
      setSecond(0);
      setMinute(minute + 1);
    }
    if (minute > 59) {
      setMinute(0);
      setHour(hour + 1);
    }
  }, [pause, second]);

  return (
    <RestTime>
      <Title>쉬는시간</Title>
      <Time>
        {" "}
        {`${String(hour).padStart(2, "0")}:${String(minute).padStart(
          2,
          "0"
        )}:${String(second).padStart(2, "0")}`}
      </Time>
    </RestTime>
  );
};

export default RestTimeComponent;
