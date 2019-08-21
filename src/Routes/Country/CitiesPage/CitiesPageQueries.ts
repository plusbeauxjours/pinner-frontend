import gql from "graphql-tag";
import { CITY_FRAGMENT } from "src/sharedQueries";

export const GET_CITIES_PAGE = gql`
  query GetCitiesPage($page: Int, $countryCode: String!) {
    getCitiesPage(page: $page, countryCode: $countryCode) {
      page
      hasNextPage
      cityCount
      cities {
        ...CityParts
      }
    }
  }
  ${CITY_FRAGMENT}
`;
