import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { getPeriodsTotal } from "./utils/utils";
import { fakeData, defaultConfig } from "./utils/default";
import RectangleChart from "./components/Charts/RectangleChart";
import BarsChart from "./components/Charts/BarsChart";
import LineChart from "./components/Charts/LineChart";
import RaceChart from "./components/Charts/RaceChart";
import PieChart from "./components/Charts/PieChart";

const types = {
  bars: BarsChart,
  line: LineChart,
  race: RaceChart,
  rectangle: RectangleChart,
  pie: PieChart,
};

export default function App({ data = fakeData, config = defaultConfig }) {
  const [periodsTotal, setPeriodsTotal] = useState([]);
  const [chartStyle, setChartStyle] = useState({
    visibility: "hidden",
    width: "0",
  });

  useEffect(() => {
    setPeriodsTotal(getPeriodsTotal(data, config.periods));
  }, []);

  const Chart = types[config.type];

  return (
    <Wrapper>
      <Button
        onClick={() => setChartStyle({ visibility: "visible", width: "100%" })}
      >
        Generate chart!
      </Button>
      <ChartContainer>
        <Chart
          chartStyle={chartStyle}
          config={config}
          data={data}
          periodsTotal={periodsTotal}
        />
      </ChartContainer>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  align-items: center;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  min-height: 100vh;
  width: 100%;
`;

const Button = styled.button`
  cursor: pointer;
`;

const ChartContainer = styled.div`
  height: 500px;
  width: 85%;
`;
