import React, { useState } from "react";
const Sidebar = ({ onAddTask, onViewTask }) => {
  return (
    <div className="flex items-center w-36 box-border bg-sky-500 rounded-lg justify-center  mx-4">
      <div className="flex  flex-col w-32 h-72 justify-around">
        <button
          className="p-5  font-extrabold bg-slate-500"
          onClick={onViewTask}
        >
          View Task
        </button>
        <button
          className="p-5  font-extrabold bg-slate-500"
          onClick={onAddTask}
        >
          Add Task
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
