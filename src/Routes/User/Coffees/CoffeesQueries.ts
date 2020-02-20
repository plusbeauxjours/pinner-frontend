import gql from "graphql-tag";
import { COFFEE_FRAGMENT } from "../../../sharedQueries";

export const GET_COFFEES = gql`
  query GetCoffees(
    $cityId: String
    $countryCode: String
    $continentCode: String
    $uuid: String
    $location: String!
  ) {
    getCoffees(
      cityId: $cityId
      countryCode: $countryCode
      continentCode: $continentCode
      uuid: $uuid
      location: $location
    ) {
      coffees {
        ...CoffeeParts
      }
    }
  }
  ${COFFEE_FRAGMENT}
`;
