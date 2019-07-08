export function findByGoalId(data, id = 0) {
  return data.filter(item => item.goalId === id);
}

export function findByFormId(data, id = 0) {
  return data.filter(item => item.formId === id);
}

export function findByGoalAndFormIds(data, goalId = 0, formId = 0) {
  return data.find(item => item.goalId === goalId && item.formId === formId);
}
