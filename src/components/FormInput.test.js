import React from 'react';
import FormInput from './FormInput';

import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

configure({ adapter: new Adapter() });

let spyOnChange; //to be spy
let inp; //to be component
const initValue = 100000;
const initChildren = 'INPUT TEXT';

describe('Testing FormInput component', () => {
  beforeEach(() => {
    spyOnChange = jest.fn();
    inp = shallow(
      <FormInput
        id='amount-input'
        regexp={/^[0-9]*$/}
        value={initValue}
        step={1000}
        range={[0, 250000]}
        onChange={spyOnChange}
      >
        {initChildren}
      </FormInput>
    );
  });

  afterEach(() => (inp = null));

  it('checks HTML of the FormInput component', () => {
    expect(inp.find('label').length).toBe(1);
    expect(inp.find('input').length).toBe(1);
  });

  it('spies on onChange event', () => {
    const input = inp.find('input');
    input.simulate('change', { target: { value: 200000 } });
    expect(spyOnChange).toHaveBeenCalledTimes(1);
  });

  it('test that RegExp filter is working', () => {
    const input = inp.find('input');
    const initValue = input.text();

    input.simulate('change', { target: { value: 'abc' } });
    expect(input.text()).toEqual(initValue); //did not chcange due to the filter
  });

  it('tests children text', () => {
    const inputText = inp.find('label').text();
    expect(inputText).toBe(initChildren);
  });
});
