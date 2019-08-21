import React from "react";
import Input from "../Input";
import Button from "../Button";
import Helmet from "react-helmet";
import { MutationFn } from "react-apollo";
import Form from "../Form";
import styled from "src/Styles/typed-components";

const Container = styled.div``;

const SInput = styled(Input)`
  margin-bottom: 10px;
  &:nth-child(5) {
    margin-bottom: 15px;
  }
`;

interface IProps {
  email: string;
  firstName: string;
  lastName: string;
  username: string;
  password: string;
  canSubmit: boolean;
  onChangeHandler: (event: React.ChangeEvent<HTMLInputElement>) => void;
  signUpFn: MutationFn;
}

const SignUpPresenter: React.FunctionComponent<IProps> = ({
  email,
  firstName,
  lastName,
  username,
  password,
  onChangeHandler,
  canSubmit,
  signUpFn
}) => (
  <Container>
    <Helmet>
      <title>Sign Up . Pinner</title>
    </Helmet>
    <Form onSubmit={canSubmit ? signUpFn : null}>
      <SInput
        placeholder="Email"
        value={email}
        name="email"
        type={"email"}
        onChange={onChangeHandler}
      />
      <SInput
        placeholder="First Name"
        value={firstName}
        name="firstName"
        onChange={onChangeHandler}
      />
      <SInput
        placeholder="Last Name"
        value={lastName}
        name="lastName"
        onChange={onChangeHandler}
      />
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
      <Button size="md" text={"Sign up"} active={canSubmit} />
    </Form>
  </Container>
);

export default SignUpPresenter;
