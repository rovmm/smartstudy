import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CodeExecutionService {

  constructor() { }

  /**
   * Mocks executing code and returning an output block, simulating a containerized backend execution
   */
  async mockExecuteCode(language: string, code: string): Promise<{ output: string, hasError: boolean }> {
    return new Promise(resolve => {
      setTimeout(() => {
        // Mock some basic error checking for the demo
        if (code.includes('syntax error') || code.trim() === '' || code.includes('invalid')) {
          resolve({ 
            output: `SyntaxError: unexpected token or invalid syntax.\n    at Line 1`, 
            hasError: true 
          });
          return;
        }

        // Logic check: dividing by zero
        if (code.includes('/ 0')) {
          resolve({ 
            output: `ZeroDivisionError: division by zero\n    at Line 4`, 
            hasError: true 
          });
          return;
        }

        // Simulating correct outputs
        resolve({
          output: `✅ [${language.toUpperCase()}] Code compiled and executed successfully.\n\nSimulated output:\nHello World!\nExecution finished in 0.04s`,
          hasError: false
        });
      }, 1000); // simulate network latency
    });
  }

  /**
   * Mocks a DeepSeek AI API call analyzing code errors
   */
  async getAiErrorAnalysis(code: string, errorOutput: string): Promise<string> {
    return new Promise(resolve => {
      setTimeout(() => {
        if (errorOutput.includes('ZeroDivisionError')) {
          resolve(`**DeepSeek AI Error Analysis:**\n\nYou are attempting to divide a number by zero, which is mathematically undefined and throws a \`ZeroDivisionError\`.\n\n**How to fix it:**\nCheck the denominator variable before performing the division to ensure it is not zero.\n\n\`\`\`python\nif denominator != 0:\n    result = numerator / denominator\nelse:\n    print("Cannot divide by zero")\n\`\`\``);
        } else {
          resolve(`**DeepSeek AI Error Analysis:**\n\nI detected a syntax error in your code. This usually happens when you miss a closing bracket \`}\`, a parenthesis \`)\`, or a colon \`:\` at the end of a loop or function definition.\n\n**How to fix it:**\nCarefully review the line mentioned in the error traceback and ensure all syntax structures are properly closed.`);
        }
      }, 1500); // simulate AI reasoning latency
    });
  }
}
