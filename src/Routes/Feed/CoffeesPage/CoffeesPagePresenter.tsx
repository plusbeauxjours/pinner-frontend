import React from "react";
import { Link } from "react-router-dom";
import styled from "../../../Styles/typed-components";

import Wrapper from "../../../Components/Wrapper";
import Loader from "../../../Components/Loader";
import Bold from "../../../Components/Bold";
import CoffeeBtn from "src/Components/CoffeeBtn";
import Avatar from "../../../Components/Avatar";
import Helmet from "react-helmet";

const SWrapper = styled(Wrapper)`
  max-width: 650px;
`;

const UserContainer = styled.div`
  margin-top: 30px;
  display: flex;
  width: 100%;
  flex-direction: column;
`;

const UserRow = styled.div`
  display: grid;
  height: 50px;
  grid-template-columns: 4fr 1fr;
  padding: 0 5px 0 5px;
  margin: 0 15px 0 15px;
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

const CText = styled(Bold)`
  display: flex;
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

const AvatarContainer = styled.div`
  display: flex;
  position: relative;
  align-items: center;
`;

const HeaderColumn = styled.div`
  margin-left: 15px;
`;

const SAvatar = styled(Avatar)``;

const Input = styled.input`
  width: 215px;
  border: 0;
  border-bottom: 1px solid ${props => props.theme.borderColor};

  padding: 5px;
  color: ${props => props.theme.color};
  font-size: 12px;
  font-weight: 100;
  &:focus {
    outline: none;
    &::-webkit-input-placeholder {
      color: transparent;
    }
  }
  &::placeholder {
    color: ${props => props.theme.greyColor};
    text-align: right;
  }
`;

const Title = styled.div`
  display: flex;
  justify-content: space-between;
  @media screen and (max-width: 935px) {
    margin: 0 15px 0 15px;
  }
`;

const SText = styled(Bold)`
  font-size: 18px;
  font-weight: 100;
  text-transform: uppercase;
`;

interface IProps {
  coffeeData?: any;
  coffeeLoading: boolean;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  search: string;
  coffeesList: any;
  searchSet: () => void;
}

const CoffeesPagePresenter: React.FunctionComponent<IProps> = ({
  coffeeData: { getCoffees: { coffees = null } = {} } = {},
  coffeeLoading,
  onChange,
  search,
  coffeesList,
  searchSet
}) => {
  if (coffeeLoading) {
    return <Loader />;
  } else if (!coffeeLoading && coffees) {
    return (
      <SWrapper>
        <Helmet>
          <title>City | Pinner</title>
        </Helmet>
        <UserContainer>
          <Title>
            <SText text={"NEED SOME COFFEE NOW"} />
            <Input
              placeholder="Search users who wants coffee"
              value={search}
              onChange={onChange}
            />
          </Title>
          {coffeesList.length !== 0 &&
            coffeesList.map(coffee => {
              return (
                <UserRow key={coffee.uuid}>
                  <Link
                    to={{
                      pathname: `/c/${coffee.uuid}`,
                      state: {
                        from: location.pathname,
                        coffeeModalOpen: true
                      }
                    }}
                  >
                    <AvatarContainer>
                      <SAvatar
                        size={"sm"}
                        url={coffee.host.profile.avatarUrl}
                      />
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
                  <CoffeeBtn
                    coffeeId={coffee.uuid}
                    isMatching={coffee.isMatching}
                    isSelf={coffee.host.profile.isSelf}
                    searchSet={searchSet}
                  />
                </UserRow>
              );
            })}
          {coffeesList.length === 0 &&
            !search &&
            coffees &&
            coffees.map(coffee => {
              return (
                <UserRow key={coffee.uuid}>
                  <Link
                    to={{
                      pathname: `/c/${coffee.uuid}`,
                      state: {
                        from: location.pathname,
                        coffeeModalOpen: true
                      }
                    }}
                  >
                    <AvatarContainer>
                      <SAvatar
                        size={"sm"}
                        url={coffee.host.profile.avatarUrl}
                      />
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
                  <CoffeeBtn
                    coffeeId={coffee.uuid}
                    isMatching={coffee.isMatching}
                    isSelf={coffee.host.profile.isSelf}
                    searchSet={searchSet}
                  />
                </UserRow>
              );
            })}
        </UserContainer>
      </SWrapper>
    );
  }
  return null;
};

export default CoffeesPagePresenter;
