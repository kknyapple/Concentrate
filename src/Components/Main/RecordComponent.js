import React from "react";
import styled from "styled-components";
import { ResponsiveCalendar } from "@nivo/calendar";

const RecordBox = styled.div`
  color: black;
  border-radius: 8px;
  background-color: whitesmoke;
  width: 500px;
  height: 150px;
`;

const RecordComponent = () => {
  let data = JSON.parse(localStorage.getItem("key"));
  return (
    <RecordBox>
      {data && (
        <ResponsiveCalendar
          data={data}
          from="2022-10-01"
          to="2022-12-31"
          emptyColor="#eeeeee"
          colors={["#FFC3CA", "#FFA1CA", "#A72948", "#372948"]}
          margin={{ top: 10, right: 10, bottom: 10, left: 10 }}
          yearSpacing={40}
          monthBorderColor="#ffffff"
          dayBorderWidth={2}
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
