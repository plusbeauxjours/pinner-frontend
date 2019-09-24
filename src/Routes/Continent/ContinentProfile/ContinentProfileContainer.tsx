import React from "react";
import { Query, Mutation, MutationFn } from "react-apollo";
import ContinentProfilePresenter from "./ContinentProfilePresenter";
import {
  ContinentProfile,
  ContinentProfileVariables
} from "../../../types/api";
import { RouteComponentProps, withRouter } from "react-router";
import { CONTINENT_PROFILE } from "./ContinentProfileQueries";
import { SLACK_REPORT_LOCATIONS } from "../../../sharedQueries";
import {
  SlackReportLocations,
  SlackReportLocationsVariables
} from "../../../types/api";
import { toast } from "react-toastify";

class ContinentProfileQuery extends Query<
  ContinentProfile,
  ContinentProfileVariables
> {}
class SlackReportLocationsMutation extends Mutation<
  SlackReportLocations,
  SlackReportLocationsVariables
> {}

interface IProps extends RouteComponentProps<any> {}

interface IState {
  search: string;
  countryList: any;
  currentCityId: string;
  reportModalOpen: boolean;
}
class ContinentProfileContainer extends React.Component<IProps, IState> {
  public data;
  public slackReportLocationsFn: MutationFn;
  constructor(props) {
    super(props);
    this.state = {
      search: "",
      countryList: [],
      currentCityId: localStorage.getItem("cityId"),
      reportModalOpen: false
    };
  }
  public componentDidUpdate(prevProps) {
    const newProps = this.props;
    if (
      prevProps.match.params.continentCode !==
      newProps.match.params.continentCode
    ) {
      this.setState({ search: "", countryList: [] });
    }
  }
  public render() {
    const {
      match: {
        params: { continentCode }
      }
    } = this.props;
    const { search, countryList, currentCityId, reportModalOpen } = this.state;
    return (
      <SlackReportLocationsMutation
        mutation={SLACK_REPORT_LOCATIONS}
        onCompleted={this.onCompltedSlackReportLocations}
      >
        {slackReportLocationsFn => {
          this.slackReportLocationsFn = slackReportLocationsFn;
          return (
            <ContinentProfileQuery
              query={CONTINENT_PROFILE}
              variables={{ continentCode }}
            >
              {({ data, loading }) => {
                this.data = data;
                return (
                  <ContinentProfilePresenter
                    reportModalOpen={reportModalOpen}
                    toggleReportModal={this.toggleReportModal}
                    slackReportLocations={this.slackReportLocations}
                    data={data}
                    loading={loading}
                    continentCode={continentCode}
                    onChange={this.onChange}
                    search={search}
                    countryList={countryList}
                    currentCityId={currentCityId}
                    searchSet={this.searchSet}
                  />
                );
              }}
            </ContinentProfileQuery>
          );
        }}
      </SlackReportLocationsMutation>
    );
  }
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
        targetLocationType: "continent",
        payload
      }
    });
  };
  public onChange: React.ChangeEventHandler<HTMLInputElement> = event => {
    const {
      target: { value }
    } = event;
    const {
      continentProfile: { countries = null }
    } = this.data;
    const search = (list, text) =>
      list.filter(i =>
        i.countryName.toLowerCase().includes(text.toLowerCase())
      );
    const countryList = search(countries, value);
    this.setState({
      search: value,
      countryList
    } as any);
  };
}

export default withRouter(ContinentProfileContainer);
