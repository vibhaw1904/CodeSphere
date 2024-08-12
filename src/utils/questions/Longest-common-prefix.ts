import assert from "assert";
import { Problem } from "../types/problem";

const starterCodeLongestCommonPrefix = `function longestCommonPrefix(strs: string[]): string {
  // Write your code here
};`;

const handlerLongestCommonPrefix = (fn: any, assert: any) => {
  try {
    const inputs = [["flower", "flow", "flight"], ["dog", "racecar", "car"], [""]]; 
    const answers = ["fl", "", ""];

    for (let i = 0; i < inputs.length; i++) {
      const result = fn(inputs[i]);
      assert.deepStrictEqual(result, answers[i]);
    }
    return true;
  } catch (error: any) {
    console.log("Longest Common Prefix handler function error");
    throw new Error(error);
  }
};

export const longestCommonPrefix: Problem = {
  id: "longest-common-prefix",
  title: "Longest Common Prefix",
  problemStatement: `<p class='mt-3'>
    Write a function to find the longest common prefix string amongst an array of strings.
  </p>
  <p class='mt-3'>
    If there is no common prefix, return an empty string <code>""</code>.
  </p>`,
  examples: [
    {
      id: 1,
      inputText: "strs = ['flower', 'flow', 'flight']",
      outputText: "'fl'",
      explanation: "The longest common prefix is 'fl'."
    },
    {
      id: 2,
      inputText: "strs = ['dog', 'racecar', 'car']",
      outputText: "''",
      explanation: "There is no common prefix among the input strings."
    },
    {
      id: 3,
      inputText: "strs = ['']",
      outputText: "''",
      explanation: "There is no common prefix as the input string is empty."
    },
  ],
  constraints: `<li class='mt-2'>
    <code>1 ≤ strs.length ≤ 200</code>
  </li>
  <li class='mt-2'>
    <code>0 ≤ strs[i].length ≤ 200</code>
  </li>
  <li class='mt-2'>
    <code>strs[i]</code> consists of only lowercase English letters.
  </li>`,
  handlerFunction: handlerLongestCommonPrefix,
  starterCode: starterCodeLongestCommonPrefix,
  order: 7,
  starterFunctions: "function longestCommonPrefix(",
};
