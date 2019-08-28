import React from "react";
import styled, { keyframes } from "../../../Styles/typed-components";
import "react-dates/initialize";
import "react-dates/lib/css/_datepicker.css";
import { countries } from "../../../countryData";
import Textarea from "react-expanding-textarea";

import Avatar from "../../../Components/Avatar";
import { BACKEND_URL } from "src/constants";
import { Link } from "react-router-dom";
import Button from "src/Components/Button";
import { Upload, Delete, RedPin, WhitePin, Check } from "../../../Icons";
import { MutationFn } from "react-apollo";
import ReactCodeInput from "react-code-input";
import LoadingOverlay from "react-loading-overlay";
import ClipLoader from "react-spinners/ClipLoader";
import Helmet from "react-helmet";

const PAvatar = styled(Avatar)`
  display: flex;
  margin-left: 20px;
  align-self: center;
  box-shadow: 0.5px 0.5px 30px 30px ${props => props.theme.shadowColor};
  -webkit-box-shadow: 0.5px 0.5px 30px 30px ${props => props.theme.shadowColor};
  -moz-box-shadow: 0.5px 0.5px 30px 30px ${props => props.theme.shadowColor};
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

const PhoneVerifyModal = styled(EditPhoneModal)`
  z-index: 15;
`;

const ModalContainer = styled.div`
  z-index: 8;
  display: flex;
  justify-content: center;
  align-items: center;
  position: fixed;
  height: 100%;
  width: 100%;
`;

const LoaderContainer = styled(ModalContainer)`
  z-index: 20;
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

const LoaderModalOverlay = styled(ModalOverlay)`
  z-index: 21;
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

const ConfirmModalLink = styled(ModalLink)`
  cursor: none;
`;

const ModalInputContainer = styled.div`
  min-height: 50px;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 25px 25px 0px 25px;
  display: flex;
  flex-direction: column;
  height: 120px;
`;

const Input = styled.input`
  display: flex;
  width: 250px;
  z-index: 2;
  border: 0;
  border-bottom: 1px solid ${props => props.theme.greyColor};
  color: ${props => props.theme.color};
  background-color: transparent;
  font-size: 18px;
  font-weight: 100;
  &:focus {
    outline: none;
  }
  &::placeholder {
    color: ${props => props.theme.greyColor};
  }
`;

const EmailInput = styled(Input)`
  max-width: 285px;
`;

const UsernameInput = styled(Input)`
  ime-mode: disabled;
`;

const Select = styled.select`
  height: 35px;
  display: flex;
  width: 250px;
  font-size: 18px;
  font-weight: 100;
  border-bottom: 1px solid ${props => props.theme.greyColor};
  color: ${props => props.theme.color};
  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;
  background-color: transparent;
  border: none;
  cursor: pointer;
`;

const Option = styled.option``;

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

const MenuText = styled.p`
  font-size: 18px;
  font-weight: 100px;
  margin-bottom: 15px;
  cursor: pointer;
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

const TitleText = styled.p`
  display: flex;
  align-self: center;
  font-size: 18px;
  font-weight: 100;
`;

const ExplainText = styled.p`
  font-size: 12px;
  font-weight: 100;
  margin-bottom: 15px;
  line-height: 15px;
`;

const Conatainer = styled.div`
  height: 35px;
  display: flex;
  justify-content: space-between;
  align-content: center;
  flex-wrap: nowrap;
  @media screen and (max-width: 831px) {
    min-width: 300px;
  }
`;

const AvatarConatainer = styled(Conatainer)`
  display: flex;
  height: 200px;
  justify-content: center;
  align-content: center;
  margin: 20px 0px 40px 0px;
`;

const DeleteConatainer = styled.div`
  border: 1px solid ${props => props.theme.borderColor};
  padding: 10px 15px 4px 15px;
  margin-top: 30px;
  margin-bottom: 45px;
`;

const DConatainer = styled(Conatainer)`
  width: 100%;
`;

const SButton = styled(Button)`
  display: flex;
  width: 120px;
  align-self: center;
`;

