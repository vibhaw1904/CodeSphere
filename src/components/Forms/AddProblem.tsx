"use client";

import { ChangeEvent, useState } from "react";
import { setDoc, doc } from "firebase/firestore";
import { firestore } from "@/firebase/firebase";

type AddProblemProps = {};

const AddProblem: React.FC<AddProblemProps> = () => {
  const [inputs, setInputs] = useState({
    id: "",
    title: "",
    difficulty: "",
    category: "",
    likes: 0,
    dislikes: 0,
    order: 0,
    link: ""
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputs({
      ...inputs,
      [e.target.name]: e.target.value
    });
  };

  const submitHandler = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const newProblem = {
      ...inputs,
      order: Number(inputs.order)
    };
    await setDoc(doc(firestore, "problems", inputs.id), newProblem);
    alert("Saved to DB");
  };

  return (
    <div className="max-w-md mx-auto mt-10 ">
      <form onSubmit={submitHandler} >
        <h2 className="text-2xl font-bold mb-4">Add Problem</h2>
        <div className="space-y-4">
          <input
            onChange={handleChange}
            type="text"
            placeholder="ID"
            name="id"
            className="w-full p-2 border border-gray-300 bg-white/20 rounded-md"
          />
          <input
            onChange={handleChange}
            type="text"
            placeholder="Title"
            name="title"
            className="w-full p-2 border border-gray-300 bg-white/20 rounded-md"
          />
          <input
            onChange={handleChange}
            type="text"
            placeholder="Difficulty"
            name="difficulty"
            className="w-full p-2 border border-gray-300 bg-white/20 rounded-md"
          />
          <input
            onChange={handleChange}
            type="text"
            placeholder="Category"
            name="category"
            className="w-full p-2 border border-gray-300 bg-white/20 rounded-md"
          />
          <input
            onChange={handleChange}
            type="number"
            placeholder="Likes"
            name="likes"
            className="w-full p-2 border border-gray-300 bg-white/20 rounded-md"
          />
          <input
            onChange={handleChange}
            type="number"
            placeholder="Dislikes"
            name="dislikes"
            className="w-full p-2 border border-gray-300 bg-white/20 rounded-md"
          />
          <input
            onChange={handleChange}
            type="number"
            placeholder="Order"
            name="order"
            className="w-full p-2 border border-gray-300 bg-white/20 rounded-md"
          />
          <input
            onChange={handleChange}
            type="text"
            placeholder="Link"
            name="link"
            className="w-full p-2 border border-gray-300 bg-white/20 rounded-md"
          />
        </div>
        <button
          type="submit"
          className="mt-6 w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition duration-300"
        >
          Add to DB
        </button>
      </form>
    </div>
  );
};

export default AddProblem;
