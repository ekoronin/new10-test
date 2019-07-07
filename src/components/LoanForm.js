import React, { Component } from 'react';
import PropTypes from 'prop-types';

import FormSelect from './FormSelect';
import FormSelectIncDec from './FormSelectIncDec';
import FormInput from './FormInput';

import { findByGoalAndFormIds } from '../data/utils';

class LoanForm extends Component {
  static propTypes = {
    data: PropTypes.object,
    onChange: PropTypes.func
  };

  static defaultProps = {
    onChange() {},
    data: []
  };
  /**
   * Constructor
   * Initializes state and class properties.
   * @param {Object} props  props of the component
   * @return {Void}
   */
  constructor(props) {
    super(props);
    this.state = {
      range: [0, 0],
      durationsSelectorData: []
    };
    //these hold loaded data
    this.forms = [];
    this.goals = [];
    this.loans = [];
    this.durations = [];

    //these hold selected data
    this.goal = '';
    this.form = '';
    this.duration = 0;
    this.loan = null;
    this.amount = 0;

    this.initComponent(props.data);
  }

  /**
   * Component method.
   * Populates UI controls with data via state update
   * Sets default state.
   * @param {Object}  data data from graphql server
   * @return {void}
   */
  initComponent = data => {
    Object.assign(this, data);

    this.goal = this.goals[0];
    this.form = this.forms[0];
    this.updateLoan();

    const { minAmount, minDuration } = this.loan;
    this.duration = minDuration;
    this.amount = minAmount;
  };

  /**
   * Component method.
   * Fetches new loan object fro the dataset
   * based on the newly selected GoalID and formID
   * @param {Void}
   * @return {Void}
   */
  updateLoan = () => {
    const {
      loans,
      goal: { id: goalId },
      form: { id: formId }
    } = this;
    this.loan = findByGoalAndFormIds(loans, goalId, formId);
  };

  /**
   * Component method.
   * Sets new state based on the loan data
   * and emits onChange event
   * @param {Void}
   * @return {Void}
   */
  onLoanUpdate = () => {
    const { amount, duration, loan, durations } = this;
    const { minAmount, maxAmount, maxDuration } = loan;

    this.setState({
      durationSelectorData: this.getDurationSelectData(durations, maxDuration),
      range: [minAmount, maxAmount]
    });
    this.props.onChange({
      amount,
      duration,
      loan
    });
  };

  /**
   * Component method.
   * Updates duration selector with new set of values
   * depending on the matching loan parameters
   * based on the newly selected GoalID and formID
   * @param {Void}
   * @return {Array} strings for duration selector
   */
  getDurationSelectData = (loanDurations, maxDuration) => {
    return loanDurations
      .filter(item => item <= maxDuration)
      .map(item => `${item} maanden`);
  };

  /**
   * Component method.
   * FormSelect component onChange handler.
   * When goalID changes, we need to update the loan params
   * and recalculate the rate.
   * Sets new state.
   * @param {Number} index into the array of goalIDs
   * @return {Void}
   */
  handleGoal = index => {
    this.goal = this.goals[index];
    this.updateLoan();

    this.onLoanUpdate();
  };

  /**
   * Component method.
   * FormSelect component onChange handler.
   * When formID changes, we need to update the loan params
   * and recalculate the rate.
   * Sets new state.
   * @param {Number} index into the array of formIDs
   * @return {Void}
   */
  handleForm = index => {
    this.form = this.forms[index];
    this.updateLoan();

    this.onLoanUpdate();
  };

  /**
   * Component method.
   * FormInput component onChange handler.
   * When goalID changes, we need recalculate the rate.
   * Sets new state.
   * @param {Number} amount of money requested
   * @return {Void} strings for duration selector
   */
  handleAmount = newAmount => {
    this.amount = newAmount;

    const { amount, duration, loan } = this;
    this.props.onChange({
      amount,
      duration,
      loan
    });
  };

  /**
   * Component method.
   * FormSelectIncDec component onChange handler.
   * When duration changes, we need to recalculate the rate.
   * Sets new state.
   * @param {Number} index into the array of durations
   * @return {Void}
   */
  handleDuration = index => {
    this.duration = this.durations[index];

    const { amount, duration, loan } = this;
    this.props.onChange({
      amount,
      duration,
      loan
    });
  };

  componentDidMount() {
    this.onLoanUpdate();
  }

  render() {
    return (
      <form action='javascript:' id='loan-form'>
        <FormSelect
          id='goal-selector'
          data={this.goals.map(item => item.type)}
          onChange={this.handleGoal}
        >
          Doel:
        </FormSelect>

        <FormSelect
          id='form-selector'
          data={this.forms.map(item => item.type)}
          onChange={this.handleForm}
        >
          Bedrijfsvorm:
        </FormSelect>

        <FormInput
          id='amount-input'
          onChange={this.handleAmount}
          regexp={/^[0-9]*$/}
          value={this.amount}
          step={1000}
          range={this.state.range}
        >
          Financeering
        </FormInput>

        <FormSelectIncDec
          id='duration-selector'
          data={this.state.durationSelectorData}
          onChange={this.handleDuration}
        >
          Looptijd:
        </FormSelectIncDec>
      </form>
    );
  }
}

export default LoanForm;
