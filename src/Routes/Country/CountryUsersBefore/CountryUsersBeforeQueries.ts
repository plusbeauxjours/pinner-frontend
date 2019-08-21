import gql from "graphql-tag";
import { PROFILE_FRAGMENT } from "src/sharedQueries";

export const COUNTRY_USERS_BEFORE = gql`
  query CountryUsersBefore($page: Int, $countryCode: String!) {
    countryUsersBefore(page: $page, countryCode: $countryCode) {
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
