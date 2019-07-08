export function findByGoalId(data, id = 0) {
  return data.filter(item => item.goalId === id);
}

export function findByFormId(data, id = 0) {
  return data.filter(item => item.formId === id);
}

export function findByGoalAndFormIds(data, goalId = 0, formId = 0) {
  return data.find(item => item.goalId === goalId && item.formId === formId);
}

export function calculateRate(amount = 0, duration, loan) {
  let minRate = 0,
    maxRate = 0;

  if (amount >= 0 && amount <= 50000) {
    minRate = 6;
    maxRate = 8;
  } else if (amount > 50000 && amount <= 150000) {
    minRate = 5;
    maxRate = 7;
  } else if (amount > 150000 && amount <= 500000) {
    minRate = 4;
    maxRate = 6;
  }

  return (
    minRate +
    ((duration - loan.minDuration) / (loan.maxDuration - loan.minDuration)) * (maxRate - minRate)
  ).toFixed(2);
}
