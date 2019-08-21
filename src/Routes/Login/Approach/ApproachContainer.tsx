import React from "react";
import ApproachPresenter from "./ApproachPresenter";
import { RouteComponentProps } from "react-router";
import { toast } from "react-toastify";
import { PHONE_SIGN_IN, EMAIL_SIGN_IN } from "./ApproachQueries";
import { Mutation, MutationFn } from "react-apollo";
import { countries } from "../../../countryData";
import {
  StartPhoneVerification,
  StartPhoneVerificationVariables,
  StartEmailVerification,
  StartEmailVerificationVariables
} from "../../../types/api";

class PhoneSignInMutation extends Mutation<
  StartPhoneVerification,
  StartPhoneVerificationVariables
> {}
class EmailSignInMutation extends Mutation<
  StartEmailVerification,
  StartEmailVerificationVariables
> {}

interface IState {
  latitude: number;
  longitude: number;
  cityId: string;
  cityName: string;
  countryPhoneCode: string;
  countryPhoneNumber: string;
  phoneNumber: string;
  isEmailSubmitted: boolean;
  isPhoneSubmitted: boolean;
  modalOpen: boolean;
  emailAddress: string;
  emailSignIn: boolean;
}

class ApproachContainer extends React.Component<
  RouteComponentProps<any>,
  IState
