import React from "react";
import SocialLoginPresenter from "./SocialLoginPresenter";
import { Mutation, MutationFn } from "react-apollo";
import { FacebookConnect, FacebookConnectVariables } from "../../types/api";
import { FACEBOOK_CONNECT } from "./SocialLoginQueries";
import { toast } from "react-toastify";
import { LOG_USER_IN } from "../../sharedQueries.local";
import { RouteComponentProps } from "react-router";

class FacebookConnectMutaion extends Mutation<
  FacebookConnect,
  FacebookConnectVariables
> {}

interface IProps extends RouteComponentProps<any> {
  countryCode: string;
  cityId: string;
  cityName: string;
}

interface IState {
  name: string;
  firstName: string;
  lastName: string;
  email?: string;
  gender: string;
  fbId: string;
  cityId: string;
  cityName: string;
  countryCode: string;
}

class SocialLoginContainer extends React.Component<IProps, IState> {
  public facebookConnectFn: MutationFn;
  constructor(props) {
    super(props);

    this.state = {
      name: "",
      firstName: "",
      lastName: "",
      email: "",
      gender: "",
      fbId: "",
      cityId: props.cityId,
      cityName: props.cityName,
      countryCode: props.countryCode
    };
  }
  public render() {
    return (
      <Mutation mutation={LOG_USER_IN}>
        {logUserIn => (
          <FacebookConnectMutaion
            mutation={FACEBOOK_CONNECT}
            onCompleted={data => {
              const { facebookConnect } = data;
              const { name } = this.state;
              if (facebookConnect) {
                logUserIn({
                  variables: {
                    token: facebookConnect.token
                  }
                });
                toast.success(`Welcome ${name}!`);
              } else {
                toast.error("Could not log you in 😔");
              }
            }}
          >
            {(facebookConnectFn, { loading }) => {
              this.facebookConnectFn = facebookConnectFn;
              return (
                <SocialLoginPresenter
                  loginCallback={this.loginCallback}
                  loading={loading}
                />
              );
            }}
          </FacebookConnectMutaion>
        )}
      </Mutation>
    );
  }
  public onChange: React.ChangeEventHandler<HTMLInputElement> = event => {
    const {
      target: { value }
    } = event;
    this.setState({
      search: value
    } as any);
  };
  public loginCallback = response => {
    const { first_name, last_name, email, gender, id, accessToken } = response;
    const { cityId, cityName, countryCode } = this.state;
    if (accessToken) {
      this.facebookConnectFn({
        variables: {
          firstName: first_name,
          lastName: last_name,
          email,
          gender,
          cityId,
          cityName,
          countryCode,
          fbId: id
        }
      });
    }
  };
}

export default SocialLoginContainer;
