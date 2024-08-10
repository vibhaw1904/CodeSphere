import { auth, firestore } from "@/firebase/firebase";
import { problems } from "@/Problems/problem";
import { DBProblem, Problem } from "@/utils/types/problem";
import { doc, getDoc,runTransaction } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { AiFillLike, AiOutlineLike } from "react-icons/ai";
import { BsCheck2Circle } from "react-icons/bs";
import { toast } from "react-toastify";

type ProblemDescriptionProps = {
  problem: Problem;
  _solved: boolean;
};

const ProblemDescription: React.FC<ProblemDescriptionProps> = ({
  problem,
  _solved,
}) => {
  //    const [likedProblem,setLikedProblem]=useState<boolean>(false);

  const { currentProblem, difficultyClass, loading,setCurrentProblem } = useGetProblem(
    problem.id
  );
  const { liked, solved,setData } = useUserSpecificData(problem.id);
  const [user] = useAuthState(auth);


  const [updating, setUpdating] = useState(false);

  const returnUserDataAndProblemData = async (transaction: any) => {
      const userRef = doc(firestore, "users", user!.uid);
      const problemRef = doc(firestore, "problems", problem.id);
      const userDoc = await transaction.get(userRef);
      const problemDoc = await transaction.get(problemRef);
      return { userDoc, problemDoc, userRef, problemRef };
  };

  const handleLike = async () => {
      if (!user) {
          toast.error("You must be logged in to like a problem", { position: "top-left", theme: "dark" });
          return;
      }
      if (updating) return;
      setUpdating(true);
      await runTransaction(firestore, async (transaction) => {
          const { problemDoc, userDoc, problemRef, userRef } = await returnUserDataAndProblemData(transaction);

          if (userDoc.exists() && problemDoc.exists()) {
              if (liked) {
                  // remove problem id from likedProblems on user document, decrement likes on problem document
                  transaction.update(userRef, {
                      likedProblem: userDoc.data().likedProblem.filter((id: string) => id !== problem.id),
                  });
                  transaction.update(problemRef, {
                      likes: problemDoc.data().likes - 1,
                  });

                  setCurrentProblem((prev) => (prev ? { ...prev, likes: prev.likes - 1 } : null));
                  setData((prev) => ({ ...prev, liked: false }));
              }  else {
                  transaction.update(userRef, {
                      likedProblem: [...userDoc.data().likedProblem, problem.id],
                  });
                  transaction.update(problemRef, {
                      likes: problemDoc.data().likes + 1,
                  });
                  setCurrentProblem((prev) => (prev ? { ...prev, likes: prev.likes + 1 } : null));
                  setData((prev) => ({ ...prev, liked: true }));
              }
          }
      });
      setUpdating(false);
  };


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
              <div className="flex-1 mr-2 text-lg text-white font-medium">
                {currentProblem?.title}
              </div>
            </div>
            <div className="flex items-center mt-3">
              <div
                className={`inline-block rounded-[21px] bg-opacity-[.15] px-2.5 py-1 text-xs font-medium capitalize ${difficultyClass}`}
              >
                {currentProblem?.difficulty}
              </div>
              {(solved || _solved) && (
                <div className="rounded p-[3px] ml-4 text-lg transition-colors duration-200 text-green-500">
                  <BsCheck2Circle />
                </div>
              )}
              <div className="flex items-center cursor-pointer hover:bg-dark-fill-3 space-x-1 rounded p-[3px] ml-4 text-lg transition-colors duration-200 text-dark-gray-6">
                {/* {liked && <AiFillLike className="text-blue-500" onClick={handleLikedProblem}  />} */}
                {liked ? (
          <AiFillLike className="text-blue-500" onClick={handleLike} />
        ) : (
          <AiOutlineLike onClick={handleLike} />
        )}                <span className="text-xs">{currentProblem?.likes}</span>
              </div>
            </div>

            <div className="text-white text-sm mt-4">
              <div
                dangerouslySetInnerHTML={{ __html: problem.problemStatement }}
              />
            </div>

            {/* Examples */}
            <div className="mt-4">
              {problem.examples.map((example, index) => (
                <div key={example.id}>
                  <p className="font-medium text-white">Example {index + 1}:</p>
                  {example.img && (
                    <>
                      <img src={example.img} alt="example" className="mt-2" />
                    </>
                  )}
                  <div className="example-card bg-dark-layer-3 p-3 rounded-md mt-2">
                    <pre>
                      <strong className="text-white">Input: </strong>
                      {example.inputText}
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
                <div
                  dangerouslySetInnerHTML={{ __html: problem.constraints }}
                />
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProblemDescription;

function useGetProblem(problemId: string) {
  const [currentProblem, setCurrentProblem] = useState<DBProblem | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [difficultyClass, setDifficultyClass] = useState<string>("");
  useEffect(() => {
    const getCurrentProb = async () => {
      setLoading(true);
      const docref = doc(firestore, "problems", problemId);
      const docSnap = await getDoc(docref);
      if (docSnap.exists()) {
        setLoading(false);
        const problem = docSnap.data();
        setCurrentProblem({ id: docSnap.id, ...problem } as DBProblem);

        setDifficultyClass(
          problem.difficulty === "Easy"
            ? "bg-olive text-olive"
            : problem.difficulty === "Medium"
            ? "bg-dark-yellow text-dark-yellow"
            : "bg-red-500 text-red-500"
        );
      }
    };

    getCurrentProb();
  }, [problemId]);
  return { loading, currentProblem, difficultyClass ,setCurrentProblem};
}

function useUserSpecificData(problemId: string) {
  const [data, setData] = useState({ liked: false, solved: false });
  const [user] = useAuthState(auth);

  useEffect(() => {
    const getUserData = async () => {
      if (!user) return;
      const docRef = doc(firestore, "users", user.uid);
      const userSnap = await getDoc(docRef);
      if (userSnap.exists()) {
        const data = userSnap.data();
        const { solvedProblems, likedProblem } = data;
        setData({
          solved: solvedProblems.includes(problemId),
          liked: likedProblem.includes(problemId),
        });
      }
    };
    getUserData();
    return () => setData({ liked: false, solved: false });
  }, [problemId, user]);

  

  return { ...data, setData };
}
