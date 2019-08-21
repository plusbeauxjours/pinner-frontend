import gql from "graphql-tag";
import { CITY_FRAGMENT } from "src/sharedQueries";

export const NEAR_CITIES = gql`
  query NearCities($cityId: String!, $page: Int) {
    nearCities(cityId: $cityId, page: $page) {
      page
      hasNextPage
      cities {
        ...CityParts
      }
    }
  }
  ${CITY_FRAGMENT}
`;
