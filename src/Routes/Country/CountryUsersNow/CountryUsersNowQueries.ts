import gql from "graphql-tag";
import { PROFILE_FRAGMENT } from "src/sharedQueries";

export const COUNTRY_USERS_NOW = gql`
  query CountryUsersNow($page: Int, $countryCode: String!) {
    countryUsersNow(page: $page, countryCode: $countryCode) {
      page
      hasNextPage
      usersNow {
        ...ProfileParts
      }
    }
  }
  ${PROFILE_FRAGMENT}
`;
