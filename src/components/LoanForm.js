import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

import FormSelect from './FormSelect';
import FormSelectIncDec from './FormSelectIncDec';
import FormInput from './FormInput';

import { findByGoalAndFormIds } from '../data/utils';

/**
 * Component method.
 * Updates duration selector with new set of values
 * depending on the matching loan parameters
 * based on the newly selected GoalID and formID
 * @param {Void}
 * @return {Array} strings for duration selector
 */
function getDurationSelectData(loanDurations, maxDuration) {
  return loanDurations.filter(item => item <= maxDuration).map(item => `${item} maanden`);
}

function LoanForm(props) {
  const [range, setRange] = useState([0, 0]);
  const [durationSelectData, setDurationSelectData] = useState([]);
  const { goals, forms, loans, durations } = props.data;
  //these hold selected data
  const [goal, setGoal] = useState(goals[0]);
  const [form, setForm] = useState(forms[0]);
  const [duration, setDuration] = useState(durations[0]);
  const [amount, setAmount] = useState(0);

  //initComponent(props.data);
  useEffect(() => {
    const loan = findByGoalAndFormIds(loans, goal.id, form.id);

    setRange([loan.minAmount, loan.maxAmount]);
    setDurationSelectData(getDurationSelectData(durations, loan.maxDuration));

    props.onChange({
      amount,
      duration,
      loan
    });
    // setDuration(loan.minDuration);
    //setAmount(loan.minAmount)
  }, [goal, form, amount, duration]);

  /**
   * Component method.
   * FormSelect component onChange handler.
   * When goalID changes, we need to update the loan params
   * and recalculate the rate.
   * Sets new state.
   * @param {Number} index into the array of goalIDs
   * @return {Void}
   */
  const handleGoal = index => {
    setGoal(goals[index]);
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
  const handleForm = index => {
    setForm(forms[index]);
  };

  /**
   * Component method.
   * FormInput component onChange handler.
   * When goalID changes, we need recalculate the rate.
   * Sets new state.
   * @param {Number} amount of money requested
   * @return {Void} strings for duration selector
   */
  const handleAmount = amount => {
    setAmount(amount);
  };

  /**
   * Component method.
   * FormSelectIncDec component onChange handler.
   * When duration changes, we need to recalculate the rate.
   * Sets new state.
   * @param {Number} index into the array of durations
   * @return {Void}
   */
  const handleDuration = index => {
    setDuration(durations[index]);
  };

  return (
    <form action='javascript:' id={props.id}>
      <FormSelect id='goal-selector' data={goals.map(item => item.type)} onChange={handleGoal}>
        Doel:
      </FormSelect>

      <FormSelect id='form-selector' data={forms.map(item => item.type)} onChange={handleForm}>
        Bedrijfsvorm:
      </FormSelect>

      <FormInput
        id='amount-input'
        onChange={handleAmount}
        regexp={/^[0-9]*$/}
        value={amount}
        step={1000}
        range={range}
      >
        Financeering
      </FormInput>

      <FormSelectIncDec id='duration-selector' data={durationSelectData} onChange={handleDuration}>
        Looptijd:
      </FormSelectIncDec>
    </form>
  );
}

export default LoanForm;

LoanForm.propTypes = {
  data: PropTypes.object,
  onChange: PropTypes.func
};

LoanForm.defaultProps = {
  onChange() {},
  data: []
};
