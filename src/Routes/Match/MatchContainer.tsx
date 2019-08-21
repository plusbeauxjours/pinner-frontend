import React from "react";
import MatchPresenter from "./MatchPresenter";
import { Query, Mutation, MutationFn } from "react-apollo";
import {
  RecommendUsers,
  RecommendLocations,
  RequestCoffee,
  RequestCoffeeVariables,
  GetMatches,
  GetMatchesVariables,
  GetCoffees,
  GetCoffeesVariables,
  MarkAsReadMatch,
  MarkAsReadMatchVariables,
  Me
} from "src/types/api";
import { toast } from "react-toastify";
import {
  GET_MATCHES,
  REQUEST_COFFEE,
  MARK_AS_READ_MATCH
} from "./MatchQueries";
import { GET_COFFEES } from "../User/Coffees/CoffeesQueries";
import { RECOMMEND_USERS } from "../Feed/PeoplePage/PeoplePageQueries";
import { RouteComponentProps, withRouter } from "react-router";
import { RECOMMEND_LOCATIONS } from "../Feed/LocationsPage/LocationsPageQueries";
import { ME } from "src/sharedQueries";

class GetMatchesQuery extends Query<GetMatches, GetMatchesVariables> {}
class GetCoffeesQuery extends Query<GetCoffees, GetCoffeesVariables> {}
class RecommendUsersQuery extends Query<RecommendUsers> {}
class RecommendLocationsQuery extends Query<RecommendLocations> {}
class RequestCoffeeMutation extends Mutation<
  RequestCoffee,
  RequestCoffeeVariables
> {}
class MarkAsReadMatchMutation extends Mutation<
  MarkAsReadMatch,
  MarkAsReadMatchVariables
> {}
class MeQuery extends Query<Me> {}

interface IProps extends RouteComponentProps<any> {}
interface IState {
  search: string;
  matchList: any;
  currentLat: number;
  currentLng: number;
  currentCityId: string;
  requestModalOpen: boolean;
  countryModalOpen: boolean;
  genderModalOpen: boolean;
  countryCode: string;
  gender: string;
  target: string;
}

