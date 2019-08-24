import gql from "graphql-tag";
import {
  PROFILE_FRAGMENT,
  COUNTRY_FRAGMENT,
  CONTINENT_FRAGMENT
} from "src/sharedQueries";

export const CONTINENT_PROFILE = gql`
  query ContinentProfile($page: Int, $continentCode: String!) {
    continentProfile(page: $page, continentCode: $continentCode) {
      count
      hasNextPage
      usersNow {
        ...ProfileParts
      }
      usersBefore {
        actor {
          profile {
            ...ProfileParts
          }
        }
      }
      continent {
        countryCount
        ...ContinentParts
      }
      continents {
        countryCount
        ...ContinentParts
      }
      countries {
        ...CountryParts
      }
    }
  }
  ${PROFILE_FRAGMENT}
  ${COUNTRY_FRAGMENT}
  ${CONTINENT_FRAGMENT}
`;