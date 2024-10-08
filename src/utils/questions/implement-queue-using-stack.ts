import assert from "assert";
import { Problem } from "../types/problem";

const starterCodeImplementQueueUsingStacks = `class MyQueue {
  constructor() {
    // Write your code here
  }

  push(x: number): void {
    // Write your code here
  }

  pop(): number {
    // Write your code here
  }

  peek(): number {
    // Write your code here
  }

  empty(): boolean {
    // Write your code here
  }
};`;

const handlerImplementQueueUsingStacks = (fn: any, assert: any) => {
  try {
    const inputs = [
      [["MyQueue", "push", "push", "peek", "pop", "empty"], [[], [1], [2], [], [], []]],
      [["MyQueue", "empty"], [[], []]]
    ];
    const answers = [[null, null, null, 1, 1, false], [null, true]];

    for (let i = 0; i < inputs.length; i++) {
      const instance = new fn();
      const operations = inputs[i][0] as string[];
      const values = inputs[i][1] as any[];
      const result = [];

      for (let j = 0; j < operations.length; j++) {
        const operation = operations[j];
        const value = values[j];
        if (operation === "MyQueue") {
          result.push(null);
        } else {
          result.push(instance[operation](...value));
        }
      }
      assert.deepStrictEqual(result, answers[i]);
    }
    return true;
  } catch (error: any) {
    console.log("Implement Queue using Stacks handler function error");
    throw new Error(error);
  }
};

export const implementQueueUsingStacks: Problem = {
  id: "implement-queue-using-stacks",
  title: "Implement Queue using Stacks",
  problemStatement: `
    Implement a first in first out (FIFO) queue using only two stacks. The implemented queue should support all the functions of a normal queue (\`push\`, \`pop\`, \`peek\`, and \`empty\`).   
  `,
  examples: [
    {
      id: 1,
      inputText: '["MyQueue", "push", "push", "peek", "pop", "empty"]\n[[], [1], [2], [], [], []]',
      outputText: "[null, null, null, 1, 1, false]",
      explanation: "The queue is [1, 2] after the first push, [2] after the second push, and empty after the first pop."
    },
    {
      id: 2,
      inputText: '["MyQueue", "empty"]\n[[], []]',
      outputText: "[null, true]",
      explanation: "The queue is empty."
    },
  ],
  constraints: `
* \`1 ≤ x ≤ 9\` (where \`x\` is the input for \`push\` function)   

* The number of operations will be in the range \`[1, 100]\`.   
  `,
  handlerFunction: handlerImplementQueueUsingStacks,
  starterCode: starterCodeImplementQueueUsingStacks,
  order: 11,
  starterFunctions: "class MyQueue {",
};