import React, { useRef } from 'react';
import { Query, Mutation } from 'react-apollo';

import Rate from './components/Rate';
import LoanForm from './components/LoanForm';

import { GET_ALL } from './queries/queries';
import { PUT_RATE_MUTATION } from './queries/mutations';

/**  This is the main App component of the application.
 * @class {React.Component} App
 * @param {Object}   props    props of the component
 */

function App() {
  //we keep here the mutation execution function
  //which later runs on LoanForm change
  const rateCallback = useRef(new Function());
  //we keep the rate in the ref to rid of flickering when
  //rate is being loaded over the mutation and incoming data is undefined
  //this helps us display the old rate value and thus no flickering
  const rateValue = useRef(0);
  /**
   * Component method.
   * FormSelect component onChange handler.
   * When goalID changes, we need to update the loan params
   * and recalculate the rate.
   * Sets new state.
   * @param {Object} data data from the form component
   * @return {Void}
   */
  const handleLoanFormChange = ({
    amount,
    duration,
    loan: { minDuration, maxDuration }
  }) =>
    rateCallback.current({
      variables: { amount, duration, minDuration, maxDuration }
    });

  return (
    <div id='main-container'>
      <div id='left-container'>
        <Query query={GET_ALL}>
          {({ loading, error, data }) => {
            if (loading) return <div className='tip'>Loading...</div>;
            if (error) return <div className='tip'>Error...</div>;
            return (
              <LoanForm
                id='loan-form'
                data={data}
                onChange={handleLoanFormChange}
              />
            );
          }}
        </Query>

        <div id='intro'>
          <h1>Voor ondernemers </h1>
          Je bent ondernemer, en je wilt door. Je hebt plannen, ambities, en een
          beetje haast. Het liefst regel je daar zo snel mogelijk een
          bedrijfsfinanciering voor. Bij New10 kan dat: binnen 15 minuten weet
          je wat je mogelijkheden zijn. Afspraken op een bankkantoor zijn niet
          meer nodig: je vraagt de financiering volledig zelfstandig online aan.
          Regel je bedrijfskrediet wanneer het jou uitkomt, zodat je dóór kunt
          met ondernemen.
        </div>
      </div>

      <div id='right-container'>
        <Mutation
          mutation={PUT_RATE_MUTATION}
          onError={error => console.error(error)}
        >
          {(calcRate, { data, loading, error }) => {
            rateCallback.current = calcRate;
            if (error) return <div>Error...</div>;
            rateValue.current = data ? data.rate : rateValue.current;
            return <Rate rate={rateValue.current} />;
          }}
        </Mutation>
        <button className='submit-button'>Direct aan de slag</button>
      </div>
    </div>
  );
}

export default App;
