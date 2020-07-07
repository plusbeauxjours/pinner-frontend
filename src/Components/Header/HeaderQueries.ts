import gql from "graphql-tag";
import {
  COUNTRY_FRAGMENT,
  CONTINENT_FRAGMENT
} from "src/sharedQueries";

export const GET_HEADER = gql`
  query Header($cityId: String!) {
    header(cityId: $cityId) {
      city {
        cityId
        cityName
        cityThumbnail
        country {
          countryName
          countryPhoto
          countryCode
        }
        userCount
        userLogCount
      }
    }
  }
`;

export const SEARCH = gql`
  query SearchTerms($search: String!) {
    searchUsers(search: $search) {
      users {
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
    searchCountries(search: $search) {
      countries {
        ...CountryParts
      }
    }
    searchContinents(search: $search) {
      continents {
        ...ContinentParts
      }
    }
  }
  ${COUNTRY_FRAGMENT}
  ${CONTINENT_FRAGMENT}
`;
