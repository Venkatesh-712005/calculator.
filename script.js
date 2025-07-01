let display = document.getElementById('display');
let historyItems = document.getElementById('historyItems');
let historyContainer = document.getElementById('historyContainer');
let history = JSON.parse(localStorage.getItem('calculatorHistory')) || [];
let historyVisible = false;

window.onload = function () {
  renderHistory();
  historyContainer.style.display = 'none';
};

function appendValue(value) {
  if (display.value === 'Error') {
    clearDisplay();
  }
  display.value += value;
}

function clearDisplay() {
  display.value = '';
}

function deleteLast() {
  display.value = display.value.slice(0, -1);
}

function calculate() {
  try {
    const expression = display.value;
    const result = eval(expression);
    addToHistory(expression, result);
    display.value = result;
  } catch {
    display.value = 'Error';
  }
}

function addToHistory(expression, result) {
  const calculation = {
    expression,
    result,
    timestamp: new Date().toLocaleTimeString()
  };
  history.unshift(calculation);
  if (history.length > 10) history.pop();
  localStorage.setItem('calculatorHistory', JSON.stringify(history));
  renderHistory();
}

function renderHistory() {
  historyItems.innerHTML = '';
  history.forEach(item => {
    const historyItem = document.createElement('div');
    historyItem.className = 'history-item';
    historyItem.innerHTML = `
      <div>${item.expression} = <strong>${item.result}</strong></div>
      <small>${item.timestamp}</small>
    `;
    historyItem.addEventListener('click', () => {
      display.value = item.expression;
    });
    historyItems.appendChild(historyItem);
  });
}

function clearHistory() {
  history = [];
  localStorage.removeItem('calculatorHistory');
  renderHistory();
}

function showHistory() {
  historyVisible = !historyVisible;
  historyContainer.style.display = historyVisible ? 'block' : 'none';
}
