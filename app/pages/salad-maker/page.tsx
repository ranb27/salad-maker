"use client";

import React, { useState, useEffect } from "react";
import poster_salad_maker from "../../../public/poster_salad_maker.png";
import Image from "next/image";
import { createClient } from "@/utils/supabase/client";
import Link from "next/link";
import Swal from "sweetalert2";

//! Components
import UserEmailFetcher from "@/app/components/AuthUser";
import CategoryCard from "./components/CategoryCard";
import IngredientCard from "./components/IngredientCard";
import IngredientSearch from "./components/IngredientSearch";
import CreateRecipe from "./components/CreateRecipe";

interface Ingredient {
  ingredient_id: number;
  ingredient: string; // Name of the ingredient
  category: string; // Category of the ingredient
  image: string | null; // URL to the image of the ingredient
  calories: number; // Calories per unit
  amount: number; // Quantity of the ingredient selected
}

function page() {
  const supabase = createClient();
  const userAuth = UserEmailFetcher();
  // console.log("userAuth", userAuth);

  //! States
  // select category to filter ingredients type with column "category" in supabase table "ingredients_master" if value === "" then show all ingredients
  const [selectedCategory, setSelectedCategory] = useState<string[]>([]);

  // search ingredient by name to filter column "ingredient" in supabase table "ingredients_master"
  const [searchIngredient, setSearchIngredient] = useState<string>("");

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

  // create ingredient list with push[] when click ingredient card to set value "ingredient_list": ["ingredient_name", "image", "calories", "amount"]
  const [createIngredientList, setCreateIngredientList] = useState<
    Ingredient[]
  >([]);

  //! Fetch
  useEffect(() => {
    const fetchIngredientsMaster = async () => {
      let query = supabase.from("ingredients_master").select("*");

      if (selectedCategory.length > 0) {
        query = query.in("category", selectedCategory);
      }

      if (searchIngredient && searchIngredient !== "") {
        query = query.ilike("ingredient", `%${searchIngredient}%`); // ilike is case-insensitive
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
  }, [selectedCategory, searchIngredient]);

  //! Functions
  // add ingredient to createIngredientList
  const addIngredient = (
    ingredient: string,
    image: string | null,
    calories: number
  ) => {
    setCreateIngredientList((prevList: Ingredient[]) => {
      // Check if the ingredient already exists in the list
      const existingIngredient = prevList.find(
        (inList) => inList.ingredient === ingredient
      );

      // Find the ingredient in the ingredientData array to get the category
      const ingredientDataItem = ingredientData.find(
        (item) => item.ingredient === ingredient
      );
      const category = ingredientDataItem ? ingredientDataItem.category : "";

      // Conditionally update the amount or add a new ingredient
      if (existingIngredient) {
        return prevList.map((inList) =>
          inList.ingredient === ingredient
            ? { ...inList, amount: inList.amount + 1 }
            : inList
        );
      } else {
        // Create a new Ingredient object
        const newIngredient: Ingredient = {
          ingredient_id: prevList.length + 1, // Assign ID each object
          category,
          ingredient,
          image,
          calories,
          amount: 1,
        };
        return [...prevList, newIngredient];
      }
    });
  };

  // remove ingredient from createIngredientList
  const removeIngredient = (name: string) => {
    setCreateIngredientList((prevList) => {
      return prevList
        .map((ingredient) =>
          ingredient.ingredient === name && ingredient.amount > 0
            ? { ...ingredient, amount: ingredient.amount - 1 }
            : ingredient
        )
        .filter((ingredient) => ingredient.amount > 0);
    });
  };

  // post data to supabase table "recipes_record" with column "recipe_name", "ingredient_list", "created_by"
  const postRecipe = async ({
    recipeName,
    createIngredientList,
  }: {
    recipeName: string;
    createIngredientList: Ingredient[];
  }) => {
    try {
      const ingredient_list = createIngredientList.map((ingredient) => ({
        ingredient: ingredient.ingredient,
        amount: ingredient.amount,
      }));

      // Assuming userAuth is available in the scope
      const created_by = userAuth;

      const { error } = await supabase.from("recipes_record").upsert([
        {
          recipe_name: recipeName,
          ingredient_list,
          created_by,
        },
      ]);

      if (error) {
        console.error("Error inserting data:", error);
        return;
      }

      // Successful data insertion
      Swal.fire({
        icon: "success",
        title: "Success",
        text: "Data inserted successfully",
        timer: 2000,
        background: "oklch(var(--b3))", // Set background color
        color: "oklch(var(--bc))", // Set text color
        confirmButtonColor: "oklch(var(--wa))", // Set button color
      });
    } catch (error) {
      console.error("Error inserting data:", error);
    } finally {
      setCreateIngredientList([]);
    }
  };

  return (
    <>
      {userAuth ? (
        <>
          <div className="grid grid-cols-1 gap-8 mx-10 my-16 mb-48">
            <div className="flex justify-between lg:flex-row flex-col gap-2">
              <h1 className="text-4xl font-bold w-full text-center lg:text-start">
                Let's Create...your own salad!!!
              </h1>
              <IngredientSearch
                setValue={setSearchIngredient}
                value={searchIngredient}
              />
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
                  setValue={setSelectedCategory}
                  value={selectedCategory}
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
                  title={ingredient.ingredient}
                  value={ingredient.calories}
                  pic={ingredient.image}
                  addIngredient={addIngredient}
                  removeIngredient={removeIngredient}
                  ingredientList={createIngredientList}
                />
              ))}
            </div>
          </div>
          {/* modal */}
          {createIngredientList.length > 0 && (
            <div className="w-full flex bg-base-100 p-8 fixed bottom-0 shadow-2xl">
              <CreateRecipe
                ingredientList={createIngredientList}
                postRecipe={postRecipe}
              />
            </div>
          )}
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
