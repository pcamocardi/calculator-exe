import { contextBridge } from "electron";

contextBridge.exposeInMainWorld("api", {
  // Basic arithmetic operations
  add(a: number, b: number): number {
    return a + b;
  },
  
  subtract(a: number, b: number): number {
    return a - b;
  },
  
  multiply(a: number, b: number): number {
    return a * b;
  },
  
  divide(a: number, b: number): number {
    if (b === 0) {
      throw new Error("Division by zero is not allowed");
    }
    return a / b;
  },
  
  // Advanced operations
  power(base: number, exponent: number): number {
    return Math.pow(base, exponent);
  },
  
  sqrt(n: number): number {
    if (n < 0) {
      throw new Error("Square root of negative number is not allowed");
    }
    return Math.sqrt(n);
  },
  
  // Single number operations
  square(n: number): number {
    return n * n;
  },
  
  cube(n: number): number {
    return n * n * n;
  },
  
  factorial(n: number): number {
    if (n < 0 || !Number.isInteger(n)) {
      throw new Error("Factorial is only defined for non-negative integers");
    }
    if (n === 0 || n === 1) return 1;
    let result = 1;
    for (let i = 2; i <= n; i++) {
      result *= i;
    }
    return result;
  },
  
  // Trigonometric functions (in radians)
  sin(n: number): number {
    return Math.sin(n);
  },
  
  cos(n: number): number {
    return Math.cos(n);
  },
  
  tan(n: number): number {
    return Math.tan(n);
  },
  
  // Logarithmic functions
  log(n: number): number {
    if (n <= 0) {
      throw new Error("Logarithm is only defined for positive numbers");
    }
    return Math.log(n);
  },
  
  log10(n: number): number {
    if (n <= 0) {
      throw new Error("Logarithm is only defined for positive numbers");
    }
    return Math.log10(n);
  },
  
  // Utility functions
  abs(n: number): number {
    return Math.abs(n);
  },
  
  round(n: number, decimals: number = 0): number {
    const factor = Math.pow(10, decimals);
    return Math.round(n * factor) / factor;
  },
  
  // Constants
  getPI(): number {
    return Math.PI;
  },
  
  getE(): number {
    return Math.E;
  }
});
