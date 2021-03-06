import React from "react";
import { Link } from "react-router-dom";
import styled from "../../../Styles/typed-components";

import Wrapper from "../../../Components/Wrapper";
import Loader from "../../../Components/Loader";
import Avatar from "../../../Components/Avatar";
import Bold from "../../../Components/Bold";
import { keyframes } from "styled-components";
import Weather from "src/Components/Weather";
import UserHeader from "../../../Components/UserHeader";
import CityLikeBtn from "../../../Components/CityLikeBtn";
import UserBox from "src/Components/UserBox";
import LocationBox from "src/Components/LocationBox";
import { List, DropDown } from "../../../Icons";
import LocationMap from "src/Components/LocationMap";
import Helmet from "react-helmet";

const SWrapper = styled(Wrapper)`
  z-index: 1;
`;

const PHeader = styled.header`
  display: flex;
  padding: 40px 15px 40px 15px;
  @media screen and (max-width: 700px) {
    justify-content: center;
    flex-wrap: wrap;
  }
`;

const ModalAnimation = keyframes`
	  from{
	    opacity:0;
	    transform:scale(1.1);
	  }
	  to{
	    opacity:1;
	    transform:none;
	  }
	`;

const ModalContainer = styled.div`
  z-index: 8;
  display: flex;
  justify-content: center;
  align-items: center;
  position: fixed;
  height: 100%;
  width: 100%;
  top: 0;
`;

const GreyLine = styled.div`
  margin-top: 10px;
  margin-bottom: 10px;
  border-bottom: 1px solid ${(props) => props.theme.borderColor};
  @media screen and (max-width: 935px) {
    margin: 10px 15px 0 15px;
  }
`;

const ModalOverlay = styled.div`
  z-index: 5;
  height: 100%;
  width: 100%;
  position: fixed;
  top: 0;
  background-color: ${(props) => props.theme.modalOverlayColor};
`;

const ModalLink = styled.div`
  text-align: center;
  min-height: 50px;
  width: 100%;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  :not(:last-child) {
    border-bottom: 1px solid ${(props) => props.theme.borderColor};
  }
`;

const Modal = styled.div`
  background-color: ${(props) => props.theme.modalBgColor};
  border: 1px solid ${(props) => props.theme.borderColor};
  margin: 0 15px 0 15px;
  width: 340px;
  border-radius: 12px;
  z-index: 10;
  animation: ${ModalAnimation} 0.1s linear;
`;

const CAvatar = styled(Avatar)`
  border-radius: 3px;
  height: 300px;
  width: 300px;
  margin-right: 20px;
  @media screen and (max-width: 700px) {
    margin-right: 0px;
  }
`;

const UserContainer = styled.div`
  display: flex;
  width: 100%;
  flex-direction: column;
  @media screen and (max-width: 800px) {
    min-width: 300px;
  }
`;

const UserRow = styled.div`
  display: grid;
  flex-direction: row;
  grid-template-columns: 1fr;
  padding: 0 5px 0 5px;
  grid-gap: 15px;
  align-items: center;
  cursor: pointer;
  transition: background-color 0.2s ease-in-out;
  &:hover {
    background-color: ${(props) => props.theme.hoverColor};
  }
  &:not(:last-child) {
    border-bottom: 1px solid ${(props) => props.theme.borderColor};
  }
`;

const UserNameRow = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 10px;
`;

const AvatarContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
`;

const Input = styled.input`
  width: 215px;
  border: 0;
  border-bottom: 1px solid ${(props) => props.theme.borderColor};
  padding: 5px;
  color: ${(props) => props.theme.color};
  font-size: 12px;
  font-weight: 100;
  &:focus {
    outline: none;
    &::-webkit-input-placeholder {
      color: transparent;
    }
  }
  &::placeholder {
    color: ${(props) => props.theme.greyColor};
    text-align: right;
  }
`;

const Header = styled.div`
  display: flex;
  align-items: center;
  cursor: pointer;
  height: 50px;
  padding-left: 5px;
`;

const HeaderText = styled(Bold)`
  display: flex;
`;

const HeaderColumn = styled.div`
  margin-left: 15px;
`;

const SAvatar = styled(Avatar)`
  border-radius: 3px;
  height: 45px;
  width: 45px;
`;

const LocationName = styled.span`
  font-size: 30px;
  font-weight: 300;
  margin: 5px 10px 5px 0;
  text-transform: uppercase;
`;

const SText = styled(Bold)`
  font-size: 18px;
  font-weight: 100;
  text-transform: uppercase;
`;

