import React from "react";
import { Query } from "react-apollo";
import {
  ContinentUsersNow,
  ContinentUsersNowVariables
} from "../../../types/api";
import ContinentUsersNowPresenter from "./ContinentUsersNowPresenter";
import { CONTINENT_USERS_NOW } from "./ContinentUsersNowQueries";
import { RouteComponentProps } from "react-router";

class ContinentUsersNowQuery extends Query<
  ContinentUsersNow,
  ContinentUsersNowVariables
> {}

interface IProps extends RouteComponentProps<any> {}
interface IState {
  search: string;
  usersNowList: any;
}

class ContinentUsersNowContainer extends React.Component<IProps, IState> {
  public data;
  public fetchMore;
  constructor(props) {
    super(props);
    this.state = {
      search: "",
      usersNowList: []
    };
  }
  public componentDidUpdate(prevProps) {
    const newProps = this.props;
    if (prevProps.match !== newProps.match) {
      this.setState({ search: "", usersNowList: [] });
    }
  }
  public render() {
    const {
      match: {
        params: { continentCode }
      }
    } = this.props;
    const { search, usersNowList } = this.state;
    return (
      <ContinentUsersNowQuery
        query={CONTINENT_USERS_NOW}
        variables={{
          continentCode
        }}
      >
        {({ data, loading, fetchMore }) => {
          this.data = data;
          this.fetchMore = fetchMore;
          return (
            <ContinentUsersNowPresenter
              data={data}
              loading={loading}
              search={search}
              usersNowList={usersNowList}
              onChange={this.onChange}
              loadMore={this.loadMore}
            />
          );
        }}
      </ContinentUsersNowQuery>
    );
  }
  public onChange: React.ChangeEventHandler<HTMLInputElement> = event => {
    const {
      target: { value }
    } = event;
    const {
      continentUsersNow: { usersNow }
    } = this.data;
    const userSearch = (list, text) =>
      list.filter(i => i.username.toLowerCase().includes(text.toLowerCase()));
    const usersNowList = userSearch(usersNow, value);
    this.setState({
      search: value,
      usersNowList
    } as any);
  };
  public loadMore = page => {
    const {
      match: {
        params: { continentCode }
      }
    } = this.props;
    this.fetchMore({
      query: CONTINENT_USERS_NOW,
      variables: {
        continentCode,
        page
      },
      updateQuery: (previousResult, { fetchMoreResult }) => {
        if (!fetchMoreResult) {
          return previousResult;
        }
        const data = {
          continentUsersNow: {
            ...previousResult.continentUsersNow,
            continentUsersNow: [
              ...previousResult.continentUsersNow.usersNow,
              ...fetchMoreResult.continentUsersNow.usersNow
            ],
            page: fetchMoreResult.continentUsersNow.page,
            hasNextPage: fetchMoreResult.continentUsersNow.hasNextPage
          }
        };
        return data;
      }
    });
  };
}

export default ContinentUsersNowContainer;
