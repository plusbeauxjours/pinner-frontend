import gql from "graphql-tag";

export const COUNTRY_USERS_BEFORE = gql`
  query CountryUsersBefore($page: Int, $countryCode: String!) {
    countryUsersBefore(page: $page, countryCode: $countryCode) {
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
