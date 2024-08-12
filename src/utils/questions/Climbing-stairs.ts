import assert from "assert";
import { Problem } from "../types/problem";

const starterCodeClimbingStairs = `function climbStairs(n: number): number {
  // Write your code here
};`;

const handlerClimbingStairs = (fn: any, assert: any) => {
  try {
    const inputs = [2, 3];
    const answers = [2, 3];

    for (let i = 0; i < inputs.length; i++) {
      const result = fn(inputs[i]);
      assert.deepStrictEqual(result, answers[i]);
    }
    return true;
  } catch (error: any) {
    console.log("Climbing Stairs handler function error");
    throw new Error(error);
  }
};

export const climbingStairs: Problem = {
  id: "climbing-stairs",
  title: "Climbing Stairs",
  problemStatement: `<p class='mt-3'>
    You are climbing a staircase. It takes <code>n</code> steps to reach the top.
  </p>
  <p class='mt-3'>
    Each time you can either climb 1 or 2 steps. In how many distinct ways can you climb to the top?
  </p>`,
  examples: [
    {
      id: 1,
      inputText: "n = 2",
      outputText: "2",
      explanation: "There are two ways to climb to the top: 1 step + 1 step or 2 steps."
    },
    {
      id: 2,
      inputText: "n = 3",
      outputText: "3",
      explanation: "There are three ways to climb to the top: 1 step + 1 step + 1 step, 1 step + 2 steps, or 2 steps + 1 step."
    },
  ],
  constraints: `<li class='mt-2'>
    <code>1 ≤ n ≤ 45</code>
  </li>`,
  handlerFunction: handlerClimbingStairs,
  starterCode: starterCodeClimbingStairs,
  order: 8,
  starterFunctions: "function climbStairs(",
};
