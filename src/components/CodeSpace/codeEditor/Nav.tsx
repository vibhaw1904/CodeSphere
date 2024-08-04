import React, { useState } from 'react';

type NavProps = {
    language: string;
    setLanguage: (lang: string) => void;
    onRun: () => void;
    onSubmit: () => void;
};

const Nav: React.FC<NavProps> = ({ language, setLanguage, onRun, onSubmit }) => {
    const handleLanguageChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setLanguage(e.target.value);
    };

    return (
        <div className="flex items-center justify-between bg-dark-layer-2 h-11 w-full">
            <div className="flex items-center text-white">
                <select
                    value={language}
                    onChange={handleLanguageChange}
                    className="flex cursor-pointer border-[1px] border-white/5 backdrop-blur-sm items-center rounded focus:outline-none bg-white/10 text-dark-label-2 hover:bg-dark-fill-2 px-2 py-1.5 font-medium ml-2 text-black"
                >
                    <option value="javascript">JavaScript</option>
                    <option value="python">Python</option>
                    <option value="java">Java</option>
                    <option value="cpp">C++</option>
                </select>
            </div>
            <div className='ml-auto flex items-center space-x-4'>
                <button
                    className='px-3 py-1.5 text-sm font-medium items-center whitespace-nowrap transition-all focus:outline-none inline-flex bg-white/5 hover:bg-white/10 backdrop-blur-md text-white/60 rounded-lg'
                    onClick={onRun}
                >
                    Run
                </button>
                <button
                    className='px-3 py-1.5 font-medium items-center transition-all focus:outline-none inline-flex text-sm text-white bg-green-600 hover:bg-green-700 backdrop-blur-md rounded-lg'
                    onClick={onSubmit}
                >
                    Submit
                </button>
            </div>
        </div>
    );
};

export default Nav;
