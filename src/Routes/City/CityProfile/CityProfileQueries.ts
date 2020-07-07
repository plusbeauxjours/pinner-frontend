import gql from "graphql-tag";
import { CITY_FRAGMENT, CONTINENT_FRAGMENT } from "src/sharedQueries";

export const CITY_PROFILE = gql`
  query CityProfile($page: Int, $cityId: String!) {
    cityProfile(page: $page, cityId: $cityId) {
      count
      hasNextPage
      usersNow {
        id
        uuid
        username
        avatarUrl
        isSelf
        currentCity {
          cityName
          country {
            countryName
          }
        }
      }
      usersBefore {
        actor {
          id
          uuid
          username
          avatarUrl
          isSelf
          currentCity {
            cityName
            country {
              countryName
            }
          }
        }
      }
      city {
        id
        latitude
        longitude
        cityId
        cityName
        cityPhoto
        country {
          countryName
          countryPhoto
          countryCode
          continent {
            ...ContinentParts
          }
        }
        likeCount
        isLiked
        userCount
        userLogCount
        count
      }
    }
  }
  ${CONTINENT_FRAGMENT}
`;

export const GET_SAMENAME_CITIES = gql`
  query GetSamenameCities($cityId: String!) {
    getSamenameCities(cityId: $cityId) {
      cities {
        ...CityParts
      }
    }
  }
  ${CITY_FRAGMENT}
`;
