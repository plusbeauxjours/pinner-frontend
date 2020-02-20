import React from "react";
import styled from "styled-components";
import { keyframes } from "styled-components";

import Loader from "../../../Components/Loader";
import Wrapper from "../../../Components/Wrapper";
import Avatar from "../../../Components/Avatar";
import Bold from "../../../Components/Bold";
import CoffeeBtn from "src/Components/CoffeeBtn";
import { List } from "../../../Icons";
import { Link } from "react-router-dom";

const SWrapper = styled(Wrapper)`
  display: flex;
  justify-content: center;
  align-items: center;
  display: flex;
  flex-direction: column;
  margin-bottom: 150px;
`;

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

const Modal = styled.div`
  background-color: ${props => props.theme.modalBgColor};
  border: 1px solid ${props => props.theme.borderColor};
  margin: 0 15px 0 15px;
  width: 340px;
  border-radius: 12px;
  z-index: 101;
  animation: ${ModalAnimation} 0.1s linear;
`;

const MenuModalLink = styled.div`
  z-index: 101;
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

const MenuModalContainer = styled(ModalContainer)`
  z-index: 105;
`;
const MenuModalOverlay = styled(ModalOverlay)`
  z-index: 105;
`;
const MenuModal = styled(Modal)`
  z-index: 105;
`;

const FormModal = styled(Modal)`
  z-index: 101;
  display: flex;
  position: relative;
  justify-content: center;
  align-items: center;
  width: 600px;
  height: 400px;
  margin-top: 45px;
  @media screen and (max-width: 630px) {
    width: 100%;
    margin-right: 15px;
    margin-left: 15px;
  }
  @media screen and (max-height: 400px) {
    height: 100%;
  }
`;

const SAvatar = styled(Avatar)`
  margin-bottom: 15px;
`;

const SText = styled(Bold)`
  font-size: 22px;
  margin-bottom: 3px;
  display: block;
`;

const Location = styled.span`
  margin-bottom: 10px;
  display: flex;
  justify-content: center;
  font-size: 12px;
  font-weight: 200;
`;

const GreyText = styled.p`
  color: ${props => props.theme.greyColor};
  font-weight: 100;
  font-size: 12px;
  margin-bottom: 20px;
`;

const InfoContainer = styled.div`
  width: 250px;
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-gap: 5px;
  justify-items: center;
  align-items: flex-end;
  margin: 5px 0 5px 10px;
`;

const NumberContainer = styled.div`
  width: 500px;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(90px, 1fr));
  justify-items: center;
  margin: 5px 0 5px 0;
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
`;

const UBold = styled(Bold)`
  align-self: center;
  font-weight: 100;
  font-size: 12px;
`;

const Icon = styled.span`
  display: flex;
  align-self: flex-end;
  position: absolute;
  justify-items: center;
  padding-right: 18px;
  cursor: pointer;
  top: 20px;
  svg {
    fill: ${props => props.theme.iconColor};
    transition: fill 0.2s ease-in-out;
    &:hover {
      /* fill: grey; */
    }
  }
`;

interface IProps {
  data: any;
  loading: boolean;
  modalOpen: boolean;
  back: any;
  toggleModal: () => void;
  deleteCoffee: () => void;
  from: string;
  formatDistance: any;
}

const CoffeeDetailPresenter: React.FunctionComponent<IProps> = ({
  data: { coffeeDetail: { coffee = null } = {} } = {},
  loading,
  modalOpen,
  toggleModal,
  back,
  deleteCoffee,
  from,
  formatDistance
}) => {
  if (loading) {
    return <Loader />;
  } else if (!loading && coffee) {
    return (
      <>
        {modalOpen && (
          <MenuModalContainer>
            <MenuModalOverlay onClick={toggleModal} />
            <MenuModal>
              {coffee.host.profile.isSelf && (
                <>
                  <MenuModalLink onClick={() => deleteCoffee()}>
                    DELETE COFFEE
                  </MenuModalLink>
                </>
              )}
              <MenuModalLink onClick={toggleModal}>CANCEL</MenuModalLink>
            </MenuModal>
          </MenuModalContainer>
        )}
        <ModalContainer>
          <ModalOverlay onClick={back} />
          <FormModal>
            <SWrapper>
              <Icon onClick={toggleModal}>
                <List />
              </Icon>
              <Link to={`/${coffee.host.profile.uuid}`}>
                <SAvatar url={coffee.host.profile.avatarUrl} size="lg" />
              </Link>
              <SText text={coffee.host.profile.username} />
              <Location>
                {coffee.host.profile.currentCity.cityName},
                {coffee.host.profile.currentCity.country.countryName}
              </Location>
              <NumberContainer>
                {coffee.host.profile.gender && (
                  <Row>
                    {(() => {
                      switch (coffee.host.profile.gender) {
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
                {coffee.host.profile.distance !== 0 && (
                  <Row>
                    <VBold
                      text={formatDistance(coffee.host.profile.distance)}
                    />
                    <UBold text={"KM"} />
                  </Row>
                )}
                {/* {coffee.host.profile.coffeeCount !== 0 && (
                  <Row>
                    <VBold text={String(coffee.host.profile.coffeeCount)} />
                    {coffee.host.profile.coffeeCount === 1 ? (
                      <UBold text={"COFFEE"} />
                    ) : (
                      <UBold text={"COFFEES"} />
                    )}
                  </Row>
                )} */}
                {coffee.host.profile.tripCount !== 0 && (
                  <Row>
                    <VBold text={String(coffee.host.profile.tripCount)} />
                    {coffee.host.profile.tripCount === 1 ? (
                      <UBold text={"TRIP"} />
                    ) : (
                      <UBold text={"TRIPS"} />
                    )}
                  </Row>
                )}
              </NumberContainer>
              <InfoContainer>
                {coffee.host.profile.nationality && (
                  <Row>
                    <Link
                      to={`/country/${coffee.host.profile.nationality.countryCode}`}
                    >
                      <VBold
                        text={String(
                          coffee.host.profile.nationality.countryEmoji
                        )}
                      />
                      <UBold text={"NATIONALITY"} />
                    </Link>
                  </Row>
                )}
                {coffee.host.profile.residence && (
                  <Row>
                    <Link
                      to={`/country/${coffee.host.profile.residence.countryCode}`}
                    >
                      <VBold
                        text={String(
                          coffee.host.profile.residence.countryEmoji
                        )}
                      />
                      <UBold text={"RESIDENCE"} />
                    </Link>
                  </Row>
                )}
              </InfoContainer>
              <GreyText>until {coffee.naturalTime}</GreyText>
              {coffee.status !== "expired" && (
                <CoffeeBtn
                  cityId={coffee.city.cityId}
                  coffeeId={coffee.uuid}
                  isMatching={coffee.isMatching}
                  isSelf={coffee.host.profile.isSelf}
                  from={from}
                />
              )}
              {/* {coffee.host.profile.nationality.countryName} */}
            </SWrapper>
          </FormModal>
        </ModalContainer>
      </>
    );
  }
  return null;
};

export default CoffeeDetailPresenter;