class MatchContainer extends React.Component<IProps, IState> {
  public requestCoffeeFn: MutationFn;
  public markAsReadMatchFn: MutationFn;
  public matchData;
  constructor(props) {
    super(props);
    const { location: { state = {} } = {} } = ({} = props);
    this.state = {
      search: "",
      matchList: [],
      currentLat: state.currentLat,
      currentLng: state.currentLng,
      currentCityId: state.currentCityId || localStorage.getItem("cityId"),
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
    if (prevProps.match.params !== newProps.match.params) {
      this.setState({ search: "" });
    }
  }
  public render = () => {
    const {
      search,
      matchList,
      currentCityId,
      currentLat,
      currentLng,
      requestModalOpen,
      countryModalOpen,
      genderModalOpen,
      target
    } = this.state;
    const isStaying = this.state.currentCityId === currentCityId;
    return (
      <MeQuery query={ME}>
        {({ data: me }) => {
          return (
            <MarkAsReadMatchMutation
              mutation={MARK_AS_READ_MATCH}
              update={this.updateMarkAsReadMatch}
            >
              {markAsReadMatchFn => {
                this.markAsReadMatchFn = markAsReadMatchFn;
                return (
                  <RecommendUsersQuery query={RECOMMEND_USERS}>
                    {({
                      data: recommendUsersData,
                      loading: recommendUsersLoading
                    }) => {
                      return (
                        <RecommendLocationsQuery query={RECOMMEND_LOCATIONS}>
                          {({
                            data: recommendLocationsData,
                            loading: recommendLocationsLoading
                          }) => {
                            return (
                              <GetCoffeesQuery
                                query={GET_COFFEES}
                                variables={{
                                  cityId: currentCityId,
                                  location: "city"
                                }}
                              >
                                {({
                                  data: coffeeData,
                                  loading: coffeeLoading
                                }) => {
                                  return (
                                    <RequestCoffeeMutation
                                      mutation={REQUEST_COFFEE}
                                      variables={{
                                        currentCityId
                                      }}
                                      onCompleted={
                                        this.onCompletedRequestCoffee
                                      }
                                      update={this.updateRequestCoffee}
                                    >
                                      {requestCoffeeFn => {
                                        this.requestCoffeeFn = requestCoffeeFn;
                                        return (
                                          <GetMatchesQuery query={GET_MATCHES}>
                                            {({
                                              data: matchData,
                                              loading: matchLoading
                                            }) => {
                                              this.matchData = matchData;
                                              return (
                                                <MatchPresenter
                                                  me={me}
                                                  matchData={matchData}
                                                  matchLoading={matchLoading}
                                                  recommendUsersData={
                                                    recommendUsersData
                                                  }
                                                  recommendUsersLoading={
                                                    recommendUsersLoading
                                                  }
                                                  recommendLocationsData={
                                                    recommendLocationsData
                                                  }
                                                  recommendLocationsLoading={
                                                    recommendLocationsLoading
                                                  }
                                                  coffeeData={coffeeData}
                                                  coffeeLoading={coffeeLoading}
                                                  search={search}
                                                  matchList={matchList}
                                                  currentLat={currentLat}
                                                  currentLng={currentLng}
                                                  currentCityId={currentCityId}
                                                  onChange={this.onChange}
                                                  requestModalOpen={
                                                    requestModalOpen
                                                  }
                                                  toggleRequestModal={
                                                    this.toggleRequestModal
                                                  }
                                                  submitCoffee={
                                                    this.submitCoffee
                                                  }
                                                  isStaying={isStaying}
                                                  searchSet={this.searchSet}
                                                  markAsReadMatchFn={
                                                    this.markAsReadMatchFn
                                                  }
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
                                          </GetMatchesQuery>
                                        );
                                      }}
                                    </RequestCoffeeMutation>
                                  );
                                }}
                              </GetCoffeesQuery>
                            );
                          }}
                        </RecommendLocationsQuery>
                      );
                    }}
                  </RecommendUsersQuery>
                );
              }}
            </MarkAsReadMatchMutation>
          );
        }}
      </MeQuery>
    );
  };
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
    this.setState({ search: "", matchList: [] });
  };
  public onChange: React.ChangeEventHandler<HTMLInputElement> = event => {
    const {
      target: { value }
    } = event;
    const {
      getMatches: { matches = null }
    } = this.matchData;
    const matchSearch = (list, text) =>
      list.filter(
        i =>
          i.host.profile.username.toLowerCase().includes(text.toLowerCase()) ||
          i.host.profile.currentCity.cityName
            .toLowerCase()
            .includes(text.toLowerCase()) ||
          i.host.profile.currentCity.country.countryName
            .toLowerCase()
            .includes(text.toLowerCase()) ||
          i.guest.profile.username.toLowerCase().includes(text.toLowerCase()) ||
          i.guest.profile.currentCity.cityName
            .toLowerCase()
            .includes(text.toLowerCase()) ||
          i.guest.profile.currentCity.country.countryName
            .toLowerCase()
            .includes(text.toLowerCase()) ||
          i.city.cityName.toLowerCase().includes(text.toLowerCase()) ||
          i.city.country.countryName.toLowerCase().includes(text.toLowerCase())
      );
    const matchList = matchSearch(matches, value);
    this.setState({
      search: value,
      matchList
    } as any);
  };
  public toggleRequestModal = () => {
    const { requestModalOpen } = this.state;
    this.setState({
      requestModalOpen: !requestModalOpen
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
  public updateMarkAsReadMatch = (cache, { data: { markAsReadMatch } }) => {
    try {
      const matchData = cache.readQuery({
        query: GET_MATCHES
      });
      if (matchData) {
        matchData.getMatches.matches.find(
          i => i.id === markAsReadMatch.matchId
        ).isReadByHost = markAsReadMatch.isReadByHost;
        matchData.getMatches.matches.find(
          i => i.id === markAsReadMatch.matchId
        ).isReadByGuest = markAsReadMatch.isReadByGuest;
        cache.writeQuery({
          query: GET_MATCHES,
          data: matchData
        });
      }
    } catch (e) {
      console.log(e);
    }
  };
}

export default withRouter(MatchContainer);
