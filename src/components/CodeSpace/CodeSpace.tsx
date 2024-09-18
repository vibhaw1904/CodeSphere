"use client"
import React, {  useState } from 'react';
import Split from 'react-split';
import ProblemDescription from './ProblemDescription';
import PlayGround from './codeEditor/PlayGround';
import { Problem } from '@/utils/types/problem';
type CodeSpaceProps = {
    problem:Problem
};

const CodeSpace:React.FC<CodeSpaceProps> = ({problem}) => {
    const[language,setLanguage]=useState<string>('javascript');
    const [solved,setSolved]=useState<boolean>(false);
   
   
    return <Split className='split'>
        <ProblemDescription problem={problem} _solved={solved}/>
       
        <PlayGround language={language} problem={problem} setLanguage={setLanguage} setSolved={setSolved}/>

    </Split>
}
export default CodeSpace;