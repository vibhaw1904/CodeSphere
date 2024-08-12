import assert from "assert";
import { Problem } from "../types/problem";

const starterCodeMaxDepthBinaryTree = `function maxDepth(root){
  // Write your code here
};`;

// checks if the user has the correct code
const handlerMaxDepthBinaryTree = (fn: any, assert: any) => {
  // fn is the callback that user's code is passed into
  try {
    const inputs = [
      { val: 3, left: { val: 9, left: null, right: null }, right: { val: 20, left: { val: 15, left: null, right: null }, right: { val: 7, left: null, right: null } } },
      { val: 1, left: null, right: { val: 2, left: null, right: null } },
      null
    ];

    const answers = [
      3,
      2,
      0
    ];

    // loop all tests to check if the user's code is correct
    for (let i = 0; i < inputs.length; i++) {
      // result is the output of the user's function and answer is the expected output
      const result = fn(inputs[i]);
      assert.deepStrictEqual(result, answers[i]);
    }
    return true;
  } catch (error: any) {
    console.log("Maximum Depth of Binary Tree handler function error");
    throw new Error(error);
  }
};

export const maxDepthBinaryTree: Problem = {
  id: "maximum-depth-of-binary-tree",
  title: "104. Maximum Depth of Binary Tree",
  problemStatement: `<p class='mt-3'>
    Given the <code>root</code> of a binary tree, return <em>its maximum depth</em>.
  </p>
  <p class='mt-3'>
    A binary tree's <strong>maximum depth</strong> is the number of nodes along the longest path from the root node down to the farthest leaf node.
  </p>`,
  examples: [
    {
      id: 1,
      inputText: "root = [3,9,20,null,null,15,7]",
      outputText: "3",
      explanation: "The maximum depth is 3 levels."
    },
    {
      id: 2,
      inputText: "root = [1,null,2]",
      outputText: "2",
      explanation: "The maximum depth is 2 levels."
    },
    {
      id: 3,
      inputText: "root = []",
      outputText: "0",
      explanation: "The tree is empty, so the maximum depth is 0."
    },
  ],
  constraints: `<li class='mt-2'>
    The number of nodes in the tree is in the range <code>[0, 10^4]</code>.
  </li> 
  <li class='mt-2'>
    <code>-100 ≤ Node.val ≤ 100</code>
  </li>`,
  handlerFunction: handlerMaxDepthBinaryTree,
  starterCode: starterCodeMaxDepthBinaryTree,
  order: 3,
  starterFunctions: "function maxDepth(",
};
