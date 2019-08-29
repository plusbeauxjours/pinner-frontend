import React from "react";
import FacebookLogin from "react-facebook-login/dist/facebook-login-render-props";
import styled from "src/Styles/typed-components";
import LoadingOverlay from "react-loading-overlay";
import ClipLoader from "react-spinners/ClipLoader";
import { FacebookIcon } from "../../Icons";

const Link = styled.span`
  display: flex;
  align-items: center;
  cursor: pointer;
`;

const Icon = styled.span`
  margin-right: 10px;
`;

const LoaderContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  position: fixed;
  height: 100%;
  width: 100%;
  z-index: 20;
`;

const LoaderModalOverlay = styled.div`
  height: 100%;
  width: 100%;
  position: fixed;
  top: 0;
  background-color: ${props => props.theme.modalOverlayColor};
`;

interface IProps {
  loginCallback: (response) => void;
  loading: boolean;
}

const SocialLoginPresenter: React.FunctionComponent<IProps> = ({
  loginCallback,
  loading
}) => {
  return (
    <>
      {loading && (
        <LoaderContainer>
          <LoaderModalOverlay />
          <LoadingOverlay
            active={true}
            spinner={<ClipLoader color={"#999"} />}
            fadeSpeed={500}
          />
        </LoaderContainer>
      )}
      <FacebookLogin
        appId="242663513281642"
        autoLoad={false}
        fields="name, first_name, last_name, email, gender"
        callback={loginCallback}
        render={renderProps => (
          <Link onClick={renderProps.onClick}>
            <Icon>
              <FacebookIcon />
            </Icon>
            Facebook
          </Link>
        )}
      />
    </>
  );
};

export default SocialLoginPresenter;
