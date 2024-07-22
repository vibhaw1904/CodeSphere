import assert from "assert";
import { Problem } from "../types/problem";
import  example from './images/reverseLL.jpg'

interface ListNode {
  val: number;
  next: ListNode | null;
}

const reverseList = (head: ListNode | null): ListNode | null => {
  let prev: ListNode | null = null;
  let curr: ListNode | null = head;
  while (curr) {
    const nextTemp: ListNode | null = curr.next;
    curr.next = prev;
    prev = curr;
    curr = nextTemp;
  }
  return prev;
};

const handlerReverseList = (fn: (head: ListNode | null) => ListNode | null) => {
  try {
    const lists = [
      { head: [1, 2, 3, 4, 5] },
      { head: [1, 2] },
      { head: [] },
    ];
    const answers = [
      [5, 4, 3, 2, 1],
      [2, 1],
      [],
    ];

    for (let i = 0; i < lists.length; i++) {
      const listNodes = createLinkedList(lists[i].head);
      const result = fn(listNodes);
      const resultArray = linkedListToArray(result);
      assert.deepStrictEqual(resultArray, answers[i]);
    }
    return true;
  } catch (error: any) {
    console.log("reverseList handler function error");
    throw new Error(error);
  }
};

const createLinkedList = (arr: number[]): ListNode | null => {
  if (arr.length === 0) return null;
  const head: ListNode = { val: arr[0], next: null };
  let current = head;
  for (let i = 1; i < arr.length; i++) {
    current.next = { val: arr[i], next: null };
    current = current.next;
  }
  return head;
};

const linkedListToArray = (head: ListNode | null): number[] => {
  const arr: number[] = [];
  let current = head;
  while (current) {
    arr.push(current.val);
    current = current.next;
  }
  return arr;
};

const starterCodeReverseList = `function reverseList(head: ListNode | null): ListNode | null {
// write your code here
}`;

export const reverseLinkedList: Problem = {
  id: "reverse-linked-list",
  title: "Reverse Linked List",
  problemStatement: `<p class='mt-3'>
    Given the <code>head</code> of a singly linked list, reverse the list, and return the reversed list.
  </p>`,
  examples: [
    {
      id: 1,
      inputText: "head = [1,2,3,4,5]",
      outputText: "[5,4,3,2,1]",
      img: example.src,
    },
    {
      id: 2,
      inputText: "head = [1,2]",
      outputText: "[2,1]",
    },
    {
      id: 3,
      inputText: "head = []",
      outputText: "[]",
    },
  ],
  constraints: `<li class='mt-2'>
    The number of nodes in the list is the range <code>[0, 5000]</code>.
  </li> <li class='mt-2'>
    <code>-5000 ≤ Node.val ≤ 5000</code>
  </li>`,
  handlerFunction: handlerReverseList,
  starterCode: starterCodeReverseList,
  order: 2,
  starterFunctions:"function reverseLinkedList("
};
