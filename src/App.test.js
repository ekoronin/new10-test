import React from 'react';
import App from './App';

import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

configure({ adapter: new Adapter() });

let a; //to be App component
let arrayOfData; //to be array of data
let spyMount; //to be spy on methods
let spyButton; //to be spy on button click
describe('Testing App Component', () => {
  beforeEach(async () => {
    a = shallow(<App />);
  });

  afterEach(() => (a = null));

  it('test that App has LoanForm', () => {
    //let Query load data off the server and render LoanForm
    setTimeout(() => expect(a.find('LoanForm').length).toBe(1), 3000);
  });

  it('test that elements have the correct IDs', () => {
    expect(a.find('#main-container').exists()).toBe(true);
    expect(a.find('#left-container').exists()).toBe(true);
    expect(a.find('#right-container').exists()).toBe(true);
    //let Query load data off the server and render LoanForm
    setTimeout(() => expect(a.find('#loan-form').exists()).toBe(true), 3000);
  });
});
