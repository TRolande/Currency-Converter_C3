async function convert() {
            const fromCurrency = document.getElementById('fromCurrency').value;
            const toCurrency = document.getElementById('toCurrency').value;
            const amount = parseFloat(document.getElementById('amount').value);
            const resultDiv = document.getElementById('result');
            const historyList = document.getElementById('historyList');
            const thankyouDiv = document.getElementById('thankyou');

            const fallbackRates = {
                USD: 1,
                EUR: 0.92,
                JPY: 155,
                RUB: 89,
                GBP: 0.79
            };

            if (isNaN(amount) || amount <= 0) {
                resultDiv.innerHTML = 'Please enter a valid amount';
                thankyouDiv.innerHTML = '';
                return;
            }

            // If from and to currencies are the same, just return the same amount
            if (fromCurrency === toCurrency) {
                const resultText = `${amount} ${fromCurrency} = ${amount.toFixed(2)} ${toCurrency}`;
                resultDiv.innerHTML = resultText;
                const li = document.createElement('li');
                li.textContent = resultText;
                historyList.appendChild(li);
                thankyouDiv.innerHTML = 'Thank you for using our application!';
                return;
            }

            resultDiv.innerHTML = 'Converting...';
            thankyouDiv.innerHTML = '';

            try {
                const url = `https://api.exchangerate.host/convert?from=${fromCurrency}&to=${toCurrency}&amount=${amount}`;
                const response = await fetch(url);
                const data = await response.json();

                if (typeof data.result === "number" && !isNaN(data.result)) {
                    const resultText = `${amount} ${fromCurrency} = ${data.result.toFixed(2)} ${toCurrency}`;
                    resultDiv.innerHTML = resultText;

                    // Add to history
                    const li = document.createElement('li');
                    li.textContent = resultText;
                    historyList.appendChild(li);

                    thankyouDiv.innerHTML = 'Thank you for using our application!';
                    return;
                }
            } catch (error) {
                // Do nothing, fallback will handle it
            }

            // Fallback to hardcoded rates if API fails or returns invalid result
            if (fallbackRates[fromCurrency] && fallbackRates[toCurrency]) {
                const usdAmount = amount / fallbackRates[fromCurrency];
                const converted = usdAmount * fallbackRates[toCurrency];
                const resultText = `${amount} ${fromCurrency} = ${converted.toFixed(2)} ${toCurrency} (offline rate)`;
                resultDiv.innerHTML = resultText;
                const li = document.createElement('li');
                li.textContent = resultText;
                historyList.appendChild(li);
                thankyouDiv.innerHTML = 'Thank you for using our application!';
            } else {
                resultDiv.innerHTML = 'Conversion unavailable at the moment. Please try again later.';
                thankyouDiv.innerHTML = '';
            }
        }

        // Feedback functionality
        document.addEventListener('DOMContentLoaded', function() {
            document.getElementById('submitFeedback').onclick = function() {
                const feedback = document.getElementById('feedback').value.trim();
                const msgDiv = document.getElementById('feedbackMsg');
                if (feedback.length === 0) {
                    msgDiv.textContent = "Please enter your feedback before submitting.";
                } else {
                    msgDiv.textContent = "Thank you for your feedback!";
                    document.getElementById('feedback').value = "";
                }
            };
        });

