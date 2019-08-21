import React from "react";
import styled from "../../Styles/typed-components";
import Input from "../Input";
import Button from "../Button";
import Helmet from "react-helmet";
import Form from "../Form";
import { MutationFn } from "react-apollo";

const Container = styled.div``;

const SInput = styled(Input)`
  margin-bottom: 10px;
  &:nth-child(2) {
    margin-bottom: 15px;
  }
`;

interface IProps {
  username: string;
  password: string;
  onChangeHandler: (event: React.ChangeEvent<HTMLInputElement>) => void;
  logInFn: MutationFn;
  loading: boolean;
}

const LogInPresenter: React.FunctionComponent<IProps> = ({
  username,
  password,
  onChangeHandler,
  logInFn,
  loading
}) => (
  <Container>
    <Helmet>
      <title> Log In | Pinner</title>
    </Helmet>
    <Form onSubmit={username !== "" && password !== "" ? logInFn : null}>
      <SInput
        placeholder="Username"
        value={username}
        name="username"
        onChange={onChangeHandler}
      />
      <SInput
        placeholder="Password"
        value={password}
        name="password"
        type="password"
        onChange={onChangeHandler}
      />
      <Button
        size="md"
        text={"Log in"}
        active={username !== "" && password !== ""}
      />
    </Form>
  </Container>
);

export default LogInPresenter;
