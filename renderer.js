// Advanced Calculator Renderer - runs in browser context
(function() {
  // DOM Elements
  const resultEl = document.getElementById("result");
  const operationEl = document.getElementById("operation");
  const historyEl = document.getElementById("history");
  
  // Basic operations elements
  const num1Input = document.getElementById("num1");
  const num2Input = document.getElementById("num2");
  const operationSelect = document.getElementById("operation-select");
  const calculateBasicBtn = document.getElementById("calculate-basic");
  
  // Single number operations
  const singleNumInput = document.getElementById("single-num");
  const singleOpButtons = document.querySelectorAll(".single-op");
  
  // Constants
  const piBtn = document.getElementById("pi-btn");
  const eBtn = document.getElementById("e-btn");
  
  // History
  const clearHistoryBtn = document.getElementById("clear-history");
  
  // History storage
  let calculationHistory = [];
  
  // Utility functions
  function updateDisplay(result, expression = "") {
    resultEl.textContent = formatNumber(result);
    operationEl.textContent = expression;
  }
  
  function formatNumber(num) {
    if (typeof num !== 'number' || isNaN(num)) {
      return "Error";
    }
    
    // Handle very large or very small numbers
    if (Math.abs(num) > 1e15 || (Math.abs(num) < 1e-10 && num !== 0)) {
      return num.toExponential(6);
    }
    
    // Round to avoid floating point precision issues
    const rounded = window.api.round(num, 10);
    
    // Format with appropriate decimal places
    if (Number.isInteger(rounded)) {
      return rounded.toString();
    } else {
      return rounded.toString();
    }
  }
  
  function addToHistory(expression, result) {
    const historyItem = {
      expression: expression,
      result: result,
      timestamp: new Date().toLocaleTimeString()
    };
    
    calculationHistory.unshift(historyItem);
    
    // Keep only last 20 calculations
    if (calculationHistory.length > 20) {
      calculationHistory = calculationHistory.slice(0, 20);
    }
    
    updateHistoryDisplay();
  }
  
  function updateHistoryDisplay() {
    if (calculationHistory.length === 0) {
      historyEl.innerHTML = '<p class="history-empty">No calculations yet</p>';
      return;
    }
    
    const historyHTML = calculationHistory.map(item => `
      <div class="history-item">
        <span class="history-expression">${item.expression}</span>
        <span class="history-result">= ${formatNumber(item.result)}</span>
        <small style="color: #999; float: right;">${item.timestamp}</small>
      </div>
    `).join('');
    
    historyEl.innerHTML = historyHTML;
  }
  
  function showError(message) {
    updateDisplay("Error");
    operationEl.textContent = message;
  }
  
  function validateAPI() {
    if (!window.api) {
      showError("Calculator API not available");
      return false;
    }
    return true;
  }
  
  // Basic operations handler
  calculateBasicBtn.addEventListener("click", () => {
    if (!validateAPI()) return;
    
    const num1 = parseFloat(num1Input.value);
    const num2 = parseFloat(num2Input.value);
    const operation = operationSelect.value;
    
    if (isNaN(num1) || isNaN(num2)) {
      showError("Please enter valid numbers");
      return;
    }
    
    try {
      let result;
      let expression;
      
      switch (operation) {
        case "add":
          result = window.api.add(num1, num2);
          expression = `${num1} + ${num2}`;
          break;
        case "subtract":
          result = window.api.subtract(num1, num2);
          expression = `${num1} - ${num2}`;
          break;
        case "multiply":
          result = window.api.multiply(num1, num2);
          expression = `${num1} × ${num2}`;
          break;
        case "divide":
          result = window.api.divide(num1, num2);
          expression = `${num1} ÷ ${num2}`;
          break;
        case "power":
          result = window.api.power(num1, num2);
          expression = `${num1} ^ ${num2}`;
          break;
        default:
          throw new Error("Unknown operation");
      }
      
      updateDisplay(result, expression);
      addToHistory(expression, result);
      
    } catch (error) {
      showError(error.message);
    }
  });
  
  // Single number operations handler
  singleOpButtons.forEach(button => {
    button.addEventListener("click", () => {
      if (!validateAPI()) return;
      
      const num = parseFloat(singleNumInput.value);
      const operation = button.dataset.op;
      
      if (isNaN(num)) {
        showError("Please enter a valid number");
        return;
      }
      
      try {
        let result;
        let expression;
        
        switch (operation) {
          case "sqrt":
            result = window.api.sqrt(num);
            expression = `√${num}`;
            break;
          case "square":
            result = window.api.square(num);
            expression = `${num}²`;
            break;
          case "cube":
            result = window.api.cube(num);
            expression = `${num}³`;
            break;
          case "factorial":
            result = window.api.factorial(num);
            expression = `${num}!`;
            break;
          case "abs":
            result = window.api.abs(num);
            expression = `|${num}|`;
            break;
          case "sin":
            result = window.api.sin(num);
            expression = `sin(${num})`;
            break;
          case "cos":
            result = window.api.cos(num);
            expression = `cos(${num})`;
            break;
          case "tan":
            result = window.api.tan(num);
            expression = `tan(${num})`;
            break;
          case "log":
            result = window.api.log(num);
            expression = `ln(${num})`;
            break;
          case "log10":
            result = window.api.log10(num);
            expression = `log₁₀(${num})`;
            break;
          default:
            throw new Error("Unknown operation");
        }
        
        updateDisplay(result, expression);
        addToHistory(expression, result);
        
      } catch (error) {
        showError(error.message);
      }
    });
  });
  
  // Constants handlers
  piBtn.addEventListener("click", () => {
    if (!validateAPI()) return;
    
    const pi = window.api.getPI();
    updateDisplay(pi, "π");
    addToHistory("π", pi);
    
    // Also set it in the single number input for convenience
    singleNumInput.value = pi;
  });
  
  eBtn.addEventListener("click", () => {
    if (!validateAPI()) return;
    
    const e = window.api.getE();
    updateDisplay(e, "e");
    addToHistory("e", e);
    
    // Also set it in the single number input for convenience
    singleNumInput.value = e;
  });
  
  // Clear history handler
  clearHistoryBtn.addEventListener("click", () => {
    calculationHistory = [];
    updateHistoryDisplay();
  });
  
  // Keyboard support
  document.addEventListener("keydown", (event) => {
    // Enter key triggers calculation
    if (event.key === "Enter") {
      event.preventDefault();
      
      // Check which input is focused and trigger appropriate calculation
      if (document.activeElement === num1Input || document.activeElement === num2Input) {
        calculateBasicBtn.click();
      } else if (document.activeElement === singleNumInput) {
        // Trigger the first single operation button as default (sqrt)
        if (singleOpButtons.length > 0) {
          singleOpButtons[0].click();
        }
      }
    }
    
    // Escape key clears inputs
    if (event.key === "Escape") {
      num1Input.value = "";
      num2Input.value = "";
      singleNumInput.value = "";
      updateDisplay(0, "");
    }
  });
  
  // Initialize display
  updateDisplay(0, "Welcome to Advanced Calculator");
  
  // Auto-focus first input
  if (num1Input) {
    num1Input.focus();
  }
  
  console.log("Advanced Calculator initialized successfully");
})();
