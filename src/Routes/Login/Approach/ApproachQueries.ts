import gql from "graphql-tag";

export const PHONE_SIGN_IN = gql`
  mutation StartPhoneVerification($phoneNumber: String!) {
    startPhoneVerification(phoneNumber: $phoneNumber) {
      ok
    }
  }
`;

export const EMAIL_SIGN_IN = gql`
  mutation StartEmailVerification($emailAddress: String!) {
    startEmailVerification(emailAddress: $emailAddress) {
      ok
    }
  }
`;
