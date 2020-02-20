import gql from "graphql-tag";
import { COFFEE_FRAGMENT, MATCH_FRAGMENT } from "src/sharedQueries";

export const MATCH = gql`
  mutation Match($coffeeId: String!) {
    match(coffeeId: $coffeeId) {
      ok
      coffeeId
      cityId
      countryCode
      continentCode
      match {
        ...MatchParts
      }
    }
  }
  ${MATCH_FRAGMENT}
`;

export const UNMATCH = gql`
  mutation UnMatch($matchId: Int!) {
    unMatch(matchId: $matchId) {
      ok
      matchId
      cityId
      countryCode
      continentCode
    }
  }
  ${COFFEE_FRAGMENT}
`;
