import gql from "graphql-tag";

export const TOGGLE_SETTINGS = gql`
  mutation ToggleSettings($payload: String!) {
    toggleSettings(payload: $payload) {
      ok
      user {
        id
        username
        profile {
          id
          uuid
          isSelf
          isDarkMode
          isHideTrips
          isHideCoffees
          isHideCities
          isHideCountries
          isHideContinents
          isAutoLocationReport
        }
      }
    }
  }
`;
