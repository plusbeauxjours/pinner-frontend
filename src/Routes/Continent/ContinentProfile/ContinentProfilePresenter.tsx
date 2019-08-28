import React from "react";
import styled from "../../../Styles/typed-components";
import { Link } from "react-router-dom";

import Wrapper from "../../../Components/Wrapper";
import Loader from "../../../Components/Loader";
import Avatar from "../../../Components/Avatar";
import Bold from "../../../Components/Bold";
import UserBox from "src/Components/UserBox";
import CoffeeBox from "src/Components/CoffeeBox";
import LocationBox from "src/Components/LocationBox";
import { List, DropDown } from "../../../Icons";
import { keyframes } from "styled-components";
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

const GreyLine = styled.div`
  margin-top: 10px;
  margin-bottom: 10px;
  border-bottom: 1px solid ${props => props.theme.borderColor};
  @media screen and (max-width: 935px) {
    margin: 0 10px 0 10px;
  }
`;

const UserRow = styled.div`
  display: grid;
  flex-direction: row;
  height: 50px;
  grid-template-columns: 5fr 1fr;
  padding: 0 5px 0 5px;
  grid-gap: 15px;
  align-items: center;
  cursor: pointer;
  transition: background-color 0.2s ease-in-out;
  &:hover {
    background-color: ${props => props.theme.hoverColor};
  }
  border-bottom: 1px solid ${props => props.theme.borderColor};
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

const Header = styled.header`
  display: flex;
  align-items: center;
  border-radius: 3px;
  cursor: pointer;
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

const AvatarContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 30px;
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
  display: flex;
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

const Text = styled.p`
  font-weight: 300;
  display: flex;
  align-items: center;
`;

const CountText = styled(Location)`
  padding-left: 15px;
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
  coffeeData?: any;
  coffeeLoading: boolean;
  continentCode: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  search: string;
  countryList: any;

  currentCityId: string;
  reportModalOpen: boolean;
  toggleReportModal: () => void;
  slackReportLocations: (targetLocationId: string, payload: string) => void;
  searchSet: () => void;
}

const ContinentProfilePresenter: React.FunctionComponent<IProps> = ({
  data: {
    continentProfile: {
      hasNextPage = null,
      count = null,
      continent = null,
      countries = null,
      usersNow = null,
      usersBefore = null,
      continents = null
    } = {}
  } = {},
  loading,
  coffeeData: { getCoffees: { coffees = null } = {} } = {},
  coffeeLoading,
  continentCode,
  onChange,
  search,
  countryList,
  currentCityId,
  reportModalOpen,
  toggleReportModal,
  slackReportLocations,
  searchSet
}) => {
  if (loading) {
    return <Loader />;
  } else if (!loading && continent) {
    return (
      <>
        {reportModalOpen && (
          <ModalContainer>
            <ModalOverlay onClick={toggleReportModal} />
            <Modal>
              <ModalLink
                onClick={() =>
                  slackReportLocations(continent.continentCode, "PHOTO")
                }
              >
                INAPPROPRIATE PHOTOS
                INAPPROPRIATE PHOTOS
              </ModalLink>
              <ModalLink
                onClick={() =>
                  slackReportLocations(continent.continentCode, "LOCATION")
                }
              >
                WRONG LOCATION
                WRONG LOCATION
              </ModalLink>

              <ModalLink
                onClick={() =>
                  slackReportLocations(continent.continentCode, "OTHER")
                }
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
              <title>Continent | Pinner</title>
            </Helmet>
            <AvatarContainer>
              <CAvatar size="lg" url={continent.continentPhoto} city={true} />
              <LocationContainer>
                <NameContainer>
                  <LocationName>{continent.continentName}</LocationName>
                  <ListIcon onClick={toggleReportModal}>
                    <List />
                  </ListIcon>
                </NameContainer>
                {count !== 0 ? (
                  <CountText>
                    You've been {continent.continentName} {count}
                    {count === 1 ? " time" : " times"}
                  </CountText>
                ) : null}
              </LocationContainer>
            </AvatarContainer>
            <UserContainer>
              <UserNameRow>
                <SText
                  text={continent.countryCount === 1 ? `COUNTRY` : `COUNTRIES`}
                />
                <Input
                  placeholder="Search country which is in this continent"
                  value={search}
                  onChange={onChange}
                />
              </UserNameRow>
              {countryList.length === 0 && countries.length === 0 && (
                <EmptyContainer>
                  <Earth
                    src={require(`../../../Images/animations/hideTrip.png`)}
                  />
                  There is no city yet
                </EmptyContainer>
              )}
              {countryList.length !== 0 &&
                countryList.map(country => (
                  <React.Fragment key={country.id}>
                    <Link
                      to={{
                        pathname: `/country/${country.countryCode}`,
                        state: { countryName: country.countryName }
                      }}
                    >
                      <UserRow>
                        <Header>
                          <SAvatar
                            size={"sm"}
                            url={country.countryPhoto}
                            city={true}
                          />
                          <HeaderColumn>
                            <HeaderText text={country.countryName} />
                            <Location>
                              {country.continent.continentName}
                            </Location>
                          </HeaderColumn>
                        </Header>
                        <Text>
                          {country.cityCount}{" "}
                          {country.cityCount === 1 ? "city" : "cities"}
                        </Text>
                      </UserRow>
                    </Link>
                  </React.Fragment>
                ))}
              {countryList.length === 0 &&
                !search &&
                countries &&
                countries.map(country => (
                  <React.Fragment key={country.id}>
                    <Link
                      to={{
                        pathname: `/country/${country.countryCode}`,
                        state: { countryName: country.countryName }
                      }}
                    >
                      <UserRow>
                        <Header>
                          <SAvatar
                            size={"sm"}
                            url={country.countryPhoto}
                            city={true}
                          />
                          <HeaderColumn>
                            <HeaderText text={country.countryName} />
                            <Location>
                              {country.continent.continentName}
                            </Location>
                          </HeaderColumn>
                        </Header>
                        <Text>
                          {country.cityCount}{" "}
                          {country.cityCount === 1 ? "city" : "cities"}
                        </Text>
                      </UserRow>
                    </Link>
                  </React.Fragment>
                ))}
              {hasNextPage && !search && (
                <Link to={`/continent/${continentCode}/countries`}>
                  <DropDownIcon>
                    <DropDown />
                  </DropDownIcon>
                </Link>
              )}
            </UserContainer>
          </PHeader>
          {usersNow && usersNow.length !== 0 ? (
            <>
              <GreyLine />
              <UserBox
                users={usersNow}
                currentContinentCode={continentCode}
                type={"usersNow"}
              />
            </>
          ) : null}
          {usersBefore && usersBefore.length !== 0 ? (
            <>
              <GreyLine />
              <UserBox
                users={usersBefore}
                currentContinentCode={continentCode}
                type={"usersBefore"}
              />
            </>
          ) : null}
          <CoffeeBox
            coffees={coffees}
            coffeeLoading={coffeeLoading}
            cityId={currentCityId}
            currentContinentCode={continentCode}
            searchSet={searchSet}
          />
          <LocationBox
            continents={continents}
            continentCode={continentCode}
            title={"CONTINENTS"}
            loading={loading}
          />
        </SWrapper>
      </>
    );
  } else {
    return null;
  }
};

export default ContinentProfilePresenter;
