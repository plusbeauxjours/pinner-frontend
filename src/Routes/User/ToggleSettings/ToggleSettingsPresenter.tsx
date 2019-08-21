import React from "react";
import { ToggleOn, ToggleOff } from "../../../Icons";
import styled from "src/Styles/typed-components";
import { keyframes } from "styled-components";
import { Link } from "react-router-dom";
import { useTheme } from "src/Styles/theme-context";
import Helmet from "react-helmet";

const Wrapper = styled.div`
  display: flex;
  margin: 20px auto;
  flex-direction: row;
  width: 100%;
  max-width: 935px;
`;
const MenuColumn = styled.div`
  display: flex;
  flex-direction: column;
  min-width: 200px;
  margin-top: 10px;
  @media screen and (max-width: 735px) {
    display: none;
    visibility: hidden;
  }
`;

const Column = styled.div`
  display: flex;
  flex-direction: column;
  margin-left: 10px;
  width: 735px;
  @media screen and (max-width: 735px) {
    width: 100%;
    margin-right: 10px;
  }
`;

const ToggleContainer = styled.div`
  display: flex;
  width: 300px;
  justify-content: space-between;
  align-items: center;
`;

const MenuText = styled.p`
  font-size: 18px;
  font-weight: 100px;
  margin-bottom: 15px;
  cursor: pointer;
`;

const ToggleText = styled.p`
  font-size: 18px;
  font-weight: 100;
`;

const ExplainText = styled.p`
  font-size: 12px;
  font-weight: 100;
  margin-bottom: 15px;
`;

const GreyLine = styled.div`
  border-left: 1px solid ${props => props.theme.hoverColor};
  height: 80vh;
  margin: 0px 10px;
  @media screen and (max-width: 735px) {
    display: none;
    visibility: hidden;
  }
`;

const ToggleIcon = styled.div`
  display: flex;
  svg {
    fill: grey;
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

const Modal = styled.div`
  background-color: ${props => props.theme.modalBgColor};
  border: 1px solid ${props => props.theme.borderColor};
  border-radius: 12px;
  margin: 0 15px 0 15px;
  width: 540px;
  z-index: 10;
  animation: ${ModalAnimation} 0.1s linear;
`;

const ConfirmModal = styled(Modal)`
  max-width: 340px;
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

const GreyText = styled(MenuText)`
  color: grey;
  &:hover {
    color: ${props => props.theme.color};
  }
`;

interface IProps {
  username: string;
  isSelf: boolean;
  isDarkMode: boolean;
  isHideTrips: boolean;
  isHideCoffees: boolean;
  isHideCities: boolean;
  isHideCountries: boolean;
  isHideContinents: boolean;
  isAutoLocationReport: boolean;

  bio: string;
  gender: string;
  firstName: string;
  lastName: string;
  nationalityCode: string;
  residenceCode: string;
  avatarUrl: any;
  phoneNumber: string;
  countryPhoneNumber: string;
  countryPhoneCode: string;
  emailAddress: string;
  isVerifiedPhoneNumber: boolean;
  isVerifiedEmailAddress: boolean;

  onClickToggleIcon: (payload: string) => void;
  logoutConfirmModalOpen: boolean;
  toggleConfirmModal: () => void;
  logUserOutFn: any;
  back: (event: any) => void;
}

