import React from 'react';
import App from './App';
import { getSimulatedData } from './data/dataset';

import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

configure({ adapter: new Adapter() });

let a; //to be App component
let arrayOfData; //to be array of data
let spyMount; //to be spy on methods
let spyButton; //to be spy on button click
describe('Testing App Component', () => {
  beforeEach(async () => {
    arrayOfData = await getSimulatedData();
    spyMount = jest.spyOn(App.prototype, 'componentDidMount');
    //load data to compare against
    a = shallow(<App />);
    //spyButton = jest.spyOn(a.instance(), 'handleSearchButton');
  });

  afterEach(() => (a = null));

  it('test that App has FormComponents', () => {
    expect(a.find('FormInput').length).toBe(1);
    expect(a.find('FormSelect').length).toBe(2);
    expect(a.find('FormSelectIncDec').length).toBe(1);
  });

  it('test that elements have the correct IDs', () => {
    expect(a.find('#main-container').exists()).toBe(true);
    expect(a.find('#left-container').exists()).toBe(true);
    expect(a.find('#right-container').exists()).toBe(true);
    expect(a.find('#goal-selector').exists()).toBe(true);
    expect(a.find('#form-selector').exists()).toBe(true);
    expect(a.find('#amount-input').exists()).toBe(true);
    expect(a.find('#duration-selector').exists()).toBe(true);
    expect(a.find('#intro').exists()).toBe(true);
  });

  it('checks that componentDidMount is called and data is loaded', () => {
    expect(spyMount).toHaveBeenCalled();

    expect(a.instance().state.rate).not.toBe(0); //rate recalculated from default data
  });

  it('checks Duration triggers rate recalculation', () => {
    const durationSelector = a.find('#duration-selector');
    const initRate = a.instance().state.rate;
    durationSelector.simulate('change', 5);
    //async here?
    expect(a.instance().state.rate).not.toEqual(initRate);
  });

  it('checks Amount triggers rate recalculation', () => {
    const amountInput = a.find('#amount-input');
    const initRate = a.instance().state.rate;
    amountInput.simulate('change', 100000);
    expect(a.instance().state.rate).not.toEqual(initRate);
  });
});
