"use client";

import React from "react";

//! Components
import RecipeCard from "./components/RecipeCard";
import DeleteRecipe from "./components/DeleteRecipe";
import EditRecipe from "./edit-recipe/page";

function page() {
  return (
    <>
      <div className="grid grid-cols-1 gap-8 px-10 mt-16 w-full">
        <h1 className="text-4xl font-bold">Recipe</h1>
        <div className="h-[80vh] bg-base-100 rounded-3xl p-6 overflow-y-scroll">
          <p className="text-2xl font-bold my-4">Your Recipe</p>
          <div className="grid grid-cols-2 md:grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-6">
            <RecipeCard />
            <RecipeCard />
            <RecipeCard />
            <RecipeCard />
            <RecipeCard />
            <RecipeCard />
            <RecipeCard />
            <RecipeCard />
            <RecipeCard />
          </div>
          {/* <DeleteRecipe />
          <EditRecipe /> */}
        </div>
      </div>
    </>
  );
}

export default page;