const NameContainer = styled.span`
  width: 100%;
  margin: 0px auto;
  padding: 30px 15px 0 15px;
  max-width: 935px;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
`;

const ListIcon = styled.span`
  display: flex;
  flex-direction: row;
  cursor: pointer;
  svg {
    fill: ${(props) => props.theme.iconColor};
    transition: fill 0.2s ease-in-out;
    &:hover {
      fill: ${(props) => props.theme.hoverColor};
    }
  }
`;

const DropDownIcon = styled.span`
  display: flex;
  flex-direction: row;
  justify-content: center;
  margin-top: 15px;
  cursor: pointer;
  svg {
    fill: ${(props) => props.theme.iconColor};
    transition: fill 0.2s ease-in-out;
    &:hover {
      fill: ${(props) => props.theme.hoverColor};
    }
  }
`;
const Location = styled.span`
  display: flex;
  margin-top: 5px;
  display: block;
  font-size: 12px;
  font-weight: 200;
`;

const CountText = styled(Location)`
  padding-left: 15px;
  margin-top: 0;
  font-weight: 100;
`;

const Earth = styled.img`
  display: flex;
  width: 200px;
  height: 80px;
  background-position: center center;
  object-fit: cover;
  align-self: center;
  @media screen and (max-width: 700px) {
    align-self: center;
    margin-top: 30px;
    margin-bottom: 30px;
  }
`;

const EmptyContainer = styled.div`
  font-weight: 100;
  font-size: 12px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100%;
`;

const LikeBtnAlign = styled.div`
  display: flex;
  padding-left: 5px;
`;

const LocationHeader = styled(Header)`
  margin-top: 5px;
  padding-left: 10px;
  margin-bottom: 30px;
`;

const LocationMapContainer = styled.div`
  display: flex;
  position: absolute;
  border-radius: 3px;
  opacity: 0;
  height: 300px;
  width: 300px;
  &:hover {
    opacity: 1;
  }
  transition: opacity 0.3s ease-in-out;
  @media screen and (max-width: 700px) {
    margin-right: 0px;
  }
`;

const MapModal = styled(Modal)`
  border: 1px solid ${(props) => props.theme.borderColor};
  border-radius: 3px;
  display: flex;
  height: 701px;
  width: 701px;
  margin: 0;
  @media screen and (max-width: 700px) {
    width: 100%;
    display: flex;
  }
`;

const Square = styled.div`
  display: flex;
`;

interface IProps {
  me: any;
  cityData?: any;
  cityLoading: boolean;
  nearCitiesData?: any;
  nearCitiesLoading: boolean;
  samenameCitiesData: any;
  samenameCitiesLoading: boolean;
  isStaying: boolean;
  cityId: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  search: string;
  usersNowList: any;
  reportModalOpen: boolean;
  toggleReportModal: () => void;
  mapMopdalOpen: boolean;
  toggleMapMopdal: () => void;
  slackReportLocations: (targetLocationId: string, payload: string) => void;
  searchSet: () => void;
  target: string;
}

