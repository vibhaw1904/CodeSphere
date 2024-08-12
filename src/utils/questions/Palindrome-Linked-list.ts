import assert from "assert";
import { Problem } from "../types/problem";

const starterCodePalindromeLinkedList = `function isPalindrome(head) {
  // Write your code here
};`;

const handlerPalindromeLinkedList = (fn: any, assert: any) => {
  try {
    const inputs = [
      { val: 1, next: { val: 2, next: { val: 2, next: { val: 1, next: null } } } },
      { val: 1, next: { val: 2, next: null } },
    ];

    const answers = [
      true,
      false
    ];

    for (let i = 0; i < inputs.length; i++) {
      const result = fn(inputs[i]);
      assert.deepStrictEqual(result, answers[i]);
    }
    return true;
  } catch (error: any) {
    console.log("Palindrome Linked List handler function error");
    throw new Error(error);
  }
};

export const palindromeLinkedList: Problem = {
  id: "palindrome-linked-list",
  title: "Palindrome Linked List",
  problemStatement: `<p class='mt-3'>
    Given the head of a singly linked list, return <code>true</code> if it is a palindrome.
  </p>`,
  examples: [
    {
      id: 1,
      inputText: "head = [1,2,2,1]",
      outputText: "true",
      explanation: "The linked list [1,2,2,1] is a palindrome."
    },
    {
      id: 2,
      inputText: "head = [1,2]",
      outputText: "false",
      explanation: "The linked list [1,2] is not a palindrome."
    },
  ],
  constraints: `<li class='mt-2'>
    The number of nodes in the list is in the range <code>[1, 10<sup>5</sup>]</code>.
  </li>
  <li class='mt-2'>
    <code>0 ≤ Node.val ≤ 9</code>
  </li>`,
  handlerFunction: handlerPalindromeLinkedList,
  starterCode: starterCodePalindromeLinkedList,
  order: 12,
  starterFunctions: "function isPalindrome(",
};
