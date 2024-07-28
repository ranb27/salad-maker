import React from "react";
import Image from "next/image";

interface Ingredient {
  ingredient: string;
  image: string | null;
  calories: number;
  amount: number;
}

export default function IngredientCard({
  title,
  value,
  pic,
  addIngredient,
  removeIngredient,
  ingredientList,
}: {
  title: string; // name of the ingredient
  value: number; // calories
  pic: string | null; // image url
  addIngredient: (
    ingredient: string,
    image: string | null,
    calories: number
  ) => void; // function to add ingredient
  removeIngredient: (name: string) => void; // function to remove ingredient
  ingredientList: Ingredient[]; // list of ingredients
}) {
  const currentIngredient = ingredientList.find(
    (ingredient) => ingredient.ingredient === title
  );

  return (
    <div className="card bg-base-100 animate-fade">
      <div className="m-6 grid gap-2">
        <Image
          src={pic || "/no-image.png"}
          width={480}
          height={480}
          alt="poster"
          className="h-48 w-full rounded mb-2 object-cover"
        />
        <h1 className="text-xl">{title}</h1>
        <p className="font-bold text-2xl">
          {value} <span className="text-warning">Cal</span>
        </p>

        <div className="flex justify-end gap-2">
          {/* Decrease amount */}
          <svg
            onClick={() => removeIngredient(title)}
            viewBox="0 0 512 512"
            fill="currentColor"
            height="3em"
            className="text-warning cursor-pointer active:scale-90 duration-200"
          >
            <path d="M256 48C141.31 48 48 141.31 48 256s93.31 208 208 208 208-93.31 208-208S370.69 48 256 48zm96 224H160v-32h192z" />
          </svg>
          {/* Display amount */}
          <p className="font-bold text-2xl my-auto">
            {currentIngredient ? currentIngredient.amount : 0}
          </p>
          {/* Increase amount */}
          <svg
            onClick={() => addIngredient(title, pic, value)}
            viewBox="0 0 512 512"
            fill="currentColor"
            height="3rem"
            className="text-warning cursor-pointer active:scale-90 duration-200"
          >
            <path d="M256 48C141.31 48 48 141.31 48 256s93.31 208 208 208 208-93.31 208-208S370.69 48 256 48zm96 224h-80v80h-32v-80h-80v-32h80v-80h32v80h80z" />
          </svg>
        </div>
      </div>
    </div>
  );
}
