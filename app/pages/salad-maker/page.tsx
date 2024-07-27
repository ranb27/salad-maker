"use client";

import React from "react";
import poster_salad_maker from "../../../public/poster_salad_maker.png";
import Image from "next/image";
//! Components
import CategoryCard from "./components/CategoryCard";
import IngredientCard from "./components/IngredientCard";
import IngredientSearch from "./components/IngredientSearch";
import ModalCreateRecipe from "./components/ModalCreateRecipe";

function page() {
  return (
    <div className="grid grid-cols-1 gap-8 mx-10 my-16">
      <div className="flex justify-between lg:flex-row flex-col gap-2">
        <h1 className="text-4xl font-bold w-full text-center lg:text-start">
          Let's Create...your own salad!!!
        </h1>
        <IngredientSearch />
      </div>
      {/* image */}
      <div className="grid grid-cols-1">
        <Image src={poster_salad_maker} alt="poster" className="rounded-3xl" />
      </div>
      {/* category */}
      <h1 className="font-bold text-2xl">Select Category</h1>
      <div className="grid grid-cols-8 gap-6 mb-2 ">
        <CategoryCard title="Vegetable" />
        <CategoryCard title="Fruit" />
        <CategoryCard title="Topping" />
        <CategoryCard title="Protein" />
        <CategoryCard title="Dressing" />
      </div>
      {/* ingredient */}

      <h1 className="font-bold text-2xl">
        Choose your ingredients to make a salad
      </h1>
      <div className="grid grid-cols-4 gap-6 mb-2">
        <IngredientCard title="Barley" value={8} />
        <IngredientCard title="Barley" value={8} />
        <IngredientCard title="Barley" value={8} />
        <IngredientCard title="Barley" value={8} />
      </div>

      {/* modal */}
      <ModalCreateRecipe />
    </div>
  );
}

export default page;
