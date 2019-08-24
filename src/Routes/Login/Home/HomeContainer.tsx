import React from "react";
import HomePresenter from "./HomePresenter";
import { reverseGeoCode } from "../../../mapHelpers";
import { countries } from "../../../countryData";
import { RouteComponentProps, withRouter } from "react-router";
import { Mutation, MutationFn } from "react-apollo";
import { ReportLocation, ReportLocationVariables } from "../../../types/api";
import { REPORT_LOCATION } from "./HomeQueries";

class ReportLocationMutation extends Mutation<
  ReportLocation,
  ReportLocationVariables
> {}

interface IProps extends RouteComponentProps<any> {}

interface IState {
  isLogIn: boolean;
  modalOpen: boolean;
  latitude: number;
  longitude: number;
  cityId: string;
  cityName: string;
  countryCode: string;
  countryPhone: string;
}

class HomeContainer extends React.Component<IProps, IState> {
  public ReportLocationFn: MutationFn;
  constructor(props) {
    super(props);
    navigator.geolocation.getCurrentPosition(
      this.handleGeoSuccess,
      this.handleGeoError
    );
    this.state = {
      isLogIn: true,
      modalOpen: false,
      latitude: 0,
      longitude: 0,
      cityId: "",
      cityName: "",
      countryCode: "",
      countryPhone: ""
    };
  }
  public componentDidMount() {
    navigator.geolocation.getCurrentPosition(
      this.handleGeoSuccess,
      this.handleGeoError
    );
  }
  public render() {
    const {
      isLogIn,
      modalOpen,
      latitude,
      longitude,
      cityId,
      cityName,
      countryCode,
      countryPhone
    } = this.state;
    return (
      <ReportLocationMutation mutation={REPORT_LOCATION}>
        {ReportLocationFn => {
          this.ReportLocationFn = ReportLocationFn;
          return (
            <HomePresenter
              isLogIn={isLogIn}
              modalOpen={modalOpen}
              latitude={latitude}
              longitude={longitude}
              cityId={cityId}
              cityName={cityName}
              countryCode={countryCode}
              countryPhone={countryPhone}
              changeMode={this.changeMode}
              toggleModal={this.toggleModal}
            />
          );
        }}
      </ReportLocationMutation>
    );
  }
  public handleGeoSuccess = (position: Position) => {
    const {
      coords: { latitude, longitude }
    } = position;
    this.getAddress(latitude, longitude);
  };
  public getAddress = async (latitude: number, longitude: number) => {
    const address = await reverseGeoCode(latitude, longitude);
    if (address) {
      localStorage.setItem("cityId", address.storableLocation.cityId);
      localStorage.setItem("countryCode", address.storableLocation.countryCode);
      this.setState({
        latitude,
        longitude,
        cityId: address.storableLocation.cityId,
        cityName: address.storableLocation.cityName,
        countryCode: address.storableLocation.countryCode,
        countryPhone: countries.find(
          i => i.code === address.storableLocation.countryCode
        ).phone
      });
      await this.reportLocation(
        latitude,
        longitude,
        address.storableLocation.cityId,
        address.storableLocation.cityName,
        address.storableLocation.countryCode
      );
    }
    return {
      countryCode: address.storableLocation.countryCode,
      countryPhone: countries.find(
        i => i.code === address.storableLocation.countryCode
      ).phone
    };
  };
  public reportLocation = async (
    latitude: number,
    longitude: number,
    currentCityId: string,
    currentCityName: string,
    currentCountryCode: string
  ) => {
    try {
      this.ReportLocationFn({
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
  public toggleModal = () => {
    const { modalOpen } = this.state;
    this.setState({
      modalOpen: !modalOpen
    });
  };
  public changeMode = () => {
    this.setState(state => {
      return {
        isLogIn: !state.isLogIn
      };
    });
  };
}

export default withRouter(HomeContainer);
