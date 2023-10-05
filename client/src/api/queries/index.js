import gql from "graphql-tag";

export const GET_USER_ROLES = gql`
  query {
    roles {
      id
      name
    }
  }
`;
