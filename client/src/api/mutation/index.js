import gql from "graphql-tag";
import * as fragment from "api/fragments/index";

export const LOGIN = gql`
  mutation ($username: String!, $password: String!) {
    login(username: $username, password: $password) {
      success
      error {
        __typename
        ... on ValidationErrors {
          validationErrors {
            field
            messages
          }
        }
      }
      token
      user {
        ...User
      }
    }
  }
  ${fragment.UserFragment}
`;

export const REGISTER = gql`
  mutation register(
    $email: String!
    $firstName: String
    $lastName: String
    $password1: String!
    $password2: String!
    $role: Int!
  ) {
    register(
      email: $email
      firstName: $firstName
      lastName: $lastName
      password1: $password1
      password2: $password2
      role: $role
    ) {
      token
      user {
        ...User
      }
      success
      error {
        __typename
        ... on ValidationErrors {
          validationErrors {
            field
            messages
          }
        }
      }
    }
  }
  ${fragment.UserFragment}
`;

export const VERIFY_TOKEN = gql`
  mutation verifyToken($token: String!) {
    verifyToken(token: $token) {
      success
      user {
        ...User
      }
    }
  }
  ${fragment.UserFragment}
`;
