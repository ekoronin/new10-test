import React from 'react';
import Rate from './Rate';

import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

configure({ adapter: new Adapter() });

let comp; //to be component
const rate = 3.14;

describe('Testing Rate component', () => {
  beforeEach(() => {
    comp = shallow(<Rate rate={rate} />);
  });

  afterEach(() => (comp = null));

  it('checks HTML the FormSelect component', () => {
    expect(comp.find('div').length).toBe(1);
  });

  it('test that Rate is rendered with correct values', () => {
    const text = comp.find('div').text();
    expect(text).toEqual(`${rate}%`);
  });
});
