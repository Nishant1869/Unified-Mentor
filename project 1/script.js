(function () {
  const previousOperandEl = document.getElementById('previousOperand');
  const currentOperandEl = document.getElementById('currentOperand');
  const keypad = document.querySelector('.keypad');

  let previousOperand = '';
  let currentOperand = '0';
  let pendingOperation = null; // '+', '-', '*', '/', '%'
  let justEvaluated = false;

  function resetAll() {
    previousOperand = '';
    currentOperand = '0';
    pendingOperation = null;
    justEvaluated = false;
    updateDisplay();
  }

  function deleteLast() {
    if (justEvaluated) { return; }
    if (currentOperand.length <= 1 || (currentOperand.length === 2 && currentOperand.startsWith('-'))) {
      currentOperand = '0';
    } else {
      currentOperand = currentOperand.slice(0, -1);
    }
    updateDisplay();
  }

  function appendDigit(digit) {
    if (justEvaluated) {
      currentOperand = digit;
      justEvaluated = false;
      updateDisplay();
      return;
    }
    if (currentOperand === '0') {
      currentOperand = digit;
    } else if (currentOperand === '-0') {
      currentOperand = '-' + digit;
    } else {
      currentOperand += digit;
    }
    updateDisplay();
  }

  function appendDot() {
    if (justEvaluated) {
      currentOperand = '0.';
      justEvaluated = false;
      updateDisplay();
      return;
    }
    if (!currentOperand.includes('.')) {
      currentOperand += (currentOperand === '' || currentOperand === '-') ? '0.' : '.';
      updateDisplay();
    }
  }

  function chooseOperation(op) {
    if (pendingOperation && !justEvaluated) {
      compute();
    }
    previousOperand = currentOperand;
    pendingOperation = op;
    justEvaluated = false;
    currentOperand = '0';
    updateDisplay();
  }

  function percent(value) {
    const n = Number(value);
    if (!isFinite(n)) return 0;
    return n / 100;
  }

  function compute() {
    if (pendingOperation == null || previousOperand === '') return;
    const a = Number(previousOperand);
    const b = Number(currentOperand);
    let result = 0;

    switch (pendingOperation) {
      case '+': result = a + b; break;
      case '-': result = a - b; break;
      case '*': result = a * b; break;
      case '/': result = b === 0 ? NaN : a / b; break;
      case '%': result = percent(previousOperand); break;
      default: return;
    }

    currentOperand = formatNumber(result);
    previousOperand = '';
    pendingOperation = null;
    justEvaluated = true;
    updateDisplay();
  }

  function formatNumber(num) {
    if (!isFinite(num)) return 'Error';
    const asStr = String(num);
    if (asStr.includes('e')) return asStr;

    const maxLen = 14;
    let rounded = Number(num.toPrecision(12));
    let out = String(rounded);

    if (out.length > maxLen) {
      out = Number(rounded).toExponential(6);
    }

    if (out.includes('.')) {
      out = out.replace(/\.0+$|(?<=\..*?)0+$/g, '');
    }
    return out;
  }

  function updateDisplay() {
    const opSymbol = pendingOperation ? ` ${symbolFor(pendingOperation)} ` : '';
    previousOperandEl.textContent = previousOperand ? `${previousOperand}${opSymbol}` : '';
    currentOperandEl.textContent = currentOperand;
  }

  function symbolFor(op) {
    switch (op) {
      case '/': return '÷';
      case '*': return '×';
      default: return op;
    }
  }

  keypad.addEventListener('click', (e) => {
    const target = e.target.closest('button');
    if (!target) return;

    const digit = target.getAttribute('data-digit');
    const op = target.getAttribute('data-operation');
    const action = target.getAttribute('data-action');

    if (digit != null) return appendDigit(digit);
    if (op != null) return chooseOperation(op);

    if (action === 'equals') return compute();
    if (action === 'clear') return resetAll();
    if (action === 'delete') return deleteLast();

    if (target.hasAttribute('data-dot')) return appendDot();
  });

  window.addEventListener('keydown', (e) => {
    const { key } = e;

    if (/^[0-9]$/.test(key)) { appendDigit(key); return; }
    if (key === '.' || key === ',') { appendDot(); return; }

    if (key === '+' || key === '-' || key === '*' || key === '/') { chooseOperation(key); return; }
    if (key === '%') { chooseOperation('%'); return; }

    if (key === '=' || key === 'Enter') { e.preventDefault(); compute(); return; }
    if (key === 'Backspace') { deleteLast(); return; }
    if (key === 'Escape') { resetAll(); return; }
  });

  updateDisplay();
})();
