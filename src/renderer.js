// Renderer script - runs in browser context
(function() {
  const aInput = document.getElementById("a");
  const bInput = document.getElementById("b");
  const button = document.getElementById("calc");
  const resultEl = document.getElementById("result");

  button.addEventListener("click", () => {
    console.log("Button clicked");
    console.log("window.api:", window.api);
    
    const a = Number(aInput.value);
    const b = Number(bInput.value);
    console.log("Input values:", a, b);
    
    if (Number.isNaN(a) || Number.isNaN(b)) {
      resultEl.textContent = "NaN";
      return;
    }
    
    if (!window.api || !window.api.sum) {
      resultEl.textContent = "API not available";
      return;
    }
    
    const total = window.api.sum([a, b]);
    console.log("Sum result:", total);
    resultEl.textContent = String(total);
  });
})();




