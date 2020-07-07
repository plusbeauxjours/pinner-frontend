import React from "react";
import { Link } from "react-router-dom";
import { List, Delete, RedPin, WhitePin } from "../../../Icons";
import styled, { keyframes } from "../../../Styles/typed-components";
import { Upload } from "../../../Icons";

import Wrapper from "../../../Components/Wrapper";
import Loader from "../../../Components/Loader";
import Avatar from "../../../Components/Avatar";
import Bold from "../../../Components/Bold";
import useGoogleAutocomplete from "../../../autocompleteHelpers";
import { BACKEND_URL } from "src/constants";
import Helmet from "react-helmet";
import LoadingOverlay from "react-loading-overlay";
import ClipLoader from "react-spinners/ClipLoader";

const Header = styled.header`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 365px;
  background: ${(props) => props.theme.headerColor};
`;

const TripSearchHeader = styled.header`
  display: flex;
  align-items: center;
  border-radius: 3px;
  cursor: pointer;
`;

const PAvatar = styled(Avatar)`
  display: flex;
  justify-self: center;
  align-self: center;
  margin-top: 70px;
  cursor: pointer;
  box-shadow: 0.5px 0.5px 30px 30px ${(props) => props.theme.shadowColor};
  -webkit-box-shadow: 0.5px 0.5px 30px 30px
    ${(props) => props.theme.shadowColor};
  -moz-box-shadow: 0.5px 0.5px 30px 30px ${(props) => props.theme.shadowColor};
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  width: 100%;
`;

const NameContainer = styled.span`
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
`;

const BioContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin: 0px auto;
  padding: 0 15px 0 15px;
  max-width: 935px;
  width: 100%;
`;

const Bio = styled.div`
  max-width: 935px;
  max-height: 48px;
  width: 368px;
  margin-top: 3px;
  font-size: 12px;
  font-weight: 100;
  white-space: pre-wrap;
  word-break: break-all;
  word-wrap: break-word;
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

const SWrapper = styled(Wrapper)``;

const PHeader = styled.header`
  display: flex;
  padding: 40px 15px 40px 15px;
  @media screen and (max-width: 700px) {
    justify-content: center;
    flex-wrap: wrap;
  }
`;

const AvatarContainer = styled.div``;

const LocationAvatarContainer = styled.div`
  display: flex;
  position: relative;
  flex-direction: column;
`;

const ListIcon = styled.span`
  display: flex;
  flex-direction: row;
  display: flex;
  cursor: pointer;
  margin-top: 7px;
  svg {
    fill: ${(props) => props.theme.iconColor};
    transition: fill 0.2s ease-in-out;
    &:hover {
      fill: ${(props) => props.theme.hoverColor};
    }
  }
`;

const CAvatar = styled(Avatar)`
  border-radius: 3px;
  height: 200px;
  width: 200px;
  margin-right: 20px;
  @media screen and (max-width: 700px) {
    display: none;
  }
`;

const SText = styled(Bold)`
  font-size: 18px;
  font-weight: 100;
`;

const TripContainer = styled.div`
  display: flex;
  flex-direction: column;
  @media screen and (max-width: 700px) {
    min-width: 300px;
  }
`;

const UserNameRow = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  width: 100%;
  padding: 0 5px 0 5px;
  justify-content: space-between;
  margin-bottom: 10px;
  @media screen and (min-width: 935px) {
    min-width: 685px;
  }
`;

const Username = styled.span`
  font-size: 35px;
  font-weight: 300;
  margin-right: 10px;
`;

const TripOverlay = styled.div`
  z-index: 1;
  opacity: 0;
  display: flex;
  align-items: center;
  cursor: pointer;
  svg {
    fill: ${(props) => props.theme.iconColor};
    transition: fill 0.3s ease-in-out;
    &:hover {
      fill: ${(props) => props.theme.color};
    }
  }
  transition: opacity 0.3s ease-in-out;
`;

const TripRow = styled.div<ITheme>`
  display: grid;
  flex-direction: row;
  height: 50px;
  width: 100%;
  grid-template-columns: 6fr 1fr 1fr 1fr 0.1fr;
  padding: 0 5px 0 5px;
  grid-gap: 15px;
  align-items: center;
  cursor: pointer;
  transition: background-color 0.2s ease-in-out;
  &:hover {
    background-color: ${(props) => props.theme.hoverColor};
  }
  &:hover {
    ${TripOverlay} {
      opacity: 1;
    }
  }
  &:not(:last-child) {
    border-bottom: 1px solid ${(props) => props.theme.borderColor};
  }
  @media screen and (min-width: 935px) {
    min-width: 685px;
  }
  @media screen and (max-width: 400px) {
    grid-template-columns: 6fr 1fr 0.1fr;
  }
