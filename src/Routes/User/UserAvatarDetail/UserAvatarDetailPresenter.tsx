import React from "react";
import styled from "styled-components";
import { keyframes } from "styled-components";

import Loader from "../../../Components/Loader";
import { BACKEND_URL } from "src/constants";

const ModalContainer = styled.div`
  z-index: 101;
  display: flex;
  justify-content: center;
  align-items: center;
  position: fixed;
  height: 100%;
  width: 100%;
  top: 0;
`;

const ModalOverlay = styled.div`
  z-index: 100;
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

const SWrapper = styled.div`
  z-index: 101;
  display: flex;
  justify-content: center;
  align-items: center;
  animation: ${ModalAnimation} 0.1s linear;
`;

const Img = styled.img`
  height: 700px;
  width: 700px;
  @media screen and (max-width: 700px) {
    width: 100%;
    height: 100%;
  }
`;

interface IProps {
  data: any;
  loading: boolean;
  modalOpen: boolean;
  toggleModalOpen: () => void;
  back: (event) => void;
}

const UserAvatarDetailPresenter: React.FunctionComponent<IProps> = ({
  data: { getAvatarDetail: { avatar = null } = {} } = {},
  loading,
  modalOpen,
  toggleModalOpen,
  back
}) => {
  if (loading) {
    return <Loader />;
  } else if (!loading && avatar) {
    return (
      <ModalContainer>
        <ModalOverlay onClick={back} />
        <SWrapper>
          <Img src={`${BACKEND_URL}/media/${avatar.image}`} />
        </SWrapper>
      </ModalContainer>
    );
  }
  return null;
};

export default UserAvatarDetailPresenter;
