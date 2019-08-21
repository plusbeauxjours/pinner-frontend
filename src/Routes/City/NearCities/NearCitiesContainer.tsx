import React from "react";
import { Query } from "react-apollo";
import { NearCities, NearCitiesVariables } from "../../../types/api";
import NearCitiesPresenter from "./NearCitiesPresenter";
import { NEAR_CITIES } from "./NearCitiesQueries";
import { RouteComponentProps } from "react-router";

class NearCitiesQuery extends Query<NearCities, NearCitiesVariables> {}

interface IProps extends RouteComponentProps<any> {}
interface IState {
  search: string;
  nearCitiesList: any;
}

class NearCitiesContainer extends React.Component<IProps, IState> {
  public data;
  public fetchMore;
  constructor(props) {
    super(props);
    this.state = {
      search: "",
      nearCitiesList: []
    };
  }
  public componentDidUpdate(prevProps) {
    const newProps = this.props;
    if (prevProps.match !== newProps.match) {
      this.setState({ search: "", nearCitiesList: [] });
    }
  }
  public render() {
    const {
      match: {
        params: { cityId }
      }
    } = this.props;
    const { search, nearCitiesList } = this.state;
    return (
      <NearCitiesQuery
        query={NEAR_CITIES}
        variables={{
          cityId
        }}
      >
        {({ data, loading, fetchMore }) => {
          this.data = data;
          this.fetchMore = fetchMore;
          return (
            <NearCitiesPresenter
              data={data}
              loading={loading}
              search={search}
              nearCitiesList={nearCitiesList}
              onChange={this.onChange}
              loadMore={this.loadMore}
            />
          );
        }}
      </NearCitiesQuery>
    );
  }
  public onChange: React.ChangeEventHandler<HTMLInputElement> = event => {
    const {
      target: { value }
    } = event;
    const {
      nearCities: { cities = null }
    } = this.data;
    const citySearch = (list, text) =>
      list.filter(
        i =>
          i.cityName.toLowerCase().includes(text.toLowerCase()) ||
          i.country.countryName.toLowerCase().includes(text.toLowerCase())
      );
    const nearCitiesList = citySearch(cities, value);
    this.setState({
      search: value,
      nearCitiesList
    } as any);
  };
  public loadMore = page => {
    const {
      match: {
        params: { cityId }
      }
    } = this.props;
    this.fetchMore({
      query: NEAR_CITIES,
      variables: {
        cityId,
        page
      },
      updateQuery: (previousResult, { fetchMoreResult }) => {
        if (!fetchMoreResult) {
          return previousResult;
        }
        const data = {
          nearCities: {
            ...previousResult.nearCities,
            cities: [
              ...previousResult.nearCities.cities,
              ...fetchMoreResult.nearCities.cities
            ],
            page: fetchMoreResult.nearCities.page,
            hasNextPage: fetchMoreResult.nearCities.hasNextPage
          }
        };
        return data;
      }
    });
  };
}

export default NearCitiesContainer;
