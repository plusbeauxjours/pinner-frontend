import React from "react";
import { Query } from "react-apollo";
import { RecommendLocations } from "../../../types/api";
import LocationsPagePresenter from "./LocationsPagePresenter";
import { RECOMMEND_LOCATIONS } from "./LocationsPageQueries";
import { RouteComponentProps } from "react-router";

class RecommendLocationsQuery extends Query<RecommendLocations> {}

interface IProps extends RouteComponentProps<any> {}

interface IState {
  search: string;
  recommendLocationList: any;
}

class PeoplePageContainer extends React.Component<IProps, IState> {
  public recommendLocationsFetchMore;
  public recommendLocationsData;
  constructor(props) {
    super(props);
    this.state = {
      search: "",
      recommendLocationList: []
    };
  }
  public componentDidUpdate(prevProps) {
    const newProps = this.props;
    if (prevProps.match !== newProps.match) {
      this.setState({ search: "", recommendLocationList: [] });
    }
  }
  public render() {
    const { search, recommendLocationList } = this.state;
    return (
      <RecommendLocationsQuery query={RECOMMEND_LOCATIONS}>
        {({
          data: recommendLocationsData,
          loading: recommendLocationsLoading,
          fetchMore: recommendLocationsFetchMore
        }) => {
          this.recommendLocationsData = recommendLocationsData;
          this.recommendLocationsFetchMore = recommendLocationsFetchMore;
          return (
            <LocationsPagePresenter
              recommendLocationsData={recommendLocationsData}
              recommendLocationsLoading={recommendLocationsLoading}
              search={search}
              recommendLocationList={recommendLocationList}
              onChange={this.onChange}
              loadMore={this.loadMore}
            />
          );
        }}
      </RecommendLocationsQuery>
    );
  }
  public onChange: React.ChangeEventHandler<HTMLInputElement> = event => {
    const {
      target: { value }
    } = event;
    const {
      recommendLocations: { cities = null }
    } = this.recommendLocationsData;
    const locationSearch = (list, text) =>
      list.filter(i => i.cityName.toLowerCase().includes(text.toLowerCase()));
    const recommendLocationList = locationSearch(cities, value);
    this.setState({
      search: value,
      recommendLocationList
    } as any);
  };
  public loadMore = page => {
    this.recommendLocationsFetchMore({
      query: RECOMMEND_LOCATIONS,
      variables: {
        page
      },
      updateQuery: (previousResult, { fetchMoreResult }) => {
        if (!fetchMoreResult) {
          return previousResult;
        }
        const data = {
          recommendLocations: {
            ...previousResult.recommendLocations,
            cities: [
              ...previousResult.recommendLocations.cities,
              ...fetchMoreResult.recommendLocations.cities
            ],
            page: fetchMoreResult.recommendLocations.page,
            hasNextPage: fetchMoreResult.recommendLocations.hasNextPage
          }
        };
        return data;
      }
    });
  };
}

export default PeoplePageContainer;
