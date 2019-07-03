import React from 'react';
import FormSelect from './FormSelect';

import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

configure({ adapter: new Adapter() });

const arrayOfData = ['one', 'two', 'three', 'four', 'five'];
let spyOnChange; //to be spy
let sel; //to be component
const initChildren = 'SELECTOR LABEL';

describe('Testing FormSelect component', () => {
  spyOnChange = jest.fn();
  beforeEach(() => {
    sel = shallow(
      <FormSelect data={arrayOfData} id='a-selector' onChange={spyOnChange}>
        {initChildren}
      </FormSelect>
    );
  });

  afterEach(() => (sel = null));

  it('checks HTML the FormSelect component', () => {
    expect(sel.find('label').length).toBe(1);
    expect(sel.find('select').length).toBe(1);
    expect(sel.find('option').length).toBe(arrayOfData.length);
  });

  it('spies on onChange event', () => {
    const select = sel.find('select');
    select.simulate('change', { target: { selectedIndex: 1 } });
    expect(spyOnChange).toHaveBeenCalledTimes(1);
  });

  it('test that options are rendered with correct values', () => {
    const options = sel.find('option');
    expect(options.length).toEqual(arrayOfData.length);
    options.forEach((el, index) => {
      expect(el.text() === arrayOfData[index]).toBe(true);
    });
  });

  it('test that label is rendered with correct text', () => {
    const label = sel.find('label');

    expect(label.text()).toEqual(initChildren);
  });
});
