import gql from "graphql-tag";
import { PROFILE_FRAGMENT } from "src/sharedQueries";

export const CONTINENT_USERS_NOW = gql`
  query ContinentUsersNow($page: Int, $continentCode: String!) {
    continentUsersNow(page: $page, continentCode: $continentCode) {
      page
      hasNextPage
      usersNow {
        ...ProfileParts
      }
    }
  }
  ${PROFILE_FRAGMENT}
`;
