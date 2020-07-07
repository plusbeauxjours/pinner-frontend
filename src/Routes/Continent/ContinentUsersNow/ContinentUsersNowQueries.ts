import gql from "graphql-tag";

export const CONTINENT_USERS_NOW = gql`
  query ContinentUsersNow($page: Int, $continentCode: String!) {
    continentUsersNow(page: $page, continentCode: $continentCode) {
      page
      hasNextPage
      usersNow {
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
`;
