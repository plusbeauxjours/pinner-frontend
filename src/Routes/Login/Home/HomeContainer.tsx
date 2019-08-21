import React from "react";
import HomePresenter from "./HomePresenter";
import { reverseGeoCode } from "../../../mapHelpers";
import { countries } from "../../../countryData";
import { RouteComponentProps, withRouter } from "react-router";

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
  }
  public handleGeoSuccess = (position: Position) => {
    const {
      coords: { latitude, longitude }
    } = position;
    this.getAddress(latitude, longitude);
  };
  public getAddress = async (latitude: number, longitude: number) => {
    const address = await reverseGeoCode(latitude, longitude);
    localStorage.setItem("cityId", address.storableLocation.cityId);
    localStorage.setItem("countryCode", address.storableLocation.countryCode);
    if (address) {
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
    }
    return {
      countryCode: address.storableLocation.countryCode,
      countryPhone: countries.find(
        i => i.code === address.storableLocation.countryCode
      ).phone
    };
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
