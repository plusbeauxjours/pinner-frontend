import React from "react";
import styled from "../../Styles/typed-components";
import Wrapper from "src/Components/Wrapper";
import Bold from "../../Components/Bold";
import Loader from "src/Components/Loader";
import { Link } from "react-router-dom";
import UserHeader from "../UserHeader";
import Avatar from "../Avatar";
import useGoogleAutocomplete from "../../autocompleteHelpers";
import dotenv from "dotenv";
dotenv.config();

const SWrapper = styled(Wrapper)`
  z-index: 1;
`;

const UserRow = styled.div`
  display: grid;
  flex-direction: row;
  height: 50px;
  grid-template-columns: 5fr 0.5fr;
  padding: 0 5px 0 5px;
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

const HeaderText = styled(Bold)`
  display: flex;
`;

const HeaderColumn = styled.div`
  margin-left: 15px;
`;

const SAvatar = styled(Avatar)`
  border-radius: 3px;
  height: 45px;
  width: 45px;
`;

const Location = styled.span`
  display: flex;
  margin-top: 5px;
  display: block;
  font-size: 12px;
  font-weight: 200;
`;

interface IProps {
  search: string;
  searchData?: any;
  searchLoading: boolean;
  onClick: (placeId: string) => void;
  createCityLoading: boolean;
}

const SearchPresenter: React.FunctionComponent<IProps> = ({
  search,
  searchData: {
    searchUsers: { users = null } = {},
    searchCountries: { countries = null } = {},
    searchContinents: { continents = null } = {}
  } = {},
  searchLoading,
  onClick,
  createCityLoading
}) => {
  const REACT_APP_GOOGLE_PLACE_KEY = process.env.REACT_APP_GOOGLE_PLACE_KEY;
  const { results, isLoading } = useGoogleAutocomplete({
    apiKey: `${REACT_APP_GOOGLE_PLACE_KEY}`,
    query: search,
    options: {
      types: "(cities)",
      language: "en"
    }
  });
  if (searchLoading || isLoading || createCityLoading) {
    return <Loader />;
  } else {
    return (
      <SWrapper>
        {search.length > 0 &&
          users &&
          users.length > 0 &&
          users.map(user => (
            <UserRow key={user.profile.id}>
              <Link to={`/${user.profile.username}`}>
                <UserHeader
                  username={user.profile.username}
                  currentCity={user.profile.currentCity.cityName}
                  currentCountry={user.profile.currentCity.country.countryName}
                  avatar={user.profile.avatarUrl}
                  size={"sm"}
                />
              </Link>
            </UserRow>
          ))}
        {search.length > 0 &&
          results.predictions &&
          results.predictions.length > 0 &&
          results.predictions.map(prediction => (
            <UserRow
              key={prediction.id}
              onClick={() => onClick(prediction.place_id)}
            >
              <Header>
                <SAvatar size={"sm"} cityId={prediction.place_id} />
                <HeaderColumn>
                  <HeaderText
                    text={prediction.structured_formatting.main_text}
                  />
                  <Location>
                    {prediction.structured_formatting.secondary_text
                      ? prediction.structured_formatting.secondary_text
                      : prediction.structured_formatting.main_text}
                  </Location>
                </HeaderColumn>
              </Header>
            </UserRow>
          ))}
        {search.length > 0 &&
          countries &&
          countries.length > 0 &&
          countries.map(country => (
            <UserRow key={country.id}>
              <Link
                to={{
                  pathname: `/country/${country.countryCode}`,
                  state: { countryName: country.countryName }
                }}
              >
                <Header>
                  <SAvatar size={"sm"} countryPhoto={country.countryPhoto} />
                  <HeaderColumn>
                    <HeaderText text={country.countryName} />
                    <Location>{country.continent.continentName}</Location>
                  </HeaderColumn>
                </Header>
              </Link>
            </UserRow>
          ))}
        {search.length > 0 &&
          continents &&
          continents.length > 0 &&
          continents.map(continent => (
            <UserRow key={continent.id}>
              <Link to={`/continent/${continent.continentCode}`}>
                <Header>
                  <SAvatar
                    size={"sm"}
                    continentPhoto={continent.continentPhoto}
                  />
                  <HeaderColumn>
                    <HeaderText text={continent.continentName} />
                  </HeaderColumn>
                </Header>
              </Link>
            </UserRow>
          ))}
        {users &&
          users.length === 0 &&
          results &&
          results.length === 0 &&
          countries &&
          countries.length === 0 &&
          continents &&
          continents.length === 0 && <Bold text="Nothing found..." />}
      </SWrapper>
    );
  }
};

export default SearchPresenter;
