import { Problem } from "../types/problem";
import { bestTimeToBuySellStock } from "./Best-time-to-buy-and-sell-stock";
import { binaryTreeInorderTraversal } from "./Binary-tree-inorder-traversal";
import { climbingStairs } from "./Climbing-stairs";
import { containerWithMostWater } from "./container-with-most-water";
import { implementQueueUsingStacks } from "./implement-queue-using-stack";
import { jumpGame } from "./jump-game";
import { longestCommonPrefix } from "./Longest-common-prefix";
import { maxDepthBinaryTree } from "./max-depth-of-binary-tree";
import { mergeTwoSortedLists } from "./merge-two-sorted-list";
import { palindromeLinkedList } from "./Palindrome-Linked-list";
import { palindromeNumber } from "./palindrome-number";
import { reverseLinkedList } from "./reverse-linked-list";
import { search2DMatrix } from "./search-a-2d-matrix";
import { twoSum } from "./two-sum";
import { validParentheses } from "./valid-parenthesis";


interface questionMap{
    [key:string]:Problem
}

export const questions:questionMap     ={
    "two-sum":twoSum,
    "reverse-linked-list":reverseLinkedList,
    "jump-game":jumpGame,
    "search-a-2d-matrix":search2DMatrix,
    "valid-parentheses":validParentheses,
    "container-with-most-water":containerWithMostWater,
    "maximum-depth-of-binary-tree":maxDepthBinaryTree,
    "merge-two-sorted-lists":mergeTwoSortedLists,
    "palindrome-number":palindromeNumber,
    "best-time-to-buy-sell-stock":bestTimeToBuySellStock,
    "binary-tree-inorder-traversal":binaryTreeInorderTraversal,
    "climbing-stairs":climbingStairs,
    "implement-queue-using-stacks":implementQueueUsingStacks,
    "longest-common-prefix":longestCommonPrefix,
    "palindrome-linked-list":palindromeLinkedList
}