import gql from "graphql-tag";
import { COUNTRY_FRAGMENT } from "src/sharedQueries";

export const GET_USER = gql`
  query UserProfile($uuid: String!) {
    userProfile(uuid: $uuid) {
      user {
        id
        username
        firstName
        lastName
          uuid
          bio
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
            cityName
            cityId
            cityPhoto
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

export const GET_TRIPS = gql`
  query GetTrips($uuid: String!, $page: Int) {
    getTrips(uuid: $uuid, page: $page) {
      trip {
        id
        city {
          cityId
          cityName
          cityPhoto
          cityThumbnail
          country {
            countryName
            countryCode
          }
        }
        naturalTime
      }
    }
  }
`;

export const ADD_TRIP = gql`
  mutation AddTrip(
    $cityId: String!
  ) {
    addTrip(cityId: $cityId) {
      ok
      distance
      moveNotification {
        city {
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
`;

export const EDIT_TRIP = gql`
  mutation EditTrip(
    $moveNotificationId: Int!
    $cityId: String
  ) {
    editTrip(
      moveNotificationId: $moveNotificationId
      cityId: $cityId
    ) {
      ok
      distance
      moveNotification {
        id
        city {
          cityId
          cityName
          cityThumbnail
          country {
            countryName
            countryCode
          }
        }
        naturalTime
      }
    }
  }
`;

export const DELETE_TRIP = gql`
  mutation DeleteTrip($moveNotificationId: Int!) {
    deleteTrip(moveNotificationId: $moveNotificationId) {
      ok
      distance
      tripId
    }
  }
`;

export const GET_AVATARS = gql`
  query GetAvatars($uuid: String!) {
    getAvatars(uuid: $uuid) {
      avatars {
        id
        uuid
        image
        isMain
        likeCount
        thumbnail
      }
    }
  }
`;

export const UPLOAD_AVATAR = gql`
  mutation UploadAvatar($file: Upload!) {
    uploadAvatar(file: $file) {
      ok
      preAvatarUUID
      newAvatarUUID
      avatar {
        id
        uuid
        image
        isMain
        likeCount
        thumbnail
      }
    }
  }
`;

export const DELETE_AVATAR = gql`
  mutation DeleteAvatar($uuid: String!) {
    deleteAvatar(uuid: $uuid) {
      ok
      uuid
    }
  }
`;

export const MARK_AS_MAIN = gql`
  mutation MarkAsMain($uuid: String!) {
    markAsMain(uuid: $uuid) {
      ok
      preAvatarUUID
      newAvatarUUID
      avatar {
        id
        uuid
        image
        isMain
        likeCount
        thumbnail
      }
    }
  }
`;

export const CALCULATE_DISTANCE = gql`
  mutation CalculateDistance {
    calculateDistance {
      distance
    }
  }
`;

export const SLACK_REPORT_USERS = gql`
  mutation SlackReportUsers($targetUuid: String!, $payload: String!) {
    slackReportUsers(targetUuid: $targetUuid, payload: $payload) {
      ok
    }
  }
`;
