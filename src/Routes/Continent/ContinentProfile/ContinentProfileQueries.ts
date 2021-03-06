import gql from "graphql-tag";
import { COUNTRY_FRAGMENT, CONTINENT_FRAGMENT } from "src/sharedQueries";

export const CONTINENT_PROFILE = gql`
  query ContinentProfile($page: Int, $continentCode: String!) {
    continentProfile(page: $page, continentCode: $continentCode) {
      count
      hasNextPage
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
  ${COUNTRY_FRAGMENT}
  ${CONTINENT_FRAGMENT}
`;
