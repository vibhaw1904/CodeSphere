import React, { useState } from 'react';
import Split from 'react-split';
import ProblemDescription from './ProblemDescription';
import PlayGround from './codeEditor/PlayGround';
type CodeSpaceProps = {
    
};

const CodeSpace:React.FC<CodeSpaceProps> = () => {
    const[language,setLanguage]=useState<string>('cpp');
    const [code,setCode]=useState<string>('');
    
    return <Split className='split'>
        <ProblemDescription/>
        <PlayGround language={language} setLanguage={setLanguage} value={code} onChange={setCode}/>
    </Split>
}
export default CodeSpace;