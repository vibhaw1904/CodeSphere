'use client';

import React, { useEffect, useState } from "react";
import Nav from "./Nav";
import CodeMirror from "@uiw/react-codemirror";
import { javascript } from "@codemirror/lang-javascript";
import { python } from "@codemirror/lang-python";
import { java } from "@codemirror/lang-java";
import { cpp } from "@codemirror/lang-cpp";
import { vscodeDark, vscodeDarkStyle } from "@uiw/codemirror-theme-vscode";
import Split from "react-split";
import { Problem } from "@/utils/types/problem";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth, firestore } from "@/firebase/firebase";
import { toast } from "react-toastify";
import { useSearchParams } from "next/navigation";
import { questions } from "@/utils/questions";
import  assert  from "assert";
import { arrayUnion, doc, getDoc, increment, updateDoc } from "firebase/firestore";
import { DiVim } from "react-icons/di";
import { AiFillTrophy, AiOutlineCheck } from "react-icons/ai";
import { Bs0Circle, BsDot } from "react-icons/bs";
import { motion } from "framer-motion";
type PlayGroundProps = {
  language: string;
  problem: Problem;
  setLanguage: (lang: string) => void;
  setSolved: React.Dispatch<React.SetStateAction<boolean>>

};

const PlayGround: React.FC<PlayGroundProps> = ({
  language,
  problem,
  setLanguage,
  setSolved
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
        return javascript();
    }
  };

  const [code, setCode] = useState<string>(problem.starterCode);
  const [activeIndex, setActiveIndex] = useState<number>(0);
  const [testPass,setTestPass]=useState<boolean>(false);
  const[accepted,setAccepted]=useState<boolean>(false);
  const[points,setPoints]=useState(0);
  const[showReward,setShowReward]=useState<boolean>(false);
  const [user] = useAuthState(auth);
  const searchParams = useSearchParams();
  const id = searchParams.get("id");

