import React, { useState } from 'react';
import PropTypes from 'prop-types';

/**  This is FormInput
 * It contains search controls for car make and models selection to search for a car.
 *
 * @class {React.Component} FormInput
 * @param {Object}   props:         props of the component
 * @param {String}   props.id       HTML node id
 * @param {Function} props.onChange onChange handler function
 * @param {RegExp}   props.regexp}  filter for the component input
 * @param {String | Number}   props.value    initial value
 * @param {Array}   props.range    Min and Max values allowed by input
 */
export default function FormInput({
  id,
  onChange,
  regexp,
  children,
  value,
  step,
  range
}) {
  const [amount, setAmount] = useState(value);
  const minRange = Math.min(...range);
  const maxRange = Math.max(...range);

  /**
   * Component method. Fires in response to onChange when typing.
   * Updates the value.
   * @param {Event}
   * @return {Void}
   */
  const handleChange = e => {
    const { value: newValue } = e.target;
    let numValue = 0;
    if (newValue.length > 0) {
      numValue = parseInt(newValue);
    }

    if (regexp.test(newValue) && numValue <= maxRange && numValue >= minRange) {
      setAmount(newValue);
      onChange(newValue);
    }
  };

  /**
   * Component method. Fires in response to onWheel when scrolling mouse wheel.
   * Updates the value.
   * @param {Event}
   * @return {Void}
   */
  const handleWheel = e => {
    const newValue =
      e.deltaY >= 0
        ? Math.min(amount + step, maxRange)
        : Math.max(amount - step, minRange);

    setAmount(newValue);
    onChange(newValue);
  };

  return (
    <div>
      <label htmlFor={id}>{children}</label>
      <div className='bordered'>
        &euro;
        <input
          id={id}
          type='text'
          onChange={handleChange}
          onWheel={handleWheel}
          style={{ display: 'inlineBlock' }}
          value={amount}
        />
      </div>
    </div>
  );
}

FormInput.propTypes = {
  id: PropTypes.string,
  onChange: PropTypes.func,
  regexp: PropTypes.object,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  step: PropTypes.number
};

FormInput.defaultProps = {
  onChange() {},
  regexp: /.*/,
  value: '',
  step: 1,
  range: [-Infinity, Infinity]
};
