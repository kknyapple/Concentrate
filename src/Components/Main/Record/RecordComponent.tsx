import React from "react";
import styled from "styled-components";
import { ResponsiveCalendar } from "@nivo/calendar";

const RecordBox = styled.div<{ height: string }>`
  color: black;
  border-radius: 8px;
  background-color: whitesmoke;
  width: 400px;
  height: ${(props) => props.height};
`;

const RecordComponent = () => {
  let data = JSON.parse(localStorage.getItem("key"));
  const now = new Date();
  const year = now.getFullYear();

  return (
    <RecordBox height={`${(year - 2022 + 1) * 100}px`}>
      {data && (
        <ResponsiveCalendar
          data={data}
          from={`2022-01-01`}
          to={`${year}-12-31`}
          emptyColor="#eeeeee"
          colors={[
            "#FFC3CA",
            "#FFA1CA",
            "#C72048",
            "#A72948",
            "#A72948",
            "#372948",
            "#372948",
          ]}
          minValue={0}
          maxValue={10}
          margin={{ top: 10, right: 10, bottom: 10, left: 10 }}
          yearSpacing={35}
          yearLegendPosition="after"
          yearLegendOffset={0}
          monthBorderColor="#ffffff"
          monthBorderWidth={0}
          dayBorderWidth={1}
          dayBorderColor="#ffffff"
          legends={[
            {
              anchor: "bottom-right",
              direction: "row",
              translateY: 36,
              itemCount: 4,
              itemWidth: 42,
              itemHeight: 36,
              itemsSpacing: 14,
              itemDirection: "right-to-left",
            },
          ]}
        />
      )}
    </RecordBox>
  );
};

export default RecordComponent;
