import React, {useState} from 'react';
import rates from '../rates.json';
import {ArrowDownward} from "@mui/icons-material";
import TokenSelect from "./TokenSelect";

const SwapForm = () => {
    const [inputCurrency, setInputCurrency] = useState('USD');
    const [outputCurrency, setOutputCurrency] = useState('ETH');
    const [inputAmount, setInputAmount] = useState(1);
    const [outputAmount, setOutputAmount] = useState(0);

    const handleInputCurrencyChange = (e) => {
        setInputCurrency(e.target.value);
    };

    const handleOutputCurrencyChange = (e) => {
        setOutputCurrency(e.target.value);
    };

    const handleAmountChange = (e) => {
        setInputAmount(e.target.value);
    };

    function roundToSignificantFigures(num, n) {
        if (num === 0) return 0;

        const d = Math.ceil(Math.log10(num < 0 ? -num : num));
        const power = n - d;

        const magnitude = Math.pow(10, power);
        const shifted = Math.round(num * magnitude);

        return shifted / magnitude;
    }

    const handleTokenChange = (event) => {
        console.log("Selected token:", event.target.value);
    };


    const computeOutput = () => {
        const inputRate = rates.find(rate => rate.currency === inputCurrency)?.price || 1;
        const outputRate = rates.find(rate => rate.currency === outputCurrency)?.price || 1;
        const conversion = (inputAmount / outputRate) * inputRate;
        console.log(conversion)
        const roundedConversion = roundToSignificantFigures(conversion, 6); // Round to 6 significant figures
        setOutputAmount(roundedConversion);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        computeOutput();
    };

    return (
        <div className='swap-form-container'>
            <h3 style={{display: 'flex', margin: '0 auto 10px 0'}}>
                Swap
            </h3>
            <form onSubmit={handleSubmit}>
                <div className='amount-box'>
                    <div style={{width: '350px'}}>
                        <label>You pay:</label>
                        <input type='number' value={inputAmount} onChange={handleAmountChange}
                               style={{width: '300px'}}/>
                    </div>
                    <div style={{display: 'flex', alignItems: 'center'}}>
                        <select value={inputCurrency} onChange={handleInputCurrencyChange}>
                            {rates.map(rate => <option key={rate.currency}
                                                       value={rate.currency}>{rate.currency}</option>)}
                        </select>
                    </div>
                </div>

                <TokenSelect name='ADA'/>
                <div className='amount-box'>
                    <div>
                        <p style={{margin: '0'}}>You receive:</p>
                        <p style={{
                            margin: '0',
                            fontSize: '40px',
                            width: '350px',
                            overflow: 'scroll'
                        }}> {outputAmount}</p>
                    </div>
                    <div style={{display: 'flex', alignItems: 'center'}}>
                        <select value={outputCurrency} onChange={handleOutputCurrencyChange}>
                            {rates.map(rate => <option key={rate.currency}
                                                       value={rate.currency}>{rate.currency}</option>)}
                        </select>
                    </div>
                </div>
            </form>
        </div>
    );
};

export default SwapForm