declare global {
  interface Window {
    api: { sum(numbers: number[]): number };
  }
}

const aInput = document.getElementById("a") as HTMLInputElement;
const bInput = document.getElementById("b") as HTMLInputElement;
const button = document.getElementById("calc") as HTMLButtonElement;
const resultEl = document.getElementById("result") as HTMLSpanElement;

button.addEventListener("click", () => {
  const a = Number(aInput.value);
  const b = Number(bInput.value);
  if (Number.isNaN(a) || Number.isNaN(b)) {
    resultEl.textContent = "NaN";
    return;
  }
  const total = window.api.sum([a, b]);
  resultEl.textContent = String(total);
});
