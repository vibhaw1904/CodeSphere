import assert from "assert";
import { Problem } from "../types/problem";

const starterCodeBinaryTreeInorderTraversal = `function inorderTraversal(root) {
  // Write your code here
};`;

const handlerBinaryTreeInorderTraversal = (fn: any, assert: any) => {
  try {
    const inputs = [
      { val: 1, right: { val: 2, left: { val: 3, left: null, right: null }, right: null }, left: null },
      null,
      { val: 1, left: null, right: null }
    ];

    const answers = [
      [1, 3, 2],
      [],
      [1]
    ];

    for (let i = 0; i < inputs.length; i++) {
      const result = fn(inputs[i]);
      assert.deepStrictEqual(result, answers[i]);
    }
    return true;
  } catch (error: any) {
    console.log("Binary Tree Inorder Traversal handler function error");
    throw new Error(error);
  }
};

export const binaryTreeInorderTraversal: Problem = {
  id: "binary-tree-inorder-traversal",
  title: "Binary Tree Inorder Traversal",
  problemStatement: `<p class='mt-3'>
    Given the root of a binary tree, return the inorder traversal of its nodes' values.
  </p>`,
  examples: [
    {
      id: 1,
      inputText: "root = [1,null,2,3]",
      outputText: "[1,3,2]",
      explanation: "The inorder traversal of the given binary tree is [1, 3, 2]."
    },
    {
      id: 2,
      inputText: "root = []",
      outputText: "[]",
      explanation: "The tree is empty, so the inorder traversal is an empty array."
    },
    {
      id: 3,
      inputText: "root = [1]",
      outputText: "[1]",
      explanation: "The inorder traversal of the given binary tree is [1]."
    },
  ],
  constraints: `<li class='mt-2'>
    The number of nodes in the tree is in the range <code>[0, 100]</code>.
  </li> 
  <li class='mt-2'>
    <code>-100 ≤ Node.val ≤ 100</code>
  </li>`,
  handlerFunction: handlerBinaryTreeInorderTraversal,
  starterCode: starterCodeBinaryTreeInorderTraversal,
  order: 10,
  starterFunctions: "function inorderTraversal(",
};