useEffect(()=>{
const code=localStorage.getItem(`code-${id}`);
if(user){
  setCode(code?JSON.parse(code):problem.starterCode)
}
else{
  setCode(problem.starterCode)
}
},[id,user,problem.starterCode])

  const onChange = (value: string) => {
   
    
    setCode(value);
    localStorage.setItem(`code-${id}`,JSON.stringify(value))
  };

  const handleRun = async () => {
    if (!user) {
      toast.error("Login first to run your code", {
        position: "top-right",
        autoClose: 3000,
        theme: "dark",
      });
      return;
    }

    try {
      const functionBody = code.slice(code.indexOf(problem.starterFunctions));

      const cb = new Function(`return ${functionBody}`)();
      console.log(typeof (cb));
      
      const question = questions[id as string];
      console.log(question);
      
      // if (!question || typeof question.handlerFunction !== "function" ) {
      //   throw new Error("Handler function not found or is not a function.");
      // }
      
      
      const handler = new Function(` return ${question.handlerFunction}`)();
     
      console.log(typeof handler);
      
      const result = handler(cb,assert);
      console.log("Handler result:", result);

      if (result) {
        toast.success("All test cases passed!", {
          position: "top-right",
          autoClose: 3000,
          theme: "dark",
        });
        setTestPass(true);
      } else {
        toast.error("Test cases failed.", {
          position: "top-right",
          autoClose: 3000,
          theme: "dark",
        });
      }
    } catch (error: any) {
      console.log(error);
      toast.error(`Error: ${error.message}`, {
        position: "top-right",
        autoClose: 3000,
        theme: "dark",
      });
    }
  };

  const handleSubmit = async () => {
    if (!user) {
      toast.error("Login first to submit your code", {
        position: "top-right",
        autoClose: 3000,
        theme: "dark",
      });
      return;
    }
  
    try {
      const functionBody = code.slice(code.indexOf(problem.starterFunctions));
      const cb = new Function(`return ${functionBody}`)();
  
      const question = questions[id as string];
      const handler = new Function(`return ${question.handlerFunction}`)();
  
      const result = handler(cb, assert);
  
      if (result) {
        const userRef = doc(firestore, "users", user.uid);
        const userDoc = await getDoc(userRef);
        const userData = userDoc.data();
  
        if (!userData) {
          console.error("User data not found");
          toast.error("Error: User data not found", {
            position: "top-right",
            autoClose: 3000,
            theme: "dark",
          });
          return;
        }
  
        const solvedProblems = userData.solvedProblems || [];
        const currentPoints = userData.points || 0;
  
        if (!solvedProblems.includes(id)) {
          await updateDoc(userRef, {
            solvedProblems: arrayUnion(id),
            points: increment(5)
          });
          setShowReward(true);
          setPoints(currentPoints + 5);
  
          setTimeout(() => setShowReward(false), 3000);
  
          toast.success("Congratulations! You earned 5 points!", {
            position: "top-center",
            autoClose: 3000,
            theme: "dark",
          });
        } else {
          toast.info("You've already solved this problem. No additional points awarded.", {
            position: "top-center",
            autoClose: 3000,
            theme: "dark",
          });
        }
  
        setSolved(true);
        setAccepted(true);
      } else {
        toast.error("Test cases failed.", {
          position: "top-right",
          autoClose: 3000,
          theme: "dark",
        });
      }
    } catch (error: any) {
      console.error("Error during submission:", error);
      toast.error(`Error: ${error.message}`, {
        position: "top-right",
        autoClose: 3000,
        theme: "dark",
      });
    }
  };
  

  return (
    <div>
      <Nav language={language} setLanguage={setLanguage} onSubmit={handleSubmit} onRun={handleRun} />
      <Split
        className="h-[calc(100vh-94px)]"
        direction="vertical"
        sizes={[60, 40]}
        minSize={60}
      >
        <div className="w-full overflow-auto">
          <CodeMirror
            value={code}
            extensions={[javascript()]}
            onChange={onChange}
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
        <div className="p-2 w-full h-[calc(100vh-94px)] overflow-y-auto">
          <div className="flex h-10 space-x-6 items-center">
            <div className="relative flex flex-col justify-center cursor-pointer">
              <div className="text-white text-sm font-medium leading-5">
                Testcases
              </div>
              <hr className="absolute bottom-0 h-0.5 w-[70px] rounded-full border-none bg-white" />
            </div>
            {accepted && (
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="text-green-500 font-medium flex items-center"
              >
                <AiOutlineCheck className="mr-2" /> Accepted
              </motion.div>
            )}
          </div>
          <div className="flex">
            {problem.examples.map((example, index) => (
              <div
                className="mr-2 items-start mt-2 text-white"
                key={example.id}
                onClick={() => setActiveIndex(index)}
              >
                  <div className="flex flex-wrap items-center gap-y-4">
                 {testPass ?( <div
                    className={`font-medium items-center transition-all focus:outline-none inline-flex bg-white/5 hover:bg-white/10 relative rounded-lg px-4 py-1 cursor-pointer whitespace-nowrap backdrop-blur-md  ${
                      activeIndex === index ? "text-green-500" : "text-green-500"
                    }`}
                  >
                    <AiOutlineCheck /><BsDot/>
                  </div>): <div
                    className={`font-medium items-center transition-all focus:outline-none inline-flex bg-white/5 hover:bg-white/10 relative rounded-lg px-4 py-1 cursor-pointer whitespace-nowrap backdrop-blur-md  ${
                      activeIndex === index ? "text-white" : "text-gray-500"
                    }`}
                  >
                    case {index+1}
                  </div>}
                </div>
             
              </div>
            ))}
          </div>
          <div className="font-semibold my-4">
            <p className="text-white text-base">Input:</p>
            <div className="font-medium items-center transition-all focus:outline-none bg-white/5 hover:bg-white/10 relative rounded-lg px-4 py-1 whitespace-nowrap backdrop-blur-md p-2">
              {problem.examples[activeIndex].inputText}
            </div>
            <p className="text-white text-base">Output:</p>
            <div className="font-medium items-center transition-all focus:outline-none bg-white/5 hover:bg-white/10 relative rounded-lg px-4 py-1 whitespace-nowrap backdrop-blur-md p-2">
              {problem.examples[activeIndex].outputText}
            </div>
          </div>
        </div>
      </Split>
      {showReward && (
        <motion.div 
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-green-500 text-white p-6 rounded-lg shadow-lg text-center"
        >
          <AiFillTrophy className="text-6xl mx-auto mb-4 text-yellow-300" />
          <h2 className="text-2xl font-bold mb-2">Congratulations!</h2>
          <p className="text-lg">You earned 5 points!</p>
          <p className="text-sm mt-2">Total Points: {points}</p>
        </motion.div>
      )}
    </div>
  );
};

export default PlayGround;
