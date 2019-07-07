const graphql = require('graphql');

const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLSchema,
  GraphQLID,
  GraphQLInt,
  GraphQLList,
  GraphQLNonNull
} = graphql;

const {
  getGoal,
  getGoals,
  getForm,
  getForms,
  getDurations,
  getLoan,
  getLoans
} = require('../json/api.js');

const GoalType = new GraphQLObjectType({
  name: 'Goal',
  fields: () => ({
    id: { type: GraphQLID },
    type: { type: GraphQLString },
    loans: {
      type: new GraphQLList(LoanType),
      resolve(parent, args) {
        return getLoan(parent.id);
      }
    }
  })
});

const FormType = new GraphQLObjectType({
  name: 'Form',
  fields: () => ({
    id: { type: GraphQLID },
    type: { type: GraphQLString },
    loans: {
      type: new GraphQLList(LoanType),
      resolve(parent, args) {
        return getLoan(undefined, parent.id);
      }
    }
  })
});

const LoanType = new GraphQLObjectType({
  name: 'Loan',
  fields: () => ({
    goalId: { type: GraphQLID },
    formId: { type: GraphQLID },
    goal: {
      type: GoalType,
      resolve(parent, args) {
        return getGoal(parent.goalId);
      }
    },
    form: {
      type: FormType,
      resolve(parent, args) {
        return getForm(parent.formId);
      }
    },
    minAmount: { type: GraphQLInt },
    maxAmount: { type: GraphQLInt },
    minDuration: { type: GraphQLInt },
    maxDuration: { type: GraphQLInt }
  })
});

const RootQuery = new GraphQLObjectType({
  name: 'RootQueryType',
  fields: {
    goal: {
      type: GoalType,
      args: { id: { type: new GraphQLNonNull(GraphQLID) } },
      resolve(parent, { id }) {
        return getGoal(id);
      }
    },
    goals: {
      type: new GraphQLList(GoalType),
      resolve() {
        return getGoals();
      }
    },
    form: {
      type: FormType,
      args: { id: { type: new GraphQLNonNull(GraphQLID) } },
      resolve(parent, { id }) {
        return getForm(id);
      }
    },
    forms: {
      type: new GraphQLList(FormType),
      resolve() {
        return getForms();
      }
    },
    durations: {
      type: new GraphQLList(GraphQLInt),
      resolve() {
        return getDurations();
      }
    },
    loan: {
      type: new GraphQLList(LoanType),
      args: {
        goalId: { type: GraphQLID },
        formId: { type: GraphQLID }
      },

      resolve(parent, args) {
        return getLoan(args.goalId, args.formId);
      }
    },
    loans: {
      type: new GraphQLList(LoanType),
      resolve() {
        return getLoans();
      }
    }
  }
});

module.exports = new GraphQLSchema({
  query: RootQuery
});
