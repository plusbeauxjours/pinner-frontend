import React from "react";
import styled from "styled-components";

const Container = styled.span`
  font-weight: 100;
`;

interface IProps {
  text: string;
  className?: string;
}

const Thin: React.FunctionComponent<IProps> = ({ text, className }) => (
  <Container className={className}>{text}</Container>
);

export default Thin;
