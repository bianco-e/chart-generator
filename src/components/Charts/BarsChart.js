import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { getPercentage, sortBy } from "../../utils/utils";
import DetailsBox from "../DetailsBox";
import PeriodsSelector from "../PeriodsSelector";

export default function BarsChart({ chartStyle, config, data, periodsTotal }) {
  const { visibility, width } = chartStyle;
  const [currentPeriod, setCurrentPeriod] = useState(0);
  const [sortedData, setSortedData] = useState(data);

  useEffect(() => {
    setSortedData(sortBy(data, config.sortBy, 0));
  }, []);

  const handleNext = () => {
    if (currentPeriod < config.periods - 1) {
      setCurrentPeriod(currentPeriod + 1);
      setSortedData(sortBy(data, config.sortBy, currentPeriod + 1));
    }
  };
  const handlePrevious = () => {
    if (currentPeriod > 0) {
      setCurrentPeriod(currentPeriod - 1);
      setSortedData(sortBy(data, config.sortBy, currentPeriod - 1));
    }
  };
  return (
    <Wrapper visibility={visibility} width={width}>
      <PeriodsSelector
        config={config}
        currentPeriod={currentPeriod}
        handleNext={handleNext}
        handlePrevious={handlePrevious}
      />
      <ChartContainer>
        {sortedData.map(({ color, name, quantity }) => {
          const currentValue = quantity[currentPeriod];
          const currentTotal = periodsTotal[currentPeriod];
          return (
            <ChartSection
              bg={color}
              key={name}
              visibility={visibility}
              width={`${
                width === "0"
                  ? width
                  : getPercentage(currentTotal, currentValue)
              }%`}
            >
              <span>
                {name}
                <DetailsBox
                  color={color}
                  name={name}
                  percentage={getPercentage(currentTotal, currentValue)}
                  quantity={currentValue}
                  unit={config.unit}
                />
              </span>
            </ChartSection>
          );
        })}
      </ChartContainer>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  align-items: center;
  display: flex;
  flex-direction: column;
  transition: all 0.6s ease-out;
  visibility: ${({ visibility }) => visibility};
  width: ${({ width }) => width};
`;

const ChartContainer = styled.div`
  align-items: flex-start;
  display: flex;
  flex-direction: column;
  width: 100%;
`;

const ChartSection = styled.div`
  align-items: center;
  background: ${({ bg }) => bg};
  border-radius: 0 5px 5px 0;
  box-shadow: 0px 0px 6px 1px rgba(40, 40, 40, 0.3);
  cursor: pointer;
  display: flex;
  height: 50px;
  justify-content: center;
  margin: 5px 0;
  position: relative;
  transition: all 0.7s linear;
  text-align: center;
  visibility: ${({ visibility }) => visibility};
  width: ${({ width }) => width};
  > span {
    color: #fff;
    > div {
      display: none;
    }
  }
  &:hover {
    > span {
      > div {
        align-items: center;
        display: flex;
        justify-content: center;
      }
    }
  }
`;
