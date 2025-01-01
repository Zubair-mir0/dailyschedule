import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { auth, db } from "../../config/firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { setDoc, doc } from "firebase/firestore";


export const Sumbit = () => {
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  const navigate = useNavigate();

  const signup = async () => {
    try {
          
                   
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        pass
      );
      const uid = userCredential.user.uid;

      // Save user data to Firestore
      await setDoc(doc(db, "users", uid), {
        email: email,
        password:pass,
        createdAt: new Date().toISOString(),
      });

      console.log("User created and data stored in Firestore");
      navigate("/login");
    } catch (error) {
      console.error("Error signing up:", error);
      alert("Signup failed. Please try again.");
    }
  };

  const Back = () => {
    navigate("login");
  };
  return (

    <form className="max-w-sm mx-auto flex flex-col w-[800px] h-[400px] p-6 items-center bg-blue-200 rounded-lg space-y-2">
      <h1 className="font-semibold text-2xl text-">DAILY SCHEDULE</h1>
   <div className="border">
      <div className="mb-5">
        <label className="block mb-2 text-sm font-medium text-gray-900">
          Your email
        </label>
        <input
          onChange={(e) => setEmail(e.target.value)}
          type="email"
          id="email"
          className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg p-2.5 w-full"
          required
        />
      </div>
      <div className="mb-5">
        <label className="block mb-2 text-sm font-medium text-gray-900">
          Your password
        </label>
        <input
          onChange={(e) => setPass(e.target.value)}
          type="password"
          id="password"
          className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg p-2.5 w-full"
          required
        />
      </div>
      </div>
      <div className="flex flex-col h-28 justify-between ">
  

      <button
        type="button"
        onClick={signup}
        className="text-white bg-blue-700 hover:bg-blue-800 w-full p-2.5 rounded-lg"
      >
        Register new account
      </button>
      <button
        type="button"
        onClick={Back}
        className="text-white bg-blue-700 hover:bg-blue-800 w-full p-2.5 rounded-lg"
        >
        Already have an account?
      </button>
        </div>
    </form>
  );
};
