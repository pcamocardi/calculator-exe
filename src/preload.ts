import { contextBridge } from "electron";

contextBridge.exposeInMainWorld("api", {
  calculate(numbers: number[]): number {
    return numbers.reduce((acc, n) => acc + n, 0);
  },
});
