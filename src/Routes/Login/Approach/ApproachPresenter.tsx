import React from "react";
import Helmet from "react-helmet";
import styled from "src/Styles/typed-components";
import { keyframes } from "styled-components";
import Button from "../../../Components/Button";
import { countries } from "../../../countryData";
import LoadingOverlay from "react-loading-overlay";
import ClipLoader from "react-spinners/ClipLoader";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 20px;
  height: 100%;
`;

const Form = styled.form``;

const ModalContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  position: fixed;
  height: 100%;
  width: 100%;
`;

const ModalOverlay = styled.div`
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
  border-radius: 12px;
  width: 540px;
  height: 240px;
  z-index: 5;
  animation: ${ModalAnimation} 0.1s linear;
`;

const SearchModal = styled(Modal)`
  padding: 30px;
  height: 700px;
  z-index: 10;
`;

const SButton = styled(Button)`
  width: 80px;
  margin-top: 20px;
`;

const ExtendedForm = styled(Form)`
  padding: 0px 40px;
  display: flex;
  flex-flow: column wrap;
  justify-content: center;
  align-items: center;
`;

const PhoneNumberContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: flex-end;
  align-items: baseline;
`;

const EmailAddressContainer = styled(PhoneNumberContainer)`
  border-bottom: 1px solid ${props => props.theme.greyColor};
`;

const Text = styled.div`
  text-align: inline;
  display: flex;
  justify-content: center;
  margin-top: 10px;
  margin-bottom: 30px;
`;

const TextContainter = styled.div`
  margin: 0 10px 0 10px;
  line-height: 13px;
`;

const CenterText = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

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

const Input = styled.input`
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

const EmailInput = styled(Input)`
  width: 285px;
`;

const SearchModalContainer = styled(ModalContainer)`
  z-index: 10;
`;
const SearchModalOverlay = styled(ModalOverlay)`
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

const Underline = styled.p`
  text-decoration: underline;
  cursor: pointer;
`;

const CountryText = styled.div`
  display: flex;
  flex-direction: row;
`;

const CountryPhoneNumber = styled.div`
  cursor: pointer;
  font-size: 18px;
`;

const LoaderContainer = styled(ModalContainer)`
  z-index: 20;
`;

const LoaderModalOverlay = styled(ModalOverlay)`
  z-index: 21;
`;

const Image = styled.img`
  z-index: -5;
  position: absolute;
  display: flex;
  width: 100%;
  height: 100%;
  background-position: center center;
  object-fit: cover;
  opacity: 0.6;
