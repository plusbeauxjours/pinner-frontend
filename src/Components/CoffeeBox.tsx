import React from "react";
import styled from "src/Styles/typed-components";
import { Link, RouteComponentProps, withRouter } from "react-router-dom";
import Bold from "./Bold";
import { Upload } from "../Icons";
import Avatar from "./Avatar";
import CoffeeBtn from "src/Components/CoffeeBtn";

const Title = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 10px;
  @media screen and (max-width: 935px) {
    margin: 10px 15px 0 15px;
  }
`;

const SText = styled(Bold)`
  font-size: 18px;
  font-weight: 100;
  text-transform: uppercase;
`;

const SeeAll = styled.p`
  font-size: 12px;
  font-weight: 100;
  cursor: pointer;
  color: ${props => props.theme.greyColor};
`;

const Container = styled.div`
  -webkit-box-flex: 0;
  padding: 15px;
`;

const Box = styled.div`
  max-width: 905px;
  display: grid;
  grid-auto-flow: column;
  grid-template-rows: repeat(3, 50px);
  grid-auto-columns: 400px;
  column-gap: 10px;
  overflow-x: auto;
  padding-bottom: 15px;
  -ms-overflow-style: -ms-autohiding-scrollbar;
  ::-webkit-scrollbar {
    height: 6px;
  }
  ::-webkit-scrollbar-track {
    -webkit-box-shadow: inset 0 0 6px ${props => props.theme.trackShadowColor};
    border-radius: 10px;
  }
  ::-webkit-scrollbar-thumb {
    border-radius: 10px;
    -webkit-box-shadow: inset 0 0 6px ${props => props.theme.trackShadowColor};
    background-color: ${props => props.theme.greyColor};
  }
`;

const IconRow = styled.div`
  height: 50px;
  width: 400px;
  padding: 0 5px 0 5px;
  align-items: center;
  justify-content: center;
  border-bottom: 1px solid ${props => props.theme.borderColor};
`;

const Icon = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  svg {
    fill: ${props => props.theme.iconColor};
    transition: fill 0.2s ease-in-out;
    &:hover {
      fill: ${props => props.theme.hoverColor};
    }
  }
`;

const UserRow = styled.div`
  display: grid;
  height: 50px;
  width: 400px;
  grid-template-columns: 4fr 1fr;
  padding: 0 5px 0 5px;
  grid-gap: 15px;
  align-items: center;
  cursor: pointer;
  transition: background-color 0.2s ease-in-out;
  &:hover {
    background-color: ${props => props.theme.hoverColor};
  }
  border-bottom: 1px solid ${props => props.theme.borderColor};
  &:last-child {
    margin-bottom: 15px;
  }
`;

const AvatarContainer = styled.div`
  display: flex;
  align-items: center;
`;

const Location = styled.span`
  display: flex;
  margin-top: 5px;
  position: block;
  font-size: 12px;
  font-weight: 200;
`;

const Explain = styled(Location)`
  color: grey;
`;

const HeaderColumn = styled.div`
  margin-left: 15px;
`;

const CText = styled(Bold)`
  display: flex;
`;

const GreyLine = styled.div`
  margin-top: 10px;
  margin-bottom: 10px;
  border-bottom: 1px solid ${props => props.theme.borderColor};
  @media screen and (max-width: 935px) {
    margin: 10px 15px 0 15px;
  }
`;

interface IProps extends RouteComponentProps<any> {
  coffeeLoading?: boolean;
  cityId?: string;
  currentCityId?: string;
  currentCountryCode?: string;
  currentContinentCode?: string;
  toggleCoffeeRequestModal?: () => void;
  coffees: any;
  isStaying?: boolean;
  searchSet?: () => void;
}

