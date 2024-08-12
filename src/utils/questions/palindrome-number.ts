import assert from "assert";
import { Problem } from "../types/problem";

const starterCodePalindromeNumber = `function isPalindrome(x: number): boolean {
  // Write your code here
};`;

const handlerPalindromeNumber = (fn: any, assert: any) => {
  try {
    const inputs = [121, -121, 10];
    const answers = [true, false, false];

    for (let i = 0; i < inputs.length; i++) {
      const result = fn(inputs[i]);
      assert.deepStrictEqual(result, answers[i]);
    }
    return true;
  } catch (error: any) {
    console.log("Palindrome Number handler function error");
    throw new Error(error);
  }
};

export const palindromeNumber: Problem = {
  id: "palindrome-number",
  title: "Palindrome Number",
  problemStatement: `<p class='mt-3'>
    Given an integer <code>x</code>, return <em>true</em> if <code>x</code> is a palindrome, and <em>false</em> otherwise.
  </p>`,
  examples: [
    {
      id: 1,
      inputText: "x = 121",
      outputText: "true",
      explanation: "121 reads as 121 from left to right and from right to left."
    },
    {
      id: 2,
      inputText: "x = -121",
      outputText: "false",
      explanation: "From left to right, it reads -121. From right to left, it becomes 121-."
    },
    {
      id: 3,
      inputText: "x = 10",
      outputText: "false",
      explanation: "Reads 01 from right to left. Therefore it is not a palindrome."
    },
  ],
  constraints: `<li class='mt-2'>
    <code>-2<sup>31</sup> ≤ x ≤ 2<sup>31</sup> - 1</code>
  </li>`,
  handlerFunction: handlerPalindromeNumber,
  starterCode: starterCodePalindromeNumber,
  order: 4,
  starterFunctions: "function isPalindrome(",
};
