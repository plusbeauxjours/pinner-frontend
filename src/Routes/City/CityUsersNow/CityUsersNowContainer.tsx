import React from "react";
import { Query } from "react-apollo";
import { CityUsersNow, CityUsersNowVariables } from "../../../types/api";
import CityUsersNowPresenter from "./CityUsersNowPresenter";
import { CITY_USERS_NOW } from "./CityUsersNowQueries";
import { RouteComponentProps } from "react-router";

class CityUsersNowQuery extends Query<CityUsersNow, CityUsersNowVariables> {}

interface IProps extends RouteComponentProps<any> {}
interface IState {
  modalOpen: boolean;
  search: string;
  usersNowList: any;
}

class CityUsersNowContainer extends React.Component<IProps, IState> {
  public data;
  public fetchMore;
  constructor(props) {
    super(props);
    this.state = {
      modalOpen: false,
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
        params: { cityId }
      }
    } = this.props;
    const { modalOpen, search, usersNowList } = this.state;
    return (
      <CityUsersNowQuery
        query={CITY_USERS_NOW}
        variables={{
          cityId
        }}
      >
        {({ data, loading, fetchMore }) => {
          this.data = data;
          this.fetchMore = fetchMore;
          return (
            <CityUsersNowPresenter
              data={data}
              loading={loading}
              modalOpen={modalOpen}
              toggleModal={this.toggleModal}
              search={search}
              usersNowList={usersNowList}
              onChange={this.onChange}
              loadMore={this.loadMore}
              cityId={cityId}
            />
          );
        }}
      </CityUsersNowQuery>
    );
  }
  public toggleModal = () => {
    const { modalOpen } = this.state;
    this.setState({
      modalOpen: !modalOpen
    } as any);
  };
  public onChange: React.ChangeEventHandler<HTMLInputElement> = event => {
    const {
      target: { value }
    } = event;
    const {
      cityUsersNow: { usersNow = null }
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
        params: { cityId }
      }
    } = this.props;
    this.fetchMore({
      query: CITY_USERS_NOW,
      variables: {
        cityId,
        page
      },
      updateQuery: (previousResult, { fetchMoreResult }) => {
        if (!fetchMoreResult) {
          return previousResult;
        }
        const data = {
          cityUsersNow: {
            ...previousResult.cityUsersNow,
            usersNow: [
              ...previousResult.cityUsersNow.usersNow,
              ...fetchMoreResult.cityUsersNow.usersNow
            ],
            page: fetchMoreResult.cityUsersNow.page,
            hasNextPage: fetchMoreResult.cityUsersNow.hasNextPage
          }
        };
        return data;
      }
    });
  };
}

export default CityUsersNowContainer;
