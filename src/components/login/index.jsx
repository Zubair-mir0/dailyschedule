import React, { useState, useEffect } from "react";
import { useNavigate, Link, Await } from "react-router-dom";
import { auth } from "../../config/firebase";

import { signInWithEmailAndPassword ,signInWithPopup } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import { db, provider } from "../../config/firebase";

export const Login = () => {
  
    
  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const loginUser = await signInWithEmailAndPassword(auth, email, pass);
      const uid = loginUser.user.uid;
      const actoken =loginUser.user.accessToken;

      // console.log("actoken", actoken);
      // console.log("user uid", uid);
      // console.log(loginUser);
      // const id = localStorage.getItem("id")

const userDoc= await getDoc(doc(db, "users", uid));
if(userDoc.exists()){
  const userData= userDoc.data();
  // console.log("fetched users data",userData);

  localStorage.setItem("user", JSON.stringify({...userData,uid,actoken}))
   
  navigate("/Landing");

}
else{

  console.log("error user not found")
}
 } catch (err) {
      console.log(err);
      alert("invalid email please try again.");
      navigate("/login");
    }
  };
  

  const handleonchange = (e) => {
    setemail(e.target.value);
  };
  const passchange = (e) => {
    setpass(e.target.value);
  };
  
  const Googleauth=async()=>{
    const result = await signInWithPopup(auth, provider);
              const user = result.user;

              console.log("uid",user.uid) 
              localStorage.setItem("user",JSON.stringify({email: user.email,uid: user.uid}))
              navigate("/landing")
  }

  

  
  const [email, setemail] = useState("");
  
  const [pass, setpass] = useState("");
  
  const navigate = useNavigate();
  
  const Signup=()=>{
    navigate("/")
  }
  
  return (
    <form className="space-y-6" action="#">
      <h5 className="text-xl font-medium text-gray-900 dark:text-white">
        Sign in to our platform
      </h5>
      <div>
        <label
          for="email"
          className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
        >
          Your email
        </label>
        <input
          type="email"
          name="email"
          id="email"
          onChange={handleonchange}
          value={email}
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
          placeholder="name@company.com"
        />
      </div>
      <div>
        <label
          for="password"
          className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
        >
          Your password
        </label>
        <input
          type="password"
          name="password"
          id="password"
          onChange={passchange}
          value={pass}
          placeholder="••••••••"
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
        />
      </div>
      <div className="flex items-start">
        <div className="flex items-start">
          <div className="flex items-center h-5">
            <input
              id="remember"
              type="checkbox"
              value=""
              className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-blue-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800"
            />
          </div>
          <label
            for="remember"
            className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300"
          >
            Remember me
          </label>
        </div>
        <a
          href="#"
          className="ms-auto text-sm text-blue-700 hover:underline dark:text-blue-500"
        >
          Lost Password?
        </a>
      </div>
      <button
        // onClick={saveInfo}
        onClick={handleLogin}
        type="submit"
        className="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
      >
        Login to your account
      </button>
      <div className="flex justify-center text- ">
      <button onClick={Googleauth}>Googleauth</button>

      </div>
      <div className="text-sm flex hover:cursor-pointer justify-center font-medium text-gray-500 dark:text-gray-300">
      <button onClick={Signup}>
         Don't have an account?
        </button>
      </div>
    </form>
  );
};