const DButton = styled.button`
  width: 120px;
  height: 19px;
  display: flex;
  padding: 2px;
  justify-content: center;
  align-self: center;
  border: 0;
  color: white;
  background-color: ${props => props.theme.blueColor};
  opacity: 0.8;
  font-weight: 600;
  border-radius: 4px;
  font-size: 12px;
  cursor: pointer;
`;

const ConfirmText = styled.p`
  font-size: 18px;
  font-weight: 400;
  margin-bottom: 15px;
`;

const GreyText = styled(MenuText)`
  color: grey;
  &:hover {
    color: ${props => props.theme.color};
  }
`;

const PreviewModalContainer = styled(ModalContainer)`
  z-index: 11;
`;

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

const AvatarModalContainer = styled(ModalContainer)`
  z-index: 10;
`;

const ModalAvatars = styled.div`
  z-index: 10;
  margin-top: 85px;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-template-rows: repeat(auto-fit, 300px);
  grid-gap: 10px;
  justify-content: center;
  align-items: center;
  animation: ${ModalAnimation} 0.1s linear;
  max-height: calc(100vh - 10px);
  height: auto;
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
    fill: ${props => props.theme.iconColor};
    transition: fill 0.2s ease-in-out;
    &:hover {
      fill: ${props => props.theme.hoverColor};
    }
  }
`;

const Label = styled.label``;

const ImageInput = styled.input`
  display: none;
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

const AvatarDeleteIcon = styled.div`
  z-index: 20;
  position: absolute;
  top: 10px;
  right: 10px;
  cursor: pointer;
  svg {
    opacity: 0;
    transition: all 0.1s ease-in-out;
    fill: ${props => props.theme.whiteColor};
  }
`;

const AvatarImage = styled.div``;

const ModalAvatarImage = styled.img`
  z-index: 10;
  height: 300px;
  width: 300px;
  object-fit: cover;
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
    fill: ${props => props.theme.whiteColor};
  }
`;

const CheckIcon = styled.div`
  display: flex;
  width: 250px;
  justify-content: flex-end;
  svg {
    fill: ${props => props.theme.iconColor};
  }
`;

const Underline = styled.span`
  text-decoration: underline;
  cursor: pointer;
`;

const SearchModalContainer = styled(ModalContainer)`
  z-index: 10;
`;
const SearchModalOverlay = styled(ModalOverlay)`
  z-index: 10;
`;

const PhoneVerifyModalContainer = styled(ModalContainer)`
  z-index: 15;
`;
const PhoneVerifyModalOverlay = styled(ModalOverlay)`
  z-index: 14;
`;
const EditPhoneModalContainer = styled(ModalContainer)`
  z-index: 5;
`;
const EditPhoneModalOverlay = styled(ModalOverlay)`
  z-index: 4;
`;
const SearchModal = styled(EditPhoneModal)`
  padding: 30px;
  height: 700px;
  z-index: 10;
`;

const CountryRow = styled.div`
  z-index: 10;
  height: 40px;
  width: 480px;
  font-size: 18px;
  display: flex;
  justify-content: space-between;
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

const NumberUnderline = styled.div`
  display: flex;
  width: 250px;
  font-size: 18px;
  font-weight: 100;
  align-items: center;
  border-bottom: 1px solid ${props => props.theme.greyColor};
`;

const Container = styled.div`
  display: grid;
  grid-gap: 20px;
  grid-template-rows: 2 40px;
  justify-items: center;
  align-items: center;
  padding: 20px;
  height: 100%;
`;

const PhoneNumberContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: baseline;
`;

const EmailAddressContainer = styled(PhoneNumberContainer)`
  border-bottom: 1px solid ${props => props.theme.greyColor};
`;

const Form = styled.form``;

const CountryCode = styled.div`
  font-size: 18px;
  margin-right: 12px;
  cursor: pointer;
`;

const CountryPhone = styled.div`
  display: flex;
  flex-direction: row;
  align-items: baseline;
  border-bottom: 1px solid ${props => props.theme.greyColor};
  font-size: 18px;
`;

const CountryPhoneNumber = styled.div`
  cursor: pointer;
  font-size: 18px;
