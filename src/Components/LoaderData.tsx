import LoadingOverlay from "react-loading-overlay";
import React from "react";
import styled from "styled-components";
import BounceLoader from "react-spinners/BounceLoader";

const Container = styled.div<ITheme>`
  width: ${props => {
    if (props.type === "feed") {
      return "20px";
    } else {
      return "25px";
    }
  }};
  height: ${props => {
    if (props.type === "feed") {
      return "20px";
    } else {
      return "25px";
    }
  }};
  display: block;
  padding-top: 6px;
`;

interface ITheme {
  type?: string;
}

interface IProps {
  type?: string;
  text?: string;
}

const Loader: React.FunctionComponent<IProps> = ({ type }) => (
  <Container type={type}>
    {type !== "feed" ? (
      <LoadingOverlay
        active={true}
        spinner={<BounceLoader size={12} color={"#999"} />}
        fadeSpeed={500}
      />
    ) : null}
  </Container>
);

export default Loader;
