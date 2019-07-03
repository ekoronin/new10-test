import React from 'react';
import FormSelectIncDec from './FormSelectIncDec';

import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

configure({ adapter: new Adapter() });

const arrayOfData = ['one', 'two', 'three', 'four', 'five'];
let spyOnChange; //to be spy
let sel; //to be component
const initChildren = 'SELECTOR LABEL';

describe('Testing FormSelectIncDec component', () => {
  beforeEach(() => {
    spyOnChange = jest.fn();
    sel = shallow(
      <FormSelectIncDec
        data={arrayOfData}
        id='a-selector'
        onChange={spyOnChange}
      >
        {initChildren}
      </FormSelectIncDec>
    );
  });

  afterEach(() => (sel = null));

  it('checks HTML the FormSelect component', () => {
    expect(sel.find('label').length).toBe(1);
    expect(sel.find('select').length).toBe(1);
    expect(sel.find('option').length).toBe(arrayOfData.length);
    expect(sel.find('button').length).toBe(2);
  });

  it('spies on onChange event', () => {
    const select = sel.find('select');
    select.simulate('change', { target: { selectedIndex: 1 } });
    expect(spyOnChange).toHaveBeenCalledTimes(1);
  });

  it('test that options are rendered with correct values', () => {
    const options = sel.find('options');
    options.forEach((el, index) => {
      expect(el.text() === arrayOfData[index]).toBe(true);
    });
  });

  it('test that label is rendered with correct text', () => {
    const label = sel.find('label');

    expect(label.text()).toEqual(initChildren);
  });

  it('tets that button press call onChange', () => {
    const btnDec = sel.find('#btn-dec');
    const btnInc = sel.find('#btn-inc');
    btnDec.simulate('click');
    expect(spyOnChange).toHaveBeenCalledTimes(1);
    btnInc.simulate('click');
    expect(spyOnChange).toHaveBeenCalledTimes(2);
  });
});
