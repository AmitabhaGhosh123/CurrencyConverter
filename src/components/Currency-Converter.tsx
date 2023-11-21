import { useState } from 'react';
import axios from 'axios';
import "../Mock-Api";
import '../../src/styles.css';

const CurrencyConverter = () => {
    const [convertedAmount, setConvertedAmount] = useState(0);
    const [sourceCurrency, setSourceCurrency] = useState('USD');
    const [targetCurrency, setTargetCurrency] = useState('USD');
    const [amount, setAmount] = useState(0);
    const [message, setMessage] = useState('');
    const [showSuccessMessage, setShowSuccessMessage] = useState(false);
    const [showErrorMessage, setShowErrorMessage] = useState(false);

    /* function to get converted amount by making mock api call*/
    const getConvertedAmount = async () => {
        try {
            const response = await axios.get('/convert', {
                params: {
                    sourceCurrency,
                    targetCurrency,
                    amount
                }
            })
            setConvertedAmount(response.data.convertedAmount);
            setShowErrorMessage(false);
            setShowSuccessMessage(true);
            setMessage('Successfully converted');
            setTimeout(() => {
                setShowSuccessMessage(false);
            }, 5000)
        }
        catch (error: any) {
            setShowSuccessMessage(false);
            setShowErrorMessage(true);
            setMessage(error.response ? error.response.data : error.message);
            setTimeout(() => {
                setShowErrorMessage(false);
            }, 5000)
        }
    }

    /* function to hide the toaster message box*/
    const hideToast = () => {
        setShowSuccessMessage(false);
        setShowErrorMessage(false);
    }

    return (
        <>
            <div className='container'>
                <div className="row">
                    <div>
                        <label htmlFor="sourceCurrency" className='label'>Source Currency</label>
                        <select className="dropdown" name="sourceCurrency" id="sourceCurrency" onChange={(e) => setSourceCurrency(e.target.value)}>
                            <option value="USD">USD</option>
                            <option value="INR">INR</option>
                            <option value="EUR">EUR</option>
                        </select>
                    </div>

                    <div>
                        <label htmlFor="targetCurrency" className='label'>Target Currency</label>
                        <select className="dropdown" name="targetCurrency" id="targetCurrency" onChange={(e) => setTargetCurrency(e.target.value)}>
                            <option value="USD">USD</option>
                            <option value="INR">INR</option>
                            <option value="EUR">EUR</option>
                        </select>
                    </div>
                </div>
                <div className='row row-gap'>
                    <label className='label'>Enter Amount</label>
                    <input type='text' name='amount' value={amount === 0 ? '' : amount} onChange={(e) => setAmount(Number(e.target.value))} />
                </div>
                <div className='row row-gap btn-convert'>
                    <button onClick={getConvertedAmount}>Convert</button>
                </div>
            </div>

            <div className='result'>
                Result: <span className='converted-amount'>{convertedAmount !== 0 ? `${convertedAmount} ${targetCurrency}` : ''}</span>
            </div>

            {
                message !== '' &&
                (
                    <div className="wrapper">
                        {
                            showSuccessMessage &&
                            (
                                <div id="toast" className='success-toast'>
                                    <div className="container-1">
                                        <i className="fas fa-check-square"></i>
                                    </div>
                                    <div className="container-2">
                                        <p>{message}</p>
                                    </div>
                                    <button id="close" onClick={hideToast}>
                                        &times;
                                    </button>
                                </div>
                            )
                        }
                        {
                            showErrorMessage &&
                            (
                                <div id="toast" className='error-toast'>
                                    <div className="container-1">
                                        <i className="fas fa-check-square"></i>
                                    </div>
                                    <div className="container-2">
                                        <p>{message}</p>
                                    </div>
                                    <button id="close" onClick={hideToast}>
                                        &times;
                                    </button>
                                </div>
                            )
                        }
                    </div>
                )
            }
        </>
    );
};

export default CurrencyConverter;
