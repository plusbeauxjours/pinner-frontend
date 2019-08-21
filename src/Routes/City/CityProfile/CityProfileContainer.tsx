import React from "react";
import { Query, MutationFn, Mutation } from "react-apollo";
import CityProfilePresenter from "./CityProfilePresenter";
import {
  CityProfile,
  CityProfileVariables,
  NearCities,
  NearCitiesVariables,
  RequestCoffee,
  RequestCoffeeVariables,
  GetCoffees,
  GetCoffeesVariables,
  GetSamenameCities,
  GetSamenameCitiesVariables,
  SlackReportLocations,
  SlackReportLocationsVariables
} from "../../../types/api";
import { RouteComponentProps, withRouter } from "react-router";
import { CITY_PROFILE, GET_SAMENAME_CITIES } from "./CityProfileQueries";
import { NEAR_CITIES } from "../NearCities/NearCitiesQueries";
import { GET_COFFEES } from "../../User/Coffees/CoffeesQueries";
import { toast } from "react-toastify";
import { REQUEST_COFFEE } from "../../Match/MatchQueries";
import { SLACK_REPORT_LOCATIONS, ME } from "../../../sharedQueries";
import { Me } from "../../../types/api";

class CityProfileQuery extends Query<CityProfile, CityProfileVariables> {}
class GetSamenameCitiesQuery extends Query<
  GetSamenameCities,
  GetSamenameCitiesVariables
> {}
class GetCoffeesQuery extends Query<GetCoffees, GetCoffeesVariables> {}
class NearCitiesQuery extends Query<NearCities, NearCitiesVariables> {}
class RequestCoffeeMutation extends Mutation<
  RequestCoffee,
  RequestCoffeeVariables
> {}
class SlackReportLocationsMutation extends Mutation<
  SlackReportLocations,
  SlackReportLocationsVariables
> {}
class MeQuery extends Query<Me> {}

interface IProps extends RouteComponentProps<any> {}

interface IState {
  reportModalOpen: boolean;
  mapMopdalOpen: boolean;
  search: string;
  usersNowList: any;
  currentCityId: string;
  requestModalOpen: boolean;
  countryModalOpen: boolean;
  genderModalOpen: boolean;
  countryCode: string;
  gender: string;
  target: string;
}

