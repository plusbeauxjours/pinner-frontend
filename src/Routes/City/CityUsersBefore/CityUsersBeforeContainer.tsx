import React from "react";
import { Query } from "react-apollo";
import { CityUsersBefore, CityUsersBeforeVariables } from "../../../types/api";
import CityUsersBeforePresenter from "./CityUsersBeforePresenter";
import { CITY_USERS_BEFORE } from "./CityUsersBeforeQueries";
import { RouteComponentProps } from "react-router";

class CityUsersBeforeQuery extends Query<
  CityUsersBefore,
  CityUsersBeforeVariables
> {}

interface IProps extends RouteComponentProps<any> {}
interface IState {
  modalOpen: boolean;
  search: string;
  usersBeforeList: any;
}

class CityUsersBeforeContainer extends React.Component<IProps, IState> {
  public data;
  public fetchMore;
  constructor(props) {
    super(props);
    this.state = {
      modalOpen: false,
      search: "",
      usersBeforeList: [],
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
        params: { cityId },
      },
    } = this.props;
    const { modalOpen, search, usersBeforeList } = this.state;
    return (
      <CityUsersBeforeQuery
        query={CITY_USERS_BEFORE}
        variables={{
          cityId,
        }}
      >
        {({ data, loading, fetchMore }) => {
          this.data = data;
          this.fetchMore = fetchMore;
          return (
            <CityUsersBeforePresenter
              data={data}
              loading={loading}
              modalOpen={modalOpen}
              toggleModal={this.toggleModal}
              search={search}
              usersBeforeList={usersBeforeList}
              onChange={this.onChange}
              loadMore={this.loadMore}
              cityId={cityId}
            />
          );
        }}
      </CityUsersBeforeQuery>
    );
  }
  public toggleModal = () => {
    const { modalOpen } = this.state;
    this.setState({
      modalOpen: !modalOpen,
    } as any);
  };
  public onChange: React.ChangeEventHandler<HTMLInputElement> = (event) => {
    const {
      target: { value },
    } = event;
    const {
      cityUsersBefore: { usersBefore = null },
    } = this.data;
    const userSearch = (list, text) =>
      list.filter((i) =>
        i.actor.username.toLowerCase().includes(text.toLowerCase())
      );
    const usersBeforeList = userSearch(usersBefore, value);
    this.setState({
      search: value,
      usersBeforeList,
    } as any);
  };
  public loadMore = (page) => {
    const {
      match: {
        params: { cityId },
      },
    } = this.props;
    this.fetchMore({
      query: CITY_USERS_BEFORE,
      variables: {
        cityId,
        page,
      },
      updateQuery: (previousResult, { fetchMoreResult }) => {
        if (!fetchMoreResult) {
          return previousResult;
        }
        const data = {
          cityUsersBefore: {
            ...previousResult.cityUsersBefore,
            usersBefore: [
              ...previousResult.cityUsersBefore.usersBefore,
              ...fetchMoreResult.cityUsersBefore.usersBefore,
            ],
            page: fetchMoreResult.cityUsersBefore.page,
            hasNextPage: fetchMoreResult.cityUsersBefore.hasNextPage,
          },
        };
        return data;
      },
    });
  };
}

export default CityUsersBeforeContainer;