const UserBox: React.FunctionComponent<IProps> = ({
  coffeeLoading,
  cityId,
  currentCityId,
  currentCountryCode,
  currentContinentCode,
  toggleCoffeeRequestModal,
  coffees,
  isStaying,
  searchSet
}) => {
  if (!coffeeLoading && currentCityId && isStaying) {
    return (
      <>
        <GreyLine />
        <Title>
          <SText text={"NEED SOME COFFEE NOW"} />
          <Link
            to={{
              pathname: `/city/${currentCityId}/coffees`,
              state: { location: "city", currentCityId }
            }}
          >
            <SeeAll>SEE ALL</SeeAll>
          </Link>
        </Title>
        <Container>
          <Box>
            {isStaying && coffees.length === 0 && (
              <IconRow>
                <Icon onClick={toggleCoffeeRequestModal}>
                  <Upload />
                </Icon>
              </IconRow>
            )}
            {coffees.map(coffee => {
              return (
                <UserRow key={coffee.uuid}>
                  <Link
                    to={{
                      pathname: `/c/${coffee.uuid}`,
                      state: { from: location.pathname, coffeeModalOpen: true }
                    }}
                  >
                    <AvatarContainer>
                      <Avatar size={"sm"} url={coffee.host.profile.avatarUrl} />
                      <HeaderColumn>
                        <CText text={coffee.host.username} />
                        {(() => {
                          switch (coffee.target) {
                            case "EVERYONE":
                              return <Explain>with Someone</Explain>;
                            case "GENDER":
                              return <Explain>with same gender</Explain>;
                            case "NATIONALITY":
                              return <Explain>with same nationality</Explain>;
                            case "RESIDENCE":
                              return <Explain>with same residence</Explain>;
                            default:
                              return null;
                          }
                        })()}
                      </HeaderColumn>
                    </AvatarContainer>
                  </Link>
                  {(cityId === coffee.city.cityId || isStaying) && (
                    <CoffeeBtn
                      cityId={coffee.city.cityId}
                      coffeeId={coffee.uuid}
                      isMatching={coffee.isMatching}
                      isSelf={coffee.host.profile.isSelf}
                      searchSet={searchSet}
                    />
                  )}
                </UserRow>
              );
            })}
          </Box>
        </Container>
      </>
    );
  } else if (
    !coffeeLoading &&
    coffees &&
    coffees.length !== 0 &&
    !currentCityId
  ) {
    return (
      <>
        <GreyLine />
        <Title>
          <SText text={"NEED SOME COFFEE NOW"} />
          {currentContinentCode && (
            <Link
              to={{
                pathname: `/continent/${currentContinentCode}/coffees`,
                state: { location: "continent", currentContinentCode }
              }}
            >
              <SeeAll>SEE ALL</SeeAll>
            </Link>
          )}
          {currentCountryCode && (
            <Link
              to={{
                pathname: `/country/${currentCountryCode}/coffees`,
                state: { location: "country", currentCountryCode }
              }}
            >
              <SeeAll>SEE ALL</SeeAll>
            </Link>
          )}
        </Title>
        <Container>
          <Box>
            {isStaying && (
              <IconRow>
                <Icon onClick={toggleCoffeeRequestModal}>
                  <Upload />
                </Icon>
              </IconRow>
            )}
            {coffees.map(coffee => {
              return (
                <UserRow key={coffee.uuid}>
                  <Link
                    to={{
                      pathname: `/c/${coffee.uuid}`,
                      state: { from: location.pathname, coffeeModalOpen: true }
                    }}
                  >
                    <AvatarContainer>
                      <Avatar size={"sm"} url={coffee.host.profile.avatarUrl} />
                      <HeaderColumn>
                        <CText text={coffee.host.username} />
                        {(() => {
                          switch (coffee.target) {
                            case "EVERYONE":
                              return <Explain>with Someone</Explain>;
                            case "GENDER":
                              return <Explain>with same gender</Explain>;
                            case "NATIONALITY":
                              return <Explain>with same nationality</Explain>;
                            case "RESIDENCE":
                              return <Explain>with same residence</Explain>;
                            default:
                              return null;
                          }
                        })()}
                      </HeaderColumn>
                    </AvatarContainer>
                  </Link>
                  {(cityId === coffee.city.cityId || isStaying) && (
                    <CoffeeBtn
                      cityId={coffee.city.cityId}
                      coffeeId={coffee.uuid}
                      isMatching={coffee.isMatching}
                      isSelf={coffee.host.profile.isSelf}
                      searchSet={searchSet}
                    />
                  )}
                </UserRow>
              );
            })}
          </Box>
        </Container>
      </>
    );
  } else {
    return null;
  }
};

export default withRouter(UserBox);
