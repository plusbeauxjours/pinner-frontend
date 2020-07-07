import React from "react";
import styled from "src/Styles/typed-components";
import { Link, RouteComponentProps, withRouter } from "react-router-dom";
import Bold from "./Bold";
import Avatar from "./Avatar";
import CityLikeBtn from "./CityLikeBtn";
import LoadingOverlay from "react-loading-overlay";
import ClipLoader from "react-spinners/ClipLoader";

const SeeAll = styled.p`
  font-size: 12px;
  font-weight: 100;
  cursor: pointer;
  color: ${(props) => props.theme.greyColor};
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
    -webkit-box-shadow: inset 0 0 6px ${(props) => props.theme.trackShadowColor};
    border-radius: 10px;
  }
  ::-webkit-scrollbar-thumb {
    border-radius: 10px;
    -webkit-box-shadow: inset 0 0 6px ${(props) => props.theme.trackShadowColor};
    background-color: ${(props) => props.theme.greyColor};
  }
`;

const UserRow = styled.div<ITheme>`
  display: grid;
  height: 50px;
  width: 400px;
  grid-template-columns: ${(props) => {
    if (props.type === "continents") {
      return "3fr 1fr";
    } else if (props.type === "countries") {
      return "3fr 1fr";
    } else if (props.type === "samenameCities") {
      return "2fr 1fr 1fr";
    } else if (props.type === "nearCities") {
      return "2fr 1fr 1fr";
    } else {
      return "1fr";
    }
  }};
  padding: 0 5px 0 5px;
  grid-gap: 15px;
  align-items: center;
  cursor: pointer;
  transition: background-color 0.2s ease-in-out;
  &:hover {
    background-color: ${(props) => props.theme.hoverColor};
  }
  border-bottom: 1px solid ${(props) => props.theme.borderColor};
  &:last-child {
    margin-bottom: 15px;
  }
`;

const Location = styled.span`
  display: flex;
  margin-top: 5px;
  position: block;
  font-size: 12px;
  font-weight: 200;
`;

const HeaderColumn = styled.div`
  margin-left: 15px;
`;

const GreyLine = styled.div`
  margin-top: 10px;
  margin-bottom: 10px;
  border-bottom: 1px solid ${(props) => props.theme.borderColor};
  @media screen and (max-width: 935px) {
    margin: 10px 15px 0 15px;
  }
`;

const SText = styled(Bold)`
  font-size: 18px;
  font-weight: 100;
  text-transform: uppercase;
`;

