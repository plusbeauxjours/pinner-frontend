import React from "react";
import { Link } from "react-router-dom";
import styled from "../../../Styles/typed-components";

import Wrapper from "../../../Components/Wrapper";
import Loader from "../../../Components/Loader";
import Avatar from "../../../Components/Avatar";
import Bold from "../../../Components/Bold";
import CityLikeBtn from "../../../Components/CityLikeBtn";
import LocationBox from "src/Components/LocationBox";
import { List, DropDown } from "../../../Icons";
import { keyframes } from "styled-components";
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

const SText = styled(Bold)`
  font-size: 18px;
  font-weight: 100;
  text-transform: uppercase;
`;

const UserRow = styled.div`
  display: grid;
  flex-direction: row;
  height: 50px;
  grid-template-columns: 4fr 1fr;
  padding: 0 5px 0 5px;
  grid-gap: 15px;
  align-items: center;
  cursor: pointer;
  transition: background-color 0.2s ease-in-out;
  &:hover {
    background-color: ${props => props.theme.hoverColor};
  }
  &:not(:last-child) {
    border-bottom: 1px solid ${props => props.theme.borderColor};
  }
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
`;

const Header = styled.header`
  display: flex;
  align-items: center;
  cursor: pointer;
  height: 50px;
  padding-left: 5px;
`;

const LocationHeader = styled(Header)`
  margin-top: 5px;
  padding-left: 15px;
  margin-bottom: 30px;
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

const Location = styled.span`
  display: flex;
  margin-top: 5px;
  display: block;
  font-size: 12px;
  font-weight: 200;
`;

const Input = styled.input`
  width: 215px;
  border: 0;
  border-bottom: 1px solid ${props => props.theme.borderColor};
  padding: 5px;
  color: ${props => props.theme.color};
  font-size: 12px;
  font-weight: 100;
  &:focus {
    outline: none;
    &::-webkit-input-placeholder {
      color: transparent;
    }
  }
  &::placeholder {
    color: ${props => props.theme.greyColor};
    text-align: right;
  }
`;

const LocationContainer = styled.span`
  margin: 5px 5px 5px 0;
`;

const LocationName = styled.span`
  font-size: 30px;
  font-weight: 300;
  margin-right: 5px;
  text-transform: uppercase;
