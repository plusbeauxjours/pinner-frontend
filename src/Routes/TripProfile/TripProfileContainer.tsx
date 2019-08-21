import React from "react";
import moment from "moment";
import { Query, Mutation, MutationFn } from "react-apollo";
import {
  TripProfile,
  TripProfileVariables,
  NearCities,
  NearCitiesVariables,
  GetSamenameCities,
  GetSamenameCitiesVariables,
  SlackReportLocations,
  SlackReportLocationsVariables
} from "../../types/api";
import { RouteComponentProps, withRouter } from "react-router";
import { TRIP_PROFILE } from "./TripProfileQueries";
import TripProfilePresenter from "./TripProfilePresenter";
import { NEAR_CITIES } from "../City/NearCities/NearCitiesQueries";
import { GET_SAMENAME_CITIES } from "../City/CityProfile/CityProfileQueries";
import { SLACK_REPORT_LOCATIONS } from "../../sharedQueries";
import { toast } from "react-toastify";

class TripProfileQuery extends Query<TripProfile, TripProfileVariables> {}
class GetSamenameCitiesQuery extends Query<
  GetSamenameCities,
  GetSamenameCitiesVariables
> {}
class NearCitiesQuery extends Query<NearCities, NearCitiesVariables> {}
class SlackReportLocationsMutation extends Mutation<
  SlackReportLocations,
  SlackReportLocationsVariables
> {}

interface IProps extends RouteComponentProps<any> {}

interface IState {
  search: string;
  cityName: string;
  cityId: string;
  cityPhoto: string;
  countryName: string;
  startDate: moment.Moment | null;
  endDate: moment.Moment | null;
  usersBeforeList: any;
  reportModalOpen: boolean;
  mapMopdalOpen: boolean;
}

class TripProfileContainer extends React.Component<IProps, IState> {
  public data;
  public fetchMore;
  public slackReportLocationsFn: MutationFn;
  constructor(props) {
    super(props);
    const { location: { state = {} } = {} } = ({} = props);
    if (!props.location.state) {
      props.history.goBack();
    }
    this.state = {
      search: "",
      cityName: state.cityName,
      cityId: state.cityId,
      cityPhoto: state.cityPhoto,
      countryName: state.countryName,
      startDate: state.tripStartDate,
      endDate: state.tripEndDate,
      usersBeforeList: [],
      reportModalOpen: false,
      mapMopdalOpen: false
    };
  }
  public componentDidUpdate(prevProps) {
    const newProps = this.props;
    if (prevProps.match.params.cityName !== newProps.match.params.cityName) {
      this.setState({ search: "", usersBeforeList: [] });
    }
  }
  public render() {
    const {
      search,
      cityName,
      cityPhoto,
      countryName,
      startDate,
      endDate,
      usersBeforeList,
      reportModalOpen,
      mapMopdalOpen
    } = this.state;
    const {
      match: {
        params: { cityId }
      }
    } = this.props;
    return (
      <SlackReportLocationsMutation
        mutation={SLACK_REPORT_LOCATIONS}
        onCompleted={this.onCompltedSlackReportLocations}
      >
        {slackReportLocationsFn => {
          this.slackReportLocationsFn = slackReportLocationsFn;
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
                  <NearCitiesQuery query={NEAR_CITIES} variables={{ cityId }} fetchPolicy="no-cache">
                    {({ data: nearCitiesData, loading: nearCitiesLoading }) => {
                      return (
                        <TripProfileQuery
                          query={TRIP_PROFILE}
                          variables={{ cityId, startDate, endDate }}
                        >
                          {({ data: profileDate, loading: profileLoading }) => {
                            this.data = profileDate;
                            return (
                              <TripProfilePresenter
                                cityName={cityName}
                                cityPhoto={cityPhoto}
                                countryName={countryName}
                                startDate={startDate}
                                endDate={endDate}
                                profileDate={profileDate}
                                profileLoading={profileLoading}
                                nearCitiesData={nearCitiesData}
                                nearCitiesLoading={nearCitiesLoading}
                                samenameCitiesData={samenameCitiesData}
                                samenameCitiesLoading={samenameCitiesLoading}
                                search={search}
                                usersBeforeList={usersBeforeList}
                                onChange={this.onChange}
                                cityId={cityId}
                                reportModalOpen={reportModalOpen}
                                mapMopdalOpen={mapMopdalOpen}
                                toggleMapMopdal={this.toggleMapMopdal}
                                toggleReportModal={this.toggleReportModal}
                                slackReportLocations={this.slackReportLocations}
                              />
                            );
                          }}
                        </TripProfileQuery>
                      );
                    }}
                  </NearCitiesQuery>
                );
              }}
            </GetSamenameCitiesQuery>
          );
        }}
      </SlackReportLocationsMutation>
    );
  }
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
  public toggleMapMopdal = () => {
    const { mapMopdalOpen } = this.state;
    this.setState({ mapMopdalOpen: !mapMopdalOpen });
  };
  public toggleReportModal = () => {
    const { reportModalOpen } = this.state;
    this.setState({ reportModalOpen: !reportModalOpen });
  };
  public onChange: React.ChangeEventHandler<HTMLInputElement> = event => {
    const {
      target: { value }
    } = event;
    const {
      tripProfile: { usersBefore = null }
    } = this.data;
    const beforeSearch = (list, text) =>
      list.filter(i =>
        i.actor.profile.username.toLowerCase().includes(text.toLowerCase())
      );
    const usersBeforeList = beforeSearch(usersBefore, value);
    this.setState({
      search: value,
      usersBeforeList
    } as any);
  };
}

export default withRouter(TripProfileContainer);
