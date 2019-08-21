import React from "react";
import Helmet from "react-helmet";
import Button from "../../../Components/Button";
import { MutationFn } from "react-apollo";
import Form from "src/Components/Form";
import styled from "src/Styles/typed-components";
import { keyframes } from "styled-components";
import ReactCodeInput from "react-code-input";
import { Link } from "react-router-dom";

const Container = styled.div`
  display: grid;
  grid-gap: 20px;
  grid-template-rows: 2, 50px;
  justify-items: center;
  align-items: center;
  padding: 20px;
  height: 100%;
`;

const TextContainter = styled.div`
  margin: 0 10px 0 10px;
  line-height: 13px;
`;

const ExtendedForm = styled(Form)`
  padding: 0px 40px;
  display: flex;
  flex-flow: column wrap;
  justify-content: center;
  align-items: center;
`;

const ModalContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  position: fixed;
  height: 100%;
  width: 100%;
  top: 0;
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

const SButton = styled(Button)`
  width: 50px;
  margin-top: 20px;
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

const Text = styled.div`
  text-align: inline;
  display: flex;
  justify-content: center;
  margin-bottom: 20px;
`;

const Underline = styled.p`
  text-decoration: underline;
  cursor: pointer;
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
  verificationKey: string;
  onSubmit: MutationFn;
  loading: boolean;
  back: (event) => void;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const VerificationPresenter: React.FunctionComponent<IProps> = ({
  verificationKey,
  onSubmit,
  loading,
  back,
  onChange
}) => {
  return (
    <>
      <Image src={require(`../../../Images/animations/homeA.jpg`)} />
      <ModalContainer>
        <ModalOverlay onClick={back} />
        <Modal>
          <Helmet>
            <title>Verify Phone | Pinner</title>
          </Helmet>
          <Container>
            <ReactCodeInput
              type={"number"}
              value={verificationKey}
              autoFocus={true}
              fields={6}
              onChange={onChange}
              inputStyle={CodeInputStyle}
            />
            <TextContainter>
              <Text>
                <p>Lost your phone?</p>
                <Link
                  to={{ pathname: "/approach", state: { emailSignIn: true } }}
                >
                  {" "}
                  <Underline>&nbsp;Login With Email.</Underline>
                </Link>
              </Text>
              <p>
                When you tap Continue, Pinner will send a text with verification
                code. Message and data rates may apply. The verified phone
                number can be used to login.
              </p>
              <ExtendedForm onSubmit={onSubmit}>
                <SButton text={"VERIFY"} onClick={null} inverted={loading} />
              </ExtendedForm>
            </TextContainter>
          </Container>
        </Modal>
      </ModalContainer>
    </>
  );
};

export default VerificationPresenter;
