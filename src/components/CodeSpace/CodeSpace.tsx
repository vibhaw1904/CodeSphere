import React from 'react';
import Split from 'react-split';
import ProblemDescription from './ProblemDescription';
type CodeSpaceProps = {
    
};

const CodeSpace:React.FC<CodeSpaceProps> = () => {
    
    return <Split className='split'>
        <ProblemDescription/>
        <div>This is code area</div>
    </Split>
}
export default CodeSpace;