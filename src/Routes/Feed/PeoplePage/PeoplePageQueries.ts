import gql from "graphql-tag";
import { PROFILE_FRAGMENT } from "src/sharedQueries";

export const RECOMMEND_USERS = gql`
  query RecommendUsers($page: Int) {
    recommendUsers(page: $page) {
      page
      hasNextPage
      users {
        ...ProfileParts
      }
    }
  }
  ${PROFILE_FRAGMENT}
`;
