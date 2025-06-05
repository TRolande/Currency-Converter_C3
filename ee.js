const currencies = {
            USD: 1.0,
            JPY: 113.5,
            EUR: 0.89,
            RUB: 74.36,
            GBP: 0.75
        };

        function convert() {
            const fromCurrency = document.getElementById('fromCurrency').value;
            const toCurrency = document.getElementById('toCurrency').value;
            const amount = parseFloat(document.getElementById('amount').value);
            const resultDiv = document.getElementById('result');
            const historyList = document.getElementById('historyList');
            const thankyouDiv = document.getElementById('thankyou');

            if (isNaN(amount)) {
                resultDiv.innerHTML = 'Please enter a valid amount';
                thankyouDiv.innerHTML = '';
                return;
            }

            if (currencies[toCurrency] && currencies[fromCurrency]) {
                const convertedAmount = (amount * currencies[toCurrency]) / currencies[fromCurrency];
                const resultText = `${amount} ${fromCurrency} = ${convertedAmount.toFixed(2)} ${toCurrency}`;
                resultDiv.innerHTML = resultText;

                // Add to history
                const li = document.createElement('li');
                li.textContent = resultText;
                historyList.appendChild(li);

                // Show thank you message
                thankyouDiv.innerHTML = 'Thank you for using our application!';
            } else {
                resultDiv.innerHTML = 'Currency not found!';
                thankyouDiv.innerHTML = '';
            }
        }