`;

const BaseForm = styled.form``;

const PhoneNumberInput = styled.input`
  border: 0;
  display: flex;
  color: ${props => props.theme.color};
  background-color: transparent;
  font-size: 18px;
  &:focus {
    outline: none;
  }
  &::placeholder {
    color: ${props => props.theme.greyColor};
  }
`;

const TextContainter = styled.div`
  margin: 0 10px 0 10px;
  line-height: 13px;
`;

const ExtendedForm = styled(BaseForm)`
  padding: 0px 40px;
  display: flex;
  flex-flow: column wrap;
  justify-content: center;
  align-items: center;
`;

const CenterText = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const STextArea = styled(Textarea)`
  display: flex;
  border: 0;
  resize: none;
  font-size: 12px;
  font-weight: 100;
  padding: 10px 15px 4px 15px;
  color: ${props => props.theme.color};
  margin-bottom: 10px;
  border: 1px solid ${props => props.theme.borderColor};
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

const CodeInputStyle = {
  fontFamily: "monospace",
  borderRadius: "6px",
  border: "1px solid lightgrey",
  boxShadow: "rgba(0, 0, 0, 0.1) 0px 0px 10px 0px",
  margin: "4px",
  paddingLeft: "12px",
  width: "44px",
  height: "50px",
  fontSize: "32px",
  boxSizing: "border-box",
  color: "rgba(0,0,0,.65)",
  backgroundColor: "white"
};

