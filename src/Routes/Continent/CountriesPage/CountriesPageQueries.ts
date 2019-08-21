import gql from "graphql-tag";
import { COUNTRY_FRAGMENT } from "src/sharedQueries";

export const GET_COUNTRIES_PAGE = gql`
  query GetCountriesPage($page: Int, $continentCode: String!) {
    getCountriesPage(page: $page, continentCode: $continentCode) {
      page
      hasNextPage
      countryCount
      countries {
        ...CountryParts
      }
    }
  }
  ${COUNTRY_FRAGMENT}
`;
