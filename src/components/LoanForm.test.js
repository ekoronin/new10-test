import React from 'react';
import LoanForm from './LoanForm';
import { getSimulatedData } from '../data/test-dataset';

import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

configure({ adapter: new Adapter() });

let a; //to be  component
let arrayOfData; //to be array of data
let spyMount; //to be spy on methods
describe('Testing App Component', () => {
  beforeEach(async () => {
    arrayOfData = await getSimulatedData();
    spyMount = jest.spyOn(LoanForm.prototype, 'componentDidMount');
    //load data to compare against
    a = shallow(<LoanForm data={arrayOfData} />);
  });

  afterEach(() => (a = null));

  it('test that Form has FormComponents', () => {
    expect(a.find('FormInput').length).toBe(1);
    expect(a.find('FormSelect').length).toBe(2);
    expect(a.find('FormSelectIncDec').length).toBe(1);
  });

  it('test that elements have the correct IDs', () => {
    expect(a.find('#goal-selector').exists()).toBe(true);
    expect(a.find('#form-selector').exists()).toBe(true);
    expect(a.find('#amount-input').exists()).toBe(true);
    expect(a.find('#duration-selector').exists()).toBe(true);
  });

  it('checks that componentDidMount is called and data is loaded', () => {
    expect(spyMount).toHaveBeenCalled();
  });

  it('checks Goal triggers Input range change', () => {
    a.instance().setState({ range: [1, 2] });
    const [min, max] = a.instance().state.range;
    const goalSelector = a.find('#goal-selector');
    goalSelector.simulate('change', 1);
    const [newmin, newmax] = a.instance().state.range;

    expect(newmin).not.toEqual(min);
    expect(newmax).not.toEqual(max);
  });

  it('checks Form triggers Input range change', () => {
    a.instance().setState({ range: [2, 3] });
    const [min, max] = a.instance().state.range;
    const formSelector = a.find('#form-selector');
    formSelector.simulate('change', 1);
    const [newmin, newmax] = a.instance().state.range;

    expect(newmin).not.toEqual(min);
    expect(newmax).not.toEqual(max);
  });
});