interface IProps {
  phoneLoading: boolean;
  uploadAvatarLoading: boolean;
  emailLoading: boolean;
  avatarsData: any;
  avatarsLoading: boolean;
  deleteConfirmModalOpen: boolean;
  logoutConfirmModalOpen: boolean;
  toggleDeleteConfirmModal: () => void;
  toggleLogoutConfirmModal: () => void;
  editPhoneNumberModalOpen: boolean;
  editEmailAddressModalOpen: boolean;
  verifyPhoneNumberModalOpen: boolean;
  verifyEmailAddressModalOpen: boolean;
  toggleEditPhoneNumberModal: () => void;
  toggleEditEmailAddressModal: () => void;
  deleteProfile: () => void;
  onInputChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onInputUsernameChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onSelectChange: (
    event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => void;
  logUserOut: () => void;

  imagePreviewUrl: string;

  avatarPreviewModalOpen: boolean;
  avatarModalOpen: boolean;

  toggleAvatarModal: () => void;
  togglePreviewAvatarModal: () => void;
  onChangeImage: (currentTarget) => void;
  onSubmitImage: (event) => void;
  removeImagePreviewUrl: () => void;
  deleteAvatarFn: MutationFn;

  isSelf: boolean;
  isDarkMode: boolean;
  isHideTrips: boolean;
  isHideCoffees: boolean;
  isHideCities: boolean;
  isHideCountries: boolean;
  isHideContinents: boolean;
  isAutoLocationReport: boolean;

  username: string;
  bio: string;
  gender: string;
  firstName: string;
  lastName: string;
  nationalityCode: string;
  residenceCode: string;
  avatarUrl: string;
  phoneNumber: string;
  countryPhoneNumber: string;
  countryPhoneCode: string;
  emailAddress: string;
  newEmailAddress: string;
  isVerifiedPhoneNumber: boolean;
  isVerifiedEmailAddress: boolean;
  confirmUsername: string;
  countryModalOpen: boolean;
  toggleCountryModal: () => void;
  newUsername: string;
  newPhoneNumber: string;
  newCountryPhoneCode: string;
  newCountryPhoneNumber: string;

  onSelectCountry: (
    countryPhoneNumber: string,
    countryPhoneCode: string
  ) => void;
  back: (event: any) => void;
  onSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
  onSubmitPhoneNumber: (event: React.FormEvent<HTMLFormElement>) => void;
  onSubmitEmailAddress: (event: React.FormEvent<HTMLFormElement>) => void;
  verificationKey: string;
  onSubmitVerifyPhone: (event: React.FormEvent<HTMLFormElement>) => void;
  onChangeVerifyPhone: (event: React.ChangeEvent<HTMLInputElement>) => void;
  closeVerifyPhoneNumberModal: () => void;
  closeVerifyEmailAddressModal: () => void;
  toggleVerifyEmailAddressModal: () => void;
  markAsMain: (uuid: string, avatarUrl: string) => void;
}

const EditProfilePresenter: React.FunctionComponent<IProps> = ({
  phoneLoading,
  uploadAvatarLoading,
  emailLoading,
  avatarsData: { getAvatars: { avatars = null } = {} } = {},
  avatarsLoading,
  deleteConfirmModalOpen,
  logoutConfirmModalOpen,
  toggleDeleteConfirmModal,
  toggleLogoutConfirmModal,
  editPhoneNumberModalOpen,
  editEmailAddressModalOpen,
  verifyPhoneNumberModalOpen,
  verifyEmailAddressModalOpen,
  toggleEditPhoneNumberModal,
  toggleEditEmailAddressModal,
  newUsername,
  newPhoneNumber,
  newCountryPhoneCode,
  newCountryPhoneNumber,

  deleteProfile,
  onInputChange,
  onInputUsernameChange,
  onSelectChange,
  logUserOut,

  avatarPreviewModalOpen,
  toggleAvatarModal,
  togglePreviewAvatarModal,
  imagePreviewUrl,
  avatarModalOpen,
  onChangeImage,
  onSubmitImage,
  removeImagePreviewUrl,
  deleteAvatarFn,

  isSelf,
  isDarkMode,
  isHideTrips,
  isHideCoffees,
  isHideCities,
  isHideCountries,
  isHideContinents,
  isAutoLocationReport,

  username,
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
  newEmailAddress,
  isVerifiedPhoneNumber,
  isVerifiedEmailAddress,
  confirmUsername,
  countryModalOpen,
  toggleCountryModal,
  onSelectCountry,
  back,
  onSubmit,
  onSubmitPhoneNumber,
  onSubmitEmailAddress,

  verificationKey,
  onSubmitVerifyPhone,
  onChangeVerifyPhone,
  closeVerifyPhoneNumberModal,
  closeVerifyEmailAddressModal,
  toggleVerifyEmailAddressModal,
  markAsMain
}) => {
  return (
    <>
      {(phoneLoading ||
        uploadAvatarLoading ||
        avatarsLoading ||
        emailLoading) && (
        <LoaderContainer>
          <LoaderModalOverlay />
          <LoadingOverlay
            active={true}
            spinner={<ClipLoader color={"#999"} />}
            fadeSpeed={500}
          />
        </LoaderContainer>
      )}
      {verifyEmailAddressModalOpen && (
        <PhoneVerifyModalContainer>
          <PhoneVerifyModalOverlay onClick={closeVerifyEmailAddressModal} />
          <PhoneVerifyModal>
            <Container>
              <TextContainter>
                <CenterText>
                  <p>Check your email</p>
                  <br />
                  <br />
                  <p>&nbsp;{newEmailAddress}, an email has been sent</p>
                  <p>
                    Please check your email in a moment to verify email address.
                  </p>
                  <br />
                  <p>Didn't receive a link?</p>
                  <br />
                  <Underline onClick={toggleVerifyEmailAddressModal}>
                    &nbsp;Use a different email
                  </Underline>
                </CenterText>
              </TextContainter>
            </Container>
          </PhoneVerifyModal>
        </PhoneVerifyModalContainer>
      )}
      {editEmailAddressModalOpen && (
        <EditPhoneModalContainer>
          <EditPhoneModalOverlay onClick={toggleEditEmailAddressModal} />
          <EditPhoneModal>
            <Container>
              <EmailAddressContainer>
                <Form onSubmit={onSubmitEmailAddress}>
                  <EmailInput
                    type={"email"}
                    autoFocus={true}
                    value={newEmailAddress}
                    name={"newEmailAddress"}
                    onChange={onInputChange}
                    autoComplete={"off"}
                  />
                </Form>
              </EmailAddressContainer>
              <TextContainter>
                <p>We'll email you a link that will instantly log you in.</p>
                <br />
                <ExtendedForm onSubmit={onSubmitEmailAddress}>
                  <SButton text={"CONTINUE"} onClick={null} />
                </ExtendedForm>
              </TextContainter>
            </Container>
          </EditPhoneModal>
        </EditPhoneModalContainer>
      )}
      {verifyPhoneNumberModalOpen && (
        <PhoneVerifyModalContainer>
          <PhoneVerifyModalOverlay onClick={closeVerifyPhoneNumberModal} />
          <PhoneVerifyModal>
            <Container>
              <ReactCodeInput
                type={"number"}
                value={verificationKey}
                autoFocus={true}
                fields={6}
                onChange={onChangeVerifyPhone}
                inputStyle={CodeInputStyle}
              />
              <TextContainter>
                <ExplainText>
                  When you tap Continue, Pinner will send a text with
                  verification code. Message and data rates may apply. The
                  verified phone number can be used to login.
                </ExplainText>
                <ExtendedForm onSubmit={onSubmitVerifyPhone}>
                  <SButton text={"VERIFY"} onClick={null} />
                </ExtendedForm>
              </TextContainter>
            </Container>
          </PhoneVerifyModal>
        </PhoneVerifyModalContainer>
      )}
      {editPhoneNumberModalOpen && (
        <EditPhoneModalContainer>
          <EditPhoneModalOverlay onClick={toggleEditPhoneNumberModal} />
          <EditPhoneModal>
            <Container>
              <PhoneNumberContainer>
                <CountryCode onClick={toggleCountryModal}>
                  {newCountryPhoneCode}
                </CountryCode>
                <CountryPhone>
                  <CountryPhoneNumber onClick={toggleCountryModal}>
                    &nbsp;{newCountryPhoneNumber}&nbsp;
                  </CountryPhoneNumber>
                  <BaseForm onSubmit={onSubmitPhoneNumber}>
                    <PhoneNumberInput
                      type={"number"}
                      autoFocus={true}
                      value={newPhoneNumber}
                      name={"newPhoneNumber"}
                      onChange={onInputChange}
                      autoComplete={"off"}
                    />
                  </BaseForm>
                </CountryPhone>
              </PhoneNumberContainer>
              <TextContainter>
                <ExplainText>
                  When you tap Continue, Pinner will send a text with
                  verification code. Message and data rates may apply. The
                  verified phone number can be used to login.
                </ExplainText>
                <ExtendedForm onSubmit={onSubmitPhoneNumber}>
                  <SButton text={"CONTINUE"} onClick={null} />
                </ExtendedForm>
              </TextContainter>
            </Container>
          </EditPhoneModal>
        </EditPhoneModalContainer>
      )}

      {countryModalOpen && (
        <SearchModalContainer>
          <SearchModalOverlay onClick={toggleCountryModal} />
          <SearchModal>
            <CountryContainer>
              {countries.map((country, index) => (
                <CountryRow
                  key={index}
                  onClick={() => onSelectCountry(country.phone, country.code)}
                >
                  <CountryText>
                    <p>&nbsp;{country.name}</p>
                    <p>&nbsp;{country.emoji}</p>
                  </CountryText>
                  <CountryText> {country.phone}</CountryText>
                </CountryRow>
              ))}
            </CountryContainer>
          </SearchModal>
        </SearchModalContainer>
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
          <ModalOverlay onClick={e => onSubmitImage(e)} />
          <ModalAvatars>
            {isSelf && imagePreviewUrl.length === 0 && (
              <AvatarUploadIcon>
                <Label htmlFor="file">
                  <Upload />
                </Label>
                <ImageInput
                  id="file"
                  type="file"
                  accept="image/*"
                  onChange={e => onChangeImage(e)}
                />
              </AvatarUploadIcon>
            )}
            {isSelf && imagePreviewUrl.length !== 0 && (
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
              avatars.map(avatarS => {
                return (
                  <AvatarKeyContainer key={avatarS.id}>
                    <AvatarImage>
                      <Link
                        to={{
                          pathname: `/${username}/${avatarS.uuid}`,
                          state: { avatarModalOpen: true }
                        }}
                      >
                        <ModalAvatarImage
                          src={`${BACKEND_URL}/media/${avatarS.thumbnail}`}
                        />
                      </Link>
                    </AvatarImage>
                    {avatarS.isMain && isSelf ? (
                      <RedPinIcon>
                        <RedPin />
                      </RedPinIcon>
                    ) : null}
                    {!avatarS.isMain && isSelf ? (
                      <WhitePinIcon
                        onClick={() =>
                          markAsMain(avatarS.uuid, avatarS.thumbnail)
                        }
                      >
                        <WhitePin />
                      </WhitePinIcon>
                    ) : null}
                    {!avatarS.isMain && isSelf ? (
                      <AvatarDeleteIcon
                        onClick={() =>
                          deleteAvatarFn({
                            variables: { uuid: avatarS.uuid }
                          })
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
      {deleteConfirmModalOpen && (
        <ModalContainer>
          <ModalOverlay onClick={toggleDeleteConfirmModal} />
          <Modal>
            <ModalInputContainer>
              <ConfirmText>Are you absolutely sure?</ConfirmText>

              <ExplainText>
                This action cannot be undone. This will permanently delete the
                plusbeauxjours account, comments, trip history, and remove all
                photos. Please type in the name of your username to confirm.
              </ExplainText>
            </ModalInputContainer>

            {username === confirmUsername ? (
              <ModalLink onClick={deleteProfile}>YES</ModalLink>
            ) : (
              <ConfirmModalLink>
                <Input
                  onChange={onInputChange}
                  type={"text"}
                  value={confirmUsername}
                  name={"confirmUsername"}
                  autoFocus={true}
                  autoComplete={"off"}
                />
              </ConfirmModalLink>
            )}

            <ModalLink onClick={toggleDeleteConfirmModal}>NO</ModalLink>
          </Modal>
        </ModalContainer>
      )}
      {logoutConfirmModalOpen && (
        <ModalContainer>
          <ModalOverlay onClick={toggleLogoutConfirmModal} />
          <ConfirmModal>
            <ModalLink onClick={logUserOut}>YES</ModalLink>
            <ModalLink onClick={toggleLogoutConfirmModal}>NO</ModalLink>
          </ConfirmModal>
        </ModalContainer>
      )}
      {/* 
        ////////////// BODY //////////////
        */}
      <Wrapper>
        <Helmet>
          <title>Edit Profile | Pinner</title>
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
            <MenuText>EDIT PROFILE</MenuText>
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
            <GreyText>SETTINGS</GreyText>
          </Link>
          <GreyText onClick={toggleLogoutConfirmModal}>LOGOUT</GreyText>
          <GreyText onClick={back}>CANCEL</GreyText>
        </MenuColumn>
        <GreyLine />
        <Column>
          <AvatarConatainer>
            <PAvatar size="lg" url={avatarUrl} onClick={toggleAvatarModal} />
          </AvatarConatainer>
          <Conatainer>
            <TitleText>USERNAME</TitleText>
            <UsernameInput
              onChange={onInputUsernameChange}
              type={"text"}
              value={newUsername}
              placeholder={newUsername || "Username"}
              name={"newUsername"}
              autoComplete={"off"}
            />
          </Conatainer>
          <ExplainText>
            Default username is automatically generated. Set your own username
            here. <br />
            Your username cannot be any combination of numbers or symbols.{" "}
          </ExplainText>
          <Conatainer>
            <TitleText>NATIONALITY</TitleText>
            <Select
              value={nationalityCode}
              name={"nationalityCode"}
              onChange={onSelectChange}
            >
              {countries.map((country, index) => (
                <Option key={index} value={country.code}>
                  {country.emoji} {country.name}
                </Option>
              ))}
            </Select>
          </Conatainer>
          <ExplainText>Your Nationality to match</ExplainText>
          <Conatainer>
            <TitleText>RESIDENCE</TitleText>
            <Select
              value={residenceCode}
              name={"residenceCode"}
              onChange={onSelectChange}
            >
              {countries.map((country, index) => (
                <Option key={index} value={country.code}>
                  {country.emoji} {country.name}
                </Option>
              ))}
            </Select>
          </Conatainer>
          <ExplainText>Your Residence to match</ExplainText>
          <Conatainer>
            <TitleText>GENDER</TitleText>
            <Select value={gender} name={"gender"} onChange={onSelectChange}>
              <Option value={"MALE"}>Male</Option>
              <Option value={"FEMALE"}>Female</Option>
              <Option value={"OTHER"}>OTHER</Option>
            </Select>
          </Conatainer>
          <ExplainText>Your gender to match</ExplainText>
          <Conatainer>
            <TitleText>FIRST NAME</TitleText>
            <Input
              onChange={onInputChange}
              type={"text"}
              value={firstName}
              placeholder={firstName || "First Name"}
              name={"firstName"}
              autoComplete={"off"}
            />
          </Conatainer>
          <ExplainText>Your first name</ExplainText>
          <Conatainer>
            <TitleText>LAST NAME</TitleText>
            <Input
              onChange={onInputChange}
              type={"text"}
              value={lastName}
              placeholder={lastName || "Last Name"}
              name={"lastName"}
              autoComplete={"off"}
            />
          </Conatainer>
          <ExplainText>Your last name</ExplainText>
          <Conatainer>
            <TitleText>BIO</TitleText>
          </Conatainer>
          <ExplainText>
            Your bio is displayed on your profile. You can write about who you
            are and what you're looking for on Pinner. <br />
            You can also add links to your website and profiles on other
            websites, like Instagram or your blog for example.
          </ExplainText>
          <STextArea
            placeholder="..."
            onChange={onInputChange}
            value={bio}
            name={"bio"}
            autoComplete={"off"}
          />
          <Conatainer>
            <TitleText>PHONE</TitleText>
            <NumberUnderline>
              {countryPhoneCode && countryPhoneNumber && (
                <>
                  {countryPhoneCode}&nbsp;
                  {countryPhoneNumber}&nbsp;
                  {phoneNumber}
                </>
              )}
              {isVerifiedPhoneNumber && (
                <CheckIcon>
                  <Check />
                </CheckIcon>
              )}
            </NumberUnderline>
          </Conatainer>
          {isVerifiedPhoneNumber ? (
            <ExplainText>
              Your phone number in{" "}
              {countries.find(i => i.code === countryPhoneCode).name}
              {countries.find(i => i.code === countryPhoneCode).emoji}&nbsp; is
              already verified. <br />
              If you want to change your phone number,&nbsp;
              <Underline onClick={toggleEditPhoneNumberModal}>
                click here
              </Underline>
              &nbsp; to verify again.
            </ExplainText>
          ) : (
            <ExplainText>
              <Underline onClick={toggleEditPhoneNumberModal}>
                click here
              </Underline>
              &nbsp; to verify your phone number to login.
            </ExplainText>
          )}
          <Conatainer>
            <TitleText>EMAIL</TitleText>
            <NumberUnderline>
              {emailAddress}
              {isVerifiedEmailAddress && (
                <CheckIcon>
                  <Check />
                </CheckIcon>
              )}
            </NumberUnderline>
          </Conatainer>
          {isVerifiedEmailAddress ? (
            <ExplainText>
              Your email address is already verified. If you want to change your
              email address,&nbsp;
              <Underline onClick={toggleEditEmailAddressModal}>
                click here
              </Underline>
              &nbsp; to verify again.
            </ExplainText>
          ) : (
            <ExplainText>
              <Underline onClick={toggleEditEmailAddressModal}>
                click here
              </Underline>
              &nbsp; to verify your email address to login.
            </ExplainText>
          )}
          <DeleteConatainer>
            <DConatainer>
              <TitleText>DELETE PROFILE</TitleText>
              <DButton onClick={toggleDeleteConfirmModal}>
                DELETE PROFILE
              </DButton>
            </DConatainer>
            <ExplainText>
              Once you delete an account, there is no going back. Please be
              certain.
            </ExplainText>
          </DeleteConatainer>
          <SButton text={"SUBMIT"} onClick={onSubmit} />
        </Column>
      </Wrapper>
    </>
  );
};

export default EditProfilePresenter;
