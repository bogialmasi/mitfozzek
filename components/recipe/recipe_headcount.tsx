import { useState } from "react";

export const MyHeadcountCounter: React.FC = () => {
    const [headcount, setHeadcount] = useState(1);
  
    const increment = () => setHeadcount((prev) => Math.min(15, prev + 1)); // Max headcount = 15
    const decrement = () => setHeadcount((prev) => Math.max(1, prev - 1)); // Min headcount = 1
  
  
    return (
      <div className="flex items-center justify-between w-32 h-10 border rounded-md">
        <button
          onClick={decrement}
          className="w-10 h-full text-lg font-bold hover:bg-gray-100 active:bg-gray-200 dark:hover:bg-gray-800 dark:active:bg-gray-700 flex items-center justify-center"
        >
          -
        </button>
        <div className="flex-1 text-center text-lg font-semibold">
          {headcount}
        </div>
        <button
          onClick={increment}
          className="w-10 h-full text-lg font-bold hover:bg-gray-100 active:bg-gray-200 dark:hover:bg-gray-800 dark:active:bg-gray-700 flex items-center justify-center"
        >
          +
        </button>
      </div>
    );
  };