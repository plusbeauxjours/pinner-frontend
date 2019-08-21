import React from "react";
import UserAvatarDetailPresenter from "./UserAvatarDetailPresenter";
import { Query } from "react-apollo";
import { withRouter, RouteComponentProps } from "react-router";
import { GetAvatarDetail, GetAvatarDetailVariables } from "../../../types/api";
import { GET_AVATAR_DETAIL } from "./UserAvatarDetailQueries";

class GetAvatarDetailQuery extends Query<
  GetAvatarDetail,
  GetAvatarDetailVariables
> {}

interface IProps extends RouteComponentProps<any> {}

interface IState {
  modalOpen: boolean;
}

class UserAvatarDetailContainer extends React.Component<IProps, IState> {
  constructor(props) {
    super(props);
    this.state = {
      modalOpen: false
    };
  }
  public render() {
    const {
      match: {
        params: { uuid }
      }
    } = this.props;
    const { modalOpen } = this.state;
    return (
      <GetAvatarDetailQuery
        query={GET_AVATAR_DETAIL}
        variables={{ avatarId: uuid }}
      >
        {({ data, loading }) => {
          return (
            <UserAvatarDetailPresenter
              data={data}
              loading={loading}
              modalOpen={modalOpen}
              toggleModalOpen={this.toggleModalOpen}
              back={this.back}
            />
          );
        }}
      </GetAvatarDetailQuery>
    );
  }
  public toggleModalOpen = () => {
    const { modalOpen } = this.state;
    this.setState({
      modalOpen: !modalOpen
    });
  };
  public back = async event => {
    await event.stopPropagation();
    this.props.history.goBack();
  };
}

export default withRouter(UserAvatarDetailContainer);
