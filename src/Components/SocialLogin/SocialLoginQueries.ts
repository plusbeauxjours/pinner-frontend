import gql from "graphql-tag";

export const FACEBOOK_CONNECT = gql`
  mutation FacebookConnect(
    $firstName: String
    $lastName: String
    $email: String
    $gender: String
    $latitude: Float!
    $longitude: Float!
    $cityId: String!
    $cityName: String!
    $countryCode: String!
    $fbId: String!
  ) {
    facebookConnect(
      firstName: $firstName
      lastName: $lastName
      email: $email
      gender: $gender
      latitude: $latitude
      longitude: $longitude
      cityId: $cityId
      cityName: $cityName
      countryCode: $countryCode
      fbId: $fbId
    ) {
      token
    }
  }
`;
