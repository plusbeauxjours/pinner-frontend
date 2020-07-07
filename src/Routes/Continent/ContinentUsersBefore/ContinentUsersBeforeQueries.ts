import gql from "graphql-tag";

export const CONTINENT_USERS_BEFORE = gql`
  query ContinentUsersBefore($page: Int, $continentCode: String!) {
    continentUsersBefore(page: $page, continentCode: $continentCode) {
      page
      hasNextPage
      usersBefore {
        naturalTime
        actor {
          id
          uuid
          username
          avatarUrl
          isSelf
          currentCity {
            cityName
            country {
              countryName
            }
          }
        }
      }
    }
  }
`;
