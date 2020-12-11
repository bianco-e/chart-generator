import React from "react";
import styled from "styled-components";

export default function PeriodsSelector({
  config,
  currentPeriod,
  handleNext,
  handlePrevious,
}) {
  return (
    <PeriodsHandler>
      <button onClick={handlePrevious}>{"<"}</button>
      <CurrentPeriod>
        {config.periodName} {`${currentPeriod + 1}/${config.periods}`}
      </CurrentPeriod>
      <button onClick={handleNext}>{">"}</button>
    </PeriodsHandler>
  );
}

const PeriodsHandler = styled.div`
  align-items: center;
  display: flex;
  justify-content: space-between;
  margin-bottom: 15px;
  width: 90%;
  > button {
    background: none;
    cursor: pointer;
  }
`;

const CurrentPeriod = styled.p`
  font-size: 18px;
  margin: 0;
`;
