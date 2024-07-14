import React from 'react';
import { AiFillDislike, AiFillLike } from 'react-icons/ai';
import { BsCheck2Circle } from 'react-icons/bs';

type ProblemDescriptionProps = {};

const ProblemDescription: React.FC<ProblemDescriptionProps> = () => {
    const problemStatement = `
        <p class="text-white">Given an array of integers <code>nums</code> and an integer <code>target</code>, return indices of the two numbers such that they add up to <code>target</code>.</p>
        <p class="text-white">You may assume that each input would have exactly one solution, and you may not use the same element twice.</p>
        <p class="text-white">You can return the answer in any order.</p>
    `;

    const examples = [
        {
            id: 1,
            inputText: 'nums = [2, 7, 11, 15], target = 9',
            outputText: '[0, 1]',
            explanation: 'Because nums[0] + nums[1] == 9, we return [0, 1].',
        },
        {
            id: 2,
            inputText: 'nums = [3, 2, 4], target = 6',
            outputText: '[1, 2]',
            explanation: 'Because nums[1] + nums[2] == 6, we return [1, 2].',
        },
    ];

    const constraints = `
        <li><code>2 <= nums.length <= 10^4</code></li>
        <li><code>-10^9 <= nums[i] <= 10^9</code></li>
        <li><code>-10^9 <= target <= 10^9</code></li>
        <li>Only one valid answer exists.</li>
    `;

    return (
        <div className="bg-dark-layer-1">
            {/* TAB */}
            <div className="flex h-11 w-full items-center pt-2 bg-dark-layer-2 text-white overflow-x-hidden">
                <div className="bg-dark-layer-1 rounded-t-[5px] px-5 py-[10px] text-xs cursor-pointer">
                    Description
                </div>
            </div>

            <div className="flex px-0 py-4 h-[calc(100vh-94px)] overflow-y-auto">
                <div className="px-5">
                    <div className="w-full">
                        <div className="flex space-x-4">
                            <div className="flex-1 mr-2 text-lg text-white font-medium">Two Sum</div>
                        </div>
                        <div className="flex items-center mt-3">
                            <div className="inline-block rounded-[21px] bg-opacity-[.15] px-2.5 py-1 text-xs font-medium capitalize">
                                easy
                            </div>
                            <div className="flex items-center cursor-pointer hover:bg-dark-fill-3 space-x-1 rounded p-[3px] ml-4 text-lg transition-colors duration-200 text-dark-gray-6">
                                <AiFillLike className="text-dark-blue-s" />
                                <span className="text-xs">3</span>
                            </div>
                            <div className="flex items-center cursor-pointer hover:bg-dark-fill-3 space-x-1 rounded p-[3px] ml-4 text-lg transition-colors duration-200 text-dark-gray-6">
                                <AiFillDislike className="text-dark-blue-s" />
                                <span className="text-xs">3</span>
                            </div>
                        </div>

                        <div className="text-white text-sm mt-4">
                            <div dangerouslySetInnerHTML={{ __html: problemStatement }} />
                        </div>

                        {/* Examples */}
                        <div className="mt-4">
                            {examples.map((example, index) => (
                                <div key={example.id}>
                                    <p className="font-medium text-white">Example {index + 1}:</p>
                                    <div className="example-card bg-dark-layer-3 p-3 rounded-md mt-2">
                                        <pre>
                                            <strong className="text-white">Input: </strong>{example.inputText}
                                            <br />
                                            <strong>Output:</strong> {example.outputText} <br />
                                            {example.explanation && (
                                                <>
                                                    <strong>Explanation:</strong> {example.explanation}
                                                </>
                                            )}
                                        </pre>
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* Constraints */}
                        <div className="my-8 pb-4">
                            <div className="text-white text-sm font-medium">Constraints:</div>
                            <ul className="text-white ml-5 list-disc">
                                <div dangerouslySetInnerHTML={{ __html: constraints }} />
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProblemDescription;