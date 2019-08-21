import React from "react";
import { Query } from "react-apollo";
import { RecommendLocations } from "../../../types/api";
import CountriesPagePresenter from "./CountriesPagePresenter";
import { GET_COUNTRIES_PAGE } from "./CountriesPageQueries";
import { RouteComponentProps } from "react-router";

class CountriesPageQuery extends Query<RecommendLocations> {}

interface IProps extends RouteComponentProps<any> {}

interface IState {
  search: string;
  countriesList: any;
}

class CountriesPageContainer extends React.Component<IProps, IState> {
  public countriesFetchMore;
  public countriesData;
  constructor(props) {
    super(props);
    this.state = {
      search: "",
      countriesList: []
    };
  }
  public componentDidUpdate(prevProps) {
    const newProps = this.props;
    if (prevProps.match !== newProps.match) {
      this.setState({ search: "", countriesList: [] });
    }
  }
  public render() {
    const {
      match: {
        params: { continentCode }
      }
    } = this.props;
    const { search, countriesList } = this.state;
    return (
      <CountriesPageQuery
        query={GET_COUNTRIES_PAGE}
        variables={{
          continentCode
        }}
      >
        {({
          data: countriesData,
          loading: countriesLoading,
          fetchMore: countriesFetchMore
        }) => {
          this.countriesData = countriesData;
          this.countriesFetchMore = countriesFetchMore;
          return (
            <CountriesPagePresenter
              countriesData={countriesData}
              countriesLoading={countriesLoading}
              search={search}
              countriesList={countriesList}
              onChange={this.onChange}
              loadMore={this.loadMore}
            />
          );
        }}
      </CountriesPageQuery>
    );
  }
  public onChange: React.ChangeEventHandler<HTMLInputElement> = event => {
    const {
      target: { value }
    } = event;
    const {
      getCountriesPage: { countries = null }
    } = this.countriesData;
    const locationSearch = (list, text) =>
      list.filter(i =>
        i.countryName.toLowerCase().includes(text.toLowerCase())
      );
    const recommendLocationList = locationSearch(countries, value);
    this.setState({
      search: value,
      recommendLocationList
    } as any);
  };
  public loadMore = page => {
    const {
      match: {
        params: { continentCode }
      }
    } = this.props;
    this.countriesFetchMore({
      query: GET_COUNTRIES_PAGE,
      variables: {
        continentCode,
        page
      },
      updateQuery: (previousResult, { fetchMoreResult }) => {
        if (!fetchMoreResult) {
          return previousResult;
        }
        const data = {
          getCountriesPage: {
            ...previousResult.getCountriesPage,
            countries: [
              ...previousResult.getCountriesPage.countries,
              ...fetchMoreResult.getCountriesPage.countries
            ],
            page: fetchMoreResult.getCountriesPage.page,
            hasNextPage: fetchMoreResult.getCountriesPage.hasNextPage
          }
        };
        return data;
      }
    });
  };
}

export default CountriesPageContainer;
