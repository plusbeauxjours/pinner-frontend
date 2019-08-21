import gql from "graphql-tag";
import { PROFILE_FRAGMENT } from "src/sharedQueries";

export const CONTINENT_USERS_BEFORE = gql`
  query ContinentUsersBefore($page: Int, $continentCode: String!) {
    continentUsersBefore(page: $page, continentCode: $continentCode) {
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
