import React from "react";
import { Link } from "react-router-dom";

import styled from "styled-components";
import { Compass, SearchIcon } from "../../Icons";

import Wrapper from "../Wrapper";
import { RouteComponentProps, withRouter } from "react-router";
import Search from "../Search/";
import { keyframes } from "styled-components";
import Avatar from "../Avatar";
import Bold from "../Bold";
import Weather from "src/Components/Weather";

const Header = styled.header`
  background-color: ${props => props.theme.bgColor};
  height: 45px;
  width: 100%;
  border-top: none;
  position: fixed;
  top: 0;
  z-index: 10;
  border-bottom: 1px solid ${props => props.theme.greyColor};
`;

const SWrapper = styled(Wrapper)`
  display: flex;
  align-items: center;
  height: 100%;
  justify-content: center;
`;

const Column = styled.div`
  width: 20%;
  &:first-child {
    margin-right: auto;
  }
  &:last-child {
    margin-left: auto;
    display: flex;
    justify-content: flex-end;
  }
  &:nth-child(2) {
    display: flex;
    justify-content: center;
  }
  margin: 0 15px 0 15px;
`;

const Icon = styled.span`
  svg {
    fill: ${props => props.theme.color};
  }
  &:not(:first-child) {
    margin-left: 10px;
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
  position: relative;
  flex-direction: column;
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

const Modal = styled.div`
  top: 30%;
  width: 400px;
  @media screen and (max-width: 965px) {
    width: 90%;
  }
  z-index: 10;
  position: absolute;
  margin-top: 80px;
  animation: ${ModalAnimation} 0.1s linear;
`;

const Input = styled.input`
  z-index: 10;
  border: 0;
  width: 100%;
  display: flex;
  align-self: center;
  border-bottom: 1px solid ${props => props.theme.greyColor};
  padding: 5px;
  color: ${props => props.theme.color};
  background-color: transparent;
  font-size: 34px;
  font-weight: 100;
  transition: border-bottom 0.1s linear;
  &:focus {
    outline: none;
  }
  &::placeholder {
    color: ${props => props.theme.greyColor};
  }
  animation: ${ModalAnimation} 0.1s linear;
`;

const UserContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr, 1fr;
  align-content: center;
`;

const LocationHeader = styled.header`
  padding: 12px;
  margin: 0 15px 0 15px;
  display: flex;
  align-items: center;
  border-radius: 3px;
  cursor: pointer;
  transition: background-color 0.2s ease-in-out;
`;

const SAvatar = styled(Avatar)`
  border-radius: 0px;
  height: 44px;
  width: 45px;
`;

const HeaderColumn = styled.div`
  margin-left: 15px;
  display: grid;
  grid-template-rows: 1fr, 1fr;
  height: 45px;
`;

const WeatherContainer = styled.div`
  @media screen and (max-width: 500px) {
    display: none;
    visibility: hidden;
  }
`;

const CText = styled(Bold)`
  display: flex;
`;

const HeaderRow = styled.div`
  display: flex;
  flex-direction: row;
  margin-top: 5px;
  @media screen and (max-width: 500px) {
    flex-direction: column;
    margin-top: 0;
    justify-content: center;
  }
`;

interface IProps extends RouteComponentProps<any> {
  me?: any;
  data?: any;
  loading: boolean;
  searchData?: any;
  searchLoading: boolean;
  currentLat: number;
  currentLng: number;
  currentCityId: string;
  currentCityName: string;
  currentCountryCode: string;
  modalOpen: boolean;
  search: string;
  toggleModal: () => void;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  warningToast: (event: any) => void;
}

const HeaderPresenter: React.FunctionComponent<IProps> = ({
  me: { me: { user = null } = {} } = {},
  data: { header: { city = null } = {} } = {},
  loading,
  searchData,
  searchLoading,
  currentLat,
  currentLng,
  currentCityId,
  currentCityName,
  currentCountryCode,
  modalOpen,
  search,
  toggleModal,
  onChange,
  warningToast
}) => {
  if (loading) {
    return null;
  } else if (!loading && city && user) {
    return (
      <Header>
        {modalOpen && (
          <ModalContainer>
            <ModalOverlay onClick={toggleModal} />
            <Modal>
              <Input
                autoFocus={true}
                placeholder="Search location"
                value={search}
                onChange={onChange}
                onKeyUp={warningToast}
                autoComplete={"off"}
              />
              <Search
                search={search}
                searchData={searchData}
                searchLoading={searchLoading}
              />
            </Modal>
          </ModalContainer>
        )}
        <SWrapper>
          <Column>
            <Icon>
              <Link to="/">
                <Compass />
              </Link>
            </Icon>

            <Icon onClick={toggleModal}>
              <SearchIcon />
            </Icon>
          </Column>
          <UserContainer>
            <Link to={`/city/${currentCityId}`}>
              <LocationHeader>
                <SAvatar url={city.cityThumbnail} size={"sm"} city={true} />
                <HeaderColumn>
                  <HeaderRow>
                    <CText text={`${city.cityName}${", "}`} />
                    <CText text={city.country.countryName} />
                  </HeaderRow>
                  <WeatherContainer>
                    <Weather
                      latitude={currentLat}
                      longitude={currentLng}
                      size={"sm"}
                      type={"feed"}
                    />
                  </WeatherContainer>
                </HeaderColumn>
              </LocationHeader>
            </Link>
          </UserContainer>
          <Column>
            <Icon>
              <Link
                to={{
                  pathname: `/${user ? user.username : ""}`,
                  state: {
                    currentCountryCode,
                    currentLat,
                    currentLng,
                    currentCityName
                  }
                }}
              >
                <Avatar size={"sm"} url={user.profile.avatarUrl} />
              </Link>
            </Icon>
          </Column>
        </SWrapper>
      </Header>
    );
  }
  return null;
};

export default withRouter(HeaderPresenter);
