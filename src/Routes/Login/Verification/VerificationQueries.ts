import gql from "graphql-tag";

export const COMPLETE_PHONE_SIGN_IN = gql`
  mutation CompletePhoneVerification(
    $key: String!
    $phoneNumber: String!
    $countryPhoneNumber: String!
    $countryPhoneCode: String!
    $cityId: String!
  ) {
    completePhoneVerification(
      key: $key
      phoneNumber: $phoneNumber
      countryPhoneNumber: $countryPhoneNumber
      countryPhoneCode: $countryPhoneCode
      cityId: $cityId
    ) {
      ok
      token
    }
  }
`;

export const COMPLETE_EMAIL_SIGN_IN = gql`
  mutation CompleteEmailVerification($key: String!, $cityId: String!) {
    completeEmailVerification(key: $key, cityId: $cityId) {
      ok
      token
      user {
        username
        profile {
          uuid
          avatarUrl
          currentCity {
            cityId
            cityName
          }
        }
      }
    }
  }
`;
