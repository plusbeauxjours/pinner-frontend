import React from "react";
import styled from "../../Styles/typed-components";
import { Link } from "react-router-dom";
import Loader from "../../Components/Loader";
import UserHeader from "../../Components/UserHeader";
import CoffeeBtn from "src/Components/CoffeeBtn";
import Wrapper from "src/Components/Wrapper";
import Bold from "../../Components/Bold";
import { keyframes } from "styled-components";
import CoffeeBox from "src/Components/CoffeeBox";
import { Noti } from "../../Icons";
import LocationBox from "src/Components/LocationBox";
import Helmet from "react-helmet";
import { countries } from "../../countryData";

const SWrapper = styled(Wrapper)``;

const UserContainer = styled.div`
  margin-top: 30px;
  display: flex;
  width: 100%;
  flex-direction: column;
`;

const GreyText = styled(Bold)`
  color: ${props => props.theme.greyColor};
  font-weight: 100;
  margin-top: 5px;
`;

const MatchUserRow = styled.div`
  display: grid;
  flex-direction: row;
  height: 50px;
  grid-template-columns: 2fr 1fr 0.5fr;
  padding: 0 5px 0 5px;
  margin: 0 15px 0 15px;
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

const Column = styled.div`
  display: flex;
  flex-direction: column;
  @media screen and (max-width: 400px) {
    display: none;
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

const Modal = styled.div`
  background-color: ${props => props.theme.modalBgColor};
  border: 1px solid ${props => props.theme.borderColor};
  margin: 0 15px 0 15px;
  width: 340px;
  border-radius: 12px;
  z-index: 10;
  animation: ${ModalAnimation} 0.1s linear;
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

const GreyLine = styled.div`
  margin-top: 10px;
  margin-bottom: 10px;
  border-bottom: 1px solid ${props => props.theme.borderColor};
  @media screen and (max-width: 935px) {
    margin: 10px 15px 0 15px;
  }
`;

const UserRow = styled.div`
  display: grid;
  height: 50px;
  width: 400px;
  grid-template-columns: 1fr;
  padding: 0 5px 0 5px;
  grid-gap: 15px;
  align-items: center;
  cursor: pointer;
  transition: background-color 0.2s ease-in-out;
  &:hover {
    background-color: ${props => props.theme.hoverColor};
  }
  border-bottom: 1px solid ${props => props.theme.borderColor};
  &:last-child {
    margin-bottom: 15px;
  }
`;

const Container = styled.div`
  -webkit-box-flex: 0;
  padding: 15px;
`;

const Box = styled.div`
  max-width: 905px;
  display: grid;
  grid-auto-flow: column;
  grid-template-rows: repeat(3, 50px);
  grid-auto-columns: 400px;
  column-gap: 10px;
  overflow-x: auto;
  padding-bottom: 15px;
  -ms-overflow-style: -ms-autohiding-scrollbar;
  ::-webkit-scrollbar {
    height: 6px;
  }
  ::-webkit-scrollbar-track {
    -webkit-box-shadow: inset 0 0 6px ${props => props.theme.trackShadowColor};
    border-radius: 10px;
  }
  ::-webkit-scrollbar-thumb {
    border-radius: 10px;
    -webkit-box-shadow: inset 0 0 6px ${props => props.theme.trackShadowColor};
    background-color: ${props => props.theme.greyColor};
  }
`;

const SeeAll = styled.p`
  font-size: 12px;
  font-weight: 100;
  cursor: pointer;
  color: ${props => props.theme.greyColor};
`;

const Title = styled.div`
  display: flex;
  justify-content: space-between;
  @media screen and (max-width: 935px) {
    margin: 10px 15px 0 15px;
  }
`;

const SText = styled(Bold)`
  font-size: 18px;
  font-weight: 100;
  text-transform: uppercase;
`;

const NotiICon = styled.div`
  position: absolute;
  margin-top: 1px;

  color: ${props => props.theme.color};
`;

const EditPhoneModal = styled.div`
  background-color: ${props => props.theme.modalBgColor};
  border: 1px solid ${props => props.theme.borderColor};
  border-radius: 12px;
  margin: 0 15px 0 15px;
  width: 540px;
  height: 240px;
  z-index: 5;
  animation: ${ModalAnimation} 0.1s linear;
`;

const GenderModalContainer = styled(ModalContainer)`
  z-index: 10;
`;
const GenderModalOverlay = styled(ModalOverlay)`
  z-index: 10;
`;
const GenderModal = styled(Modal)`
  z-index: 10;
`;
const GenderModalLink = styled(ModalLink)`
  z-index: 10;
`;

const SearchModalContainer = styled(ModalContainer)`
  z-index: 10;
`;
const SearchModalOverlay = styled(ModalOverlay)`
  z-index: 10;
`;
const SearchModal = styled(EditPhoneModal)`
  z-index: 5;
  padding: 30px;
  height: 700px;
  z-index: 10;
`;
const CountryContainer = styled.div`
  z-index: 10;
  display: flex;
  align-content: center;
  width: 480px;
  height: 640px;
  flex-direction: column;
  overflow-y: auto;
  -ms-overflow-style: -ms-autohiding-scrollbar;
  ::-webkit-scrollbar {
    display: none !important;
    width: 3px;
    background: none;
  }
  &::-webkit-scrollbar-track {
    background: none;
  }
`;
const CountryRow = styled.div`
  z-index: 10;
  height: 40px;
  width: 480px;
  font-size: 18px;
  display: flex;
  padding-top: 10px;
  padding-bottom: 10px;
  cursor: pointer;
  &:not(:last-child) {
    border-bottom: 1px solid ${props => props.theme.borderColor};
  }
  &:hover {
    background-color: ${props => props.theme.hoverColor};
  }
`;
const CountryText = styled.div`
  display: flex;
  flex-direction: row;
`;

const Space = styled.div`
  margin-bottom: 50px;
`;

interface IProps {
  me: any;
  matchData: any;
  matchLoading: boolean;
  recommendUsersData: any;
  recommendUsersLoading: boolean;
  recommendLocationsData: any;
  recommendLocationsLoading: boolean;
  coffeeData: any;
  coffeeLoading: boolean;
  search: string;
  matchList: any;
  currentLat: number;
  currentLng: number;
  currentCityId: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  requestModalOpen: boolean;
  toggleRequestModal: () => void;
  submitCoffee: any;
  isStaying: boolean;
  searchSet: () => void;
  markAsReadMatchFn: any;
  countryModalOpen: boolean;
  openCountryModal: (taget: string) => void;
  closeCountryModal: () => void;
  onSelectCountry: (countryPhoneCode: string) => void;
  genderModalOpen: boolean;
  openGenderModal: (taget: string) => void;
  closeGenderModal: () => void;
  onSelectGender: (gender: string) => void;
  target: string;
}
const MatchPresenter: React.FunctionComponent<IProps> = ({
  me: { me: { user: me = null } = {} } = {},
  matchData: { getMatches: { matches = null } = {} } = {},
  matchLoading,
  recommendUsersData: { recommendUsers: { users = null } = {} } = {},
  recommendUsersLoading,
  recommendLocationsData: {
    recommendLocations: { cities: recommendLocations = null } = {}
  } = {},
  recommendLocationsLoading,
  coffeeData: { getCoffees: { coffees = null } = {} } = {},
  coffeeLoading,
  search,
  matchList,
  currentLat,
  currentLng,
  currentCityId,
  onChange,
  requestModalOpen,
  toggleRequestModal,
  submitCoffee,
  isStaying,
  searchSet,
  markAsReadMatchFn,
  countryModalOpen,
  openCountryModal,
  closeCountryModal,
  onSelectCountry,
  genderModalOpen,
  openGenderModal,
  closeGenderModal,
  onSelectGender,
  target
}) => {
  if (matchLoading || recommendUsersLoading) {
    return <Loader />;
  } else if (!matchLoading && !recommendUsersLoading && matches) {
    return (
      <>
        {genderModalOpen && (
          <GenderModalContainer>
            <GenderModalOverlay onClick={closeGenderModal} />
            <GenderModal>
              <GenderModalLink onClick={() => onSelectGender("MALE")}>
                MALE
              </GenderModalLink>
              <GenderModalLink onClick={() => onSelectGender("FEMALE")}>
                FEMALE
              </GenderModalLink>
              <GenderModalLink onClick={() => onSelectGender("OTHER")}>
                OTHER
              </GenderModalLink>
              <GenderModalLink onClick={closeGenderModal}>
                CANCEL
              </GenderModalLink>
            </GenderModal>
          </GenderModalContainer>
        )}
        {countryModalOpen && (
          <SearchModalContainer>
            <SearchModalOverlay onClick={closeCountryModal} />
            <SearchModal>
              <CountryContainer>
                {countries.map((country, index) => (
                  <CountryRow
                    key={index}
                    onClick={() => onSelectCountry(country.code)}
                  >
                    <CountryText>
                      <p>&nbsp;{country.name}</p>
                      <p>&nbsp;{country.emoji}</p>
                    </CountryText>
                  </CountryRow>
                ))}
              </CountryContainer>
            </SearchModal>
          </SearchModalContainer>
        )}
        {requestModalOpen && (
          <ModalContainer>
            <ModalOverlay onClick={toggleRequestModal} />
            <Modal>
              <ModalLink onClick={() => submitCoffee("everyone")}>
                EVERYONE
              </ModalLink>
              <ModalLink
                onClick={
                  me.profile.nationality
                    ? () => submitCoffee("nationality")
                    : () => openCountryModal("nationality")
                }
              >
                NATIONALITY
              </ModalLink>
              <ModalLink
                onClick={
                  me.profile.residence
                    ? () => submitCoffee("residence")
                    : () => openCountryModal("residence")
                }
              >
                RESIDENCE
              </ModalLink>
              <ModalLink
                onClick={
                  me.profile.gender
                    ? () => submitCoffee("gender")
                    : () => openGenderModal("gender")
                }
              >
                GENDER
              </ModalLink>
              <ModalLink onClick={toggleRequestModal}>CANCEL</ModalLink>
            </Modal>
          </ModalContainer>
        )}
        <SWrapper>
          {users && users.length !== 0 && (
            <UserContainer>
              <Helmet>
                <title>Home | Pinner</title>
              </Helmet>
              <Title>
                <SText text={"RECOMMEND USERS"} />
                <Link to={`/people`}>
                  <SeeAll>SEE ALL</SeeAll>
                </Link>
              </Title>
              <Container>
                <Box>
                  {users &&
                    users.length !== 0 &&
                    users.map(user => (
                      <UserRow key={user.id}>
                        <Link to={`/${user.username}`}>
                          <UserHeader
                            username={user.username}
                            currentCity={user.currentCity.cityName}
                            currentCountry={
                              user.currentCity.country.countryName
                            }
                            avatar={user.avatarUrl}
                            size={"sm"}
                          />
                        </Link>
                      </UserRow>
                    ))}
                </Box>
              </Container>
            </UserContainer>
          )}
          <LocationBox
            recommendLocations={recommendLocations}
            title={"RECOMMEND LOCATIONS"}
            loading={recommendLocationsLoading}
          />
          <CoffeeBox
            coffeeLoading={coffeeLoading}
            currentCityId={currentCityId}
            toggleCoffeeRequestModal={toggleRequestModal}
            coffees={coffees}
            isStaying={isStaying}
            searchSet={searchSet}
          />
          <GreyLine />
          <UserContainer>
            <Title>
              <SText text={"MATCHES"} />
              <Input
                placeholder="Search matched users"
                value={search}
                onChange={onChange}
              />
            </Title>
            {matchList.length !== 0 &&
              matchList.map(match => {
                return (
                  <React.Fragment key={match.id}>
                    {match.isGuest ? (
                      <MatchUserRow
                        onClick={() =>
                          markAsReadMatchFn({
                            variables: { matchId: match.id }
                          })
                        }
                      >
                        {!match.isReadByGuest && (
                          <NotiICon>
                            <Noti />
                          </NotiICon>
                        )}
                        <Link to={`/${match.host.profile.username}`}>
                          <UserHeader
                            username={match.host.profile.username}
                            currentCity={
                              match.host.profile.currentCity.cityName
                            }
                            currentCountry={
                              match.host.profile.currentCity.country.countryName
                            }
                            avatar={match.host.profile.avatarUrl}
                            size={"sm"}
                          />
                        </Link>
                        <Link to={`/${match.host.profile.username}`}>
                          <Column>
                            <GreyText
                              text={`Matched in ${match.city.cityName}`}
                            />
                            <GreyText text={match.naturalTime} />
                          </Column>
                        </Link>
                        {match.isMatching ? (
                          <CoffeeBtn
                            cityId={match.city.cityId}
                            isMatching={match.isMatching}
                            matchId={match.id}
                            searchSet={searchSet}
                          />
                        ) : null}
                      </MatchUserRow>
                    ) : (
                      <MatchUserRow
                        onClick={() =>
                          markAsReadMatchFn({
                            variables: { matchId: match.id }
                          })
                        }
                      >
                        {!match.isReadByHost && (
                          <NotiICon>
                            <Noti />
                          </NotiICon>
                        )}
                        <Link to={`/${match.guest.profile.username}`}>
                          <UserHeader
                            username={match.guest.profile.username}
                            currentCity={
                              match.guest.profile.currentCity.cityName
                            }
                            currentCountry={
                              match.guest.profile.currentCity.country
                                .countryName
                            }
                            avatar={match.guest.profile.avatarUrl}
                            size={"sm"}
                          />
                        </Link>
                        <Link to={`/${match.host.profile.username}`}>
                          <Column>
                            <GreyText
                              text={`Matched in ${match.city.cityName}`}
                            />
                            <GreyText text={match.naturalTime} />
                          </Column>
                        </Link>
                        {match.isMatching ? (
                          <CoffeeBtn
                            cityId={match.city.cityId}
                            isMatching={match.isMatching}
                            matchId={match.id}
                            searchSet={searchSet}
                          />
                        ) : null}
                      </MatchUserRow>
                    )}
                  </React.Fragment>
                );
              })}
            {matchList.length === 0 &&
              !search &&
              matches &&
              matches.map(match => {
                return (
                  <React.Fragment key={match.id}>
                    {match.isGuest ? (
                      <MatchUserRow
                        onClick={() =>
                          markAsReadMatchFn({
                            variables: { matchId: match.id }
                          })
                        }
                      >
                        {!match.isReadByGuest && (
                          <NotiICon>
                            <Noti />
                          </NotiICon>
                        )}
                        <Link to={`/${match.host.profile.username}`}>
                          <UserHeader
                            username={match.host.profile.username}
                            currentCity={
                              match.host.profile.currentCity.cityName
                            }
                            currentCountry={
                              match.host.profile.currentCity.country.countryName
                            }
                            avatar={match.host.profile.avatarUrl}
                            size={"sm"}
                          />
                        </Link>
                        <Link to={`/${match.host.profile.username}`}>
                          <Column>
                            <GreyText
                              text={`Matched in ${match.city.cityName}`}
                            />
                            <GreyText text={match.naturalTime} />
                          </Column>
                        </Link>
                        {match.isMatching ? (
                          <CoffeeBtn
                            cityId={match.city.cityId}
                            isMatching={match.isMatching}
                            matchId={match.id}
                            searchSet={searchSet}
                          />
                        ) : null}
                      </MatchUserRow>
                    ) : (
                      <MatchUserRow
                        onClick={() =>
                          markAsReadMatchFn({
                            variables: { matchId: match.id }
                          })
                        }
                      >
                        {!match.isReadByHost && (
                          <NotiICon>
                            <Noti />
                          </NotiICon>
                        )}
                        <Link to={`/${match.guest.profile.username}`}>
                          <UserHeader
                            username={match.guest.profile.username}
                            currentCity={
                              match.guest.profile.currentCity.cityName
                            }
                            currentCountry={
                              match.guest.profile.currentCity.country
                                .countryName
                            }
                            avatar={match.guest.profile.avatarUrl}
                            size={"sm"}
                          />
                        </Link>
                        <Link to={`/${match.host.profile.username}`}>
                          <Column>
                            <GreyText
                              text={`Matched in ${match.city.cityName}`}
                            />
                            <GreyText text={match.naturalTime} />
                          </Column>
                        </Link>
                        {match.isMatching ? (
                          <CoffeeBtn
                            cityId={match.city.cityId}
                            isMatching={match.isMatching}
                            matchId={match.id}
                            searchSet={searchSet}
                          />
                        ) : null}
                      </MatchUserRow>
                    )}
                  </React.Fragment>
                );
              })}
          </UserContainer>
          <Space />
        </SWrapper>
      </>
    );
  } else {
    return null;
  }
};

export default MatchPresenter;
