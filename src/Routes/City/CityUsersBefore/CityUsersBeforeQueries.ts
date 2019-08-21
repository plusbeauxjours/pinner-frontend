import gql from "graphql-tag";
import { PROFILE_FRAGMENT } from "src/sharedQueries";

export const CITY_USERS_BEFORE = gql`
  query CityUsersBefore($page: Int, $cityId: String!) {
    cityUsersBefore(page: $page, cityId: $cityId) {
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
