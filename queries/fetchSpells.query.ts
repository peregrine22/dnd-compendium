import { gql } from 'graphql-request';

export const FETCH_SPELLS = gql`
  query Query($limit: Int!) {
    spells(limit: $limit) {
      index
      level
      name
      school {
        name
      }
    }
  }
`;
