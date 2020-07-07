import React from "react";
import { Query, MutationFn, Mutation } from "react-apollo";
import CityProfilePresenter from "./CityProfilePresenter";
import {
  CityProfile,
  CityProfileVariables,
  NearCities,
  NearCitiesVariables,
  GetSamenameCities,
  GetSamenameCitiesVariables,
  SlackReportLocations,
  SlackReportLocationsVariables,
} from "../../../types/api";
import { RouteComponentProps, withRouter } from "react-router";
import { CITY_PROFILE, GET_SAMENAME_CITIES } from "./CityProfileQueries";
import { NEAR_CITIES } from "../NearCities/NearCitiesQueries";
import { toast } from "react-toastify";
import { SLACK_REPORT_LOCATIONS, ME } from "../../../sharedQueries";
import { Me } from "../../../types/api";

class CityProfileQuery extends Query<CityProfile, CityProfileVariables> {}
class GetSamenameCitiesQuery extends Query<
  GetSamenameCities,
  GetSamenameCitiesVariables
> {}
class NearCitiesQuery extends Query<NearCities, NearCitiesVariables> {}

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
  countryCode: string;
  gender: string;
  target: string;
}

class CityProfileContainer extends React.Component<IProps, IState> {
  public data;
  public slackReportLocationsFn: MutationFn;
  constructor(props) {
    super(props);
    this.state = {
      reportModalOpen: false,
      mapMopdalOpen: false,
      search: "",
      usersNowList: [],
      currentCityId: localStorage.getItem("cityId"),
      countryCode: "",
      gender: "",
      target: "",
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
        params: { cityId },
      },
    } = this.props;
    const isStaying = this.state.currentCityId === cityId;
    const {
      reportModalOpen,
      mapMopdalOpen,
      search,
      usersNowList,
      target,
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
                loading: samenameCitiesLoading,
              }) => {
                return (
                  <SlackReportLocationsMutation
                    mutation={SLACK_REPORT_LOCATIONS}
                    onCompleted={this.onCompltedSlackReportLocations}
                  >
                    {(slackReportLocationsFn) => {
                      this.slackReportLocationsFn = slackReportLocationsFn;
                      return (
                        <NearCitiesQuery
                          query={NEAR_CITIES}
                          variables={{ cityId }}
                          fetchPolicy="no-cache"
                        >
                          {({
                            data: nearCitiesData,
                            loading: nearCitiesLoading,
                          }) => {
                            return (
                              <CityProfileQuery
                                query={CITY_PROFILE}
                                variables={{ cityId }}
                              >
                                {({ data: cityData, loading: cityLoading }) => {
                                  this.data = cityData;
                                  return (
                                    <CityProfilePresenter
                                      me={me}
                                      reportModalOpen={reportModalOpen}
                                      toggleReportModal={this.toggleReportModal}
                                      mapMopdalOpen={mapMopdalOpen}
                                      toggleMapMopdal={this.toggleMapMopdal}
                                      slackReportLocations={
                                        this.slackReportLocations
                                      }
                                      samenameCitiesData={samenameCitiesData}
                                      samenameCitiesLoading={
                                        samenameCitiesLoading
                                      }
                                      cityData={cityData}
                                      cityLoading={cityLoading}
                                      nearCitiesData={nearCitiesData}
                                      nearCitiesLoading={nearCitiesLoading}
                                      cityId={cityId}
                                      isStaying={isStaying}
                                      onChange={this.onChange}
                                      search={search}
                                      usersNowList={usersNowList}
                                      searchSet={this.searchSet}
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
                  </SlackReportLocationsMutation>
                );
              }}
            </GetSamenameCitiesQuery>
          );
        }}
      </MeQuery>
    );
  }

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
  public onCompltedSlackReportLocations = (data) => {
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
        payload,
      },
    });
  };
  public onChange: React.ChangeEventHandler<HTMLInputElement> = (event) => {
    const {
      target: { value },
    } = event;
    const {
      cityProfile: { usersNow = null },
    } = this.data;
    const nowSearch = (list, text) =>
      list.filter((i) => i.username.toLowerCase().includes(text.toLowerCase()));
    const usersNowList = nowSearch(usersNow, value);
    this.setState({
      search: value,
      usersNowList,
    } as any);
  };
}

export default withRouter(CityProfileContainer);
