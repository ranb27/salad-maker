"use client";

import React, { useState, useEffect } from "react";
import poster_salad_maker from "../../../public/poster_salad_maker.png";
import Image from "next/image";
import { createClient } from "@/utils/supabase/client";
import Link from "next/link";

//! Components
import UserEmailFetcher from "@/app/components/AuthUser";
import CategoryCard from "./components/CategoryCard";
import IngredientCard from "./components/IngredientCard";
import IngredientSearch from "./components/IngredientSearch";
import CreateRecipe from "./components/CreateRecipe";

interface User {
  userEmail: string;
}
interface Ingredient {
  ingredient_id: number;
  ingresients: string;
  category: string;
  image: string;
  calories: number;
  amount: number;
}

function page() {
  const supabase = createClient();
  const userAuth = UserEmailFetcher();
  console.log("userAuth", userAuth);

  //! States
  // select category to filter ingredients type with column "category" in supabase table "ingredients_master" if value === "" then show all ingredients
  const [selectedCategory, setSelectedCategory] = useState<string>("");

  // data from supabase table "ingredients_master"
  const [ingredientData, setIngredientData] = useState<Ingredient[]>([]);

  // data for category card
  const categoryData = [
    { title: "Vegetable", pic: "/category-image/vegetable.png" },
    { title: "Fruit", pic: "/category-image/fruit.png" },
    { title: "Topping", pic: "/category-image/topping.png" },
    { title: "Protein", pic: "/category-image/protein.png" },
    { title: "Dressing", pic: "/category-image/dressing.png" },
  ];

  // create ingredient list with push[] when click ingredient card
  const [createIngredientList, setCreateIngredientList] = useState<
    Ingredient[]
  >([]);
  //! Fetch
  useEffect(() => {
    const fetchIngredientsMaster = async () => {
      let query = supabase.from("ingredients_master").select("*");

      if (selectedCategory !== "") {
        query = query.eq("use_type", selectedCategory);
      }

      query = query.order("ingredient_id", { ascending: true });

      const { data: ingredients_master, error } = await query;

      if (error) {
        console.error("Error fetching data:", error);
        return;
      }

      setIngredientData(ingredients_master);
    };

    fetchIngredientsMaster();
  }, [selectedCategory]);

  //! Functions
  return (
    <>
      {userAuth ? (
        <>
          <div className="grid grid-cols-1 gap-8 mx-10 my-16 mb-48">
            <div className="flex justify-between lg:flex-row flex-col gap-2">
              <h1 className="text-4xl font-bold w-full text-center lg:text-start">
                Let's Create...your own salad!!!
              </h1>
              <IngredientSearch />
            </div>
            {/* image */}
            <div className="grid grid-cols-1">
              <Image
                src={poster_salad_maker}
                alt="poster"
                className="rounded-3xl object-cover h-40 xl:h-full"
              />
            </div>
            {/* category */}
            <h1 className="font-bold text-2xl">Select Category</h1>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 xl:grid-cols-6 2xl:grid-cols-8 gap-6 mb-2 ">
              {categoryData.map((category, index) => (
                <CategoryCard
                  key={index}
                  title={category.title}
                  pic={category.pic}
                />
              ))}
            </div>
            {/* ingredient */}

            <h1 className="font-bold text-2xl">
              Choose your ingredients to make a salad
            </h1>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-6 mb-2">
              {ingredientData.map((ingredient) => (
                <IngredientCard
                  key={ingredient.ingredient_id}
                  title={ingredient.ingresients}
                  value={ingredient.calories}
                  pic={ingredient.image}
                />
              ))}
            </div>
          </div>
          {/* modal */}
          <div className="w-full flex bg-base-100 p-8 fixed bottom-0 shadow-2xl">
            <CreateRecipe />
          </div>
        </>
      ) : (
        <div className="flex justify-center items-center h-screen">
          <h1 className="text-2xl font-bold">
            Make your wonderful salad!,{" "}
            <Link
              href={"/login"}
              className="link text-warning hover:text-info duration-300"
            >
              login now
            </Link>
          </h1>
        </div>
      )}
    </>
  );
}

export default page;
