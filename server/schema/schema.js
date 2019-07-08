const { calculateRate } = require('../core/rateModel.js');
const graphql = require('graphql');

const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLSchema,
  GraphQLID,
  GraphQLInt,
  GraphQLList,
  GraphQLNonNull,
  GraphQLFloat
} = graphql;

const {
  getGoal,
  getGoals,
  getForm,
  getForms,
  getDurations,
  getLoan,
  getLoans,
  getRateModel
} = require('../json/api.js');

const GoalType = new GraphQLObjectType({
  name: 'Goal',
  fields: () => ({
    id: { type: GraphQLID },
    type: { type: GraphQLString },
    loans: {
      type: new GraphQLList(LoanType),
      resolve(parent, args) {
        return getLoan(parent.id); //Promise here
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
        return getLoan(undefined, parent.id); //Promise here
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
        return getGoal(parent.goalId); //Promise here
      }
    },
    form: {
      type: FormType,
      resolve(parent, args) {
        return getForm(parent.formId); //Promise here
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
        return getGoal(id); //Promise here
      }
    },
    goals: {
      type: new GraphQLList(GoalType),
      resolve() {
        return getGoals(); //Promise here
      }
    },
    form: {
      type: FormType,
      args: { id: { type: new GraphQLNonNull(GraphQLID) } },
      resolve(parent, { id }) {
        return getForm(id); //Promise here
      }
    },
    forms: {
      type: new GraphQLList(FormType),
      resolve() {
        return getForms(); //Promise here
      }
    },
    durations: {
      type: new GraphQLList(GraphQLInt),
      resolve() {
        return getDurations(); //Promise here
      }
    },
    loan: {
      type: new GraphQLList(LoanType),
      args: {
        goalId: { type: GraphQLID },
        formId: { type: GraphQLID }
      },
      resolve(parent, args) {
        return getLoan(args.goalId, args.formId); //Promise here
      }
    },
    loans: {
      type: new GraphQLList(LoanType),
      resolve() {
        return getLoans(); //Promise here
      }
    }
  }
});

const RootMutation = new GraphQLObjectType({
  name: 'RootMutationType',
  fields: {
    rate: {
      type: GraphQLFloat,
      args: {
        amount: { type: new GraphQLNonNull(GraphQLInt) },
        duration: { type: new GraphQLNonNull(GraphQLInt) },
        minDuration: { type: new GraphQLNonNull(GraphQLInt) },
        maxDuration: { type: new GraphQLNonNull(GraphQLInt) }
      },
      async resolve(parent, { amount, duration, minDuration, maxDuration }) {
        const rateModel = await getRateModel();
        return calculateRate(
          rateModel,
          amount,
          duration,
          minDuration,
          maxDuration
        );
      }
    }
  }
});

module.exports = new GraphQLSchema({
  query: RootQuery,
  mutation: RootMutation
});