const ToggleSettingsPresenter: React.FunctionComponent<IProps> = ({
  username,
  isSelf,
  isDarkMode,
  isHideTrips,
  isHideCoffees,
  isHideCities,
  isHideCountries,
  isHideContinents,
  isAutoLocationReport,

  bio,
  gender,
  firstName,
  lastName,
  nationalityCode,
  residenceCode,
  avatarUrl,
  phoneNumber,
  countryPhoneNumber,
  countryPhoneCode,
  emailAddress,
  isVerifiedPhoneNumber,
  isVerifiedEmailAddress,

  onClickToggleIcon,
  logoutConfirmModalOpen,
  toggleConfirmModal,
  logUserOutFn,
  back
}) => {
  const { theme = isDarkMode, toggleTheme } = useTheme();
  return (
    <>
      {logoutConfirmModalOpen && (
        <ModalContainer>
          <ModalOverlay onClick={toggleConfirmModal} />
          <ConfirmModal>
            <ModalLink onClick={logUserOutFn}>Yes</ModalLink>
            <ModalLink onClick={toggleConfirmModal}>No</ModalLink>
          </ConfirmModal>
        </ModalContainer>
      )}
      <Wrapper>
        <Helmet>
          <title>Settings | Pinner</title>
        </Helmet>
        <MenuColumn>
          <Link
            to={{
              pathname: `/account/edit`,
              state: {
                username,
                isSelf,
                isDarkMode,
                isHideTrips,
                isHideCoffees,
                isHideCities,
                isHideCountries,
                isHideContinents,
                isAutoLocationReport,
                bio,
                gender,
                firstName,
                lastName,
                nationalityCode,
                residenceCode,
                avatarUrl,
                phoneNumber,
                countryPhoneNumber,
                countryPhoneCode,
                emailAddress,
                isVerifiedPhoneNumber,
                isVerifiedEmailAddress
              }
            }}
          >
            <GreyText>EDIT PROFILE</GreyText>
          </Link>
          <Link
            to={{
              pathname: `/account/settings`,
              state: {
                username,
                isSelf,
                isDarkMode,
                isHideTrips,
                isHideCoffees,
                isHideCities,
                isHideCountries,
                isHideContinents,
                isAutoLocationReport,
                bio,
                gender,
                firstName,
                lastName,
                nationalityCode,
                residenceCode,
                avatarUrl,
                phoneNumber,
                countryPhoneNumber,
                countryPhoneCode,
                emailAddress,
                isVerifiedPhoneNumber,
                isVerifiedEmailAddress
              }
            }}
          >
            <MenuText>SETTINGS</MenuText>
          </Link>
          <GreyText onClick={toggleConfirmModal}>LOGOUT</GreyText>
          <GreyText onClick={back}>CANCEL</GreyText>
        </MenuColumn>
        <GreyLine />
        <Column>
          <ToggleContainer>
            <ToggleText>DARK MODE</ToggleText>
            <ToggleIcon onClick={toggleTheme}>
              {isSelf && theme ? <ToggleOn /> : <ToggleOff />}
            </ToggleIcon>
          </ToggleContainer>
          {isSelf && isDarkMode ? (
            <ExplainText>Set to make light background.</ExplainText>
          ) : (
            <ExplainText>Set to make dark background.</ExplainText>
          )}
          <ToggleContainer>
            <ToggleText>HIDE TRIPS</ToggleText>
            <ToggleIcon onClick={() => onClickToggleIcon("HIDE_TRIPS")}>
              {isSelf && isHideTrips ? <ToggleOn /> : <ToggleOff />}
            </ToggleIcon>
          </ToggleContainer>
          <ExplainText>
            If you set your trips hide, only you can see your trips, otherwise
            only number of trips and your trip distance are shown.
          </ExplainText>
          <ToggleContainer>
            <ToggleText>HIDE COFFEES</ToggleText>
            <ToggleIcon onClick={() => onClickToggleIcon("HIDE_COFFEES")}>
              {isSelf && isHideCoffees ? <ToggleOn /> : <ToggleOff />}
            </ToggleIcon>
          </ToggleContainer>
          <ExplainText>
            If you set your coffees hide, only you can see you coffees request,
            otherwise only number of coffees request is shown.
          </ExplainText>
          <ToggleContainer>
            <ToggleText>HIDE CITIES</ToggleText>
            <ToggleIcon onClick={() => onClickToggleIcon("HIDE_CITIES")}>
              {isSelf && isHideCities ? <ToggleOn /> : <ToggleOff />}
            </ToggleIcon>
          </ToggleContainer>
          <ExplainText>
            If you set your cities hide, only you can see cities where you've
            been before, otherwise only number of cities is shown.
          </ExplainText>
          <ToggleContainer>
            <ToggleText>HIDE COUNTRIES</ToggleText>
            <ToggleIcon onClick={() => onClickToggleIcon("HIDE_COUNTRIES")}>
              {isSelf && isHideCountries ? <ToggleOn /> : <ToggleOff />}
            </ToggleIcon>
          </ToggleContainer>
          <ExplainText>
            If you set your coutries hide, only you can see countries where
            you've been before, otherwise only number of countries is shown.
          </ExplainText>
          <ToggleContainer>
            <ToggleText>HIDE CONTINENTS</ToggleText>
            <ToggleIcon onClick={() => onClickToggleIcon("HIDE_CONTINENTS")}>
              {isSelf && isHideContinents ? <ToggleOn /> : <ToggleOff />}
            </ToggleIcon>
          </ToggleContainer>
          <ExplainText>
            If you set your coutries hide, only you can see countries where
            you've been before, otherwise only number of countries is shown.
          </ExplainText>
          <ToggleContainer>
            <ToggleText>AUTO LOCATION REPORT</ToggleText>
            <ToggleIcon
              onClick={() => onClickToggleIcon("AUTO_LOCATION_REPORT")}
            >
              {isSelf && isAutoLocationReport ? <ToggleOn /> : <ToggleOff />}
            </ToggleIcon>
          </ToggleContainer>
          <ExplainText>
            If you set auto location report off, the app cannot find where you
            are. Your lacation will be shown on your profile
          </ExplainText>
        </Column>
      </Wrapper>
    </>
  );
};

export default ToggleSettingsPresenter;
