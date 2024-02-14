
const amountInput = document.getElementById("amount");
const fromCurrencySelect = document.getElementById("from-currency");
const toCurrencySelect = document.getElementById("to-currency");
const convertButton = document.getElementById("convert");
const resultElement = document.getElementById("result");


function fetchExchangeRates() {
  const apiKey = "ffe7e28c87571ea03e3ba6cf";
  const url = `https://api.exchangerate-api.com/v4/latest/USD?apiKey=${apiKey}`;

  return fetch(url)
    .then(response => response.json())
    .then(data => data.rates)
    .catch(error => {
      console.error("Error fetching exchange rates:", error);
      return null;
    });
}


function convertCurrency() {
  const amount = parseFloat(amountInput.value);
  const fromCurrency = fromCurrencySelect.value;
  const toCurrency = toCurrencySelect.value;

  if (isNaN(amount)) {
    resultElement.textContent = "Please enter a valid amount";
    return;
  }

  fetchExchangeRates()
    .then(rates => {
      if (rates) {
        const exchangeRate = rates[toCurrency] / rates[fromCurrency];
        const convertedAmount = amount * exchangeRate;
        resultElement.textContent = `${amount} ${fromCurrency} = ${convertedAmount.toFixed(2)} ${toCurrency}`;
      }
    });
}


convertButton.addEventListener("click", convertCurrency);
