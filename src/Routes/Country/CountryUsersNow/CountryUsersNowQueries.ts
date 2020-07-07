import gql from "graphql-tag";

export const COUNTRY_USERS_NOW = gql`
  query CountryUsersNow($page: Int, $countryCode: String!) {
    countryUsersNow(page: $page, countryCode: $countryCode) {
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
