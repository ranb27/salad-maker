import React, { useEffect, useState } from "react";
import IngredientCard from "./IngredientCard";

interface IngredientList {
  category: string;
  ingredient: string;
  image: string | null;
  calories: number;
  amount: number;
}

export default function IngredientList({
  ingredientListEdit,
  setIngredientListEdit,
}: {
  ingredientListEdit: IngredientList[];
  setIngredientListEdit: React.Dispatch<React.SetStateAction<IngredientList[]>>;
}) {
  return (
    <div className="grid gap-4">
      {ingredientListEdit.map((ingredient, index) => (
        <IngredientCard
          key={index}
          ingredient={ingredient.ingredient}
          image={ingredient.image}
          calories={ingredient.calories}
          amount={ingredient.amount}
          setIngredientListEdit={setIngredientListEdit}
        />
      ))}
    </div>
  );
}
