import assert from "assert";
import { Problem } from "../types/problem";

const starterCodeMergeTwoSortedLists = `function mergeTwoLists(list1, list2) {
  // Write your code here
};`;

const handlerMergeTwoSortedLists = (fn: any, assert: any) => {
  try {
    const inputs = [
      [[1, 2, 4], [1, 3, 4]],
      [[], []],
      [[], [0]]
    ];
    const answers = [
      [1, 1, 2, 3, 4, 4],
      [],
      [0]
    ];

    for (let i = 0; i < inputs.length; i++) {
      const result = fn(inputs[i][0], inputs[i][1]);
      assert.deepStrictEqual(result, answers[i]);
    }
    return true;
  } catch (error: any) {
    console.log("Merge Two Sorted Lists handler function error");
    throw new Error(error);
  }
};

export const mergeTwoSortedLists: Problem = {
  id: "merge-two-sorted-lists",
  title: "21. Merge Two Sorted Lists",
  problemStatement: `<p class='mt-3'>
    You are given the heads of two sorted linked lists <code>list1</code> and <code>list2</code>.
  </p>
  <p class='mt-3'>
    Merge the two lists in a one sorted list. The list should be made by splicing together the nodes of the first two lists.
  </p>
  <p class='mt-3'>
    Return the head of the merged linked list.
  </p>`,
  examples: [
    {
      id: 1,
      inputText: "list1 = [1,2,4], list2 = [1,3,4]",
      outputText: "[1,1,2,3,4,4]",
      explanation: "The merged list is [1, 1, 2, 3, 4, 4]."
    },
    {
      id: 2,
      inputText: "list1 = [], list2 = []",
      outputText: "[]",
      explanation: "Both lists are empty, so the merged list is also empty."
    },
    {
      id: 3,
      inputText: "list1 = [], list2 = [0]",
      outputText: "[0]",
      explanation: "The merged list is [0]."
    },
  ],
  constraints: `<li class='mt-2'>
    The number of nodes in both lists is in the range <code>[0, 50]</code>.
  </li>
  <li class='mt-2'>
    <code>-100 ≤ Node.val ≤ 100</code>
  </li>`,
  handlerFunction: handlerMergeTwoSortedLists,
  starterCode: starterCodeMergeTwoSortedLists,
  order: 5,
  starterFunctions: "function mergeTwoLists(",
};