`;

const HeaderColumn = styled.div`
  margin-left: 15px;
`;

const HeaderText = styled(Bold)`
  display: flex;
`;

const Location = styled.span`
  display: flex;
  margin-top: 5px;
  display: block;
  font-size: 12px;
  font-weight: 200;
`;

const THeader = styled.header`
  display: flex;
  align-items: center;
  border-radius: 3px;
  cursor: pointer;
  transition: background-color 0.2s ease-in-out;
`;

const Icon = styled.span`
  display: flex;
  align-items: center;
  justify-items: center;
  margin: 0 70px 0 70px;
  cursor: pointer;
  svg {
    fill: ${(props) => props.theme.iconColor};
    transition: fill 0.2s ease-in-out;
    &:hover {
      fill: ${(props) => props.theme.hoverColor};
    }
  }
`;

const TripIcon = styled(Icon)`
  align-self: center;
  justify-self: center;
  margin-bottom: 10px;
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

const Row = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 5px;
  text-align: center;
`;

const VBold = styled(Bold)`
  display: flex;
  align-self: center;
  font-size: 30px;
  font-weight: 400;
  justify-content: center;
  margin-bottom: 5px;
  text-shadow: 0 0 10px ${(props) => props.theme.borderColor};
  -webkit-text-shadow: 0 0 10px ${(props) => props.theme.borderColor};
  -moz-text-shadow: 0 0 10px ${(props) => props.theme.borderColor};
`;

const UBold = styled(Bold)`
  align-self: center;
  font-weight: 100;
  font-size: 12px;
`;

const GreyUBold = styled(UBold)`
  color: grey;
`;

const SAvatar = styled(Avatar)`
  border-radius: 3px;
  height: 45px;
  width: 45px;
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

const AvatarModalContainer = styled(ModalContainer)`
  z-index: 10;
`;

const TripModal = styled.div`
  z-index: 10;
  margin-top: 20px;
  display: flex;
  flex-direction: column;
  animation: ${ModalAnimation} 0.1s linear;
`;

const TripModalContainer = styled.div`
  z-index: 1;
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

const Modal = styled.div`
  background-color: ${(props) => props.theme.modalBgColor};
  border: 1px solid ${(props) => props.theme.borderColor};
  border-radius: 12px;
  margin: 0 15px 0 15px;
  width: 340px;
  z-index: 10;
  animation: ${ModalAnimation} 0.1s linear;
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

const ModalLinkContainer = styled(Link)`
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

const TripInputContainer = styled.div`
  z-index: 10;
  top: 30%;
  width: 400px;
  border: 0;
  position: absolute;
  display: flex;
  flex-direction: column;
  align-self: center;
`;

const SearchCitiesInput = styled.input`
  z-index: 10;
  border: 0;
  border-bottom: 1px solid ${(props) => props.theme.greyColor};
  padding: 5px;
  color: ${(props) => props.theme.color};
  background-color: transparent;
  font-size: 12px;
  font-weight: 100;
  transition: border-bottom 0.1s linear;
  &:focus {
    outline: none;
  }
  &::placeholder {
    color: ${(props) => props.theme.greyColor};
  }
  animation: ${ModalAnimation} 0.1s linear;
  margin-top: 60px;
  font-size: 34px;
`;

const TripInput = styled.input`
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

const UserRow = styled.div<ITheme>`
  display: grid;
  flex-direction: row;
  height: 50px;
  grid-template-columns: 5fr 0.5fr;
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

const AvatarKeyContainer = styled.div`
  position: relative;
  z-index: 10;
  &:hover {
    svg {
      opacity: 1;
      transition: all 0.1s ease-in-out;
    }
  }
`;

const ModalAvatars = styled.div`
  z-index: 10;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-template-rows: repeat(auto-fit, 300px);
  grid-gap: 10px;
  justify-content: center;
  align-items: center;
  animation: ${ModalAnimation} 0.1s linear;
  max-height: calc(100vh - 10px);
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
  @media screen and (max-width: 635px) {
    grid-template-columns: 1fr;
  }
  @media screen and (min-width: 635px) and (max-width: 935px) {
    grid-template-columns: repeat(2, 1fr);
  }
