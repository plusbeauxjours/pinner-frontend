import gql from "graphql-tag";

export const TOGGLE_LIKE_CITY = gql`
  mutation ToggleLikeCity($cityId: Int!) {
    toggleLikeCity(cityId: $cityId) {
      ok
      city {
        id
        isLiked
        likeCount
        country {
          countryName
        }
      }
    }
  }
`;
