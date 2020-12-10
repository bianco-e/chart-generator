import React from "react";
import styled from "styled-components";
import { getPercentage } from "../../utils/utils";
import DetailsBox from "../DetailsBox";

export default function RaceChart() {
  return <ChartContainer></ChartContainer>;
}

const ChartContainer = styled.div`
  align-items: flex-start;
  display: flex;
  flex-direction: column;
  width: 100%;
`;
