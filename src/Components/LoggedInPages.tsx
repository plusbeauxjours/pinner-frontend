import React from "react";
import { Switch, Route } from "react-router-dom";
import styled from "styled-components";

import CityProfile from "../Routes/City/CityProfile";
import CountryProfile from "../Routes/Country/CountryProfile";
import ContinentProfile from "../Routes/Continent/ContinentProfile";
import TripProfile from "../Routes/TripProfile";
import CoffeeDetail from "../Routes/Detail/CoffeeDetail";
import Match from "../Routes/Match";

import UserProfile from "../Routes/User/UserProfile";
import EditProfile from "../Routes/User/EditProfile";
import EditEmailAddress from "../Routes/User/EditEmailAddress";
import ToggleSettings from "../Routes/User/ToggleSettings";
import UserAvatarDetail from "../Routes/User/UserAvatarDetail";
import Coffees from "../Routes/User/Coffees";
import Cities from "../Routes/User/Cities";
import Countries from "../Routes/User/Countries";
import Continents from "../Routes/User/Continents";

import PeoplePage from "../Routes/Feed/PeoplePage";
import LocationsPage from "../Routes/Feed/LocationsPage";
import CoffeesPage from "../Routes/Feed/CoffeesPage";

import CityUsersNow from "../Routes/City/CityUsersNow";
import CityUsersBefore from "../Routes/City/CityUsersBefore";
import NearCities from "../Routes/City/NearCities";

import CountriesPage from "../Routes/Continent/CountriesPage";
import ContinentUsersNow from "../Routes/Continent/ContinentUsersNow";
import ContinentUsersBefore from "../Routes/Continent/ContinentUsersBefore";

import CitiesPage from "../Routes/Country/CitiesPage";
import CountryUsersNow from "../Routes/Country/CountryUsersNow";
import CountryUsersBefore from "../Routes/Country/CountryUsersBefore";

import Header from "./Header";
import NotFound from "./NotFound";
import Verification from "../Routes/Login/Verification";
import NoValid from "./NoValid";

import { RouteComponentProps, withRouter } from "react-router-dom";

const Wrapper = styled.div`
  padding-top: 45px;
  min-height: 80vh;
  min-height: 50vh;
`;

interface IProps extends RouteComponentProps<any> {}

class LoggedInPages extends React.Component<IProps> {
  public previousLocation = this.props.location;

  public componentWillUpdate(nextProps) {
    const { location } = this.props;
    if (
      nextProps.history.action !== "POP" &&
      (!location.state ||
        !location.state.coffeeModalOpen ||
        !location.state.coffeesModalOpen ||
        !location.state.avatarModalOpen ||
        !location.state.cityModalOpen ||
        !location.state.countryModalOpen ||
        !location.state.continentModalOpen)
    ) {
      this.previousLocation = this.props.location;
    }
  }

