const goals = [{ type: 'Marketing', id: '0' }, { type: 'Equipment', id: '1' }];
const forms = [{ type: 'BV', id: '0' }, { type: 'Eenmanzaak', id: '1' }];

const loans = [
  {
    goalId: '0',
    formId: '0',
    minAmount: 0,
    maxAmount: 250000,
    minDuration: 3,
    maxDuration: 36
  },
  {
    goalId: '0',
    formId: '1',
    minAmount: 0,
    maxAmount: 250000,
    minDuration: 3,
    maxDuration: 36
  },
  {
    goalId: '1',
    formId: '0',
    minAmount: 0,
    maxAmount: 500000,
    minDuration: 3,
    maxDuration: 60
  },
  {
    goalId: '1',
    formId: '1',
    minAmount: 0,
    maxAmount: 250000,
    minDuration: 3,
    maxDuration: 60
  }
];

const durations = [3, 6, 9, 12, 18, 24, 30, 36, 48, 60];

//emulating hitting a endpoint here
export function getSimulatedData() {
  return new Promise(resolve => resolve({ goals, forms, loans, durations }));
}
