import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import {
  getPercentage,
  getHighestValue,
  getBottomDistance,
} from "../../utils/utils";
import DetailsBox from "../DetailsBox";

const getLinePosition = (
  startingPoints,
  endingPoints,
  containerHeight,
  containerWidth
) => {
  const [bottomStarting, leftStarting] = startingPoints;
  const [leftEnding, bottomEnding] = endingPoints;
  const DEGREES = 180 / Math.PI;
  const rise = bottomEnding + 3.5 - bottomStarting;
  const run = leftEnding - leftStarting;
  const slope = Math.abs(rise) / run;
  const rotation = Math.atan(slope) * DEGREES;
  const width = Math.sqrt(rise * rise + run * run);
  const diameterDiff = bottomStarting > 0 ? 0.5 : 0;
  return {
    bottom: `${(100 * bottomStarting) / containerHeight + diameterDiff}%`,
    left: `${(100 * leftStarting) / containerWidth}%`,
    transform: `rotate(${rise > 0 ? `-${rotation}` : rotation}deg)`,
    width: `${(100 * width) / containerWidth}%`,
  };
};

export default function LineChart({ chartStyle, config, data, periodsTotal }) {
  const [highestValue, setHighestValue] = useState();
  const [containerWidth, setContainerWidth] = useState();
  const [containerHeight, setContainerHeight] = useState();
  const containerRef = useRef(null);

  useEffect(() => {
    setHighestValue(getHighestValue(data));
    if (containerRef.current) {
      setContainerWidth(containerRef.current.offsetWidth);
      setContainerHeight(containerRef.current.offsetHeight);
    }
  }, [data]);

  return (
    <ChartContainer ref={containerRef} visibility={chartStyle.visibility}>
      <ValuesContainer>
        <span>{highestValue}</span>
        <span>{Math.round((highestValue / 4) * 3)}</span>
        <span>{Math.round(highestValue / 2)}</span>
        <span>{Math.round(highestValue / 4)}</span>
        <span>0</span>
      </ValuesContainer>
      {containerWidth &&
        data.map(({ color, name, quantity }) => {
          return quantity.map((periodValue, idx) => {
            const leftDistanceInPx =
              (containerWidth / quantity.length) * (idx + 1);
            const leftDistance = (100 * leftDistanceInPx) / containerWidth;
            const bottomDistance = getBottomDistance(periodValue, highestValue);
            const valueInPx = containerHeight / highestValue;
            const { bottom, left, transform, width } = getLinePosition(
              [
                quantity[idx - 1] * valueInPx || 0,
                (containerWidth / quantity.length) * idx,
              ],
              [leftDistanceInPx, (bottomDistance * containerHeight) / 100],
              containerHeight,
              containerWidth
            );
            return (
              <>
                <Line
                  bottom={bottom}
                  color={color}
                  left={left}
                  transform={transform}
                  transformOrigin="0 100%"
                  width={width}
                ></Line>
                <PeriodPoint
                  bottomDistance={`${bottomDistance}%`}
                  color={color}
                  key={idx + periodValue}
                  sideDistance={`${leftDistance - 0.5}%`}
                >
                  <DetailsBox
                    bottomDistance="25px"
                    color={color}
                    name={name}
                    percentage={getPercentage(periodsTotal[idx], periodValue)}
                    quantity={periodValue}
                    unit={config.unit}
                  />
                </PeriodPoint>
              </>
            );
          });
        })}
      {config.periods && (
        <PeriodsContainer>
          {new Array(config.periods).fill(" ").map((p, idx) => (
            <PeriodsDivisor
              key={idx}
              width={`${100 / config.periods}%`}
            ></PeriodsDivisor>
          ))}
        </PeriodsContainer>
      )}
    </ChartContainer>
  );
}

const ChartContainer = styled.div`
  border-left: 1px dashed #000;
  border-bottom: 1px dashed #000;
  display: flex;
  flex-direction: column;
  height: 100%;
  position: relative;
  transition: all 0.6s linear;
  visibility: ${({ visibility }) => visibility};
  width: 100%;
`;

const Line = styled.div`
  background: ${({ color }) => color};
  border-radius: 9999px;
  bottom: ${({ bottom }) => bottom};
  box-shadow: 0px 0px 1px 1px rgba(150, 150, 150, 0.2);
  height: 2px;
  left: ${({ left }) => left};
  position: absolute;
  transform: ${({ transform }) => transform};
  transform-origin: ${({ transformOrigin }) => transformOrigin};
  width: ${({ width }) => width};
`;

const PeriodPoint = styled.div`
  background: ${({ color }) => color};
  border: 1px solid #000;
  border-radius: 9999px;
  bottom: ${({ bottomDistance }) => bottomDistance};
  box-shadow: 0px 0px 2px 1px rgba(50, 50, 50, 0.3);
  cursor: pointer;
  height: 11px;
  position: absolute;
  left: ${({ sideDistance }) => sideDistance};
  width: 11px;
  z-index: 1;
  > div {
    display: none;
  }
  &:hover {
    box-shadow: 0px 0px 8px 1px ${({ color }) => color};
    z-index: 10;
    > div {
      align-items: center;
      display: flex;
      justify-content: center;
    }
  }
`;

const PeriodsDivisor = styled.div`
  border-right: 1px dashed #000;
  height: 15px;
  width: ${({ width }) => width};
`;

const PeriodsContainer = styled.div`
  bottom: 0px;
  display: flex;
  left: 0px;
  position: absolute;
  width: 100%;
`;

const ValuesContainer = styled.div`
  align-items: center;
  border-bottom: 1px dashed #000;
  border-top: 1px dashed #000;
  bottom: 0px;
  display: flex;
  flex-direction: column;
  height: 99.5%;
  justify-content: space-between;
  left: -20px;
  position: absolute;
  width: 20px;
  > span {
    color: #000;
    font-size: 9px;
  }
`;
