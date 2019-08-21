import gql from "graphql-tag";
import { CITY_FRAGMENT } from "src/sharedQueries";

export const RECOMMEND_LOCATIONS = gql`
  query RecommendLocations($page: Int) {
    recommendLocations(page: $page) {
      page
      hasNextPage
      cities {
        ...CityParts
      }
    }
  }
  ${CITY_FRAGMENT}
`;
