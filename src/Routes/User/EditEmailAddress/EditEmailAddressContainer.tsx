import React from "react";
import { RouteComponentProps } from "react-router";
import { Mutation, MutationFn } from "react-apollo";

import { toast } from "react-toastify";
import Loader from "src/Components/Loader";
import { COMPLETE_EDIT_EMAIL_VERIFICATION } from "./EditEmailAddressQueries";
import { LOG_USER_IN } from "../../../sharedQueries.local";
import { ME } from "../../../sharedQueries";
import {
  CompleteEditEmailVerification,
  CompleteEditEmailVerificationVariables
} from "../../../types/api";

class CompleteEditEmailVerificationMutation extends Mutation<
  CompleteEditEmailVerification,
  CompleteEditEmailVerificationVariables
> {}

interface IProps extends RouteComponentProps<any> {}

class VerificationContainer extends React.Component<IProps> {
  public logUserInFn: MutationFn;
  public verifyEmailFn: MutationFn;
  constructor(props: IProps) {
    super(props);
  }
  public componentDidMount() {
    this.verifyEmailFn();
  }
  public render() {
    const {
      match: {
        params: { key = null }
      }
    } = this.props;
    if (key) {
      return (
        <Mutation mutation={LOG_USER_IN}>
          {logUserInFn => {
            this.logUserInFn = logUserInFn;
            return (
              <CompleteEditEmailVerificationMutation
                mutation={COMPLETE_EDIT_EMAIL_VERIFICATION}
                variables={{ key }}
                update={this.updateCompleteEditEmailVerification}
                onCompleted={this.onCompletedCompleteEditEmailVerification}
              >
                {verifyEmailFn => {
                  this.verifyEmailFn = verifyEmailFn;
                  return <Loader />;
                }}
              </CompleteEditEmailVerificationMutation>
            );
          }}
        </Mutation>
      );
    } else {
      return <Loader />;
    }
  }
  public onCompletedCompleteEditEmailVerification = data => {
    const { history } = this.props;
    const { completeEditEmailVerification } = data;
    if (completeEditEmailVerification.ok) {
      if (completeEditEmailVerification.token) {
        this.logUserInFn({
          variables: {
            token: completeEditEmailVerification.token
          }
        });
        history.push({
          pathname: `/${completeEditEmailVerification.user.username}`
        });
      }
      toast.success("Your new email address is verified");
    } else if (completeEditEmailVerification.ok === false) {
      history.push({
        pathname: "/novalid"
      });
    } else {
      toast.error("Could not be Verified you");
    }
  };
  public updateCompleteEditEmailVerification = (
    cache,
    { data: { completeEditEmailVerification } }
  ) => {
    try {
      const data = cache.readQuery({
        query: ME
      });
      if (data) {
        data.me.user = completeEditEmailVerification.user;
        cache.writeQuery({
          query: ME,
          data
        });
      }
    } catch (e) {
      console.log(e);
    }
  };
}

export default VerificationContainer;
