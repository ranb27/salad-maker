import React, { useEffect, useState } from "react";
import { createClient } from "@/utils/supabase/client";
import Swal from "sweetalert2";
import UserEmailFetcher from "@/app/components/AuthUser";

//! Components
import IngredientList from "./IngredientList";

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

export default function EditRecipe({
  isEditing,
  setIsEditing,
  ingredientData,
  updateId,
  fetchRecipeRecord,
}: {
  isEditing: boolean;
  setIsEditing: (isEditing: boolean) => void;
  ingredientData: Ingredient[];
  updateId: number;
  fetchRecipeRecord: () => void;
}) {
  const supabase = createClient();

  //! Auth
  const userAuth = UserEmailFetcher();

  //! States
  const [ingredientListEdit, setIngredientListEdit] = useState<
    IngredientList[]
  >([]);

  //! Fetch
  // get the ingredient list of the selected recipe
  useEffect(() => {
    if (isEditing) {
      const fetchIngredientRecord = async () => {
        try {
          let query = supabase
            .from("recipes_record")
            .select("ingredient_list")
            .eq("id", updateId);

          const { data, error } = await query;

          if (error) {
            throw error;
          }

          setIngredientListEdit(data[0].ingredient_list);
        } catch (error: any) {
          console.error("Error", error.message);
        }
      };

      fetchIngredientRecord();
    } else {
      setIngredientListEdit([]);
    }
  }, [updateId]);

  // edit with method patch to update new ingredientListEdit column "ingredient_list" in the table "recipes_record" with updateId
  const handleUpdateRecipe = async () => {
    try {
      let query = supabase
        .from("recipes_record")
        .update({ ingredient_list: ingredientListEdit })
        .eq("id", updateId);

      const { error } = await query;

      if (error) {
        throw error;
      }

      Swal.fire({
        icon: "success",
        title: "Recipe updated successfully!",
        showConfirmButton: false,
        timer: 2000,
        background: "oklch(var(--b3))",
        color: "oklch(var(--bc))",
        confirmButtonColor: "oklch(var(--wa))",
      });

      setIsEditing(false);
    } catch (error: any) {
      console.error("Error", error.message);
    } finally {
      fetchRecipeRecord();
    }
  };

  //! Functions
  const totalCalories = ingredientListEdit.reduce(
    (acc, ingredient) => acc + ingredient.calories * ingredient.amount,
    0
  );

  const handleSelectIngredient = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedIngredientName = e.target.value;

    const selectedIngredient = ingredientData.find(
      (ingredient) => ingredient.ingredient === selectedIngredientName
    );

    if (selectedIngredient) {
      setIngredientListEdit((prev) => {
        const existingIngredientIndex = prev.findIndex(
          (item) => item.ingredient === selectedIngredient.ingredient
        );

        if (existingIngredientIndex > -1) {
          const updatedList = [...prev];
          updatedList[existingIngredientIndex] = {
            ...updatedList[existingIngredientIndex],
            amount: updatedList[existingIngredientIndex].amount + 1,
          };
          return updatedList;
        } else {
          return [
            ...prev,
            {
              category: selectedIngredient.category,
              ingredient: selectedIngredient.ingredient,
              image: selectedIngredient.image,
              calories: selectedIngredient.calories,
              amount: 1,
            },
          ];
        }
      });
    }
  };

  console.log(ingredientListEdit);

  return (
    <>
      <div className="h-5/6 flex flex-col justify-between">
        <div className="h-full overflow-y-scroll">
          <div className="grid grid-cols-1 gap-4">
            <IngredientList
              ingredientListEdit={ingredientListEdit}
              setIngredientListEdit={setIngredientListEdit}
            />
          </div>
        </div>
        <div className="grid gap-8">
          <div className="divider"></div>

          <div className="flex gap-4 justify-between">
            <p className="text-xl my-auto">Total Calories</p>
            <div className="font-bold my-auto text-2xl">
              {totalCalories} <span className="text-warning">Cal</span>
            </div>
          </div>
          <div className="grid md:grid-cols-1 lg:grid-cols-3 gap-2">
            <select
              className="select select-warning select-lg my-auto"
              onChange={handleSelectIngredient}
            >
              <option disabled selected>
                Add ingredients
              </option>
              {ingredientData.map((ingredient, index) => (
                <option key={index} value={ingredient.ingredient}>
                  {ingredient.ingredient}
                </option>
              ))}
            </select>

            <button
              onClick={() => setIsEditing(false)}
              className="btn btn-lg text-neutral-content btn-neutral font-bold rounded-2xl"
            >
              Cancel
            </button>
            <button
              onClick={handleUpdateRecipe}
              className="btn btn-warning btn-lg text-base-100 font-bold rounded-2xl"
            >
              Update Recipe
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
