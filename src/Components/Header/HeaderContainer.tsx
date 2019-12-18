import React from "react";
import { withRouter, RouteComponentProps } from "react-router-dom";
import HeaderPresenter from "./HeaderPresenter";
import { reverseGeoCode, reversePlaceId } from "../../mapHelpers";
import {
  Me,
  Header,
  HeaderVariables,
  ReportLocation,
  ReportLocationVariables,
  SearchTerms,
  SearchTermsVariables
} from "../../types/api";
import { Mutation, MutationFn, Query } from "react-apollo";
import { REPORT_LOCATION } from "../../Routes/Login/Home/HomeQueries";
import { GET_HEADER, SEARCH } from "./HeaderQueries";
import { ME } from "../../sharedQueries";
import { toast } from "react-toastify";

class HeaderQuery extends Query<Header, HeaderVariables> {}
class ReportLocationMutation extends Mutation<
  ReportLocation,
  ReportLocationVariables
> {}
class SearchQuery extends Query<SearchTerms, SearchTermsVariables> {}
class MeQuery extends Query<Me> {}

interface IProps extends RouteComponentProps<any> {}

interface IState {
  currentLat: number;
  currentLng: number;
  currentCityId: string;
  currentCityName: string;
  currentCountryCode: string;
  modalOpen: boolean;
  search: string;
}

class HeaderContainer extends React.Component<IProps, IState> {
  public reportLocationFn: MutationFn;
  public searchData;
  constructor(props) {
    super(props);
    navigator.geolocation.getCurrentPosition(
      this.handleGeoSuccess,
      this.handleGeoError
    );
    this.state = {
      currentLat: 0,
      currentLng: 0,
      currentCityId: localStorage.getItem("cityId"),
      currentCityName: null,
      currentCountryCode: localStorage.getItem("countryCode"),
      modalOpen: false,
      search: ""
    };
  }
  public componentDidMount() {
    if (!localStorage.getItem("cityId")) {
      navigator.geolocation.getCurrentPosition(
        this.handleGeoSuccess,
        this.handleGeoError
      );
    }
  }
  public componentWillUpdate(nextProps) {
    const { location } = this.props;
    if (location !== nextProps.location) {
      this.setState({
        modalOpen: false
      });
    }
  }
  public render() {
    const {
      currentLat,
      currentLng,
      currentCityId,
      currentCityName,
      currentCountryCode,
      modalOpen,
      search
    } = this.state;
    return (
      <MeQuery query={ME}>
        {({ data: me }) => {
          return (
            <ReportLocationMutation mutation={REPORT_LOCATION}>
              {reportLocationFn => {
                this.reportLocationFn = reportLocationFn;
                return (
                  <HeaderQuery
                    query={GET_HEADER}
                    variables={{
                      cityId: currentCityId || localStorage.getItem("cityId")
                    }}
                  >
                    {({ data, loading }) => {
                      return (
                        <SearchQuery
                          query={SEARCH}
                          variables={{ search }}
                          skip={search.length === 0}
                        >
                          {({ data: searchData, loading: searchLoading }) => {
                            this.searchData = searchData;
                            return (
                              <HeaderPresenter
                                me={me}
                                data={data}
                                loading={loading}
                                searchData={searchData}
                                searchLoading={searchLoading}
                                currentLat={currentLat}
                                currentLng={currentLng}
                                currentCityId={currentCityId}
                                currentCityName={currentCityName}
                                currentCountryCode={currentCountryCode}
                                modalOpen={modalOpen}
                                search={search}
                                toggleModal={this.toggleModal}
                                onChange={this.onChange}
                                warningToast={this.warningToast}
                              />
                            );
                          }}
                        </SearchQuery>
                      );
                    }}
                  </HeaderQuery>
                );
              }}
            </ReportLocationMutation>
          );
        }}
      </MeQuery>
    );
  }
  public toggleModal = () => {
    const { modalOpen } = this.state;
    this.setState({
      modalOpen: !modalOpen,
      search: ""
    } as any);
  };
  public handleGeoSuccess = (position: Position) => {
    const {
      coords: { latitude, longitude }
    } = position;
    this.setState({
      currentLat: latitude,
      currentLng: longitude
    });
    this.getAddress(latitude, longitude);
  };
  public getAddress = async (latitude: number, longitude: number) => {
    const address = await reverseGeoCode(latitude, longitude);
    if (address) {
      this.setState({
        currentCityId: address.storableLocation.cityId,
        currentCityName: address.storableLocation.cityName,
        currentCountryCode: address.storableLocation.countryCode
      });
      localStorage.setItem("cityId", address.storableLocation.cityId);
      localStorage.setItem("countryCode", address.storableLocation.countryCode);
      const cityInfo = await reversePlaceId(address.storableLocation.cityId);
      await this.reportLocation(
        cityInfo.storableLocation.latitude,
        cityInfo.storableLocation.longitude,
        address.storableLocation.cityId,
        address.storableLocation.cityName,
        address.storableLocation.countryCode
      );
    }
  };
  public reportLocation = async (
    latitude: number,
    longitude: number,
    currentCityId: string,
    currentCityName: string,
    currentCountryCode: string
  ) => {
    try {
      this.reportLocationFn({
        variables: {
          currentLat: latitude,
          currentLng: longitude,
          currentCityId,
          currentCityName,
          currentCountryCode
        }
      });
    } catch (e) {
      console.log(e);
    }
  };
  public handleGeoError = () => {
    console.log("No location");
  };
  public onChange: React.ChangeEventHandler<HTMLInputElement> = event => {
    const {
      target: { value }
    } = event;
    this.setState({
      search: value
    } as any);
  };
  public warningToast = event => {
    const { keyCode } = event;
    if (keyCode === 13) {
      toast.info(`If you want to sbmit please click empty space 🤡`);
    }
  };
}

export default withRouter(HeaderContainer);
