function calculateRate(rateModel, amount, duration, minDuration, maxDuration) {
  const rateParams = rateModel.find(
    m => amount > m.minAmount && amount <= m.maxAmount
  );
  return rateParams
    ? (
        rateParams.minRate +
        ((duration - minDuration) / (maxDuration - minDuration)) *
          (rateParams.maxRate - rateParams.minRate)
      ).toFixed(2)
    : 0;
}

module.exports = {
  calculateRate
};
