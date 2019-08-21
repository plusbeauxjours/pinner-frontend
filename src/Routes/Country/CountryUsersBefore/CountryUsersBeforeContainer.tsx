import React from "react";
import { Query } from "react-apollo";
import {
  CountryUsersBefore,
  CountryUsersBeforeVariables
} from "../../../types/api";
import CountryUsersBeforePresenter from "./CountryUsersBeforePresenter";
import { COUNTRY_USERS_BEFORE } from "./CountryUsersBeforeQueries";
import { RouteComponentProps } from "react-router";

class CountryUsersBeforeQuery extends Query<
  CountryUsersBefore,
  CountryUsersBeforeVariables
> {}

interface IProps extends RouteComponentProps<any> {}
interface IState {
  search: string;
  usersBeforeList: any;
}

class CountryUsersBeforeContainer extends React.Component<IProps, IState> {
  public data;
  public fetchMore;
  constructor(props) {
    super(props);
    this.state = {
      search: "",
      usersBeforeList: []
    };
  }
  public componentDidUpdate(prevProps) {
    const newProps = this.props;
    if (prevProps.match !== newProps.match) {
      this.setState({ search: "", usersBeforeList: [] });
    }
  }
  public render() {
    const {
      match: {
        params: { countryCode }
      }
    } = this.props;
    const { search, usersBeforeList } = this.state;
    return (
      <CountryUsersBeforeQuery
        query={COUNTRY_USERS_BEFORE}
        variables={{
          countryCode
        }}
      >
        {({ data, loading, fetchMore }) => {
          this.data = data;
          this.fetchMore = fetchMore;
          return (
            <CountryUsersBeforePresenter
              data={data}
              loading={loading}
              search={search}
              usersBeforeList={usersBeforeList}
              onChange={this.onChange}
              loadMore={this.loadMore}
            />
          );
        }}
      </CountryUsersBeforeQuery>
    );
  }
  public onChange: React.ChangeEventHandler<HTMLInputElement> = event => {
    const {
      target: { value }
    } = event;
    const {
      countryUsersBefore: { usersBefore = null }
    } = this.data;
    const userSearch = (list, text) =>
      list.filter(i =>
        i.actor.profile.username.toLowerCase().includes(text.toLowerCase())
      );
    const usersBeforeList = userSearch(usersBefore, value);
    this.setState({
      search: value,
      usersBeforeList
    } as any);
  };
  public loadMore = page => {
    const {
      match: {
        params: { countryCode }
      }
    } = this.props;
    this.fetchMore({
      query: COUNTRY_USERS_BEFORE,
      variables: {
        countryCode,
        page
      },
      updateQuery: (previousResult, { fetchMoreResult }) => {
        if (!fetchMoreResult) {
          return previousResult;
        }
        const data = {
          countryUsersBefore: {
            ...previousResult.countryUsersBefore,
            usersBefore: [
              ...previousResult.countryUsersBefore.usersBefore,
              ...fetchMoreResult.countryUsersBefore.usersBefore
            ],
            page: fetchMoreResult.countryUsersBefore.page,
            hasNextPage: fetchMoreResult.countryUsersBefore.hasNextPage
          }
        };
        return data;
      }
    });
  };
}

export default CountryUsersBeforeContainer;
