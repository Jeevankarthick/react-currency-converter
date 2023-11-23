// `https://api.frankfurter.app/latest?amount=100&from=EUR&to=USD`

import { useEffect, useState } from "react";

export default function App() {
  const [amount, setAmount] = useState(1);
  const [fromCurrency, setFromCurrency] = useState("USD");
  const [toCurrency, setToCurrency] = useState("EUR");
  const [output, setOutput] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(
    function () {
      async function fetchData() {
        setIsLoading(true);
        const res = await fetch(
          `https://api.frankfurter.app/latest?amount=${amount}&from=${fromCurrency}&to=${toCurrency}`
        );
        const data = await res.json();
        console.log(data.rates?.[toCurrency]);
        setOutput(data.rates?.[toCurrency]);
        setIsLoading(false);
      }

      if (fromCurrency === toCurrency) {
        return setOutput(amount);
      }

      fetchData();
    },
    [amount, fromCurrency, toCurrency]
  );

  return (
    <div className="container">
      <div className="main">
        <h1 className="heading">Currency Converter</h1>
        <div className="converter">
          <input
            className="amount-field"
            type="text"
            value={amount}
            onChange={(e) => setAmount(Number(e.target.value))}
            disabled={isLoading}
          />
          <select
            className="drop-down"
            value={fromCurrency}
            onChange={(e) => setFromCurrency(e.target.value)}
            disabled={isLoading}
          >
            <option value="USD">USD</option>
            <option value="EUR">EUR</option>
            <option value="CAD">CAD</option>
            <option value="INR">INR</option>
          </select>
          <select
            className="drop-down"
            value={toCurrency}
            onChange={(e) => setToCurrency(e.target.value)}
            disabled={isLoading}
          >
            <option value="USD">USD</option>
            <option value="EUR">EUR</option>
            <option value="CAD">CAD</option>
            <option value="INR">INR</option>
          </select>
          <h2 className="heading output">
            {Math.round(output * 100) / 100} {toCurrency}
          </h2>
        </div>
      </div>
    </div>
  );
}