> {
  public phoneSignInFn: MutationFn;
  public emailSignInFn: MutationFn;
  constructor(props) {
    super(props);
    const { location: { state = {} } = {} } = ({} = props);
    if (!props.location.state) {
      props.history.push("/");
    }
    this.state = {
      latitude: state.latitude,
      longitude: state.longitude,
      cityId: state.cityId,
      cityName: state.cityName,
      countryPhoneCode:
        state.countryCode || localStorage.getItem("countryCode"),
      countryPhoneNumber:
        state.countryPhone ||
        countries.find(i => i.code === localStorage.getItem("countryCode"))
          .phone,
      phoneNumber: "",
      isEmailSubmitted: false,
      isPhoneSubmitted: false,
      modalOpen: false,
      emailAddress: "",
      emailSignIn: false
    };
  }
  public render() {
    const {
      countryPhoneCode,
      phoneNumber,
      countryPhoneNumber,
      modalOpen,
      emailSignIn,
      emailAddress,
      isEmailSubmitted
    } = this.state;
    return (
      <EmailSignInMutation
        mutation={EMAIL_SIGN_IN}
        variables={{ emailAddress }}
        onCompleted={this.onCompletedEmailSignIn}
      >
        {(emailSignInFn, { loading: emailLoading }) => {
          this.emailSignInFn = emailSignInFn;
          return (
            <PhoneSignInMutation
              mutation={PHONE_SIGN_IN}
              variables={{
                phoneNumber: `${countryPhoneNumber}${
                  phoneNumber.startsWith("0")
                    ? phoneNumber.substring(1)
                    : phoneNumber
                }`
              }}
              onCompleted={this.onCompletedPhoneSignIn}
            >
              {(phoneSignInFn, { loading: phoneLoading }) => {
                this.phoneSignInFn = phoneSignInFn;
                return (
                  <ApproachPresenter
                    countryPhoneCode={countryPhoneCode}
                    phoneNumber={phoneNumber}
                    countryPhoneNumber={countryPhoneNumber}
                    modalOpen={modalOpen}
                    emailLoading={emailLoading}
                    phoneLoading={phoneLoading}
                    isEmailSubmitted={isEmailSubmitted}
                    toggleEmailSubmitted={this.toggleEmailSubmitted}
                    onInputChange={this.onInputChange}
                    onSubmitEmail={this.onSubmitEmail}
                    onSubmitPhone={this.onSubmitPhone}
                    back={this.back}
                    toggleModal={this.toggleModal}
                    onSelectCountry={this.onSelectCountry}
                    emailAddress={emailAddress}
                    emailSignIn={emailSignIn}
                    toggleEmailSignIn={this.toggleEmailSignIn}
                  />
                );
              }}
            </PhoneSignInMutation>
          );
        }}
      </EmailSignInMutation>
    );
  }
  public toggleEmailSubmitted = () => {
    this.setState({ isEmailSubmitted: false, emailAddress: "" });
  };
  public toggleEmailSignIn = () => {
    const { emailSignIn } = this.state;
    this.setState({
      emailSignIn: !emailSignIn,
      isEmailSubmitted: false,
      emailAddress: "",
      phoneNumber: ""
    });
  };
  public onCompletedEmailSignIn = data => {
    const { startEmailVerification } = data;
    if (startEmailVerification.ok) {
      toast.success("Email Sent! Please ");
    } else {
      this.setState({ isEmailSubmitted: false });
      toast.error("Could not send you a Key");
    }
  };
  public onCompletedPhoneSignIn = data => {
    const { startPhoneVerification } = data;
    const { history } = this.props;
    const {
      latitude,
      longitude,
      cityId,
      cityName,
      phoneNumber,
      countryPhoneCode,
      countryPhoneNumber
    } = this.state;
    if (startPhoneVerification.ok) {
      toast.success("SMS Sent! Redirectiong you...");
      history.push({
        pathname: "/verification",
        state: {
          latitude,
          longitude,
          cityId,
          cityName,
          phoneNumber: phoneNumber.startsWith("0")
            ? phoneNumber.substring(1)
            : phoneNumber,
          countryPhoneCode,
          countryPhoneNumber
        }
      });
    } else {
      this.setState({ isPhoneSubmitted: false });
      toast.error("Could not send you a Key");
    }
  };
  public onSelectCountry = (
    countryPhoneCode: string,
    countryPhoneNumber: string
  ) => {
    this.setState({
      countryPhoneCode,
      countryPhoneNumber,
      modalOpen: false
    });
  };
  public toggleModal = () => {
    const { modalOpen } = this.state;
    this.setState({
      modalOpen: !modalOpen
    });
  };
  public onInputChange: React.ChangeEventHandler<
    HTMLInputElement | HTMLSelectElement
  > = event => {
    const {
      target: { name, value }
    } = event;
    this.setState({
      [name]: value
    } as any);
  };
  public onSubmitEmail: React.FormEventHandler<HTMLFormElement> = event => {
    event.preventDefault();
    const { isEmailSubmitted, emailAddress } = this.state;
    if (emailAddress !== "") {
      const isValid = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/.test(
        emailAddress
      );
      if (isValid) {
        if (!isEmailSubmitted) {
          this.emailSignInFn();
          this.setState({
            isEmailSubmitted: true
          });
        }
      } else {
        toast.error("Please write a valid email");
      }
    } else {
      toast.error("Please write a email");
    }
  };
  public onSubmitPhone: React.FormEventHandler<HTMLFormElement> = event => {
    event.preventDefault();
    const { countryPhoneNumber, phoneNumber, isPhoneSubmitted } = this.state;
    if (phoneNumber !== "") {
      const phone = `${countryPhoneNumber}${
        phoneNumber.startsWith("0") ? phoneNumber.substring(1) : phoneNumber
      }`;
      const isValid = /(([+][(]?[0-9]{1,3}[)]?)|([(]?[0-9]{4}[)]?))\s*[)]?[-\s\.]?[(]?[0-9]{1,3}[)]?([-\s\.]?[0-9]{3})([-\s\.]?[0-9]{3,4})/.test(
        phone
      );
      if (isValid) {
        if (!isPhoneSubmitted) {
          this.phoneSignInFn();
          this.setState({
            isPhoneSubmitted: true
          });
        }
      } else {
        toast.error("Please write a valid phone number");
      }
    } else {
      toast.error("Please write a phone number");
    }
  };
  public back = async event => {
    await event.stopPropagation();
    this.props.history.goBack();
  };
}

export default ApproachContainer;
