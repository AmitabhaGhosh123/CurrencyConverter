
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';

const mock = new MockAdapter(axios);

// Mock data for exchange rates
const exchangeRates:any = {
  USD: 1.0,
  INR: 74.23,
  EUR: 0.85,
};

mock.onGet('/convert').reply((config) => {
  // Extract query parameters
  const { sourceCurrency, targetCurrency, amount } = config.params;

  // Check if the provided currency pair is supported
  if (!exchangeRates[sourceCurrency] || !exchangeRates[targetCurrency]) {
    return [400, { error: 'Invalid currency pair' }];
  }

  if(sourceCurrency === targetCurrency) {
    return [400, { error: 'Source and target currency cannot be same'}];
  }

  // Calculate converted amount
  const exchangeRate = exchangeRates[targetCurrency] / exchangeRates[sourceCurrency];
  const convertedAmount = amount * exchangeRate;

  // Return the mock response
  return [200, { exchangeRate, convertedAmount }];
});