`;

const ModalAvatarImage = styled.img`
  z-index: 10;
  height: 300px;
  width: 300px;
  object-fit: cover;
`;

const ImageInput = styled.input`
  display: none;
`;

const AvatarUploadIcon = styled.div`
  z-index: 11;
  height: 300px;
  width: 300px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  overflow: hidden;
  svg {
    fill: ${(props) => props.theme.iconColor};
    transition: fill 0.2s ease-in-out;
    &:hover {
      fill: ${(props) => props.theme.hoverColor};
    }
  }
`;

const Label = styled.label``;

const AWrapper = styled.div`
  z-index: 101;
  display: flex;
  justify-content: center;
  align-items: center;
  animation: ${ModalAnimation} 0.1s linear;
`;

const Img = styled.img`
  display: flex;
  height: 700px;
  width: 700px;
  background-position: center center;
  object-fit: cover;
  @media screen and (max-width: 700px) {
    width: 100%;
    height: 100%;
  }
`;

const PreviewModalContainer = styled(ModalContainer)`
  z-index: 11;
`;

const AvatarImage = styled.div``;

const AvatarDeleteIcon = styled.div`
  z-index: 20;
  position: absolute;
  top: 10px;
  right: 10px;
  cursor: pointer;
  svg {
    opacity: 0;
    transition: all 0.1s ease-in-out;
    fill: ${(props) => props.theme.whiteColor};
  }
`;

const RedPinIcon = styled.div`
  z-index: 20;
  position: absolute;
  top: 10px;
  left: 10px;
  cursor: pointer;
  svg {
    fill: #cc0000;
  }
`;

const WhitePinIcon = styled(RedPinIcon)`
  svg {
    opacity: 0;
    transition: all 0.1s ease-in-out;
    fill: ${(props) => props.theme.whiteColor};
  }
`;

const ConfirmModalContainer = styled(ModalContainer)`
  z-index: 12;
`;
const ConfirmModalOverlay = styled(ModalOverlay)`
  z-index: 12;
`;
const ConfirmModal = styled(Modal)`
  z-index: 12;
`;
const ConfirmModalLink = styled(ModalLink)`
  z-index: 12;
`;

const EmptyContainer = styled.div`
  font-weight: 100;
  font-size: 12px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
  height: 100%;
  margin-left: 125px;
  @media screen and (max-width: 700px) {
    align-items: center;
    margin: 0;
  }
`;

const HideEarth = styled.img`
  display: flex;
  background-position: center center;
  object-fit: cover;
  height: 80px;
  width: 200px;
  @media screen and (max-width: 700px) {
    height: 80px;
    width: 200px;
  }
`;

const InfoContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  grid-template-rows: 95px 95px;
  grid-gap: 10px;
  width: 100%;
  max-width: 685px;
  @media screen and (min-width: 935px) {
    min-width: 685px;
  }
  @media screen and (max-width: 700px) {
    min-width: 300px;
  }
  margin-bottom: 20px;
`;

const LoaderContainer = styled(ModalContainer)`
  z-index: 20;
`;

const LoaderModalOverlay = styled(ModalOverlay)`
  z-index: 21;
`;

interface ITheme {
  size?: string;
}

interface IProps {
  userProfileData: any;
  userProfileLoading: boolean;

  avatarsData: any;
  avatarsLoading: boolean;

  getTripsData?: any;
  getTipsLoading: boolean;

  modalOpen: boolean;
  reportModalOpen: boolean;
  avatarPreviewModalOpen: boolean;

  tripModalOpen: boolean;
  tripConfirmModalOpen: boolean;
  tripAddModalOpen: boolean;
  tripEditModalOpen: boolean;
  requestModalOpen: boolean;

  tripCitySearch: string;
  cityName: string;
  cityId: string;
  countryName: string;

  toggleModal: () => void;
  toggleReportModal: () => void;
  toggleTripModal: any;
  toggleTripConfirmModal: () => void;
  toggleAddTripModal: () => void;
  toggleEditTripModal: () => void;

  toggleRequestModal: () => void;
  avatarModalOpen: boolean;
  toggleAvatarModal: () => void;
  togglePreviewAvatarModal: () => void;

