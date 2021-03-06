import gql from "graphql-tag";

export const COMPLETE_EDIT_EMAIL_VERIFICATION = gql`
  mutation CompleteEditEmailVerification($key: String!) {
    completeEditEmailVerification(key: $key) {
      ok
      token
      user {
        username
        uuid
        avatarUrl
        currentCity {
          cityId
          cityName
        }
      }
    }
  }
`;
