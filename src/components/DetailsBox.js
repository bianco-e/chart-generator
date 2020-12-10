import React from "react";
import styled from "styled-components";

export default function DetailsBox({
  bottomDistance = "55px",
  color,
  name,
  quantity,
  percentage,
  unit,
}) {
  return (
    <Container bottomDistance={bottomDistance} color={color}>
      <ul>
        <li>
          <div></div>
          {name}
        </li>
        <li>
          <span>
            <b>{quantity} </b>
            {unit}
          </span>
        </li>
        <li>{percentage}%</li>
      </ul>
    </Container>
  );
}

const Container = styled.div`
  background: #fff;
  border: 2px solid ${({ color }) => color};
  border-radius: 2px !important;
  bottom: ${({ bottomDistance }) => bottomDistance};
  color: #000;
  display: none;
  min-width: 100px;
  position: absolute;
  text-align: left;
  z-index: 1000;
  > ul {
    list-style: none;
    padding: 0;
    > li {
      align-items: center;
      display: flex;
      > div {
        background-color: ${({ color }) => color};
        border-radius: 2px !important;
        height: 8px;
        margin-right: 4px;
        width: 8px;
      }
    }
  }
`;
