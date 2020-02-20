import React from "react";
import styled from "src/Styles/typed-components";
import Wrapper from "src/Components/Wrapper";
import Loader from "src/Components/Loader";

import InfiniteScroll from "react-infinite-scroller";
import { Link } from "react-router-dom";
import UserHeader from "../../../Components/UserHeader";
import Bold from "../../../Components/Bold";
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
  flex-direction: row;
  height: 50px;
  grid-template-columns: 4fr;
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
`;

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
  data: any;
  loading: boolean;
  search: string;
  usersBeforeList: any;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  loadMore: any;
}

const CountryUsersBeforePresenter: React.FunctionComponent<IProps> = ({
  data: {
    countryUsersBefore: { usersBefore = null, hasNextPage = null } = {}
  } = {},
  loading,
  search,
  usersBeforeList,
  onChange,
  loadMore
}) => {
  return (
    <>
      <SWrapper>
        <Helmet>
          <title>Country | Pinner</title>
        </Helmet>
        <UserContainer>
          <Title>
            <SText text={"USERS BEFORE"} />
            <Input
              placeholder="Search users who has been this country"
              value={search}
              onChange={onChange}
            />
          </Title>
          {loading && <Loader />}
          {!loading && (
            <InfiniteScroll
              hasMore={hasNextPage}
              loadMore={loadMore}
              pageStart={0}
            >
              {usersBeforeList.length !== 0 &&
                usersBeforeList.map(user => (
                  <React.Fragment key={user.actor.profile.id}>
                    <Link to={`/${user.actor.profile.uuid}`}>
                      <UserRow key={user.actor.profile.id}>
                        <UserHeader
                          username={user.actor.profile.username}
                          currentCity={user.actor.profile.currentCity.cityName}
                          currentCountry={
                            user.actor.profile.currentCity.country.countryName
                          }
                          avatar={user.actor.profile.avatarUrl}
                          size={"sm"}
                        />
                        <Explain>{user.naturalTime}</Explain>
                      </UserRow>
                    </Link>
                  </React.Fragment>
                ))}
              {usersBeforeList.length === 0 &&
                !search &&
                usersBefore &&
                usersBefore.map(user => (
                  <React.Fragment key={user.actor.profile.id}>
                    <Link to={`/${user.actor.profile.uuid}`}>
                      <UserRow key={user.actor.profile.id}>
                        <UserHeader
                          username={user.actor.profile.username}
                          currentCity={user.actor.profile.currentCity.cityName}
                          currentCountry={
                            user.actor.profile.currentCity.country.countryName
                          }
                          avatar={user.actor.profile.avatarUrl}
                          size={"sm"}
                        />
                        <Explain>{user.naturalTime}</Explain>
                      </UserRow>
                    </Link>
                  </React.Fragment>
                ))}
            </InfiniteScroll>
          )}
        </UserContainer>
      </SWrapper>
    </>
  );
};

export default CountryUsersBeforePresenter;
