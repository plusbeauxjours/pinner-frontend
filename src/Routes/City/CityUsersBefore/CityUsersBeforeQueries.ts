import gql from "graphql-tag";

export const CITY_USERS_BEFORE = gql`
  query CityUsersBefore($page: Int, $cityId: String!, $payload: String) {
    cityUsersBefore(page: $page, cityId: $cityId, payload: $payload) {
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
