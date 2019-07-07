import React, { useRef } from 'react';
import PropTypes from 'prop-types';

/**  This is FormInput
 * It contains search controls for car make and models selection to search for a car.
 *
 * @class {React.Component} FormInput
 * @param {Object}   props:         props of the component
 * @param {String}   props.id       HTML node id
 * @param {Function} props.onChange onChange handler function
 * @param {Array}    props.data     Array of components data for selection
 */
function FormSelectIncDec({ id, data, onChange, children }) {
  const selectRef = useRef({});

  /**
   * Component method.
   * Moves selection to the next option
   * @param {Void}
   * @return {Void}
   */
  const increment = () => {
    selectRef.current.selectedIndex = Math.min(
      selectRef.current.selectedIndex + 1,
      data.length - 1
    );
    onChange(selectRef.current.selectedIndex);
  };

  /**
   * Component method.
   * Moves selection to the previous option
   * @param {Void}
   * @return {Void}
   */
  const decrement = () => {
    selectRef.current.selectedIndex = Math.max(selectRef.current.selectedIndex - 1, 0);
    onChange(selectRef.current.selectedIndex);
  };

  /**
   * Component method. Fires in response to onChange when making a selection.
   * Updates the value.
   * @param {Event}
   * @return {Void}
   */
  const handleChange = e => {
    onChange(e.target.selectedIndex);
  };

  /**
   * Component method. Fires in response to onWheel when scrolling mouse wheel.
   * Updates the value.
   * @param {Event}
   * @return {Void}
   */
  const handleWheel = e => {
    e.deltaY >= 0 ? increment() : decrement();
  };

  return (
    <div>
      <label htmlFor={id}>{children}</label>
      <div className='bordered-inc-dec'>
        <button id='btn-dec' className='select-controller-button' onClick={decrement}>
          -
        </button>
        <select
          ref={selectRef}
          id={id}
          onChange={handleChange}
          onWheel={handleWheel}
          defaultValue={data.find((_, index) => index == selectRef.current.selectedIndex)}
        >
          {data.map(item => (
            <option key={item} value={item}>
              {item}
            </option>
          ))}
        </select>
        <button id='btn-inc' className='select-controller-button' onClick={increment}>
          +
        </button>
      </div>
    </div>
  );
}

FormSelectIncDec.propTypes = {
  id: PropTypes.string,
  data: PropTypes.arrayOf(PropTypes.string),
  onChange: PropTypes.func
};

FormSelectIncDec.defaultProps = {
  onChange() {},
  data: []
};

export default FormSelectIncDec;
