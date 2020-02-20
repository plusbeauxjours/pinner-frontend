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
  &:not(:last-child) {
    border-bottom: 1px solid ${props => props.theme.borderColor};
  }
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
  modalOpen: boolean;
  toggleModal: () => void;
  search: string;
  usersNowList: any;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  loadMore: any;
  cityId: string;
}

const CityUsersNowPresenter: React.FunctionComponent<IProps> = ({
  data: { cityUsersNow: { usersNow = null, hasNextPage = null } = {} } = {},
  loading,
  modalOpen,
  toggleModal,
  search,
  usersNowList,
  onChange,
  loadMore,
  cityId
}) => {
  return (
    <>
      <SWrapper>
        <Helmet>
          <title>City | Pinner</title>
        </Helmet>
        <UserContainer>
          <Title>
            <SText text={"USERS NOW"} />
            <Input
              placeholder="Search users who is in this city"
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
              {usersNowList.length !== 0 &&
                usersNowList.map((user, index) => (
                  <UserRow key={user.id}>
                    <Link to={`/${user.uuid}`}>
                      <UserHeader
                        username={user.username}
                        currentCity={user.currentCity.cityName}
                        currentCountry={user.currentCity.country.countryName}
                        avatar={user.avatarUrl}
                        size={"sm"}
                      />
                    </Link>
                  </UserRow>
                ))}
              {usersNowList.length === 0 &&
                !search &&
                usersNow &&
                usersNow.map((user, index) => (
                  <UserRow key={user.id}>
                    <Link to={`/${user.uuid}`}>
                      <UserHeader
                        username={user.username}
                        currentCity={user.currentCity.cityName}
                        currentCountry={user.currentCity.country.countryName}
                        avatar={user.avatarUrl}
                        size={"sm"}
                      />
                    </Link>
                  </UserRow>
                ))}
            </InfiniteScroll>
          )}
        </UserContainer>
      </SWrapper>
    </>
  );
};

export default CityUsersNowPresenter;
