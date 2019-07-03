import React from 'react';
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
export default function FormSelect({ id, data, onChange, children }) {
  /**
   * Component method. Fires in response to onChange when typing.
   * @param {Event}
   * @return {Void}
   */
  const handleChange = ({ target: { selectedIndex } }) => {
    onChange(selectedIndex);
  };

  return (
    <div>
      <label htmlFor={id}>{children}</label>
      <div className='bordered'>
        <select id={id} onChange={handleChange}>
          {data.map(item => (
            <option key={item} value='item'>
              {item}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
}

FormSelect.propTypes = {
  id: PropTypes.string,
  data: PropTypes.arrayOf(PropTypes.string),
  onChange: PropTypes.func
};

FormSelect.defaultProps = {
  onChange() {},
  data: []
};
