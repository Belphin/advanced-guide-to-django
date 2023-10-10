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
        postsCount
        latestPost {
          id
          createdAt
        }
      }
      totalPages
      totalElements
    }
  }
`;

export const GET_TOPICS = gql`
  query ($page: Int, $perPage: Int, $boardName: String) {
    topics(page: $page, perPage: $perPage, boardName: $boardName) {
      items {
        id
        subject
        postsCount
        lastUpdated
        views
        starter {
          id
          email
        }
        board {
          id
          name
          description
        }
      }
      totalPages
      totalElements
    }
  }
`;
