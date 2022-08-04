import _ from "lodash";
import dynamic from "next/dynamic";
import { css } from "@emotion/react";

const ReactSlider = dynamic(() => import("react-slider"), { ssr: false });

import { useState } from "react";
import styled from "styled-components";
import { BsChevronLeft, BsChevronRight } from "react-icons/bs";

const StyledSlider = styled(ReactSlider)`
  width: 100%;
  position: absoute;
  left: 0;
  right: 0;
  height: 36px;
`;

const StyledThumb = styled.div`
  top: 50%;
  z-index: 5 !important;
  height: 40px;
  width: 20px;
  cursor: grab;
  outline: none;
  color: #232326;
  box-shadow: none;
  line-height: 24px;
  text-align: center;
  transform: translate(
    ${(props) => (props.index === 1 && "12px") || "-12px"},
    -50%
  );
  background-color: #e5484d;
  border-top-left-radius: ${(props) => (props.index === 0 && "6px") || "0px"};
  border-bottom-left-radius: ${(props) =>
    (props.index === 0 && "6px") || "0px"};

  border-top-right-radius: ${(props) => (props.index === 1 && "6px") || "0px"};
  border-bottom-right-radius: ${(props) =>
    (props.index === 1 && "6px") || "0px"};
`;

const StyledMarkerThumb = styled.div`
  top: 50%;
  width: 3px;
  cursor: grab;
  height: 30px;
  outline: none;
  z-index: 10 !important;
  border-radius: 4px;
  box-shadow: none;
  background-color: #fff;
  transform: translateY(-50%);
  &:focus {
    outline: none;
  }
`;

const Thumb = (props, state) => {
  return (
    <StyledThumb index={state.index} {...props}>
      {(state.index === 0 && <BsChevronLeft />) || <BsChevronRight />}
      <div
        style={{
          top: "-36px",
          fontWeight: "bold",
          fontSize: "0.85rem",
          padding: "0px 6px",
          borderRadius: "4px",
          position: "absolute",
          backgroundColor: "#fff",
        }}
      >
        {state.value[state.index]}
      </div>
    </StyledThumb>
  );
};

const StyledTrack = styled.div`
  top: 50%;
  transform: translateY(-50%);
  border-radius: 6px;
  background-color: #232326;
  height: ${(props) => (props.index === 1 && "40px") || "36px"};
  border: 2px solid ${(props) => (props.index === 1 && "#E5484D") || "#232326"};
`;

const StyledMarker = styled.div`
  background-color: #fff;
  height: ${(props) => (props.isDivideMark && "12px") || "4px"};
`;

const Track = (props, state) => {
  const [startValue, endValue] = state.value;
  return (
    <StyledTrack
      {...props}
      index={state.index}
      overlap={startValue === endValue}
    />
  );
};

const Marker = (props) => {
  const isDivideMark = props.key % 5 === 0;
  return <StyledMarker isDivideMark={isDivideMark} {...props} />;
};

const MarkerThumb = (props, state) => {
  return (
    <StyledMarkerThumb index={state.index} {...props}>
      <div
        style={{
          left: "100%",
          marginLeft: "-2px",
          bottom: "-30px",
          fontWeight: "bold",
          fontSize: "0.85rem",
          padding: "0px 6px",
          borderRadius: "4px",
          position: "absolute",
          backgroundColor: "#fff",
        }}
      >
        {state.value}
      </div>
    </StyledMarkerThumb>
  );
};

export default function Home() {
  const [max, setMax] = useState(120);

  return (
    <div
      className="w-100"
      style={{ backgroundColor: "#34343A", minHeight: "100vh" }}
    >
      <div className="container position-relative py-5 m-auto">
        <StyledSlider
          min={0}
          max={max}
          marks={1}
          step={0.1}
          snapDragDisabled
          renderTrack={Track}
          renderThumb={Thumb}
          renderMark={Marker}
          defaultValue={[50, 75]}
          markClassName="custom-mark"
          className="position-absolute"
        />
        <ReactSlider
          min={0}
          max={120}
          marks={1}
          step={0.1}
          defaultValue={50}
          className="seekSlider"
          renderThumb={MarkerThumb}
          markClassName="display-none"
        />
      </div>
    </div>
  );
}

const styles = {
  root: css`
    min-height: 100vh;
    background-color: #34343a;
  `,
};
