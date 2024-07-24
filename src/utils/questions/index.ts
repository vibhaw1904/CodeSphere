import { Problem } from "../types/problem";
import { jumpGame } from "./jump-game";
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
    "valid-parentheses":validParentheses
}