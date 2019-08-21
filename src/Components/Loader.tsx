import LoadingOverlay from "react-loading-overlay";
import React from "react";
import styled from "styled-components";
import ClipLoader from "react-spinners/ClipLoader";

const Container = styled.div`
  z-index: 2;
  display: flex;
  width: 100%;
  height: 100%;
  position: absolute;
  justify-content: center;
  align-self: center;
  text-align: inline;
`;

interface IProps {
  text?: string;
}

const Loader: React.FunctionComponent<IProps> = () => (
  <Container>
    <LoadingOverlay
      active={true}
      spinner={<ClipLoader color={"#999"} />}
      fadeSpeed={500}
    />
  </Container>
);

export default Loader;
