import React from "react";
import styled from "../Styles/typed-components";

const Container = styled.input`
  border: none;
  border-bottom: 1px solid ${props => props.theme.greyColor};
  background-color: ${props => props.theme.whiteColor};
  border-radius: 3px;
  padding: 12.5px 10px;
  width: 100%;
  font-size: 12px;
  transition: border-bottom 0.1s linear;
  &:-webkit-autofill {
    box-shadow: 0 0 0px 1000px white inset !important;
  }
  &:focus {
    outline: none;
  }
  &::placeholder {
    color: ${props => props.theme.greyColor};
  }
`;

interface IProps {
  value?: string;
  placeholder?: string;
  type?: string;
  name: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  className?: string;
  required?: boolean;
  onKeyDown?: (event: React.KeyboardEvent<HTMLDivElement>) => void;
  autoFocus?: boolean;
}

const Input: React.FunctionComponent<IProps> = ({
  value,
  placeholder = "",
  type = "text",
  name = "",
  onChange,
  className,
  required = true,
  onKeyDown,
  autoFocus
}) => (
  <Container
    autoFocus={autoFocus}
    value={value}
    placeholder={placeholder}
    type={type}
    onChange={onChange}
    name={name}
    className={className}
    required={required}
    onKeyDown={onKeyDown}
    autoComplete={"off"}
  />
);

export default Input;
