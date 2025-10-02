"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const electron_1 = require("electron");
electron_1.contextBridge.exposeInMainWorld("api", {
    // Basic arithmetic operations
    add(a, b) {
        return a + b;
    },
    subtract(a, b) {
        return a - b;
    },
    multiply(a, b) {
        return a * b;
    },
    divide(a, b) {
        if (b === 0) {
            throw new Error("Division by zero is not allowed");
        }
        return a / b;
    },
    // Advanced operations
    power(base, exponent) {
        return Math.pow(base, exponent);
    },
    sqrt(n) {
        if (n < 0) {
            throw new Error("Square root of negative number is not allowed");
        }
        return Math.sqrt(n);
    },
    // Single number operations
    square(n) {
        return n * n;
    },
    cube(n) {
        return n * n * n;
    },
    factorial(n) {
        if (n < 0 || !Number.isInteger(n)) {
            throw new Error("Factorial is only defined for non-negative integers");
        }
        if (n === 0 || n === 1)
            return 1;
        let result = 1;
        for (let i = 2; i <= n; i++) {
            result *= i;
        }
        return result;
    },
    // Trigonometric functions (in radians)
    sin(n) {
        return Math.sin(n);
    },
    cos(n) {
        return Math.cos(n);
    },
    tan(n) {
        return Math.tan(n);
    },
    // Logarithmic functions
    log(n) {
        if (n <= 0) {
            throw new Error("Logarithm is only defined for positive numbers");
        }
        return Math.log(n);
    },
    log10(n) {
        if (n <= 0) {
            throw new Error("Logarithm is only defined for positive numbers");
        }
        return Math.log10(n);
    },
    // Utility functions
    abs(n) {
        return Math.abs(n);
    },
    round(n, decimals = 0) {
        const factor = Math.pow(10, decimals);
        return Math.round(n * factor) / factor;
    },
    // Constants
    getPI() {
        return Math.PI;
    },
    getE() {
        return Math.E;
    }
});
//# sourceMappingURL=preload.js.map