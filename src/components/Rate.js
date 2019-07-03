import React from 'react';
import PropTypes from 'prop-types';

/**  This is FormInput
 * It contains search controls for car make and models selection to search for a car.
 *
 * @class {React.Component} FormInput
 * @param {Object}   props:         props of the component
 * @param {String | Number}   props.rate       Value to be displayed

 */
export default function Rate({ rate }) {
  return <div className='rate'>{rate}%</div>;
}

Rate.propTypes = {
  rate: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
};

Rate.defaultProps = {
  rate: 0
};
