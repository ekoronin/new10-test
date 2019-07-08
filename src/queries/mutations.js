import { gql } from 'apollo-boost';

const PUT_RATE_MUTATION = gql`
  mutation CalculateRate(
    $amount: Int!
    $duration: Int!
    $minDuration: Int!
    $maxDuration: Int!
  ) {
    rate(
      amount: $amount
      duration: $duration
      minDuration: $minDuration
      maxDuration: $maxDuration
    )
  }
`;

export { PUT_RATE_MUTATION };