const CityProfilePresenter: React.FunctionComponent<IProps> = ({
  me: { me: { user: me = null } = {} } = {},
  cityData: {
    cityProfile: {
      hasNextPage = null,
      count = null,
      usersNow = null,
      usersBefore = null,
      city = null,
    } = {},
  } = {},
  cityLoading,
  nearCitiesData: { nearCities: { cities: nearCities = null } = {} } = {},
  nearCitiesLoading,
  samenameCitiesData: {
    getSamenameCities: { cities: samenameCities = null } = {},
  } = {},
  samenameCitiesLoading,
  toggleMapMopdal,
  isStaying,
  cityId,
  search,
  onChange,
  usersNowList,
  reportModalOpen,
  mapMopdalOpen,
  toggleReportModal,
  slackReportLocations,
  searchSet,
  target,
}) => {
  if (cityLoading) {
    return <Loader />;
  } else if (!cityLoading && city) {
    return (
      <>
        {mapMopdalOpen && (
          <ModalContainer>
            <ModalOverlay onClick={toggleMapMopdal} />
            <MapModal>
              <LocationMap
                latitude={city.latitude}
                longitude={city.longitude}
                modal={true}
              />
            </MapModal>
          </ModalContainer>
        )}
        {reportModalOpen && (
          <ModalContainer>
            <ModalOverlay onClick={toggleReportModal} />
            <Modal>
              <ModalLink
                onClick={() => slackReportLocations(city.cityId, "PHOTO")}
              >
                INAPPROPRIATE PHOTOS
              </ModalLink>
              <ModalLink
                onClick={() => slackReportLocations(city.cityId, "LOCATION")}
              >
                WRONG LOCATION
              </ModalLink>

              <ModalLink
                onClick={() => slackReportLocations(city.cityId, "OTHER")}
              >
                OTHER
              </ModalLink>
              <ModalLink onClick={toggleReportModal}>CANCEL</ModalLink>
            </Modal>
          </ModalContainer>
        )}
        <SWrapper>
          <PHeader>
            <Helmet>
              <title>City | Pinner</title>
            </Helmet>
            <AvatarContainer>
              <Square>
                <CAvatar size="lg" url={city.cityPhoto} city={true} />
                <LocationMapContainer onClick={toggleMapMopdal}>
                  <LocationMap
                    latitude={city.latitude}
                    longitude={city.longitude}
                    modal={false}
                  />
                </LocationMapContainer>
              </Square>
              <NameContainer>
                <LocationName>{city.cityName}</LocationName>{" "}
                <ListIcon onClick={toggleReportModal}>
                  <List />
                </ListIcon>
              </NameContainer>
              {count !== 0 ? (
                <CountText>
                  You've been to {city.cityName} {count}
                  {count === 1 ? " time" : " times"}
                </CountText>
              ) : null}
              <CountText>
                <Weather
                  latitude={city.latitude}
                  longitude={city.longitude}
                  size={"md"}
                  type={"profile"}
                />
                <LikeBtnAlign>
                  <CityLikeBtn
                    isLiked={city.isLiked}
                    cityId={city.cityId}
                    likeCount={city.likeCount}
                    type={"row"}
                  />
                </LikeBtnAlign>
              </CountText>
              <LocationHeader>
                <Link
                  to={{
                    pathname: `/country/${city.country.countryCode}`,
                    state: { countryName: city.country.countryName },
                  }}
                >
                  <Header>
                    <SAvatar
                      size={"sm"}
                      url={city.country.countryPhoto}
                      city={true}
                    />
                    <HeaderColumn>
                      <HeaderText text={city.country.countryName} />
                    </HeaderColumn>
                  </Header>
                </Link>
              </LocationHeader>
            </AvatarContainer>
            <UserContainer>
              <UserNameRow>
                <SText text={city.userCount === 1 ? `USER` : `USERS`} />
                <Input
                  placeholder="Search user who is in this city"
                  onChange={onChange}
                  value={search}
                />
              </UserNameRow>
              {usersNowList.length === 0 && usersNow.length === 0 && (
                <EmptyContainer>
                  <Earth
                    src={require(`../../../Images/animations/hideTrip.png`)}
                  />
                  There is no user now
                </EmptyContainer>
              )}
              {usersNowList.length !== 0 &&
                usersNowList.map((user) => (
                  <UserRow key={user.id}>
                    <Link to={`/${user.uuid}`}>
                      <UserHeader
                        username={user.username}
                        currentCity={user.currentCity.cityName}
                        currentCountry={user.currentCity.country.countryName}
                        avatar={user.avatarUrl}
                        size={"sm"}
                      />
                    </Link>
                  </UserRow>
                ))}
              {usersNowList.length === 0 &&
                !search &&
                usersNow &&
                usersNow.map((user) => (
                  <UserRow key={user.id}>
                    <Link to={`/${user.uuid}`}>
                      <UserHeader
                        username={user.username}
                        currentCity={user.currentCity.cityName}
                        currentCountry={user.currentCity.country.countryName}
                        avatar={user.avatarUrl}
                        size={"sm"}
                      />
                    </Link>
                  </UserRow>
                ))}
              {hasNextPage && !search && (
                <Link to={`/city/${cityId}/usersnow`}>
                  <DropDownIcon>
                    <DropDown />
                  </DropDownIcon>
                </Link>
              )}
            </UserContainer>
          </PHeader>
          {usersBefore && usersBefore.length !== 0 ? (
            <>
              <GreyLine />
              <UserBox
                users={usersBefore}
                currentCityId={cityId}
                type={"usersBefore"}
              />
            </>
          ) : null}
          <LocationBox
            nearCities={nearCities}
            cityId={cityId}
            title={"NEAR CITIES"}
            loading={nearCitiesLoading}
          />
          <LocationBox
            samenameCities={samenameCities}
            cityId={cityId}
            title={"SAMENAME CITIES"}
            loading={samenameCitiesLoading}
          />
        </SWrapper>
      </>
    );
  }
  return null;
};

export default CityProfilePresenter;
