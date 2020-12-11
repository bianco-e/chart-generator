import React from "react";
import styled from "styled-components";
import LeftArrow from "./svg/LeftArrow";
import RightArrow from "./svg/RightArrow";

export default function PeriodsSelector({
  config,
  currentPeriod,
  handleNext,
  handlePrevious,
}) {
  return (
    <PeriodsHandler>
      <button onClick={handlePrevious}>
        <LeftArrow />
      </button>
      <CurrentPeriod>
        {config.periodName} {`${currentPeriod + 1}/${config.periods}`}
      </CurrentPeriod>
      <button onClick={handleNext}>
        <RightArrow />
      </button>
    </PeriodsHandler>
  );
}

const PeriodsHandler = styled.div`
  align-items: center;
  display: flex;
  justify-content: space-around;
  margin-bottom: 15px;
  width: 90%;
  > button {
    background: none;
    border: 0;
    cursor: pointer;
  }
`;

const CurrentPeriod = styled.p`
  font-size: 18px;
  margin: 0;
`;
