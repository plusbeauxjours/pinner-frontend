import gql from "graphql-tag";

export const FACEBOOK_CONNECT = gql`
  mutation FacebookConnect(
    $firstName: String
    $lastName: String
    $email: String
    $gender: String
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
      cityId: $cityId
      cityName: $cityName
      countryCode: $countryCode
      fbId: $fbId
    ) {
      token
    }
  }
`;
