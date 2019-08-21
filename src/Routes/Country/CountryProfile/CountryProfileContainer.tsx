import React from "react";
import { Query, MutationFn, Mutation } from "react-apollo";
import CountryProfilePresenter from "./CountryProfilePresenter";
import {
  CountryProfile,
  CountryProfileVariables,
  GetCoffees,
  GetCoffeesVariables
} from "../../../types/api";
import { RouteComponentProps, withRouter } from "react-router";
import { COUNTRY_PROFILE, GET_COUNTRIES } from "./CountryProfileQueries";
import { GET_COFFEES } from "../../User/Coffees/CoffeesQueries";
import { toast } from "react-toastify";
import { SLACK_REPORT_LOCATIONS } from "../../../sharedQueries";
import {
  GetCountries,
  GetCountriesVariables,
  SlackReportLocations,
  SlackReportLocationsVariables
} from "../../../types/api";

class GetCoffeesQuery extends Query<GetCoffees, GetCoffeesVariables> {}
class CountryProfileQuery extends Query<
  CountryProfile,
  CountryProfileVariables
> {}
class GetCountriesQuery extends Query<GetCountries, GetCountriesVariables> {}
class SlackReportLocationsMutation extends Mutation<
  SlackReportLocations,
  SlackReportLocationsVariables
> {}

interface IProps extends RouteComponentProps<any> {}

interface IState {
  search: string;
  cityList: any;
  countryName: string;
  currentCityId: string;
  reportModalOpen: boolean;
  mapMopdalOpen: boolean;
}

class CountryProfileContainer extends React.Component<IProps, IState> {
  public data;
  public coffeeData;
  public countriesData;
  public slackReportLocationsFn: MutationFn;
  constructor(props) {
    super(props);
    const { location: { state = {} } = {} } = ({} = props);
    this.state = {
      search: "",
      cityList: [],
      countryName: state.countryName,
      currentCityId: localStorage.getItem("cityId"),
      reportModalOpen: false,
      mapMopdalOpen: false
    };
  }
  public componentDidUpdate(prevProps) {
    const newProps = this.props;
    if (
      prevProps.match.params.countryCode !== newProps.match.params.countryCode
    ) {
      this.setState({ search: "", cityList: [] });
    }
  }
  public render() {
    const {
      match: {
        params: { countryCode }
      }
    } = this.props;
    const {
      search,
      cityList,
      countryName,
      currentCityId,
      reportModalOpen,
      mapMopdalOpen
    } = this.state;
    return (
      <SlackReportLocationsMutation
        mutation={SLACK_REPORT_LOCATIONS}
        onCompleted={this.onCompltedSlackReportLocations}
      >
        {slackReportLocationsFn => {
          this.slackReportLocationsFn = slackReportLocationsFn;
          return (
            <GetCountriesQuery
              query={GET_COUNTRIES}
              variables={{
                countryCode
              }}
            >
              {({ data: countriesData, loading: countriesLoading }) => {
                this.countriesData = countriesData;
                return (
                  <GetCoffeesQuery
                    query={GET_COFFEES}
                    variables={{
                      countryCode,
                      location: "country"
                    }}
                  >
                    {({ data: coffeeData, loading: coffeeLoading }) => {
                      this.coffeeData = coffeeData;
                      return (
                        <CountryProfileQuery
                          query={COUNTRY_PROFILE}
                          variables={{ countryCode }}
                        >
                          {({ data, loading }) => {
                            this.data = data;
                            return (
                              <CountryProfilePresenter
                                reportModalOpen={reportModalOpen}
                                toggleReportModal={this.toggleReportModal}
                                slackReportLocations={this.slackReportLocations}
                                loading={loading}
                                data={data}
                                countriesData={countriesData}
                                countriesLoading={countriesLoading}
                                coffeeData={coffeeData}
                                coffeeLoading={coffeeLoading}
                                countryName={countryName}
                                onChange={this.onChange}
                                search={search}
                                cityList={cityList}
                                countryCode={countryCode}
                                currentCityId={currentCityId}
                                back={this.back}
                                searchSet={this.searchSet}
                                mapMopdalOpen={mapMopdalOpen}
                                toggleMapMopdal={this.toggleMapMopdal}
                              />
                            );
                          }}
                        </CountryProfileQuery>
                      );
                    }}
                  </GetCoffeesQuery>
                );
              }}
            </GetCountriesQuery>
          );
        }}
      </SlackReportLocationsMutation>
    );
  }
  public toggleMapMopdal = () => {
    const { mapMopdalOpen } = this.state;
    this.setState({ mapMopdalOpen: !mapMopdalOpen });
  };
  public searchSet = () => {
    this.setState({ search: "" });
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
        targetLocationType: "country",
        payload
      }
    });
  };
  public back = async event => {
    event.stopPropagation();
    this.props.history.goBack();
  };
  public onChange: React.ChangeEventHandler<HTMLInputElement> = event => {
    const {
      target: { value }
    } = event;
    const {
      countryProfile: { cities = null }
    } = this.data;
    const search = (list, text) =>
      list.filter(i => i.cityName.toLowerCase().includes(text.toLowerCase()));
    const cityList = search(cities, value);
    this.setState({
      search: value,
      cityList
    } as any);
  };
}

export default withRouter(CountryProfileContainer);
