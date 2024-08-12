import assert from "assert";
import { Problem } from "../types/problem";

const starterCodeContainerWithMostWater = `function maxArea(height){
  // Write your code here
};`;

// checks if the user has the correct code
const handlerContainerWithMostWater = (fn: any, assert: any) => {
  // fn is the callback that user's code is passed into
  try {
    const heights = [
      [1,8,6,2,5,4,8,3,7],
      [1,1],
      [4,3,2,1,4],
      [1,2,1]
    ];

    const answers = [
      49,
      1,
      16,
      2
    ];

    // loop all tests to check if the user's code is correct
    for (let i = 0; i < heights.length; i++) {
      // result is the output of the user's function and answer is the expected output
      const result = fn(heights[i]);
      assert.deepStrictEqual(result, answers[i]);
    }
    return true;
  } catch (error: any) {
    console.log("Container With Most Water handler function error");
    throw new Error(error);
  }
};

export const containerWithMostWater: Problem = {
  id: "container-with-most-water",
  title: "11. Container With Most Water",
  problemStatement: `<p class='mt-3'>
    You are given an integer array <code>height</code> of length <code>n</code>. There are <code>n</code> vertical lines drawn such that the two endpoints of the <code>i<sup>th</sup></code> line are <code>(i, 0)</code> and <code>(i, height[i])</code>.
  </p>
  <p class='mt-3'>
    Find two lines that together with the x-axis form a container, such that the container contains the most water.
  </p>
  <p class='mt-3'>
    Return <em>the maximum amount of water a container can store</em>.
  </p>
  <p class='mt-3'>
    Notice that you may not slant the container.
  </p>`,
  examples: [
    {
      id: 1,
      inputText: "height = [1,8,6,2,5,4,8,3,7]",
      outputText: "49",
      explanation: "The container formed by lines 1 and 8 can store the most water, which is 49 units."
    },
    {
      id: 2,
      inputText: "height = [1,1]",
      outputText: "1",
      explanation: "The container formed by lines 1 and 1 can store 1 unit of water."
    },
    {
      id: 3,
      inputText: "height = [4,3,2,1,4]",
      outputText: "16",
      explanation: "The container formed by lines 4 and 4 can store 16 units of water."
    },
    {
      id: 4,
      inputText: "height = [1,2,1]",
      outputText: "2",
      explanation: "The container formed by lines 1 and 2 can store 2 units of water."
    },
  ],
  constraints: `<li class='mt-2'>
    <code>n = height.length</code> is at least <code>2</code> and at most <code>10<sup>5</sup></code>.
  </li> 
  <li class='mt-2'>
    <code>0 ≤ height[i] ≤ 10<sup>4</sup></code>
  </li>`,
  handlerFunction: handlerContainerWithMostWater,
  starterCode: starterCodeContainerWithMostWater,
  order: 6,
  starterFunctions: "function maxArea(",
};
