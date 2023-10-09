import gql from "graphql-tag";

export const GET_USER_ROLES = gql`
  query {
    roles {
      id
      name
    }
  }
`;

export const GET_BOARDS = gql`
  query ($page: Int, $perPage: Int) {
    boards(page: $page, perPage: $perPage) {
      items {
        id
        name
        description
        topicsCount
      }
      totalPages
      totalElements
    }
  }
`;
