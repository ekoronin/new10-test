import React, { Component } from 'react';
import { Query } from 'react-apollo';

import { calculateRate } from './data/utils';

import Rate from './components/Rate';
import LoanForm from './components/LoanForm';

import { GET_ALL } from './queries/queries';

/**  This is the main class of the application.
 * It contains search controls for car make and models selection to search for a car.
 *
 * @class {React.Component} App
 * @param {Object}   props    props of the component
 */

class App extends Component {
  /**
   * Constructor
   * Initializes state and class properties.
   * @param {Object} props  props of the component
   * @return {Void}
   */
  constructor(props) {
    super(props);
    this.state = {
      rate: 0
    };
  }
  /**
   * Component method.
   * FormSelect component onChange handler.
   * When goalID changes, we need to update the loan params
   * and recalculate the rate.
   * Sets new state.
   * @param {Object} data data from the form component
   * @return {Void}
   */
  handleLoanFormChange = ({ amount, duration, loan }) => {
    this.setState({ rate: calculateRate(amount, duration, loan) });
  };

  /**
   * Component method. Renders itself based on the state.
   * @param {void}
   * @return {React.ElementType} Composed react element out of JSX.
   */
  render() {
    return (
      <div id='main-container'>
        <div id='left-container'>
          <Query query={GET_ALL}>
            {({ loading, error, data }) => {
              if (loading) return <div>Loading...</div>;
              if (error) return <div>Error...</div>;
              return (
                <LoanForm data={data} onChange={this.handleLoanFormChange} />
              );
            }}
          </Query>

          <span id='tip'>
            Tip: Use your mouse wheel too. And try to resize!
          </span>
          <div id='intro'>
            <h1>Voor ondernemers </h1>
            Je bent ondernemer, en je wilt door. Je hebt plannen, ambities, en
            een beetje haast. Het liefst regel je daar zo snel mogelijk een
            bedrijfsfinanciering voor. Bij New10 kan dat: binnen 15 minuten weet
            je wat je mogelijkheden zijn. Afspraken op een bankkantoor zijn niet
            meer nodig: je vraagt de financiering volledig zelfstandig online
            aan. Regel je bedrijfskrediet wanneer het jou uitkomt, zodat je dóór
            kunt met ondernemen.
          </div>
        </div>
        <div id='right-container'>
          <Rate rate={this.state.rate} />
          <button className='submit-button'>Direct aan de slag</button>
        </div>
      </div>
    );
  }
}

export default App;