`;

const Flag = styled.span`
  font-size: 20px;
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
  cursor: pointer;
  svg {
    fill: ${props => props.theme.iconColor};
    transition: fill 0.2s ease-in-out;
    &:hover {
      fill: ${props => props.theme.hoverColor};
    }
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

const ModalOverlay = styled.div`
  z-index: 5;
  height: 100%;
  width: 100%;
  position: fixed;
  top: 0;
  background-color: ${props => props.theme.modalOverlayColor};
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
    border-bottom: 1px solid ${props => props.theme.borderColor};
  }
`;

const Modal = styled.div`
  background-color: ${props => props.theme.modalBgColor};
  border: 1px solid ${props => props.theme.borderColor};
  margin: 0 15px 0 15px;
  width: 340px;
  border-radius: 12px;
  z-index: 10;
  animation: ${ModalAnimation} 0.1s linear;
`;

const CountText = styled(Location)`
  padding-left: 15px;
`;

// const RightIcon = styled.div`
//   position: absolute;
//   display: flex;
//   margin-left: 941px;
//   top: 40%;
//   svg {
//     fill: ${props => props.theme.iconColor};
//   }
// `;

// const LeftIcon = styled.div`
//   position: absolute;
//   display: flex;
//   margin-left: -30px;
//   top: 40%;
//   svg {
//     fill: ${props => props.theme.iconColor};
//   }
// `;

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

const LocationMapContainer = styled.div`
  display: flex;
  position: absolute;
  opacity: 0;
  border-radius: 3px;
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
  border: 1px solid ${props => props.theme.borderColor};
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

const DropDownIcon = styled.span`
  display: flex;
  flex-direction: row;
  justify-content: center;
  margin-top: 15px;
  cursor: pointer;
  svg {
    fill: ${props => props.theme.iconColor};
    transition: fill 0.2s ease-in-out;
    &:hover {
      fill: ${props => props.theme.hoverColor};
    }
  }
`;

interface IProps {
  data?: any;
  loading: boolean;
  countriesData: any;
  countriesLoading: boolean;
  countryName: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  search: string;
  cityList: any;

  countryCode: string;
  currentCityId: string;
  back: (event) => void;
  reportModalOpen: boolean;
  toggleReportModal: () => void;
  slackReportLocations: (targetLocationId: string, payload: string) => void;
  searchSet: () => void;
  mapMopdalOpen: boolean;
  toggleMapMopdal: () => void;
}

const CountryProfilePresenter: React.FunctionComponent<IProps> = ({
  data: {
    countryProfile: {
      hasNextPage = null,
      count = null,
      cities = null,
      country = null
    } = {}
  } = {},
  loading,
  countriesData: { getCountries: { countries = null } = {} } = {},
  countriesLoading,
  countryName,
  cityList,
  search,
  onChange,

  countryCode,
  currentCityId,
  reportModalOpen,
  toggleReportModal,
  slackReportLocations,
  searchSet,
  toggleMapMopdal,
  mapMopdalOpen
}) => {
  if (loading) {
    return <Loader />;
  } else if (!loading && cities && country) {
    return (
      <>
        {mapMopdalOpen && (
          <ModalContainer>
            <ModalOverlay onClick={toggleMapMopdal} />
            <MapModal>
              <LocationMap
                latitude={country.latitude}
                longitude={country.longitude}
                type={"country"}
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
                onClick={() =>
                  slackReportLocations(country.countryCode, "PHOTO")
                }
              >
                INAPPROPRIATE PHOTOS
              </ModalLink>
              <ModalLink
                onClick={() =>
                  slackReportLocations(country.countryCode, "LOCATION")
                }
              >
                WRONG LOCATION
              </ModalLink>

              <ModalLink
                onClick={() =>
                  slackReportLocations(country.countryCode, "OTHER")
                }
              >
                OTHER
              </ModalLink>
              <ModalLink onClick={toggleReportModal}>CANCEL</ModalLink>
            </Modal>
          </ModalContainer>
        )}
        <SWrapper>
          {/* <LeftIcon>
            <Link
              to={{
                pathname: `/country/${city.country.countryCode}`,
                state: { countryName: city.country.countryName }
              }}
            >
              <Left />
            </Link>
          </LeftIcon> */}
          {/* <RightIcon>
            <Link
              to={{
                pathname: `/continent/${country.continent.continentCode}`,
                state: { countryName: country.continent.continentName }
              }}
            >
              <Right />
            </Link>
          </RightIcon> */}
          <PHeader>
            <Helmet>
              <title>Country | Pinner</title>
            </Helmet>
            <AvatarContainer>
              <Square>
                <CAvatar size="lg" url={country.countryPhoto} city={true} />
                <LocationMapContainer onClick={toggleMapMopdal}>
                  <LocationMap
                    latitude={country.latitude}
                    longitude={country.longitude}
                    type={"country"}
                    modal={false}
                  />
                </LocationMapContainer>
              </Square>
              <LocationContainer>
                <NameContainer>
                  <LocationName>
                    {country.countryName}
                    <Flag>{country.countryEmoji}</Flag>
                    <ListIcon onClick={toggleReportModal}>
                      <List />
                    </ListIcon>
                  </LocationName>
                </NameContainer>
                {count !== 0 ? (
                  <CountText>
                    You've been {country.countryName} {count}
                    {count === 1 ? " time" : " times"}
                  </CountText>
                ) : null}
              </LocationContainer>

              {/* <InfoRow>
                <SSText text={String(country.distance)} />
                TIME DIFFERENCE
              </InfoRow>
             */}
              <Link
                to={{
                  pathname: `/continent/${country.continent.continentCode}`,
                  state: { continentName: country.continent.continentName }
                }}
              >
                <LocationHeader>
                  <SAvatar
                    size={"sm"}
                    url={country.continent.continentPhoto}
                    city={true}
                  />
                  <HeaderColumn>
                    <HeaderText text={country.continent.continentName} />
                  </HeaderColumn>
                </LocationHeader>
              </Link>
            </AvatarContainer>
            <UserContainer>
              <UserNameRow>
                <SText text={country.cityCount === 1 ? `CITY` : `CITIES`} />
                <Input
                  placeholder="Search city which is in this country"
                  value={search}
                  onChange={onChange}
                />
              </UserNameRow>
              {cityList.length === 0 && cities.length === 0 && (
                <EmptyContainer>
                  <Earth
                    src={require(`../../../Images/animations/hideTrip.png`)}
                  />
                  There is no city yet
                </EmptyContainer>
              )}
              {cityList.length !== 0 &&
                cityList.map(city => (
                  <UserRow key={city.id}>
                    <Link to={`/city/${city.cityId}`}>
                      <Header>
                        <SAvatar
                          size={"sm"}
                          url={city.cityThumbnail}
                          city={true}
                        />
                        <HeaderColumn>
                          <HeaderText text={city.cityName} />
                          <Location>{countryName}</Location>
                        </HeaderColumn>
                      </Header>
                    </Link>
                    <CityLikeBtn
                      isLiked={city.isLiked}
                      cityId={city.cityId}
                      likeCount={city.likeCount}
                      type={"row"}
                    />
                  </UserRow>
                ))}
              {cityList.length === 0 &&
                !search &&
                cities &&
                cities.map(city => (
                  <UserRow key={city.id}>
                    <Link to={`/city/${city.cityId}`}>
                      <Header>
                        <SAvatar
                          size={"sm"}
                          url={city.cityThumbnail}
                          city={true}
                        />
                        <HeaderColumn>
                          <HeaderText text={city.cityName} />
                          <Location>{countryName}</Location>
                        </HeaderColumn>
                      </Header>
                    </Link>
                    <CityLikeBtn
                      isLiked={city.isLiked}
                      cityId={city.cityId}
                      likeCount={city.likeCount}
                      type={"row"}
                    />
                  </UserRow>
                ))}
              {hasNextPage && !search && (
                <Link to={`/country/${countryCode}/cities`}>
                  <DropDownIcon>
                    <DropDown />
                  </DropDownIcon>
                </Link>
              )}
            </UserContainer>
          </PHeader>
          <LocationBox
            countries={countries}
            loading={countriesLoading}
            title={`${country.continent.continentName}`}
          />
        </SWrapper>
      </>
    );
  }
  return null;
};

export default CountryProfilePresenter;
