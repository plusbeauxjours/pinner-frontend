import React from "react";
import styled from "src/Styles/typed-components";

const SButton = styled.button<IProps>`
  display: flex;
  justify-content: center;
  align-items: center;
  border: 0;
  padding: ${props => (props.size === "md" ? "1px" : "2px")};
  color: white;
  background-color: ${props =>
    props.inverted ? "transparent" : props.theme.blueColor};
  opacity: ${props => (props.active ? 1 : 0.8)};
  font-weight: 600;
  width: 100%;
  border-radius: 4px;
  font-size: ${props => (props.size === "md" ? "12px" : "12px")};
  cursor: pointer;
  border: ${props =>
    props.inverted ? `1px solid ${props.theme.greyColor}` : "none"};
`;

interface IProps {
  text?: string;
  active?: boolean;
  onClick?: any;
  size?: string;
  inverted?: boolean;
  className?: string;
}

const Button: React.FunctionComponent<IProps> = ({
  text,
  active,
  onClick,
  className,
  size = "xs",
  inverted = false
}) => (
  <SButton
    active={active}
    onClick={onClick}
    className={className}
    size={size}
    inverted={inverted}
  >
    {text}
  </SButton>
);

export default Button;
