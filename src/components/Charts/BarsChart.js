import React from "react";
import styled from "styled-components";
import { getPercentage } from "../../utils/utils";
import DetailsBox from "../DetailsBox";

export default function BarsChart({ chartStyle, config, data, periodsTotal }) {
  const { visibility, width } = chartStyle;
  return (
    <ChartContainer>
      {data.map(({ color, name, quantity }) => {
        const lastValue = quantity[quantity.length - 1];
        return (
          <ChartSection
            bg={color}
            key={name}
            visibility={visibility}
            width={`${
              width === "0"
                ? width
                : getPercentage(periodsTotal[quantity.length - 1], lastValue)
            }%`}
          >
            <span>
              {name}
              <DetailsBox
                color={color}
                name={name}
                percentage={getPercentage(
                  periodsTotal[quantity.length - 1],
                  lastValue
                )}
                quantity={lastValue}
                unit={config.unit}
              />
            </span>
          </ChartSection>
        );
      })}
    </ChartContainer>
  );
}

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
