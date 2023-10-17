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
  query ($page: Int, $perPage: Int, $boardId: Int) {
    topics(page: $page, perPage: $perPage, boardId: $boardId) {
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
        }
      }
      totalPages
      totalElements
      boardName
    }
  }
`;

export const GET_POSTS = gql`
  query ($page: Int, $perPage: Int, $topicId: Int) {
    posts(page: $page, perPage: $perPage, topicId: $topicId) {
      items {
        id
        message
        createdBy {
          id
          email
        }
        createdAt
      }
      totalPages
      totalElements
      topic {
        subject
        board {
          id
          name
        }
      }
    }
  }
`;
