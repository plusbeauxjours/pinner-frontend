import gql from "graphql-tag";
import { CITY_FRAGMENT } from "src/sharedQueries";

export const FREQUENT_VISITS = gql`
  query FrequentVisits($uuid: String!) {
    frequentVisits(uuid: $uuid) {
      cities {
        count
        ...CityParts
      }
    }
  }
  ${CITY_FRAGMENT}
`;
