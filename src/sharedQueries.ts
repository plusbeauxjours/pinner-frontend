import gql from "graphql-tag";

export const ME = gql`
  query Me {
    me {
      user {
        username
        uuid
        gender
        residence {
          countryCode
          countryName
          countryEmoji
        }
        nationality {
          countryCode
          countryName
          countryEmoji
        }
        avatarUrl
        appAvatarUrl
        currentCity {
          cityId
          cityName
        }
      }
    }
  }
`;

export const CITY_FRAGMENT = gql`
  fragment CityParts on CityType {
    id
    latitude
    longitude
    cityName
    cityId
    cityPhoto
    cityThumbnail
    distance
    country {
      countryName
    }
    likeCount
    isLiked
  }
`;

export const COUNTRY_FRAGMENT = gql`
  fragment CountryParts on CountryType {
    id
    countryName
    countryCode
    countryPhoto
    cityCount
    continent {
      continentCode
      continentName
    }
  }
`;

export const CONTINENT_FRAGMENT = gql`
  fragment ContinentParts on ContinentType {
    id
    continentName
    continentCode
    continentPhoto
  }
`;


export const SLACK_REPORT_LOCATIONS = gql`
  mutation SlackReportLocations(
    $targetLocationId: String!
    $targetLocationType: String!
    $payload: String!
  ) {
    slackReportLocations(
      targetLocationId: $targetLocationId
      targetLocationType: $targetLocationType
      payload: $payload
    ) {
      ok
    }
  }
`;