const Title = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 10px;
  @media screen and (max-width: 935px) {
    margin: 10px 15px 0 15px;
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

const HeaderText = styled(Bold)`
  display: flex;
`;

const Text = styled.p`
  font-weight: 300;
  display: flex;
  align-items: center;
`;

const Div = styled.div`
  display: flex;
  align-items: center;
  height: 49px;
`;

interface ITheme {
  type: string;
}

interface IProps extends RouteComponentProps<any> {
  cityId?: string;
  countryCode?: string;
  continentCode?: string;
  samenameCities?: any;
  nearCities?: any;
  cities?: any;
  countries?: any;
  continents?: any;
  title: string;
  loading: boolean;
}

const LocationBox: React.FunctionComponent<IProps> = ({
  cityId,
  countryCode,
  continentCode,
  samenameCities,
  nearCities,
  cities,
  countries,
  continents,
  title,
  loading,
}) => {
  if (loading) {
    return (
      <>
        <GreyLine />
        <Container>
          <LoadingOverlay
            active={true}
            spinner={<ClipLoader color={"#999"} />}
            fadeSpeed={500}
          />
        </Container>
      </>
    );
  } else if (!loading && continents && continents.length !== 0) {
    return (
      <>
        <GreyLine />
        <Title>
          <SText text={title} />
        </Title>
        <Container>
          <Box>
            {continents.map((continent) => (
              <React.Fragment key={continent.id}>
                <Link to={`/continent/${continent.continentCode}`}>
                  <UserRow type={"continents"}>
                    <Header>
                      <SAvatar
                        size={"sm"}
                        url={continent.continentPhoto}
                        city={true}
                      />
                      <HeaderColumn>
                        <HeaderText text={continent.continentName} />
                      </HeaderColumn>
                    </Header>
                    <Text>
                      {continent.countryCount}{" "}
                      {continent.countryCount === 1 ? "country" : "countries"}
                    </Text>
                  </UserRow>
                </Link>
              </React.Fragment>
            ))}
          </Box>
        </Container>
      </>
    );
  } else if (!loading && samenameCities && samenameCities.length !== 0) {
    return (
      <>
        <GreyLine />
        <Title>
          <SText text={title} />
        </Title>
        <Container>
          <Box>
            {samenameCities.map((samenameCity) => (
              <React.Fragment key={samenameCity.id}>
                <UserRow type={"samenameCities"}>
                  <Link to={`/city/${samenameCity.cityId}`}>
                    <Header>
                      <SAvatar
                        size={"sm"}
                        url={samenameCity.cityThumbnail}
                        city={true}
                      />
                      <HeaderColumn>
                        <HeaderText text={samenameCity.cityName} />
                        <Location>{samenameCity.country.countryName}</Location>
                      </HeaderColumn>
                    </Header>
                  </Link>
                  <CityLikeBtn
                    isLiked={samenameCity.isLiked}
                    cityId={samenameCity.cityId}
                    likeCount={samenameCity.likeCount}
                    type={"row"}
                  />
                  <Link to={`/city/${samenameCity.cityId}`}>
                    <Div>
                      <Text>{samenameCity.distance}km</Text>
                    </Div>
                  </Link>
                </UserRow>
              </React.Fragment>
            ))}
          </Box>
        </Container>
      </>
    );
  } else if (!loading && cities && cities.length !== 0) {
    return <GreyLine />;
  } else if (!loading && countries && countries.length !== 0) {
    return (
      <>
        <GreyLine />
        <Title>
          <SText text={title} />
        </Title>
        <Container>
          <Box>
            {countries.map((country) => (
              <React.Fragment key={country.id}>
                <Link to={`/country/${country.countryCode}`}>
                  <UserRow type={"countries"}>
                    <Header>
                      <SAvatar
                        size={"sm"}
                        url={country.countryPhoto}
                        city={true}
                      />
                      <HeaderColumn>
                        <HeaderText text={country.countryName} />
                        <Location>{country.continent.continentName}</Location>
                      </HeaderColumn>
                    </Header>
                    <Text>
                      {country.cityCount}{" "}
                      {country.cityCount === 1 ? "city" : "cities"}
                    </Text>
                  </UserRow>
                </Link>
              </React.Fragment>
            ))}
          </Box>
        </Container>
      </>
    );
  } else if (!loading && continents && continents.length !== 0) {
    return (
      <>
        <GreyLine />
        <Title>
          <SText text={title} />
        </Title>
        <Container>
          <Box>
            {continents.map((continent) => (
              <React.Fragment key={continent.id}>
                <Link to={`/continent/${continent.continentCode}`}>
                  <UserRow type={"continents"}>
                    <Header>
                      <SAvatar
                        size={"sm"}
                        url={continent.continentPhoto}
                        city={true}
                      />
                      <HeaderColumn>
                        <HeaderText text={continent.continentName} />
                      </HeaderColumn>
                    </Header>
                    <Text>
                      {continent.countryCount}{" "}
                      {continent.countryCount === 1 ? "country" : "countries"}
                    </Text>
                  </UserRow>
                </Link>
              </React.Fragment>
            ))}
          </Box>
        </Container>
      </>
    );
  } else if (!loading && nearCities && nearCities.length !== 0) {
    return (
      <>
        <GreyLine />
        <Title>
          <SText text={title} />
          <Link to={`/city/${cityId}/nearCities`}>
            <SeeAll>SEE ALL</SeeAll>
          </Link>
        </Title>
        <Container>
          <Box>
            {nearCities.map((nearCity) => (
              <React.Fragment key={nearCity.id}>
                <UserRow type={"nearCities"}>
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
                    cityId={nearCity.cityId}
                    likeCount={nearCity.likeCount}
                    type={"row"}
                  />
                  <Link to={`/city/${nearCity.cityId}`}>
                    <Div>
                      <Text>{nearCity.distance}&nbsp;km</Text>
                    </Div>
                  </Link>
                </UserRow>
              </React.Fragment>
            ))}
          </Box>
        </Container>
      </>
    );
  } else {
    return null;
  }
};

export default withRouter(LocationBox);
