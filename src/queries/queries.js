import { gql } from 'apollo-boost';

const GET_GOALS_QUERY = gql`
  {
    goals {
      id
      type
    }
  }
`;

const GET_FORMS_QUERY = gql`
  {
    forms {
      id
      type
    }
  }
`;

const GET_DURATIONS_QUERY = gql`
  {
    durations
  }
`;

const GET_LOANS_QUERY = gql`
  {
    loans {
      minAmount
      maxAmount
      minDuration
      maxDuration
      formId
      goalId
    }
  }
`;

const GET_ALL = gql`
  {
    forms {
      id
      type
    }
    goals {
      id
      type
    }
    durations
    loans {
      minAmount
      maxAmount
      minDuration
      maxDuration
      formId
      goalId
    }
  }
`;

export {
  GET_GOALS_QUERY,
  GET_FORMS_QUERY,
  GET_DURATIONS_QUERY,
  GET_LOANS_QUERY,
  GET_ALL
};
