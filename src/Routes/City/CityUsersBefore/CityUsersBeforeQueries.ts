import gql from "graphql-tag";
import { PROFILE_FRAGMENT } from "src/sharedQueries";

export const CITY_USERS_BEFORE = gql`
  query CityUsersBefore($page: Int, $cityId: String!, $payload: String) {
    cityUsersBefore(page: $page, cityId: $cityId, payload: $payload) {
      page
      hasNextPage
      usersBefore {
        naturalTime
        actor {
          profile {
            ...ProfileParts
          }
        }
      }
    }
  }
  ${PROFILE_FRAGMENT}
`;
