import gql from "graphql-tag";
import { COUNTRY_FRAGMENT } from "src/sharedQueries";

export const EDIT_PROFILE = gql`
  mutation EditProfile(
    $username: String
    $bio: String
    $gender: String
    $firstName: String
    $lastName: String
    $nationalityCode: String
    $residenceCode: String
  ) {
    editProfile(
      username: $username
      bio: $bio
      gender: $gender
      firstName: $firstName
      lastName: $lastName
      nationalityCode: $nationalityCode
      residenceCode: $residenceCode
    ) {
      ok
      token
      user {
        id
        username
        firstName
        lastName
        bio
        uuid
        gender
        avatarUrl
        website
        distance
        countryPhoneNumber
        countryPhoneCode
        phoneNumber
        emailAddress
        isVerifiedPhoneNumber
        isVerifiedEmailAddress
        nationality {
          countryEmoji
          ...CountryParts
        }
        residence {
          countryEmoji
          ...CountryParts
        }
        postCount
        tripCount
        cityCount
        countryCount
        continentCount
        isSelf
        isDarkMode
        isHideTrips
        isHideCities
        isHideCountries
        isHideContinents
        isAutoLocationReport
        currentCity {
          latitude
          longitude
          cityId
          cityName
          cityThumbnail
          country {
            countryName
            countryCode
          }
        }
      }
    }
  }
  ${COUNTRY_FRAGMENT}
`;

export const DELETE_PROFILE = gql`
  mutation DeleteProfile {
    deleteProfile {
      ok
    }
  }
`;

export const START_EDIT_PHONE_VERIFICATION = gql`
  mutation StartEditPhoneVerification(
    $phoneNumber: String!
    $countryPhoneNumber: String!
  ) {
    startEditPhoneVerification(
      phoneNumber: $phoneNumber
      countryPhoneNumber: $countryPhoneNumber
    ) {
      ok
    }
  }
`;

export const COMPLETE_EDIT_PHONE_VERIFICATION = gql`
  mutation CompleteEditPhoneVerification(
    $key: String!
    $phoneNumber: String!
    $countryPhoneNumber: String!
    $countryPhoneCode: String!
  ) {
    completeEditPhoneVerification(
      key: $key
      phoneNumber: $phoneNumber
      countryPhoneNumber: $countryPhoneNumber
      countryPhoneCode: $countryPhoneCode
    ) {
      ok
      phoneNumber
      countryPhoneNumber
      countryPhoneCode
      isVerifiedPhoneNumber
    }
  }
`;

export const START_EDIT_EMAIL_VERIFICATION = gql`
  mutation StartEditEmailVerification($emailAddress: String!) {
    startEditEmailVerification(emailAddress: $emailAddress) {
      ok
    }
  }
`;
