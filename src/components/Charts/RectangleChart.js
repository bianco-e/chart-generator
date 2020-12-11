import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { getPercentage, sortBy } from "../../utils/utils";
import DetailsBox from "../DetailsBox";
import PeriodsSelector from "../PeriodsSelector";

export default function RectangleChart({
  chartStyle,
  config,
  data,
  periodsTotal,
}) {
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
    <Wrapper visibility={chartStyle.visibility} width={chartStyle.width}>
      <PeriodsSelector
        config={config}
        currentPeriod={currentPeriod}
        handleNext={handleNext}
        handlePrevious={handlePrevious}
      />
      <ChartContainer
        visibility={chartStyle.visibility}
        width={chartStyle.width}
      >
        {sortedData.map(({ color, name, quantity }) => {
          const currentValue = quantity[currentPeriod];
          const currentTotal = periodsTotal[currentPeriod];
          return (
            <ChartSection
              bg={color}
              key={name}
              width={`${getPercentage(currentTotal, currentValue)}%`}
            >
              <SectionText>
                {config.showName && name}
                <DetailsBox
                  color={color}
                  name={name}
                  percentage={getPercentage(currentTotal, currentValue)}
                  quantity={currentValue}
                  unit={config.unit}
                />
              </SectionText>
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
  align-items: center;
  display: flex;
  flex-direction: row;
  height: 70px;
  justify-content: center;
  visibility: ${({ visibility }) => visibility};
  width: ${({ width }) => width};
  & :first-child {
    border-radius: 999px 0 0 999px;
  }
  & :last-child {
    border-radius: 0 999px 999px 0;
  }
`;

const ChartSection = styled.div`
  align-items: center;
  background: ${({ bg }) => bg};
  box-shadow: inset 0px 0px 6px 1px rgba(70, 70, 70, 0.3);
  cursor: pointer;
  display: flex;
  height: 100%;
  justify-content: center;
  text-align: center;
  transition: width 0.6s ease-out;
  width: ${({ width }) => width};
  > span {
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

const SectionText = styled.span`
  color: #fff;
  font-size: 15px;
  position: relative;
`;
