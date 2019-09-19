import React from "react";
import SocialLoginPresenter from "./SocialLoginPresenter";
import { Mutation, MutationFn } from "react-apollo";
import { FacebookConnect, FacebookConnectVariables } from "../../types/api";
import { FACEBOOK_CONNECT } from "./SocialLoginQueries";
import { toast } from "react-toastify";
import { LOG_USER_IN } from "../../sharedQueries.local";
import { RouteComponentProps, withRouter } from "react-router";

class FacebookConnectMutaion extends Mutation<
  FacebookConnect,
  FacebookConnectVariables
> {}

interface IProps extends RouteComponentProps<any> {
  countryCode: string;
  cityId: string;
}

interface IState {
  firstName: string;
  lastName: string;
  email?: string;
  gender: string;
  fbId: string;
  cityId: string;
  countryCode: string;
}

class SocialLoginContainer extends React.Component<IProps, IState> {
  public facebookConnectFn: MutationFn;
  constructor(props) {
    super(props);
    this.state = {
      firstName: "",
      lastName: "",
      email: "",
      gender: "",
      fbId: "",
      cityId: props.cityId,
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
              if (facebookConnect) {
                logUserIn({
                  variables: {
                    token: facebookConnect.token
                  }
                });
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
  public loginCallback = response => {
    const { first_name, last_name, email, gender, id, accessToken } = response;
    const { cityId, countryCode } = this.state;
    if (accessToken) {
      this.facebookConnectFn({
        variables: {
          firstName: first_name,
          lastName: last_name,
          email,
          gender,
          cityId,
          countryCode,
          fbId: id
        }
      });
      toast.success(`Welcome ${first_name}!`);
    } else {
      toast.error("Could not log you in 😔");
    }
  };
}

export default withRouter(SocialLoginContainer);
