import gql from "graphql-tag";
import { CONTINENT_FRAGMENT } from "src/sharedQueries";

export const TOP_CONTINENTS = gql`
  query TopContinents($uuid: String!) {
    topContinents(uuid: $uuid) {
      continents {
        count
        diff
        ...ContinentParts
      }
    }
  }
  ${CONTINENT_FRAGMENT}
`;
