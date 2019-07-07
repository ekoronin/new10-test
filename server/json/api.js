const axios = require('axios');
const qs = require('query-string');

const END_POINTS = {
  GOALS: '/goals',
  FORMS: '/forms',
  DURATIONS: '/durations',
  LOANS: '/loans'
};
const JSON_SERVER_URL = 'http://localhost:5555';

const getGoals = async () => {
  try {
    const { data } = await axios.get(`${JSON_SERVER_URL}${END_POINTS.GOALS}`);
    return data;
  } catch (e) {
    console.error(`Error: ${e}; getGoals() => `, data);
    return null;
  }
};

const getGoal = async id => {
  try {
    const { data } = await axios.get(`${JSON_SERVER_URL}${END_POINTS.GOALS}?id=${id}`);
    return data.length > 0 ? data[0] : null;
  } catch (e) {
    console.error(`Error: ${e}; getGoal(${id}) => `, data);
    return null;
  }
};

const getForms = async () => {
  try {
    const { data } = await axios.get(`${JSON_SERVER_URL}${END_POINTS.FORMS}`);
    return data;
  } catch (e) {
    console.error(`Error: ${e}; getForms() => `, data);
    return null;
  }
};

const getForm = async id => {
  try {
    const { data } = await axios.get(`${JSON_SERVER_URL}${END_POINTS.FORMS}?id=${id}`);
    return data.length > 0 ? data[0] : null;
  } catch (e) {
    console.error(`Error: ${e}; getForm(${id}) => `, data);
    return null;
  }
};

const getDurations = async () => {
  try {
    const { data } = await axios.get(`${JSON_SERVER_URL}${END_POINTS.DURATIONS}`);
    return data;
  } catch (e) {
    console.error(`Error: ${e}; getDurations() => `, data);
    return null;
  }
};

const getLoans = async () => {
  try {
    const { data } = await axios.get(`${JSON_SERVER_URL}${END_POINTS.LOANS}`);
    return data;
  } catch (e) {
    console.error(`Error: ${e}; getLoans() => `, data);
    return null;
  }
};

const getLoan = async (goalId, formId) => {
  const queryString = qs.stringify({ goalId, formId });
  try {
    const { data } = await axios.get(`${JSON_SERVER_URL}${END_POINTS.LOANS}?${queryString}`);
    return data;
  } catch (e) {
    console.error(`Error: ${e}; getLoan(${goalId}, ${formId}) => `, data);
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
  getLoans
};