  public render() {
    const { location } = this.props;
    const coffeeModalOpen = !!(
      location.state &&
      location.state.coffeeModalOpen &&
      this.previousLocation !== location
    );
    const coffeesModalOpen = !!(
      location.state &&
      location.state.coffeesModalOpen &&
      this.previousLocation !== location
    );
    const avatarModalOpen = !!(
      location.state &&
      location.state.avatarModalOpen &&
      this.previousLocation !== location
    );
    const cityModalOpen = !!(
      location.state &&
      location.state.cityModalOpen &&
      this.previousLocation !== location
    );
    const countryModalOpen = !!(
      location.state &&
      location.state.countryModalOpen &&
      this.previousLocation !== location
    );
    const continentModalOpen = !!(
      location.state &&
      location.state.continentModalOpen &&
      this.previousLocation !== location
    );
    return (
      <Wrapper>
        <Header />
        {coffeeModalOpen && (
          <Route
            onUpdate={window.scrollTo(0, 0)}
            path="/c/:uuid"
            exact={true}
            component={CoffeeDetail}
          />
        )}
        {coffeesModalOpen && (
          <Route
            onUpdate={window.scrollTo(0, 0)}
            path="/:username/coffees"
            exact={true}
            component={Coffees}
          />
        )}
        {cityModalOpen && (
          <Route
            onUpdate={window.scrollTo(0, 0)}
            path="/:username/cities"
            exact={true}
            component={Cities}
          />
        )}
        {countryModalOpen && (
          <Route
            onUpdate={window.scrollTo(0, 0)}
            path="/:username/countries"
            exact={true}
            component={Countries}
          />
        )}
        {continentModalOpen && (
          <Route
            onUpdate={window.scrollTo(0, 0)}
            path="/:username/continents"
            exact={true}
            component={Continents}
          />
        )}
        {avatarModalOpen && (
          <Route
            onUpdate={window.scrollTo(0, 0)}
            path="/:username/:uuid"
            exact={true}
            component={UserAvatarDetail}
          />
        )}
        <Switch
          location={
            coffeeModalOpen ||
            coffeesModalOpen ||
            avatarModalOpen ||
            cityModalOpen ||
            countryModalOpen ||
            continentModalOpen
              ? this.previousLocation
              : location
          }
        >
          <Route
            onUpdate={window.scrollTo(0, 0)}
            path="/"
            exact={true}
            component={Match}
          />
          <Route
            onUpdate={window.scrollTo(0, 0)}
            path="/people"
            exact={true}
            component={PeoplePage}
          />
          <Route
            onUpdate={window.scrollTo(0, 0)}
            path="/locations"
            exact={true}
            component={LocationsPage}
          />
          <Route
            onUpdate={window.scrollTo(0, 0)}
            path="/novalid"
            exact={true}
            component={NoValid}
          />

          {/* CONTINENT */}
          <Route
            onUpdate={window.scrollTo(0, 0)}
            path="/continent/:continentCode/countries"
            component={CountriesPage}
          />
          <Route
            onUpdate={window.scrollTo(0, 0)}
            path="/continent/:continentCode/coffees"
            component={CoffeesPage}
          />
          <Route
            onUpdate={window.scrollTo(0, 0)}
            path="/continent/:continentCode/usersNow"
            component={ContinentUsersNow}
          />
          <Route
            onUpdate={window.scrollTo(0, 0)}
            path="/continent/:continentCode/usersBefore"
            component={ContinentUsersBefore}
          />
          <Route
            onUpdate={window.scrollTo(0, 0)}
            path="/continent/:continentCode"
            component={ContinentProfile}
          />

          {/* COUNTRY */}
          <Route
            onUpdate={window.scrollTo(0, 0)}
            path="/country/:countryCode/cities"
            component={CitiesPage}
          />
          <Route
            onUpdate={window.scrollTo(0, 0)}
            path="/country/:countryCode/coffees"
            component={CoffeesPage}
          />
          <Route
            onUpdate={window.scrollTo(0, 0)}
            path="/country/:countryCode/usersNow"
            component={CountryUsersNow}
          />
          <Route
            onUpdate={window.scrollTo(0, 0)}
            path="/country/:countryCode/usersBefore"
            component={CountryUsersBefore}
          />
          <Route
            onUpdate={window.scrollTo(0, 0)}
            path="/country/:countryCode"
            component={CountryProfile}
          />

          {/* CITY */}
          <Route
            onUpdate={window.scrollTo(0, 0)}
            path="/city/:cityId/coffees"
            component={CoffeesPage}
          />
          <Route
            onUpdate={window.scrollTo(0, 0)}
            path="/city/:cityId/nearCities"
            component={NearCities}
          />
          <Route
            onUpdate={window.scrollTo(0, 0)}
            path="/city/:cityId/usersNow"
            component={CityUsersNow}
          />
          <Route
            onUpdate={window.scrollTo(0, 0)}
            path="/city/:cityId/usersBefore"
            component={CityUsersBefore}
          />
          <Route
            onUpdate={window.scrollTo(0, 0)}
            path="/city/:cityId/:duration"
            component={TripProfile}
          />
          <Route
            onUpdate={window.scrollTo(0, 0)}
            path="/city/:cityId"
            component={CityProfile}
          />
          <Route
            onUpdate={window.scrollTo(0, 0)}
            path="/confirm/:key"
            component={EditEmailAddress}
          />
          <Route
            onUpdate={window.scrollTo(0, 0)}
            path="/account/edit"
            component={EditProfile}
          />
          <Route
            onUpdate={window.scrollTo(0, 0)}
            path="/account/settings"
            component={ToggleSettings}
          />
          <Route
            onUpdate={window.scrollTo(0, 0)}
            path="/verification/:key"
            component={Verification}
          />

          {/* USER */}
          <Route
            onUpdate={window.scrollTo(0, 0)}
            path="/:username"
            exact={true}
            component={UserProfile}
          />
          <Route
            onUpdate={window.scrollTo(0, 0)}
            path="/:username"
            exact={true}
            component={UserProfile}
          />
          <Route onUpdate={window.scrollTo(0, 0)} component={NotFound} />
        </Switch>
      </Wrapper>
    );
  }
}

export default withRouter(LoggedInPages);
