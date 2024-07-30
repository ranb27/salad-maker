"use client";

import React, { useState, useEffect } from "react";
import UserEmailFetcher from "@/app/components/AuthUser";
import { createClient } from "@/utils/supabase/client";
import Swal from "sweetalert2";

//! Components
import RecipeCard from "./components/RecipeCard";
import EditRecipe from "./components/EditRecipe";

interface IngredientList {
  category: string;
  ingredient: string;
  image: string | null;
  calories: number;
  amount: number;
}
interface Ingredient {
  id: number;
  recipe_name: string;
  ingredient_list: IngredientList[];
  created_by: string;
  calories: number;
  amount: number;
  ingredient: string;
  category: string;
  image: string | null;
}

function page() {
  const supabase = createClient();

  //! States
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [updateId, setUpdateId] = useState<number>(0);

  const [ingredientData, setIngredientData] = useState<Ingredient[]>([]);
  const [recipeData, setRecipeData] = useState<Ingredient[]>([]);

  //! Fetch
  // get data from table name "recipes_record" to set in recipeData
  const fetchRecipeRecord = async () => {
    try {
      let query = supabase.from("recipes_record").select("*");

      const { data, error } = await query;

      if (error) {
        throw error;
      }

      setRecipeData(data);
    } catch (error: string | any) {
      console.error("Error", error.message);
    }
  };

  useEffect(() => {
    fetchRecipeRecord();
  }, []);

  // get data from table name "ingredients_master" to set in ingredientData
  useEffect(() => {
    const fetchIngredientRecord = async () => {
      try {
        let query = supabase.from("ingredients_master").select("*");

        const { data, error } = await query;

        if (error) {
          throw error;
        }

        setIngredientData(data);
      } catch (error: string | any) {
        console.error("Error", error.message);
      }
    };
    fetchIngredientRecord();
  }, []);

  //! Functions
  // delete recipe by id
  const deleteRecipe = async (id: number) => {
    try {
      const { data, error } = await supabase
        .from("recipes_record")
        .delete()
        .eq("id", id);

      if (error) {
        throw error;
      }

      Swal.fire({
        icon: "success",
        title: "Success",
        text: "Data inserted successfully",
        timer: 2000,
        background: "oklch(var(--b3))", // Set background color
        color: "oklch(var(--bc))", // Set text color
        confirmButtonColor: "oklch(var(--wa))", // Set button color
      });

      // setRecipeData(recipeData.filter((recipe) => recipe.id !== id));
      fetchRecipeRecord();
    } catch (error: string | any) {
      console.error("Error", error.message);
    }
  };

  return (
    <>
      <div className="grid grid-cols-1 gap-8 px-10 mt-16 w-full">
        <h1 className="text-4xl font-bold">Recipe</h1>
        <div className="h-[80vh] bg-base-100 rounded-3xl p-6 overflow-y-scroll">
          {isEditing ? (
            <>
              <p className="text-2xl font-bold my-4">
                Your ingredients to make a salad Recipe
              </p>
              <EditRecipe
                isEditing={isEditing}
                setIsEditing={setIsEditing}
                ingredientData={ingredientData}
                updateId={updateId}
                fetchRecipeRecord={fetchRecipeRecord}
              />
            </>
          ) : (
            <>
              <p className="text-2xl font-bold my-4">Your Recipe</p>
              <div className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-6">
                {recipeData.map((recipe) => (
                  <RecipeCard
                    key={recipe.id}
                    id={recipe.id}
                    recipeName={recipe.recipe_name}
                    ingredientList={recipe.ingredient_list}
                    createdBy={recipe.created_by}
                    deleteRecipe={deleteRecipe}
                    setIsEditing={setIsEditing}
                    setUpdateId={setUpdateId}
                  />
                ))}
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
}

export default page;
