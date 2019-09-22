import React from "react";
import styled from "src/Styles/typed-components";
import Wrapper from "src/Components/Wrapper";
import Loader from "src/Components/Loader";

import InfiniteScroll from "react-infinite-scroller";
import { Link } from "react-router-dom";
import Bold from "../../../Components/Bold";
import Avatar from "../../../Components/Avatar";
import CityLikeBtn from "../../../Components/CityLikeBtn";
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
  &:not(:last-child) {
    border-bottom: 1px solid ${props => props.theme.borderColor};
  }
`;

const Header = styled.header`
  display: flex;
  align-items: center;
  border-radius: 3px;
  cursor: pointer;
`;

const SAvatar = styled(Avatar)`
  border-radius: 3px;
  height: 45px;
  width: 45px;
`;

const Location = styled.span`
  display: flex;
  margin-top: 5px;
  position: block;
  font-size: 12px;
  font-weight: 200;
`;

const HeaderText = styled(Bold)`
  display: flex;
`;

const HeaderColumn = styled.div`
  margin-left: 15px;
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
  citiesData: any;
  citiesLoading: boolean;
  search: string;
  citiesList: any;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  loadMore: any;
}

const PeoplePagePresenter: React.FunctionComponent<IProps> = ({
  citiesData: {
    getCitiesPage: { cities = null, hasNextPage = null, cityCount = null } = {}
  } = {},
  citiesLoading,
  search,
  citiesList,
  onChange,
  loadMore
}) => {
  return (
    <>
      <SWrapper>
        <Helmet>
          <title>Recommend Locations | Pinner</title>
        </Helmet>
        <UserContainer>
          <Title>
            <SText text={cityCount === 1 ? `CITY` : `CITIES`} />
            <Input
              placeholder="Search locations who is recommended"
              value={search}
              onChange={onChange}
            />
          </Title>
          {citiesLoading && <Loader />}
          {!citiesLoading && (
            <InfiniteScroll
              hasMore={hasNextPage}
              loadMore={loadMore}
              pageStart={0}
            >
              {citiesList.length !== 0 &&
                citiesList.map(city => {
                  return (
                    <UserRow key={city.id}>
                      <Link to={`/city/${city.cityId}`}>
                        <Header>
                          <SAvatar
                            size={"sm"}
                            url={city.cityThumbnail}
                            city={true}
                          />
                          <HeaderColumn>
                            <HeaderText text={city.cityName} />
                            <Location>{city.country.countryName}</Location>
                          </HeaderColumn>
                        </Header>
                      </Link>
                      <CityLikeBtn
                        isLiked={city.isLiked}
                        cityId={city.id}
                        likeCount={city.likeCount}
                        type={"row"}
                      />
                    </UserRow>
                  );
                })}
              {citiesList.length === 0 &&
                !search &&
                cities &&
                cities.map(city => {
                  return (
                    <UserRow key={city.id}>
                      <Link to={`/city/${city.cityId}`}>
                        <Header>
                          <SAvatar
                            size={"sm"}
                            url={city.cityThumbnail}
                            city={true}
                          />
                          <HeaderColumn>
                            <HeaderText text={city.cityName} />
                            <Location>{city.country.countryName}</Location>
                          </HeaderColumn>
                        </Header>
                      </Link>
                      <CityLikeBtn
                        isLiked={city.isLiked}
                        cityId={city.id}
                        likeCount={city.likeCount}
                        type={"row"}
                      />
                    </UserRow>
                  );
                })}
            </InfiniteScroll>
          )}
        </UserContainer>
      </SWrapper>
    </>
  );
};

export default PeoplePagePresenter;
