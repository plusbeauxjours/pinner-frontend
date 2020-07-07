import gql from "graphql-tag";

export const TOGGLE_SETTINGS = gql`
  mutation ToggleSettings($payload: String!) {
    toggleSettings(payload: $payload) {
      ok
      user {
        id
        username
        uuid
        isSelf
        isDarkMode
        isHideTrips
        isHideCities
        isHideCountries
        isHideContinents
        isAutoLocationReport
      }
    }
  }
`;
