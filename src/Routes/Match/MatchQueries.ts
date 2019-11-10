import gql from "graphql-tag";
import { MATCH_FRAGMENT, COFFEE_FRAGMENT } from "src/sharedQueries";

export const GET_MATCHES = gql`
  query GetMatches($page: Int) {
    getMatches(page: $page) {
      matches {
        ...MatchParts
      }
    }
  }
  ${MATCH_FRAGMENT}
`;

export const REQUEST_COFFEE = gql`
  mutation RequestCoffee(
    $countryCode: String
    $gender: String
    $currentCityId: String!
    $target: String
  ) {
    requestCoffee(
      countryCode: $countryCode
      gender: $gender
      currentCityId: $currentCityId
      target: $target
    ) {
      ok
      coffee {
        ...CoffeeParts
      }
    }
  }
  ${COFFEE_FRAGMENT}
`;

export const MARK_AS_READ_MATCH = gql`
  mutation MarkAsReadMatch($matchId: String!) {
    markAsReadMatch(matchId: $matchId) {
      ok
      matchId
      isReadByHost
      isReadByGuest
    }
  }
`;
