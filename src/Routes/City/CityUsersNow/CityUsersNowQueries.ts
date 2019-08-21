import gql from "graphql-tag";
import { PROFILE_FRAGMENT } from "src/sharedQueries";

export const CITY_USERS_NOW = gql`
  query CityUsersNow($page: Int, $cityId: String!) {
    cityUsersNow(page: $page, cityId: $cityId) {
      page
      hasNextPage
      usersNow {
        ...ProfileParts
      }
    }
  }
  ${PROFILE_FRAGMENT}
`;
