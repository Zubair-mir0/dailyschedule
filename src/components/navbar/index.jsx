import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export const Navbar = () => {
  const navigate = useNavigate();
  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false); // State to show/hide logout confirmation

  const Logout = () => {
    // Clear localStorage and navigate to login
    localStorage.clear(); 
    console.log("Local storage has been cleared");
    navigate("/login");
  };

  const confirmLogout = () => {
    setShowLogoutConfirm(true); // Show confirmation panel
  };

  const cancelLogout = () => {
    setShowLogoutConfirm(false); // Hide confirmation panel
  };

  return (
    <div>
      {/* Navbar */}
      <nav className="bg-white border-gray-200 dark:bg-gray-900 border py-2">
       
        <div className="flex flex-wrap justify-between items-center mx-auto max-w-screen-xl p-4">
          
          <a href="/" className="flex items-center space-x-3 rtl:space-x-reverse">
            <img
              src="https://s3.amazonaws.com/cdn.designcrowd.com/blog/100-Famous-Brand%20Logos-From-The-Most-Valuable-Companies-of-2020/rolex.png"
              className="h-8"
              alt="Rolex Logo"
            />
            <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">
              REMIND
            </span>
          </a>
          <ul className="flex gap-3 ">
          <li className="cursor-pointer p-2 shadow-[inset_0_-25px_18px_-14px_rgba(44,187,99,0.2),_0_1px_8px_16px_rgba(44,187,99,0.15),_0_16px_32px_rgba(44,187,99,0.15)] text-center px-5 py-2 font-sans transition-all duration-250 hover:shadow-[inset_0_-25px_18px_-14px_rgba(44,187,99,0.35),_0_1px_2px_rgba(44,187,99,0.25),_0_2px_4px_rgba(44,187,99,0.25),_0_4px_8px_rgba(44,187,99,0.25),_0_8px_16px_rgba(44,187,99,0.25),_0_16px_32px_rgba(44,187,99,0.25)]  bg-green-100 rounded-full" onClick={()=> navigate('/Landing')}>
            Add Task
          </li>
          <li className="cursor-pointer p-2 shadow-[inset_0_-25px_18px_-14px_rgba(44,187,99,0.2),_0_1px_8px_16px_rgba(44,187,99,0.15),_0_16px_32px_rgba(44,187,99,0.15)] text-center px-5 py-2 font-sans transition-all duration-250 hover:shadow-[inset_0_-25px_18px_-14px_rgba(44,187,99,0.35),_0_1px_2px_rgba(44,187,99,0.25),_0_2px_4px_rgba(44,187,99,0.25),_0_4px_8px_rgba(44,187,99,0.25),_0_8px_16px_rgba(44,187,99,0.25),_0_16px_32px_rgba(44,187,99,0.25)]  bg-green-100 rounded-full" onClick={()=> navigate('/view')}>
            View Task
          </li>
        </ul>
          <div className="flex items-center space-x-6 rtl:space-x-reverse">
            <a href="mailto:zubairmir705@gmail.com" className="text-sm text-gray-500 dark:text-white hover:underline">
              zubairmir705@gmail.com
            </a>
            <button
              onClick={confirmLogout} // Trigger logout confirmation
              className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-700"
            >
              Logout
            </button>
          </div>
        </div>
      </nav>

      {showLogoutConfirm && (
        <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded shadow-lg text-center">
            <h3 className="text-lg font-semibold mb-4">Are you sure you want to logout?</h3>
            <div className="flex justify-center gap-4">
              <button
                onClick={Logout}
                className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-700"
              >
                Yes
              </button>
              <button
                onClick={cancelLogout}
                className="bg-gray-400 text-white px-4 py-2 rounded hover:bg-gray-600"
              >
                No
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
