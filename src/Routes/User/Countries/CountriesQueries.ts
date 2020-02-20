import gql from "graphql-tag";
import { COUNTRY_FRAGMENT } from "src/sharedQueries";

export const TOP_COUNTRIES = gql`
  query TopCountries($uuid: String!) {
    topCountries(uuid: $uuid) {
      countries {
        count
        diff
        ...CountryParts
      }
    }
  }
  ${COUNTRY_FRAGMENT}
`;
