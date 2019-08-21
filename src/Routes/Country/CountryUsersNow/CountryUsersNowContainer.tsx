import React from "react";
import { Query } from "react-apollo";
import { CountryUsersNow, CountryUsersNowVariables } from "../../../types/api";
import CountryUsersNowPresenter from "./CountryUsersNowPresenter";
import { COUNTRY_USERS_NOW } from "./CountryUsersNowQueries";
import { RouteComponentProps } from "react-router";

class CountryUsersNowQuery extends Query<
  CountryUsersNow,
  CountryUsersNowVariables
> {}

interface IProps extends RouteComponentProps<any> {}
interface IState {
  search: string;
  usersNowList: any;
}

class CountryUsersNowContainer extends React.Component<IProps, IState> {
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
        params: { countryCode }
      }
    } = this.props;
    const { search, usersNowList } = this.state;
    return (
      <CountryUsersNowQuery
        query={COUNTRY_USERS_NOW}
        variables={{
          countryCode
        }}
      >
        {({ data, loading, fetchMore }) => {
          this.data = data;
          this.fetchMore = fetchMore;
          return (
            <CountryUsersNowPresenter
              data={data}
              loading={loading}
              search={search}
              usersNowList={usersNowList}
              onChange={this.onChange}
              loadMore={this.loadMore}
            />
          );
        }}
      </CountryUsersNowQuery>
    );
  }

  public onChange: React.ChangeEventHandler<HTMLInputElement> = event => {
    const {
      target: { value }
    } = event;
    const {
      countryUsersNow: { usersNow = null }
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
        params: { countryCode }
      }
    } = this.props;
    this.fetchMore({
      query: COUNTRY_USERS_NOW,
      variables: {
        countryCode,
        page
      },
      updateQuery: (previousResult, { fetchMoreResult }) => {
        if (!fetchMoreResult) {
          return previousResult;
        }
        const data = {
          countryUsersNow: {
            ...previousResult.countryUsersNow,
            usersNow: [
              ...previousResult.countryUsersNow.usersNow,
              ...fetchMoreResult.countryUsersNow.usersNow
            ],
            page: fetchMoreResult.countryUsersNow.page,
            hasNextPage: fetchMoreResult.countryUsersNow.hasNextPage
          }
        };
        return data;
      }
    });
  };
}

export default CountryUsersNowContainer;
