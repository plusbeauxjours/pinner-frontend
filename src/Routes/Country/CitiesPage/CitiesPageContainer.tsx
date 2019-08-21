import React from "react";
import { Query } from "react-apollo";
import { RecommendLocations } from "../../../types/api";
import CitiesPagePresenter from "./CitiesPagePresenter";
import { GET_CITIES_PAGE } from "./CitiesPageQueries";
import { RouteComponentProps } from "react-router";

class CitiesPageQuery extends Query<RecommendLocations> {}

interface IProps extends RouteComponentProps<any> {}

interface IState {
  search: string;
  citiesList: any;
}

class CitiesPageContainer extends React.Component<IProps, IState> {
  public citiesFetchMore;
  public citiesData;
  constructor(props) {
    super(props);
    this.state = {
      search: "",
      citiesList: []
    };
  }
  public componentDidUpdate(prevProps) {
    const newProps = this.props;
    if (prevProps.match !== newProps.match) {
      this.setState({ search: "", citiesList: [] });
    }
  }
  public render() {
    const {
      match: {
        params: { countryCode }
      }
    } = this.props;
    const { search, citiesList } = this.state;
    return (
      <CitiesPageQuery
        query={GET_CITIES_PAGE}
        variables={{
          countryCode
        }}
      >
        {({
          data: citiesData,
          loading: citiesLoading,
          fetchMore: citiesFetchMore
        }) => {
          this.citiesData = citiesData;
          this.citiesFetchMore = citiesFetchMore;
          return (
            <CitiesPagePresenter
              citiesData={citiesData}
              citiesLoading={citiesLoading}
              search={search}
              citiesList={citiesList}
              onChange={this.onChange}
              loadMore={this.loadMore}
            />
          );
        }}
      </CitiesPageQuery>
    );
  }
  public onChange: React.ChangeEventHandler<HTMLInputElement> = event => {
    const {
      target: { value }
    } = event;
    const {
      getCitiesPage: { cities = null }
    } = this.citiesData;
    const locationSearch = (list, text) =>
      list.filter(i =>
        i.countryName.toLowerCase().includes(text.toLowerCase())
      );
    const citiesList = locationSearch(cities, value);
    this.setState({
      search: value,
      citiesList
    } as any);
  };
  public loadMore = page => {
    const {
      match: {
        params: { countryCode }
      }
    } = this.props;
    this.citiesFetchMore({
      query: GET_CITIES_PAGE,
      variables: {
        countryCode,
        page
      },
      updateQuery: (previousResult, { fetchMoreResult }) => {
        if (!fetchMoreResult) {
          return previousResult;
        }
        const data = {
          getCitiesPage: {
            ...previousResult.getCitiesPage,
            cities: [
              ...previousResult.getCitiesPage.cities,
              ...fetchMoreResult.getCitiesPage.cities
            ],
            page: fetchMoreResult.getCitiesPage.page,
            hasNextPage: fetchMoreResult.getCitiesPage.hasNextPage
          }
        };
        return data;
      }
    });
  };
}

export default CitiesPageContainer;
