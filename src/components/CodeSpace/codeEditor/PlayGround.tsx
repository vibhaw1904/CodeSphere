import React from 'react';
import Nav from './Nav';
import CodeMirror from '@uiw/react-codemirror';
import { javascript } from '@codemirror/lang-javascript';
import { python } from '@codemirror/lang-python';
import { java } from '@codemirror/lang-java';
import { cpp } from '@codemirror/lang-cpp';
import { vscodeDark } from '@uiw/codemirror-theme-vscode';
import Split from 'react-split';

type PlayGroundProps = {
  language: string;
  value: string;
  setLanguage: (lang: string) => void;
  onChange: (value: string) => void;
};

const PlayGround: React.FC<PlayGroundProps> = ({ language, value, onChange, setLanguage }) => {
  const getLanguageExtension = () => {
    switch (language) {
      case 'javascript':
        return javascript();
      case 'python':
        return python();
      case 'java':
        return java();
      case 'cpp':
        return cpp();
      default:
        return cpp();
    }
  };

  return (
    <div>
      <Nav language={language} setLanguage={setLanguage} />
      <Split className='h-[calc(100vh-94px)]' direction='vertical' sizes={[60, 40]} minSize={60}>
      <div className='w-full overflow-auto'>
          <CodeMirror
            value={value}
            extensions={[getLanguageExtension()]}
            onChange={(value) => onChange(value)}
            theme={vscodeDark}
            basicSetup={{
              lineNumbers: true,
              highlightActiveLine: true,
              highlightSelectionMatches: true,
              foldGutter: true,
              syntaxHighlighting: true,
              defaultKeymap: true,
            }}
          />
        </div>
        <div className='p-2 w-full'>
          <div className='text-white'>This is testcase</div>
          {/* Add more content for test cases as needed */}
        </div>
      </Split>
    </div>
  );
};

export default PlayGround;
