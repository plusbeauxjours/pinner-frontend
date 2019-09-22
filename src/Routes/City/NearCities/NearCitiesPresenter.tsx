import React from "react";
import styled from "src/Styles/typed-components";
import Wrapper from "src/Components/Wrapper";
import Loader from "src/Components/Loader";

import InfiniteScroll from "react-infinite-scroller";
import { Link } from "react-router-dom";
import Avatar from "../../../Components/Avatar";
import CityLikeBtn from "../../../Components/CityLikeBtn";
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
  grid-template-columns: 4fr 1fr 1fr;
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

const Header = styled.header`
  display: flex;
  align-items: center;
  border-radius: 3px;
  cursor: pointer;
`;

const HeaderText = styled(Bold)`
  display: flex;
`;

const SAvatar = styled(Avatar)`
  border-radius: 3px;
  height: 45px;
  width: 45px;
`;

const Text = styled.div`
  font-weight: 100;
  display: flex;
  align-items: center;
`;

const HeaderColumn = styled.div`
  margin-left: 15px;
`;

interface IProps {
  data: any;
  loading: boolean;
  search: string;
  nearCitiesList: any;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  loadMore: any;
}

const NearCitiesPresenter: React.FunctionComponent<IProps> = ({
  data: { nearCities: { cities = null, hasNextPage = null } = {} } = {},
  loading,
  search,
  nearCitiesList,
  onChange,
  loadMore
}) => {
  return (
    <>
      <SWrapper>
        <Helmet>
          <title>City | Pinner</title>
        </Helmet>
        <UserContainer>
          <Title>
            <SText text={"NEAR CITIES"} />
            <Input
              placeholder="Search near city"
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
              {nearCitiesList.length !== 0 &&
                nearCitiesList.map(nearCity => (
                  <UserRow key={nearCity.id}>
                    <Link to={`/city/${nearCity.cityId}`}>
                      <Header>
                        <SAvatar
                          size={"sm"}
                          url={nearCity.cityThumbnail}
                          city={true}
                        />
                        <HeaderColumn>
                          <HeaderText text={nearCity.cityName} />
                          <Location>{nearCity.country.countryName}</Location>
                        </HeaderColumn>
                      </Header>
                    </Link>
                    <CityLikeBtn
                      isLiked={nearCity.isLiked}
                      cityId={nearCity.id}
                      likeCount={nearCity.likeCount}
                      type={"row"}
                    />
                    <Text>{nearCity.distance}&nbsp;km</Text>
                  </UserRow>
                ))}
              {nearCitiesList.length === 0 &&
                !search &&
                cities &&
                cities.map(nearCity => (
                  <UserRow key={nearCity.id}>
                    <Link to={`/city/${nearCity.cityId}`}>
                      <Header>
                        <SAvatar
                          size={"sm"}
                          url={nearCity.cityThumbnail}
                          city={true}
                        />
                        <HeaderColumn>
                          <HeaderText text={nearCity.cityName} />
                          <Location>{nearCity.country.countryName}</Location>
                        </HeaderColumn>
                      </Header>
                    </Link>
                    <CityLikeBtn
                      isLiked={nearCity.isLiked}
                      cityId={nearCity.id}
                      likeCount={nearCity.likeCount}
                      type={"row"}
                    />
                    <Text>{nearCity.distance}&nbsp;km</Text>
                  </UserRow>
                ))}
            </InfiniteScroll>
          )}
        </UserContainer>
      </SWrapper>
    </>
  );
};

export default NearCitiesPresenter;
