import gql from "graphql-tag";

export const CITY_USERS_NOW = gql`
  query CityUsersNow($page: Int, $cityId: String!) {
    cityUsersNow(page: $page, cityId: $cityId) {
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
