import React from "react";

export default function IngredientSearch() {
  return (
    <div className="w-full lg:w-7/12">
      <label className="input duration-300 flex items-center gap-2 px-8 rounded-xl">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 16 16"
          fill="currentColor"
          className="h-8 w-8 opacity-70 text-warning"
        >
          <path
            fillRule="evenodd"
            d="M9.965 11.026a5 5 0 1 1 1.06-1.06l2.755 2.754a.75.75 0 1 1-1.06 1.06l-2.755-2.754ZM10.5 7a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0Z"
            clipRule="evenodd"
          />
        </svg>
        <input
          type="text"
          className="grow"
          placeholder="Search ingredients to make a salad..."
        />
      </label>
    </div>
  );
}
