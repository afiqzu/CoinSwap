import React, { useEffect, useState } from "react";
import rates from "../rates.json";
import TokenSelect from "./TokenSelect";
import TokenMenu from "./TokenMenu";
import { SwapVert } from "@mui/icons-material";

const SwapForm = () => {
  const [inputCurrency, setInputCurrency] = useState("USD");
  const [outputCurrency, setOutputCurrency] = useState("ETH");
  const [inputAmount, setInputAmount] = useState(1);
  const [outputAmount, setOutputAmount] = useState(0);
  const [tokenMenuVisible, setTokenMenuVisible] = useState(false);
  const [selectedType, setSelectedType] = useState(null); // Either "input" or "output" or null

  useEffect(() => {
    computeOutput();
  });

  const openTokenMenu = (type) => {
    setSelectedType(type);
    setTokenMenuVisible(true);
  };

  const closeTokenMenu = () => {
    setTokenMenuVisible(false);
    computeOutput();
  };

  const handleTokenSelected = (tokenName) => {
    if (selectedType === "input") {
      setInputCurrency(tokenName);
    } else if (selectedType === "output") {
      setOutputCurrency(tokenName);
    }
    computeOutput();
    setSelectedType(null);
  };

  const handleAmountChange = (e) => {
    setInputAmount(e.target.value);
  };

  const handleKeyPress = (e) => {
    const keyCode = e.charCode;
    // Allow only numeric values. keyCode for 0 is 48 and for 9 is 57.
    if (keyCode < 48 || keyCode > 57) {
      e.preventDefault(); // Prevent the input if it's not a number
    }
  };

  function roundToSignificantFigures(num, n) {
    if (num === 0) return 0;

    const d = Math.ceil(Math.log10(num < 0 ? -num : num));
    const power = n - d;

    const magnitude = Math.pow(10, power);
    const shifted = Math.round(num * magnitude);

    return shifted / magnitude;
  }

  const computeOutput = () => {
    const inputRate =
      rates.find((rate) => rate.currency === inputCurrency)?.price || 1;
    const outputRate =
      rates.find((rate) => rate.currency === outputCurrency)?.price || 1;
    const conversion = (inputAmount / outputRate) * inputRate;
    const roundedConversion = roundToSignificantFigures(conversion, 6); // Round to 6 significant figures
    setOutputAmount(roundedConversion);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    computeOutput();
  };

  const swapTokens = () => {
    setInputCurrency(outputCurrency);
    setOutputCurrency(inputCurrency);

    setInputAmount(outputAmount);
    setOutputAmount(inputAmount);
  };

  return (
    <div className="swap-form-container">
      <h3 style={{ display: "flex", margin: "0 auto 10px 0" }}>Swap</h3>
      <form onSubmit={handleSubmit}>
        <div className="amount-box">
          <div style={{ width: "350px" }}>
            <label>You pay:</label>
            <input
              type="number"
              value={inputAmount}
              onChange={handleAmountChange}
              onKeyPress={handleKeyPress}
              style={{ width: "300px" }}
              placeholder="0"
            />
          </div>
          <div style={{ display: "flex", alignItems: "center" }}>
            <TokenSelect
              name={inputCurrency}
              onClick={() => openTokenMenu("input")}
            />
          </div>
        </div>

        <SwapVert
          onClick={swapTokens}
          sx={{ marginTop: "10px", cursor: "pointer", marginBottom: "10px" }}
        />

        <div className="amount-box">
          <div>
            <p style={{ margin: "0" }}>You receive:</p>
            <p
              style={{
                margin: "0",
                fontSize: "40px",
                width: "350px",
                overflow: "scroll",
              }}
            >
              {" "}
              {outputAmount}
            </p>
          </div>
          <div style={{ display: "flex", alignItems: "center" }}>
            <TokenSelect
              name={outputCurrency}
              onClick={() => openTokenMenu("output")}
            />
          </div>
        </div>
      </form>
      {tokenMenuVisible && (
        <TokenMenu
          selectedInputToken={inputCurrency}
          selectedOutputToken={outputCurrency}
          onTokenSelected={handleTokenSelected}
          onClose={closeTokenMenu}
        />
      )}
    </div>
  );
};

export default SwapForm;
