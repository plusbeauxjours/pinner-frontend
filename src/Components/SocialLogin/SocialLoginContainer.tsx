import React from "react";
import SocialLoginPresenter from "./SocialLoginPresenter";
import { Mutation, MutationFn } from "react-apollo";
import { FacebookConnect, FacebookConnectVariables } from "../../types/api";
import { FACEBOOK_CONNECT } from "./SocialLoginQueries";
import { toast } from "react-toastify";
import { LOG_USER_IN } from "../../sharedQueries.local";

class FacebookConnectMutaion extends Mutation<
  FacebookConnect,
  FacebookConnectVariables
> {}

interface IState {
  name: string;
  firstName: string;
  lastName: string;
  email?: string;
  gender: string;
  fbId: string;
  latitude: number;
  longitude: number;
  cityId: string;
  cityName: string;
  countryCode: string;
}

class SocialLoginContainer extends React.Component<any, IState> {
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
      latitude: 0,
      longitude: 0,
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
              if (facebookConnect) {
                logUserIn({
                  variables: {
                    token: facebookConnect.token
                  }
                });
              } else {
                toast.error("Could not log you in 😔");
              }
            }}
          >
            {facebookConnectFn => {
              this.facebookConnectFn = facebookConnectFn;
              return (
                <SocialLoginPresenter loginCallback={this.loginCallback} />
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
    const {
      name,
      first_name,
      last_name,
      email,
      gender,
      id,
      accessToken
    } = response;
    const { latitude, longitude, cityId, cityName, countryCode } = this.state;
    if (accessToken) {
      toast.success(`Welcom ${name}!`);
      this.facebookConnectFn({
        variables: {
          firstName: first_name,
          lastName: last_name,
          email,
          gender,
          latitude,
          longitude,
          cityId,
          cityName,
          countryCode,
          fbId: id
        }
      });
    } else {
      toast.error("Could not log you in 😔");
    }
  };
}

export default SocialLoginContainer;
