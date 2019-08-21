import React from "react";
import SignUpPresenter from "./SignUpPresenter";
import { Mutation, MutationFn } from "react-apollo";
import { signUp, signUpVariables } from "../../types/api";
import { SIGN_UP } from "./SignUpQueries";
import { LOG_USER_IN } from "../../sharedQueries.local";

interface IState {
  email: string;
  firstName: string;
  lastName: string;
  username: string;
  password: string;
  avatar: string;
}

class LogUserInMutation extends Mutation {}
class SignUpMutation extends Mutation<signUp, signUpVariables> {}

class SignUpContainer extends React.Component<any, IState> {
  public signUpFn: MutationFn;
  public state = {
    email: "",
    firstName: "",
    lastName: "",
    username: "",
    password: "",
    avatar:
      "https://images.unsplash.com/photo-1518791841217-8f162f1e1131?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1350&q=80"
  };

  public render() {
    const { email, firstName, lastName, username, password } = this.state;
    return (
      <LogUserInMutation mutation={LOG_USER_IN}>
        {logUserIn => (
          <SignUpMutation
            mutation={SIGN_UP}
            variables={{
              email,
              firstName,
              password,
              username,
              lastName
            }}
            onCompleted={({ createAccount: { token } }) =>
              logUserIn({ variables: { token } })
            }
          >
            {signUpFn => (
              <SignUpPresenter
                email={email}
                firstName={firstName}
                lastName={lastName}
                username={username}
                password={password}
                onChangeHandler={this.onChangeHandler}
                canSubmit={
                  email !== "" &&
                  firstName !== "" &&
                  lastName !== "" &&
                  username !== "" &&
                  password !== ""
                }
                signUpFn={signUpFn}
              />
            )}
          </SignUpMutation>
        )}
      </LogUserInMutation>
    );
  }

  public onChangeHandler: React.ChangeEventHandler<
    HTMLInputElement
  > = async event => {
    const {
      target: { name, value }
    } = event;
    this.setState({
      [name]: value
    } as any);
  };
}

export default SignUpContainer;
