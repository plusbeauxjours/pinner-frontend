import React from "react";
import { Query } from "react-apollo";
import { RecommendUsers } from "../../../types/api";
import PeoplePagePresenter from "./PeoplePagePresenter";
import { RECOMMEND_USERS } from "./PeoplePageQueries";
import { RouteComponentProps } from "react-router";

class RecommendUsersQuery extends Query<RecommendUsers> {}

interface IProps extends RouteComponentProps<any> {}
interface IState {
  search: string;
  recommendUserList: any;
}

class PeoplePageContainer extends React.Component<IProps, IState> {
  public recommendUsersFetchMore;
  public recommendUsersData;
  constructor(props) {
    super(props);
    this.state = {
      search: "",
      recommendUserList: []
    };
  }
  public componentDidUpdate(prevProps) {
    const newProps = this.props;
    if (prevProps.match !== newProps.match) {
      this.setState({ search: "", recommendUserList: [] });
    }
  }
  public render() {
    const { search, recommendUserList } = this.state;
    return (
      <RecommendUsersQuery query={RECOMMEND_USERS}>
        {({
          data: recommendUsersData,
          loading: recommendUsersLoading,
          fetchMore: recommendUsersFetchMore
        }) => {
          this.recommendUsersData = recommendUsersData;
          this.recommendUsersFetchMore = recommendUsersFetchMore;
          return (
            <PeoplePagePresenter
              recommendUsersData={recommendUsersData}
              recommendUsersLoading={recommendUsersLoading}
              search={search}
              recommendUserList={recommendUserList}
              onChange={this.onChange}
              loadMore={this.loadMore}
            />
          );
        }}
      </RecommendUsersQuery>
    );
  }
  public onChange: React.ChangeEventHandler<HTMLInputElement> = event => {
    const {
      target: { value }
    } = event;
    const {
      recommendUsers: { users = null }
    } = this.recommendUsersData;
    const userSearch = (list, text) =>
      list.filter(i => i.username.toLowerCase().includes(text.toLowerCase()));
    const recommendUserList = userSearch(users, value);
    this.setState({
      search: value,
      recommendUserList
    } as any);
  };
  public loadMore = page => {
    this.recommendUsersFetchMore({
      query: RECOMMEND_USERS,
      variables: {
        page
      },
      updateQuery: (previousResult, { fetchMoreResult }) => {
        if (!fetchMoreResult) {
          return previousResult;
        }
        const data = {
          recommendUsers: {
            ...previousResult.recommendUsers,
            users: [
              ...previousResult.recommendUsers.users,
              ...fetchMoreResult.recommendUsers.users
            ],
            page: fetchMoreResult.recommendUsers.page,
            hasNextPage: fetchMoreResult.recommendUsers.hasNextPage
          }
        };
        return data;
      }
    });
  };
}

export default PeoplePageContainer;