class CityProfileContainer extends React.Component<IProps, IState> {
  public data;
  public coffeeFetchMore;
  public requestCoffeeFn: MutationFn;
  public slackReportLocationsFn: MutationFn;
  constructor(props) {
    super(props);
    this.state = {
      reportModalOpen: false,
      mapMopdalOpen: false,
      search: "",
      usersNowList: [],
      currentCityId: localStorage.getItem("cityId"),
      requestModalOpen: false,
      countryModalOpen: false,
      genderModalOpen: false,
      countryCode: "",
      gender: "",
      target: ""
    };
  }
  public componentDidUpdate(prevProps) {
    const newProps = this.props;
    if (prevProps.match.params.cityId !== newProps.match.params.cityId) {
      this.setState({ search: "", usersNowList: [] });
    }
  }
  public render() {
    const {
      match: {
        params: { cityId }
      }
    } = this.props;
    const isStaying = this.state.currentCityId === cityId;
    const {
      reportModalOpen,
      mapMopdalOpen,
      search,
      usersNowList,
      requestModalOpen,
      countryModalOpen,
      genderModalOpen,
      target
    } = this.state;
    return (
      <MeQuery query={ME}>
        {({ data: me }) => {
          return (
            <GetSamenameCitiesQuery
              query={GET_SAMENAME_CITIES}
              variables={{ cityId }}
            >
              {({
                data: samenameCitiesData,
                loading: samenameCitiesLoading
              }) => {
                return (
                  <GetCoffeesQuery
                    query={GET_COFFEES}
                    variables={{
                      cityId,
                      location: "city"
                    }}
                  >
                    {({ data: coffeeData, loading: coffeeLoading }) => {
                      return (
                        <SlackReportLocationsMutation
                          mutation={SLACK_REPORT_LOCATIONS}
                          onCompleted={this.onCompltedSlackReportLocations}
                        >
                          {slackReportLocationsFn => {
                            this.slackReportLocationsFn = slackReportLocationsFn;
                            return (
                              <RequestCoffeeMutation
                                mutation={REQUEST_COFFEE}
                                variables={{
                                  currentCityId: cityId
                                }}
                                onCompleted={this.onCompletedRequestCoffee}
                                update={this.updateRequestCoffee}
                              >
                                {requestCoffeeFn => {
                                  this.requestCoffeeFn = requestCoffeeFn;
                                  return (
                                    <NearCitiesQuery
                                      query={NEAR_CITIES}
                                      variables={{ cityId }}
                                      fetchPolicy="no-cache"
                                    >
                                      {({
                                        data: nearCitiesData,
                                        loading: nearCitiesLoading
                                      }) => {
                                        return (
                                          <CityProfileQuery
                                            query={CITY_PROFILE}
                                            variables={{ cityId }}
                                          >
                                            {({
                                              data: cityData,
                                              loading: cityLoading
                                            }) => {
                                              this.data = cityData;
                                              return (
                                                <CityProfilePresenter
                                                  me={me}
                                                  reportModalOpen={
                                                    reportModalOpen
                                                  }
                                                  toggleReportModal={
                                                    this.toggleReportModal
                                                  }
                                                  mapMopdalOpen={mapMopdalOpen}
                                                  toggleMapMopdal={
                                                    this.toggleMapMopdal
                                                  }
                                                  slackReportLocations={
                                                    this.slackReportLocations
                                                  }
                                                  samenameCitiesData={
                                                    samenameCitiesData
                                                  }
                                                  samenameCitiesLoading={
                                                    samenameCitiesLoading
                                                  }
                                                  coffeeData={coffeeData}
                                                  coffeeLoading={coffeeLoading}
                                                  cityData={cityData}
                                                  cityLoading={cityLoading}
                                                  nearCitiesData={
                                                    nearCitiesData
                                                  }
                                                  nearCitiesLoading={
                                                    nearCitiesLoading
                                                  }
                                                  requestModalOpen={
                                                    requestModalOpen
                                                  }
                                                  toggleCoffeeRequestModal={
                                                    this
                                                      .toggleCoffeeRequestModal
                                                  }
                                                  cityId={cityId}
                                                  isStaying={isStaying}
                                                  onChange={this.onChange}
                                                  search={search}
                                                  usersNowList={usersNowList}
                                                  submitCoffee={
                                                    this.submitCoffee
                                                  }
                                                  searchSet={this.searchSet}
                                                  countryModalOpen={
                                                    countryModalOpen
                                                  }
                                                  openCountryModal={
                                                    this.openCountryModal
                                                  }
                                                  closeCountryModal={
                                                    this.closeCountryModal
                                                  }
                                                  genderModalOpen={
                                                    genderModalOpen
                                                  }
                                                  openGenderModal={
                                                    this.openGenderModal
                                                  }
                                                  closeGenderModal={
                                                    this.closeGenderModal
                                                  }
                                                  onSelectCountry={
                                                    this.onSelectCountry
                                                  }
                                                  onSelectGender={
                                                    this.onSelectGender
                                                  }
                                                  target={target}
                                                />
                                              );
                                            }}
                                          </CityProfileQuery>
                                        );
                                      }}
                                    </NearCitiesQuery>
                                  );
                                }}
                              </RequestCoffeeMutation>
                            );
                          }}
                        </SlackReportLocationsMutation>
                      );
                    }}
                  </GetCoffeesQuery>
                );
              }}
            </GetSamenameCitiesQuery>
          );
        }}
      </MeQuery>
    );
  }
  public onSelectGender = (gender: string) => {
    const { target } = this.state;
    this.setState({
      genderModalOpen: false
    });
    this.requestCoffeeFn({ variables: { target, gender } });
  };
  public openGenderModal = target => {
    this.setState({
      genderModalOpen: true,
      requestModalOpen: false,
      target
    });
  };
  public closeGenderModal = () => {
    this.setState({
      genderModalOpen: false,
      requestModalOpen: false
    });
  };
  public onSelectCountry = (countryCode: string) => {
    const { target } = this.state;
    this.setState({
      countryModalOpen: false
    });
    this.requestCoffeeFn({ variables: { target, countryCode } });
  };
  public openCountryModal = target => {
    this.setState({
      countryModalOpen: true,
      requestModalOpen: false,
      target
    });
  };
  public closeCountryModal = () => {
    this.setState({
      countryModalOpen: false,
      requestModalOpen: false
    });
  };
  public searchSet = () => {
    this.setState({ search: "" });
  };
  public toggleMapMopdal = () => {
    const { mapMopdalOpen } = this.state;
    this.setState({ mapMopdalOpen: !mapMopdalOpen });
  };
  public toggleReportModal = () => {
    const { reportModalOpen } = this.state;
    this.setState({ reportModalOpen: !reportModalOpen });
  };
  public onCompltedSlackReportLocations = data => {
    this.setState({ reportModalOpen: false });
    if (data.slackReportLocations.ok) {
      toast.success("Report Sent");
    } else {
      toast.error("error");
    }
  };
  public slackReportLocations = (targetLocationId, payload) => {
    this.slackReportLocationsFn({
      variables: {
        targetLocationId,
        targetLocationType: "city",
        payload
      }
    });
  };
  public toggleCoffeeRequestModal = () => {
    const { requestModalOpen } = this.state;
    this.setState({
      requestModalOpen: !requestModalOpen
    } as any);
  };
  public onChange: React.ChangeEventHandler<HTMLInputElement> = event => {
    const {
      target: { value }
    } = event;
    const {
      cityProfile: { usersNow = null }
    } = this.data;
    const nowSearch = (list, text) =>
      list.filter(i => i.username.toLowerCase().includes(text.toLowerCase()));
    const usersNowList = nowSearch(usersNow, value);
    this.setState({
      search: value,
      usersNowList
    } as any);
  };
  public submitCoffee = target => {
    const { requestModalOpen } = this.state;
    this.requestCoffeeFn({ variables: { target } });
    this.setState({
      requestModalOpen: !requestModalOpen
    } as any);
  };
  public onCompletedRequestCoffee = data => {
    this.setState({
      requestModalOpen: false,
      countryModalOpen: false,
      genderModalOpen: false
    });
    if (data.requestCoffee.coffee) {
      toast.success("Coffee requested, finding a guest");
    } else {
      toast.error("error");
    }
  };
  public updateRequestCoffee = (cache, { data: { requestCoffee } }) => {
    const { currentCityId } = this.state;
    try {
      const feedData = cache.readQuery({
        query: GET_COFFEES,
        variables: { cityId: currentCityId, location: "city" }
      });
      if (feedData) {
        feedData.getCoffees.coffees.unshift(requestCoffee.coffee);
        cache.writeQuery({
          query: GET_COFFEES,
          variables: { cityId: currentCityId, location: "city" },
          data: feedData
        });
      }
    } catch (e) {
      console.log(e);
    }
    const {
      coffee: {
        host: { username }
      }
    } = requestCoffee;
    try {
      const profileData = cache.readQuery({
        query: GET_COFFEES,
        variables: { userName: username, location: "profile" }
      });
      if (profileData) {
        profileData.getCoffees.coffees.push(requestCoffee.coffee);
        cache.writeQuery({
          query: GET_COFFEES,
          variables: { userName: username, location: "profile" },
          data: profileData
        });
      }
    } catch (e) {
      console.log(e);
    }
  };
}

export default withRouter(CityProfileContainer);
