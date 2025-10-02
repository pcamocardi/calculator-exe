"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const electron_1 = require("electron");
electron_1.contextBridge.exposeInMainWorld("api", {
    calculate(numbers) {
        return numbers.reduce((acc, n) => acc + n, 0);
    },
});
//# sourceMappingURL=preload.js.map