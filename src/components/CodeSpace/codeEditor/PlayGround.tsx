import React from "react";
import Nav from "./Nav";
import CodeMirror from "@uiw/react-codemirror";
import { javascript } from "@codemirror/lang-javascript";
import { python } from "@codemirror/lang-python";
import { java } from "@codemirror/lang-java";
import { cpp } from "@codemirror/lang-cpp";
import { vscodeDark } from "@uiw/codemirror-theme-vscode";
import Split from "react-split";
import Footer from "./Footer";

type PlayGroundProps = {
  language: string;
  value: string;
  setLanguage: (lang: string) => void;
  onChange: (value: string) => void;
};

const PlayGround: React.FC<PlayGroundProps> = ({
  language,
  value,
  onChange,
  setLanguage,
}) => {
  const getLanguageExtension = () => {
    switch (language) {
      case "javascript":
        return javascript();
      case "python":
        return python();
      case "java":
        return java();
      case "cpp":
        return cpp();
      default:
        return cpp();
    }
  };

  return (
    <div>
      <Nav language={language} setLanguage={setLanguage} />
      <Split
        className="h-[calc(100vh-94px)]"
        direction="vertical"
        sizes={[60, 40]}
        minSize={60}
      >
        <div className="w-full overflow-auto">
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
        <div className=" p-2 w-full">
          <div className="flex h-10 space-x-6 items-center">
            <div className="relative flex    flex-col justify-center cursor-pointer">
              <div className="text-white   text-sm font-medium leading-5">
                Testcases
              </div>
              <hr className="absolute bottom-0 h-0.5   w-[70px]   rounded-full border-none bg-white" />
            </div>
          </div>
          <div className="flex ">
            <div className="mr-2 items-start mt-2  text-white">
              <div className="flex flex-wrap  items-center  gap-y-4 ">
                <div className="font-medium items-center transition-all focus:outline-none inline-flex bg-white/5  hover:bg-white/10  relative rounded-lg px-4  py-1   cursor-pointer  whitespace-nowrap backdrop-blur-md ">case 1</div>
              </div>
            </div>
            <div className="mr-2 items-start mt-2  text-white">
              <div className="flex flex-wrap  items-center  gap-y-4 ">
                <div className="font-medium items-center transition-all focus:outline-none inline-flex bg-white/5  hover:bg-white/10  relative rounded-lg px-4  py-1   cursor-pointer  whitespace-nowrap backdrop-blur-md ">case 2</div>
              </div>
            </div>
            <div className="mr-2 items-start mt-2  text-white">
              <div className="flex flex-wrap  items-center  gap-y-4 ">
                <div className="font-medium items-center transition-all focus:outline-none inline-flex bg-white/5  hover:bg-white/10  relative rounded-lg px-4  py-1   cursor-pointer  whitespace-nowrap backdrop-blur-md ">case 3</div>
              </div>
            </div>
          </div>
          <div className="font-semibold my-4">
            <p className="text-white text-base">Input:</p>
            <div className="font-medium items-center transition-all focus:outline-none  bg-white/5  hover:bg-white/10  relative rounded-lg px-4  py-1    whitespace-nowrap backdrop-blur-md p-2 ">nums:[2,7,5,,11,15], target=9</div>
            <p className="text-white text-base ">Output:</p>
            <div className="font-medium items-center transition-all focus:outline-none  bg-white/5  hover:bg-white/10  relative rounded-lg px-4  py-1    whitespace-nowrap backdrop-blur-md p-2">[0,1]</div>
          </div>
        

        </div>
      </Split>
     
    </div>
  );
};

export default PlayGround;
