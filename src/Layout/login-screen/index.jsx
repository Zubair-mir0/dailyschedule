import React from "react";
import { Login } from "../../components";
export const Loginscreen = () => {
  return (
    <div className="flex flex-col w-full items-center justify-center h-[550px]  ">
      <div class="w-full max-w-sm p-4  bg-blue-200 border border-gray-200 rounded-lg shadow sm:p-6 md:p-8 dark:bg-gray-800 dark:border-gray-700 ">
        <Login />
      </div>
    </div>
  );
};