  addTrip: () => void;
  editTrip: () => void;
  deleteTrip: () => void;
  gotoTrip: (cityName: string, cityId: string, countryName: string) => void;

  onSearchInputChange: (event: React.ChangeEvent<HTMLInputElement>) => void;

  uuid: string;

  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  search: string;
  tripList: any;

  onClickSearch: (cityId: string, cityName: string) => void;
  createCityLoading: boolean;
  uploadAvatarLoading: boolean;
  onChangeImage: (currentTarget) => void;
  onSubmitImage: (event) => void;
  imagePreviewUrl: string;
  removeImagePreviewUrl: () => void;
  markAsMainFn: any;
  logUserOut: () => void;
  logoutConfirmModal: boolean;
  toggleLogoutConfirmModal: () => void;
  slackReportUsers: (payload: string) => void;
  target: string;
  warningToast: (event: any) => void;
  formatDistance: any;
  deleteAvatarFn: any;
  countryModalOpen: boolean;
}

const UserProfilePresenter: React.FunctionComponent<IProps> = ({
  userProfileData: { userProfile: { user = null } = {} } = {},
  userProfileLoading,

  avatarsData: { getAvatars: { avatars = null } = {} } = {},
  avatarsLoading,

  getTripsData: { getTrips: { trip: getTrips = null } = {} } = {},
  getTipsLoading,

  modalOpen,
  reportModalOpen,
  avatarPreviewModalOpen,
  tripModalOpen,
  tripConfirmModalOpen,
  tripAddModalOpen,
  tripEditModalOpen,

  requestModalOpen,

  toggleModal,
  toggleReportModal,
  toggleTripModal,
  toggleTripConfirmModal,
  toggleAddTripModal,
  toggleEditTripModal,
  togglePreviewAvatarModal,

  toggleRequestModal,

  addTrip,
  editTrip,
  deleteTrip,
  gotoTrip,
  onSearchInputChange,
  tripCitySearch,
  cityName,
  cityId,
  countryName,
  uuid,
  search,
  onChange,
  tripList,

  onClickSearch,
  createCityLoading,
  uploadAvatarLoading,
  avatarModalOpen,
  toggleAvatarModal,
  onChangeImage,
  onSubmitImage,
  imagePreviewUrl,
  removeImagePreviewUrl,
  deleteAvatarFn,
  markAsMainFn,
  logUserOut,
  logoutConfirmModal,
  toggleLogoutConfirmModal,
  slackReportUsers,
  target,
  warningToast,
  formatDistance,
  countryModalOpen,
}) => {
  const REACT_APP_GOOGLE_PLACE_KEY = process.env.REACT_APP_GOOGLE_PLACE_KEY;
  const { results, isLoading } = useGoogleAutocomplete({
    apiKey: `${REACT_APP_GOOGLE_PLACE_KEY}`,
    query: tripCitySearch,
    options: {
      types: "(cities)",
      language: "en",
    },
  });
  if (userProfileLoading) {
    return <Loader />;
  } else if (user && avatars) {
    return (
      <>
        {(uploadAvatarLoading || avatarsLoading) && (
          <LoaderContainer>
            <LoaderModalOverlay />
            <LoadingOverlay
              active={true}
              spinner={<ClipLoader color={"#999"} />}
              fadeSpeed={500}
            />
          </LoaderContainer>
        )}
        {logoutConfirmModal && (
          <ConfirmModalContainer>
            <ConfirmModalOverlay onClick={toggleLogoutConfirmModal} />
            <ConfirmModal>
              <ConfirmModalLink onClick={logUserOut}>YES</ConfirmModalLink>
              <ConfirmModalLink onClick={toggleLogoutConfirmModal}>
                NO
              </ConfirmModalLink>
            </ConfirmModal>
          </ConfirmModalContainer>
        )}
        {avatarPreviewModalOpen && (
          <PreviewModalContainer>
            <ModalOverlay onClick={togglePreviewAvatarModal} />
            <AWrapper>
              <Img src={imagePreviewUrl} />
            </AWrapper>
          </PreviewModalContainer>
        )}
        {avatarModalOpen && (
          <AvatarModalContainer>
            <ModalOverlay onClick={(e) => onSubmitImage(e)} />
            <ModalAvatars>
              {user.isSelf && imagePreviewUrl.length === 0 && (
                <AvatarUploadIcon>
                  <Label htmlFor="file">
                    <Upload />
                  </Label>
                  <ImageInput
                    id="file"
                    type="file"
                    accept="image/*"
                    onChange={(e) => onChangeImage(e)}
                  />
                </AvatarUploadIcon>
              )}
              {user.isSelf && imagePreviewUrl.length !== 0 && (
                <AvatarKeyContainer>
                  <AvatarDeleteIcon onClick={removeImagePreviewUrl}>
                    <Delete />
                  </AvatarDeleteIcon>
                  <AvatarImage onClick={togglePreviewAvatarModal}>
                    <ModalAvatarImage src={imagePreviewUrl} />
                  </AvatarImage>
                </AvatarKeyContainer>
              )}
              {!avatarsLoading &&
                avatars &&
                avatars.length !== 0 &&
                avatars.map((avatar) => {
                  return (
                    <AvatarKeyContainer key={avatar.id}>
                      <AvatarImage>
                        {avatar.image ? (
                          <Link
                            to={{
                              pathname: `/${uuid}/${avatar.uuid}`,
                              state: { avatarModalOpen: true },
                            }}
                          >
                            <ModalAvatarImage
                              src={`${BACKEND_URL}/media/${avatar.thumbnail}`}
                            />
                          </Link>
                        ) : (
                          <ModalAvatarImage
                            src={`${BACKEND_URL}/media/${avatar.thumbnail}`}
                          />
                        )}
                      </AvatarImage>
                      {avatar.isMain && user.isSelf ? (
                        <RedPinIcon>
                          <RedPin />
                        </RedPinIcon>
                      ) : null}
                      {!avatar.isMain && user.isSelf ? (
                        <WhitePinIcon
                          onClick={() =>
                            markAsMainFn({
                              variables: { uuid: avatar.uuid },
                            })
                          }
                        >
                          <WhitePin />
                        </WhitePinIcon>
                      ) : null}
                      {!avatar.isMain && user.isSelf ? (
                        <AvatarDeleteIcon
                          onClick={() =>
                            deleteAvatarFn({ variables: { uuid: avatar.uuid } })
                          }
                        >
                          <Delete />
                        </AvatarDeleteIcon>
                      ) : null}
                    </AvatarKeyContainer>
                  );
                })}
            </ModalAvatars>
          </AvatarModalContainer>
        )}

        {modalOpen && (
          <ModalContainer>
            <ModalOverlay onClick={toggleModal} />
            <Modal>
              <ModalLinkContainer
                to={{
                  pathname: `/account/edit`,
                  state: {
                    username: user.username,
                    uuid: user.uuid,
                    isSelf: user.isSelf,
                    isDarkMode: user.isDarkMode,
                    isHideTrips: user.isHideTrips,
                    isHideCities: user.isHideCities,
                    isHideCountries: user.isHideCountries,
                    isHideContinents: user.isHideContinents,
                    isAutoLocationReport: user.isAutoLocationReport,
                    bio: user.bio,
                    gender: user.gender,
                    firstName: user.firstName,
                    lastName: user.lastName,
                    nationality: user.nationality,
                    residence: user.residence,
                    avatarUrl: user.avatarUrl,
                    countryPhoneNumber: user.countryPhoneNumber,
                    countryPhoneCode: user.countryPhoneCode,
                    phoneNumber: user.phoneNumber,
                    emailAddress: user.emailAddress,
                    isVerifiedPhoneNumber: user.isVerifiedPhoneNumber,
                    isVerifiedEmailAddress: user.isVerifiedEmailAddress,
                  },
                }}
              >
                EDIT PROFILE
              </ModalLinkContainer>
              <ModalLinkContainer
                to={{
                  pathname: `/account/settings`,
                  state: {
                    username: user.username,
                    uuid: user.uuid,
                    isSelf: user.isSelf,
                    isDarkMode: user.isDarkMode,
                    isHideTrips: user.isHideTrips,
                    isHideCities: user.isHideCities,
                    isHideCountries: user.isHideCountries,
                    isHideContinents: user.isHideContinents,
                    isAutoLocationReport: user.isAutoLocationReport,
                    bio: user.bio,
                    gender: user.gender,
                    firstName: user.firstName,
                    lastName: user.lastName,
                    nationality: user.nationality,
                    residence: user.residence,
                    avatarUrl: user.avatarUrl,
                    countryPhoneNumber: user.countryPhoneNumber,
                    countryPhoneCode: user.countryPhoneCode,
                    phoneNumber: user.phoneNumber,
                    emailAddress: user.emailAddress,
                    isVerifiedPhoneNumber: user.isVerifiedPhoneNumber,
                    isVerifiedEmailAddress: user.isVerifiedEmailAddress,
                  },
                }}
              >
                SETTINGS
              </ModalLinkContainer>
              <ModalLink onClick={toggleLogoutConfirmModal}>LOG OUT</ModalLink>
              <ModalLink onClick={toggleModal}>CANCEL</ModalLink>
            </Modal>
          </ModalContainer>
        )}
        {tripModalOpen && (
          <ModalContainer>
            <ModalOverlay onClick={toggleTripModal} />
            <Modal>
              <ModalLink
                onClick={() => gotoTrip(cityName, cityId, countryName)}
              >
                GOTO TRIP
              </ModalLink>
              <ModalLink onClick={toggleAddTripModal}>ADD TRIP</ModalLink>
              <ModalLink onClick={toggleEditTripModal}>EDIT TRIP</ModalLink>
              <ModalLink onClick={toggleTripConfirmModal}>
                DELETE TRIP
              </ModalLink>
              <ModalLink onClick={toggleTripModal}>CANCEL</ModalLink>
            </Modal>
          </ModalContainer>
        )}
        {reportModalOpen && (
          <ModalContainer>
            <ModalOverlay onClick={toggleReportModal} />
            <Modal>
              <ModalLink onClick={() => slackReportUsers("PHOTO")}>
                INAPPROPRIATE PHOTOS
              </ModalLink>
              <ModalLink onClick={() => slackReportUsers("SPAM")}>
                LOOKS LIKE SPAM
              </ModalLink>
              <ModalLink onClick={() => slackReportUsers("MESSAGE")}>
                INAPPROPRIATE MESSAGE
              </ModalLink>
              <ModalLink onClick={() => slackReportUsers("OTHER")}>
                OTHER
              </ModalLink>
              <ModalLink onClick={toggleReportModal}>CANCEL</ModalLink>
            </Modal>
          </ModalContainer>
        )}
        {tripConfirmModalOpen && (
          <ConfirmModalContainer>
            <ConfirmModalOverlay onClick={toggleTripConfirmModal} />
            <ConfirmModal>
              <ConfirmModalLink onClick={deleteTrip}>YES</ConfirmModalLink>
              <ConfirmModalLink onClick={toggleTripConfirmModal}>
                NO
              </ConfirmModalLink>
            </ConfirmModal>
          </ConfirmModalContainer>
        )}
        {tripAddModalOpen && (
          <TripModalContainer>
            <ModalOverlay onClick={addTrip} />
            <TripInputContainer>
              <SearchCitiesInput
                autoFocus={true}
                placeholder={"Search a City"}
                onChange={onSearchInputChange}
                value={tripCitySearch}
                onKeyUp={warningToast}
                autoComplete={"off"}
              />
              <TripModal>
                {createCityLoading || (isLoading && <Loader />)}
                {tripCitySearch.length > 0 &&
                  results.predictions &&
                  !createCityLoading &&
                  !isLoading &&
                  results.predictions.length > 0 &&
                  results.predictions.map((prediction) => (
                    <UserRow
                      key={prediction.id}
                      onClick={() =>
                        onClickSearch(
                          prediction.place_id,
                          prediction.structured_formatting.main_text
                        )
                      }
                    >
                      <TripSearchHeader>
                        <SAvatar size={"sm"} cityId={prediction.place_id} />
                        <HeaderColumn>
                          <HeaderText
                            text={prediction.structured_formatting.main_text}
                          />
                          <Location>
                            {prediction.structured_formatting.secondary_text
                              ? prediction.structured_formatting.secondary_text
                              : prediction.structured_formatting.main_text}
                          </Location>
                        </HeaderColumn>
                      </TripSearchHeader>
                    </UserRow>
                  ))}
              </TripModal>
            </TripInputContainer>
          </TripModalContainer>
        )}

        {tripEditModalOpen && (
          <TripModalContainer>
            <ModalOverlay onClick={editTrip} />
            <TripInputContainer>
              <SearchCitiesInput
                autoFocus={true}
                placeholder={cityName || "Search a City"}
                onChange={onSearchInputChange}
                value={tripCitySearch}
                onKeyUp={warningToast}
                autoComplete={"off"}
              />
              <TripModal>
                {createCityLoading || (isLoading && <Loader />)}
                {tripCitySearch.length > 0 &&
                  results.predictions &&
                  !createCityLoading &&
                  !isLoading &&
                  results.predictions.length > 0 &&
                  results.predictions.map((prediction) => (
                    <UserRow
                      key={prediction.id}
                      onClick={() =>
                        onClickSearch(
                          prediction.place_id,
                          prediction.structured_formatting.main_text
                        )
                      }
                    >
                      <TripSearchHeader>
                        <SAvatar size={"sm"} cityId={prediction.place_id} />
                        <HeaderColumn>
                          <HeaderText
                            text={prediction.structured_formatting.main_text}
                          />
                          <Location>
                            {prediction.structured_formatting.secondary_text
                              ? prediction.structured_formatting.secondary_text
                              : prediction.structured_formatting.main_text}
                          </Location>
                        </HeaderColumn>
                      </TripSearchHeader>
                    </UserRow>
                  ))}
              </TripModal>
            </TripInputContainer>
          </TripModalContainer>
        )}

        {/* 
        ////////////// HEADER //////////////
        */}
        <Header>
          <AvatarContainer>
            <PAvatar
              size="lg"
              url={user.avatarUrl}
              onClick={toggleAvatarModal}
            />
          </AvatarContainer>
          <BioContainer>
            <NameContainer>
              <Username>{user.username}</Username>
              {user.isSelf ? (
                <ListIcon onClick={toggleModal}>
                  <List />
                </ListIcon>
              ) : (
                <ListIcon onClick={toggleReportModal}>
                  <List />
                </ListIcon>
              )}
            </NameContainer>
            {user.bio && <Bio>{`${user.bio}`}</Bio>}
          </BioContainer>
        </Header>
        {/* 
        ////////////// BODY //////////////
        */}
        <SWrapper>
          <PHeader>
            <Helmet>
              <title>Profile | Pinner</title>
            </Helmet>
            <LocationAvatarContainer>
              <Link to={`/city/${user.currentCity.cityId}`}>
                <CAvatar
                  size="lg"
                  url={user.currentCity.cityPhoto}
                  city={true}
                />
              </Link>
            </LocationAvatarContainer>
            <Container>
              <InfoContainer>
                {user.gender && (
                  <Row>
                    {(() => {
                      switch (user.gender) {
                        case "MALE":
                          return <VBold text={"M"} />;
                        case "FEMALE":
                          return <VBold text={"F"} />;
                        case "OTHER":
                          return <VBold text={"O"} />;
                        default:
                          return null;
                      }
                    })()}
                    <UBold text={"GENDER"} />
                  </Row>
                )}
                {user.distance !== 0 && (
                  <Row>
                    <VBold text={formatDistance(user.distance)} />
                    <UBold text={"KM"} />
                  </Row>
                )}
                <Row>
                  <VBold text={String(user.tripCount)} />
                  <UBold text={"TRIPS"} />
                </Row>
                {user.isHideCities ? (
                  <Row>
                    <VBold text={String(user.cityCount)} />
                    {user.cityCount === 1 ? (
                      <GreyUBold text={"CITY🔒"} />
                    ) : (
                      <GreyUBold text={"CITIES🔒"} />
                    )}
                  </Row>
                ) : (
                  <Row>
                    <Link
                      to={{
                        pathname: `/${uuid}/cities`,
                        state: { cityModalOpen: true },
                      }}
                    >
                      <VBold text={String(user.cityCount)} />
                      {user.cityCount === 1 ? (
                        <UBold text={"CITY"} />
                      ) : (
                        <UBold text={"CITIES"} />
                      )}
                    </Link>
                  </Row>
                )}
                {user.isHideCountries ? (
                  <Row>
                    <VBold text={String(user.countryCount)} />
                    {user.countryCount === 1 ? (
                      <GreyUBold text={"COUNTRY🔒"} />
                    ) : (
                      <GreyUBold text={"COUNTRIES🔒"} />
                    )}
                  </Row>
                ) : (
                  <Row>
                    <Link
                      to={{
                        pathname: `/${uuid}/countries`,
                        state: { countryModalOpen: true },
                      }}
                    >
                      <VBold text={String(user.countryCount)} />
                      {user.countryCount === 1 ? (
                        <UBold text={"COUNTRY"} />
                      ) : (
                        <UBold text={"COUNTRIES"} />
                      )}
                    </Link>
                  </Row>
                )}
                {user.isHideContinents ? (
                  <Row>
                    <VBold text={String(user.continentCount)} />
                    {user.continentCount === 1 ? (
                      <GreyUBold text={"CONTINENT🔒"} />
                    ) : (
                      <GreyUBold text={"CONTINENTS🔒"} />
                    )}
                  </Row>
                ) : (
                  <Row>
                    <Link
                      to={{
                        pathname: `/${uuid}/continents`,
                        state: { continentModalOpen: true },
                      }}
                    >
                      <VBold text={String(user.continentCount)} />
                      {user.continentCount === 1 ? (
                        <UBold text={"CONTINENT"} />
                      ) : (
                        <UBold text={"CONTINENTS"} />
                      )}
                    </Link>
                  </Row>
                )}
                {user.nationality && (
                  <Row>
                    <Link to={`/country/${user.nationality.countryCode}`}>
                      <VBold text={String(user.nationality.countryEmoji)} />
                      <UBold text={"NATIONALITY"} />
                    </Link>
                  </Row>
                )}
                {user.residence && (
                  <Row>
                    <Link to={`/country/${user.residence.countryCode}`}>
                      <VBold text={String(user.residence.countryEmoji)} />
                      <UBold text={"RESIDENCE"} />
                    </Link>
                  </Row>
                )}
              </InfoContainer>
              {!user.isSelf && user.isHideTrips ? (
                <EmptyContainer>
                  <HideEarth
                    src={require(`../../../Images/animations/hideTrip.png`)}
                  />
                  Trips are hideen by {user.username}
                </EmptyContainer>
              ) : (
                <TripContainer>
                  <UserNameRow>
                    <SText text={"TRIPS"} />
                    <TripInput
                      placeholder="Search city"
                      value={search}
                      onChange={onChange}
                    />
                  </UserNameRow>
                  {user.isSelf && (
                    <TripIcon onClick={toggleAddTripModal}>
                      <Upload />
                    </TripIcon>
                  )}
                  {tripList.length !== 0 &&
                    tripList.map((trip) => (
                      <TripRow key={trip.id}>
                        <THeader
                          onClick={() =>
                            gotoTrip(
                              trip.city.cityName,
                              trip.city.cityId,
                              trip.city.country.countryName
                            )
                          }
                        >
                          <SAvatar
                            size={"sm"}
                            url={trip.city.cityThumbnail}
                            city={true}
                          />
                          <HeaderColumn>
                            <HeaderText text={trip.city.cityName} />
                            <Location>{trip.city.country.countryName}</Location>
                          </HeaderColumn>
                        </THeader>
                        <TripOverlay
                          onClick={() => {
                            user.isSelf
                              ? toggleTripModal(
                                  trip.id,
                                  trip.city.cityName,
                                  trip.city.cityId,
                                  trip.city.country.countryName
                                )
                              : gotoTrip(
                                  trip.city.cityName,
                                  trip.city.cityId,
                                  trip.city.country.countryName
                                );
                          }}
                        >
                          <List />
                        </TripOverlay>
                      </TripRow>
                    ))}
                  {tripList.length === 0 &&
                    !search &&
                    getTrips &&
                    getTrips.map((trip) => (
                      <TripRow key={trip.id}>
                        <THeader
                          onClick={() =>
                            gotoTrip(
                              trip.city.cityName,
                              trip.city.cityId,
                              trip.city.country.countryName
                            )
                          }
                        >
                          <SAvatar
                            size={"sm"}
                            url={trip.city.cityThumbnail}
                            city={true}
                          />
                          <HeaderColumn>
                            <HeaderText text={trip.city.cityName} />
                            <Location>{trip.city.country.countryName}</Location>
                          </HeaderColumn>
                        </THeader>

                        <TripOverlay
                          onClick={() => {
                            user.isSelf
                              ? toggleTripModal(
                                  trip.id,
                                  trip.city.cityName,
                                  trip.city.cityId,
                                  trip.city.country.countryName
                                )
                              : gotoTrip(
                                  trip.city.cityName,
                                  trip.city.cityId,
                                  trip.city.country.countryName
                                );
                          }}
                        >
                          <List />
                        </TripOverlay>
                      </TripRow>
                    ))}
                </TripContainer>
              )}
            </Container>
          </PHeader>
        </SWrapper>
      </>
    );
  }
  return null;
};

export default UserProfilePresenter;
