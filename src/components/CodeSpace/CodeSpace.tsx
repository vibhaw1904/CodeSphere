import React, { useState } from 'react';
import Split from 'react-split';
import ProblemDescription from './ProblemDescription';
import PlayGround from './codeEditor/PlayGround';
import { Problem } from '@/utils/types/problem';
type CodeSpaceProps = {
    problem:Problem
};

const CodeSpace:React.FC<CodeSpaceProps> = ({problem}) => {
    const[language,setLanguage]=useState<string>('cpp');
    const [code,setCode]=useState<string>('');
    
    return <Split className='split'>
        <ProblemDescription problem={problem}/>
        <PlayGround language={language} problem={problem} setLanguage={setLanguage} value={code} onChange={setCode}/>
    </Split>
}
export default CodeSpace;