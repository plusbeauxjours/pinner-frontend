import React from "react";
import styled from "styled-components";

const Container = styled.span`
  font-weight: 600;
`;

interface IProps {
  text: string;
  className?: string;
}

const Bold: React.FunctionComponent<IProps> = ({ text, className }) => (
  <Container className={className}>{text}</Container>
);

export default Bold;
