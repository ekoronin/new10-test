const axios = require('axios');
const qs = require('query-string');

const END_POINTS = {
  GOALS: '/goals',
  FORMS: '/forms',
  DURATIONS: '/durations',
  LOANS: '/loans',
  RATE_MODEL: '/rateModel'
};
const JSON_SERVER_URL = 'http://localhost:5555';

const getGoals = async () => {
  try {
    const { data } = await axios.get(`${JSON_SERVER_URL}${END_POINTS.GOALS}`);
    return data;
  } catch (e) {
    console.error(`Error: ${e}; getGoals()`);
    return null;
  }
};

const getGoal = async id => {
  try {
    const { data } = await axios.get(
      `${JSON_SERVER_URL}${END_POINTS.GOALS}?id=${id}`
    );
    return data.length > 0 ? data[0] : null;
  } catch (e) {
    console.error(`Error: ${e}; getGoal(${id})`);
    return null;
  }
};

const getForms = async () => {
  try {
    const { data } = await axios.get(`${JSON_SERVER_URL}${END_POINTS.FORMS}`);
    return data;
  } catch (e) {
    console.error(`Error: ${e}; getForms()`);
    return null;
  }
};

const getForm = async id => {
  try {
    const { data } = await axios.get(
      `${JSON_SERVER_URL}${END_POINTS.FORMS}?id=${id}`
    );
    return data.length > 0 ? data[0] : null;
  } catch (e) {
    console.error(`Error: ${e}; getForm(${id})`);
    return null;
  }
};

const getDurations = async () => {
  try {
    const { data } = await axios.get(
      `${JSON_SERVER_URL}${END_POINTS.DURATIONS}`
    );
    return data;
  } catch (e) {
    console.error(`Error: ${e}; getDurations()`);
    return null;
  }
};

const getLoans = async () => {
  try {
    const { data } = await axios.get(`${JSON_SERVER_URL}${END_POINTS.LOANS}`);
    return data;
  } catch (e) {
    console.error(`Error: ${e}; getLoans()`);
    return null;
  }
};

const getLoan = async (goalId, formId) => {
  const queryString = qs.stringify({ goalId, formId });
  try {
    const { data } = await axios.get(
      `${JSON_SERVER_URL}${END_POINTS.LOANS}?${queryString}`
    );
    return data;
  } catch (e) {
    console.error(`Error: ${e}; getLoan(${goalId}, ${formId})`);
    return null;
  }
};

const getRateModel = async () => {
  try {
    const { data } = await axios.get(
      `${JSON_SERVER_URL}${END_POINTS.RATE_MODEL}`
    );
    return data;
  } catch (e) {
    console.error(`Error: ${e}; getRateModels()`);
    return null;
  }
};

module.exports = {
  getGoal,
  getGoals,
  getForm,
  getForms,
  getDurations,
  getLoan,
  getLoans,
  getRateModel
};
