import React, { useState } from "react";
import "./CreditSimulator.css";
import CurrencyInput from "react-currency-input-field";
import { CreditSimulate } from "../models/creditSimulate";
import Spinner from "../Share/Spinner/Spinner";
import { calculateCredit } from "../../services/creditSimulatorService";

export default function CreditSimulator() {
  const [value, setValue] = useState(0);
  const [interest, setInterest] = useState(0);
  const [quota, setQuota] = useState(0);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);

  async function calculate() {
    if (!validForm()) {
      return;
    }
    setLoading(true);
    const credit = new CreditSimulate(Number.parseFloat(value),Number.parseFloat(interest), Number.parseInt(quota), "", 0, null);
    console.log(credit);
    const response = await calculateCredit(credit);

    console.log(response);
    setLoading(false);

  }

  const changeValueInput = (event) => {
    setQuota(event.target.value);
  };

  const validForm = () => {
    let isValid = true;
    setError(false);
    console.log(value, interest, quota)
    if (value === 0 || interest === 0 || quota === 0) {
      setError(true);
      isValid = false;
    }

    return isValid;
  };

  return (
    <div className="container">
      <div className="title">
        <h2>Credit simulator</h2>
      </div>
      <div className="form">
        <div className={error && value===0 ? "error-campo" : "normal"}>
          <label>Value total</label>
          <CurrencyInput
            placeholder="Enter value"
            decimalSeparator=","
            groupSeparator="."
            prefix="$"
            // defaultValue={0}
            decimalsLimit={2}
            onValueChange={(value) => setValue(value)}
          />
        </div>
        <div className={error && interest===0  ? "error-campo" : "normal"}>
          <label>Monthly interest cup</label>
          <CurrencyInput
            placeholder="Enter interest"
            decimalSeparator="."
            // groupSeparator="."
            suffix="%"
            // defaultValue={0}
            decimalsLimit={5}
            onValueChange={(value) => setInterest(value)}
          />
        </div>
        <div className={error && quota===0  ? "error-campo" : "normal"}>
          <label>Number of quotas</label>
          <input
            type="number"
            placeholder="Enter quotas"
            // defaultValue={0}
            onChange={changeValueInput}
            required
          ></input>
        </div>

        {error && (value === 0 || interest === 0 || quota === 0)  && (
          <div className="alert">
            <p>You must enter all fields.</p>
          </div>
        )}

        {loading && (
          <div className="container-button">
            <Spinner />
          </div>
        )}

        <div className="container-button">
          <button onClick={() => calculate()} >Calculate</button>
        </div>
      </div>
    </div>
  );
}
