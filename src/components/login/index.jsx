import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { auth } from "../../config/firebase";

import { signInWithEmailAndPassword } from "firebase/auth";

export const Login = () => {
  // useEffect(() => {
  //   let userValues = localStorage.getItem("UID");

  //   console.log(JSON.parse(userValues));
  //   setemail(JSON.parse(userValues).email);
  //   setpass(JSON.parse(userValues).pass);
  // }, []);
    
  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const loginUser = await signInWithEmailAndPassword(auth, email, pass);
      const uid = loginUser.user.uid;
      const actoken = loginUser.user.accessToken;
      const num = email;

      console.log("actoken", actoken);
      console.log("user uid", uid);
      console.log(loginUser);
      // const id = localStorage.getItem("id")
      localStorage.setItem("uid", uid);
      localStorage.setItem("email", num);
      localStorage.setItem("pass", pass);
      navigate("/Landing");
    } catch (err) {
      console.log(err);
      alert("invalid email please try again.");
      navigate("/login");
    }
  };
  useEffect(() => {
    const uid = localStorage.getItem("uid");
    if (!uid) {
      navigate("/login");
    } else {
      navigate("/Landing");
    }
  }, []);

  const handleonchange = (e) => {
    setemail(e.target.value);
  };
  const passchange = (e) => {
    setpass(e.target.value);
  };
  

  useEffect(() => {
    let storedUser = localStorage.getItem("user");
    if (storedUser) {
      const { email, pass } = JSON.parse(storedUser);
      setemail(email);
      setpass(pass);
    }
  }, []);

  const saveInfo = () => {
    const user = { email, pass };
    localStorage.setItem("user", JSON.stringify(user));
  };

  const [email, setemail] = useState("");

  const [pass, setpass] = useState("");

  const navigate = useNavigate();

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
      <div className="text-sm font-medium text-gray-500 dark:text-gray-300"></div>
    </form>
  );
};