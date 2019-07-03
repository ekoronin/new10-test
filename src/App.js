import React, { Component } from 'react';

import FormSelect from './components/FormSelect';
import FormSelectIncDec from './components/FormSelectIncDec';
import FormInput from './components/FormInput';
import Rate from './components/Rate';

import { getSimulatedData } from './data/dataset';
import { findByGoalAndFormIds, calculateRate } from './data/utils';

/**  This is the main class of the application.
 * It contains search controls for car make and models selection to search for a car.
 *
 * @class {React.Component} App
 * @param {Object}   props    props of the component
 */

class App extends Component {
  /**
   * Constructor
   * Initializes state and class properties.
   * @param {Object} props  props of the component
   * @return {Void}
   */
  constructor(props) {
    super(props);
    this.state = {
      amount: 0,
      rate: 0,
      range: [0, 0],
      durationsSelectorData: [] //this one changes depending on the goal/form combi
    };

    this.data = [];
    //if we don't expect to reload the data anymore
    // - we dont need these on the state
    this.goalSelectorData = [];
    this.formSelectorData = [];

    this.goal = '';
    this.form = '';
    this.duration = 0;
    this.loan = null;
  }

  /**
   * Component method.
   * Fetches new loan object fro the dataset
   * based on the newly selected GoalID and formID
   * @param {Void}
   * @return {Void}
   */
  updateLoan = () => {
    this.loan = findByGoalAndFormIds(
      this.data.loans,
      this.goal.id,
      this.form.id
    );
  };

  /**
   * Component method.
   * Updates duration selector with new set of values
   * depending on the matching loan parameters
   * based on the newly selected GoalID and formID
   * @param {Void}
   * @return {Array} strings for duration selector
   */
  getDurationSelectData() {
    return this.data.durations
      .filter(item => item <= this.loan.maxDuration)
      .map(item => `${item} maanden`);
  }

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
    this.goal = this.data.goals[index];
    this.updateLoan();

    this.setState(state => ({
      durationSelectorData: this.getDurationSelectData(),
      rate: calculateRate(state.amount, this.duration, this.loan),
      range: [this.loan.minAmount, this.loan.maxAmount]
    }));
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
    this.form = this.data.forms[index];
    this.updateLoan();

    this.setState(state => ({
      durationSelectorData: this.getDurationSelectData(),
      rate: calculateRate(state.amount, this.duration, this.loan),
      range: [this.loan.minAmount, this.loan.maxAmount]
    }));
  };

  /**
   * Component method.
   * FormInput component onChange handler.
   * When goalID changes, we need recalculate the rate.
   * Sets new state.
   * @param {Number} amount of money requested
   * @return {Void} strings for duration selector
   */
  handleAmount = amount => {
    this.setState({
      amount,
      rate: calculateRate(amount, this.duration, this.loan)
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
    this.duration = this.data.durations[index];

    this.setState(state => ({
      rate: calculateRate(state.amount, this.duration, this.loan)
    }));
  };

  /**
   * Component lifecycle method.
   * Loads external data and populates UI controls
   * Sets default state.
   * @param {void}
   * @return {void}
   */
  async componentDidMount() {
    this.data = await getSimulatedData();
    const { goals, forms, loans } = this.data;

    this.goalSelectorData = goals.map(item => item.type);
    this.formSelectorData = forms.map(item => item.type);

    this.goal = goals[0];
    this.form = forms[0];

    this.loan = findByGoalAndFormIds(loans, this.goal.id, this.form.id);

    const { minAmount, maxAmount, minDuration } = this.loan;

    this.duration = minDuration;
    this.setState({
      amount: minAmount,
      range: [minAmount, maxAmount],
      durationSelectorData: this.getDurationSelectData(),
      rate: calculateRate(minAmount, minDuration, this.loan)
    });
  }

  /**
   * Component method. Renders itself based on the state.
   * @param {void}
   * @return {React.ElementType} Composed react element out of JSX.
   */
  render() {
    return (
      <div id='main-container'>
        <form action='javascript:'>
          <div id='left-container'>
            <FormSelect
              id='goal-selector'
              data={this.goalSelectorData}
              onChange={this.handleGoal}
            >
              Doel:
            </FormSelect>

            <FormSelect
              id='form-selector'
              data={this.formSelectorData}
              onChange={this.handleForm}
            >
              Bedrijfsvorm:
            </FormSelect>

            <FormInput
              id='amount-input'
              onChange={this.handleAmount}
              regexp={/^[0-9]*$/}
              value={this.state.amount}
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
            <span id='tip'>
              Tip: Use your mouse wheel too. And try to resize!
            </span>
            <div id='intro'>
              <h1>Voor ondernemers </h1>
              Je bent ondernemer, en je wilt door. Je hebt plannen, ambities, en
              een beetje haast. Het liefst regel je daar zo snel mogelijk een
              bedrijfsfinanciering voor. Bij New10 kan dat: binnen 15 minuten
              weet je wat je mogelijkheden zijn. Afspraken op een bankkantoor
              zijn niet meer nodig: je vraagt de financiering volledig
              zelfstandig online aan. Regel je bedrijfskrediet wanneer het jou
              uitkomt, zodat je dóór kunt met ondernemen.
            </div>
          </div>
        </form>
        <div id='right-container'>
          <Rate rate={this.state.rate} />
          <button className='submit-button'>Direct aan de slag</button>
        </div>
      </div>
    );
  }
}

export default App;