`;

interface IProps {
  countryPhoneNumber: string;
  countryPhoneCode: string;
  phoneNumber: string;
  modalOpen: boolean;
  emailLoading: boolean;
  phoneLoading: boolean;
  isEmailSubmitted: boolean;
  toggleEmailSubmitted: () => void;
  onInputChange: (
    event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => void;
  onSubmitPhone: (event: React.FormEvent<HTMLFormElement>) => void;
  onSubmitEmail: (event: React.FormEvent<HTMLFormElement>) => void;
  back: (event) => void;
  toggleModal: () => void;
  onSelectCountry: (
    countryPhoneCode: string,
    countryPhoneNumber: string
  ) => void;
  emailAddress: string;
  emailSignIn: boolean;
  toggleEmailSignIn: () => void;
}

const ApproachPresenter: React.FunctionComponent<IProps> = ({
  phoneNumber,
  countryPhoneNumber,
  countryPhoneCode,
  onInputChange,
  onSubmitPhone,
  onSubmitEmail,
  emailLoading,
  phoneLoading,
  isEmailSubmitted,
  toggleEmailSubmitted,
  back,
  modalOpen,
  toggleModal,
  onSelectCountry,
  emailAddress,
  emailSignIn,
  toggleEmailSignIn
}) => {
  if (emailSignIn) {
    return (
      <>
        {(emailLoading || phoneLoading) && (
          <LoaderContainer>
            <LoaderModalOverlay />
            <LoadingOverlay
              active={true}
              spinner={<ClipLoader color={"#999"} />}
              fadeSpeed={500}
            />
          </LoaderContainer>
        )}
        {modalOpen && (
          <SearchModalContainer>
            <SearchModalOverlay onClick={toggleModal} />
            <SearchModal />
          </SearchModalContainer>
        )}
        <Image src={require(`../../../Images/animations/homeA.jpg`)} />
        <ModalContainer>
          <ModalOverlay onClick={back} />
          <Modal>
            <Helmet>
              <title>Email Login | Pinner </title>
            </Helmet>
            {isEmailSubmitted ? (
              <Container>
                <TextContainter>
                  <CenterText>
                    <p>Check your email</p>
                    <br />
                    <br />
                    <p>
                      If we found as account with &nbsp;{emailAddress}, an email
                      has been sent, <br />
                      otherwise new account with &nbsp;
                      {emailAddress} will be created.
                    </p>
                    <p>Please check your email in a moment.</p>
                    <br />
                    <p>Didn't receive a link?</p>
                    <br />
                    <Underline onClick={toggleEmailSubmitted}>
                      &nbsp;Use a different email
                    </Underline>
                    <Underline onClick={toggleEmailSignIn}>
                      &nbsp;Login With Phone.
                    </Underline>
                  </CenterText>
                </TextContainter>
              </Container>
            ) : (
              <Container>
                <EmailAddressContainer>
                  <Form onSubmit={onSubmitEmail}>
                    <EmailInput
                      type={"email"}
                      autoFocus={true}
                      value={emailAddress}
                      name={"emailAddress"}
                      onChange={onInputChange}
                      autoComplete={"off"}
                    />
                  </Form>
                </EmailAddressContainer>
                <TextContainter>
                  <Text>
                    <p>Login with your phone number?</p>
                    <Underline onClick={toggleEmailSignIn}>
                      &nbsp;Login With Phone.
                    </Underline>
                  </Text>
                  <p>We'll email you a link that will instantly log you in.</p>
                  <br />
                  <ExtendedForm onSubmit={onSubmitEmail}>
                    <SButton
                      text={"CONTINUE"}
                      onClick={null}
                      inverted={emailLoading}
                    />
                  </ExtendedForm>
                </TextContainter>
              </Container>
            )}
          </Modal>
        </ModalContainer>
      </>
    );
  } else if (!emailSignIn) {
    return (
      <>
        {(emailLoading || phoneLoading) && (
          <LoaderContainer>
            <LoaderModalOverlay />
            <LoadingOverlay
              active={true}
              spinner={<ClipLoader color={"#999"} />}
              fadeSpeed={500}
            />
          </LoaderContainer>
        )}
        {modalOpen && (
          <SearchModalContainer>
            <SearchModalOverlay onClick={toggleModal} />
            <SearchModal>
              <CountryContainer>
                {countries.map((country, index) => (
                  <CountryRow
                    key={index}
                    onClick={() => onSelectCountry(country.code, country.phone)}
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
        <Image src={require(`../../../Images/animations/homeA.jpg`)} />
        <ModalContainer>
          <ModalOverlay onClick={back} />
          <Modal>
            <Helmet>
              <title>Phone Login | Pinner </title>
            </Helmet>
            <Container>
              <PhoneNumberContainer>
                <CountryCode onClick={toggleModal}>
                  {countryPhoneCode}
                </CountryCode>
                <CountryPhone>
                  <CountryPhoneNumber onClick={toggleModal}>
                    &nbsp;{countryPhoneNumber}&nbsp;
                  </CountryPhoneNumber>
                  <Form onSubmit={onSubmitPhone}>
                    <Input
                      type={"number"}
                      autoFocus={true}
                      value={phoneNumber}
                      name={"phoneNumber"}
                      onChange={onInputChange}
                      autoComplete={"off"}
                    />
                  </Form>
                </CountryPhone>
              </PhoneNumberContainer>
              <TextContainter>
                <Text>
                  <p>Changed your phone number?</p>
                  <Underline onClick={toggleEmailSignIn}>
                    &nbsp;Login with email.
                  </Underline>
                </Text>
                <p>
                  When you tap Continue, Pinner will send a text with
                  verification code. Message and data rates may apply. The
                  verified phone number can be used to login.
                </p>
                <ExtendedForm onSubmit={onSubmitPhone}>
                  <SButton
                    text={"CONTINUE"}
                    onClick={null}
                    inverted={phoneLoading}
                  />
                </ExtendedForm>
              </TextContainter>
            </Container>
          </Modal>
        </ModalContainer>
      </>
    );
  }
  return null;
};

export default ApproachPresenter;
