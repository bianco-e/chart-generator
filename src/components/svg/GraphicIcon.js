import * as React from "react";

export default function LeftArrow(props) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      height={32}
      fill="lightgreen"
      viewBox="0 0 24 24"
      width={32}
      {...props}
    >
      <path fill="none" d="M0 0h24v24H0z" />
      <path d="M7.5 21H2V9h5.5v12zm7.25-18h-5.5v18h5.5V3zM22 11h-5.5v10H22V11z" />
    </svg>
  );
}
