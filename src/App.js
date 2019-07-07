import React, { useState } from 'react';
import { Query } from 'react-apollo';

import { calculateRate } from './data/utils';

import Rate from './components/Rate';
import LoanForm from './components/LoanForm';

import { GET_ALL } from './queries/queries';

/**  This is the main App component of the application.
 * @class {React.Component} App
 * @param {Object}   props    props of the component
 */

function App() {
  const [rate, setRate] = useState(0);
  /**
   * Component method.
   * FormSelect component onChange handler.
   * When goalID changes, we need to update the loan params
   * and recalculate the rate.
   * Sets new state.
   * @param {Object} data data from the form component
   * @return {Void}
   */
  const handleLoanFormChange = ({ amount, duration, loan }) => {
    setRate(calculateRate(amount, duration, loan));
  };

  return (
    <div id='main-container'>
      <div id='left-container'>
        <Query query={GET_ALL}>
          {({ loading, error, data }) => {
            if (loading) return <div className='tip'>Loading...</div>;
            if (error) return <div className='tip'>Error...</div>;
            return <LoanForm id='loan-form' data={data} onChange={handleLoanFormChange} />;
          }}
        </Query>

        <div id='intro'>
          <h1>Voor ondernemers </h1>
          Je bent ondernemer, en je wilt door. Je hebt plannen, ambities, en een beetje haast. Het
          liefst regel je daar zo snel mogelijk een bedrijfsfinanciering voor. Bij New10 kan dat:
          binnen 15 minuten weet je wat je mogelijkheden zijn. Afspraken op een bankkantoor zijn
          niet meer nodig: je vraagt de financiering volledig zelfstandig online aan. Regel je
          bedrijfskrediet wanneer het jou uitkomt, zodat je dóór kunt met ondernemen.
        </div>
      </div>

      <div id='right-container'>
        <Rate rate={rate} />
        <button className='submit-button'>Direct aan de slag</button>
      </div>
    </div>
  );
}

export default App;
