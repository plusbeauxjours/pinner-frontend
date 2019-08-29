import React from "react";
import FacebookLogin from "react-facebook-login/dist/facebook-login-render-props";
import styled from "src/Styles/typed-components";
import LoadingOverlay from "react-loading-overlay";
import ClipLoader from "react-spinners/ClipLoader";

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
  loading,
  loginCallback
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
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="#344EA1"
              >
                <path d="M22.675 0h-21.35c-.732 0-1.325.593-1.325 1.325v21.351c0 .731.593 1.324 1.325 1.324h11.495v-9.294h-3.128v-3.622h3.128v-2.671c0-3.1 1.893-4.788 4.659-4.788 1.325 0 2.463.099 2.795.143v3.24l-1.918.001c-1.504 0-1.795.715-1.795 1.763v2.313h3.587l-.467 3.622h-3.12v9.293h6.116c.73 0 1.323-.593 1.323-1.325v-21.35c0-.732-.593-1.325-1.325-1.325z" />
              </svg>
            </Icon>
            Facebook
          </Link>
        )}
      />
    </>
  );
};

export default SocialLoginPresenter;
