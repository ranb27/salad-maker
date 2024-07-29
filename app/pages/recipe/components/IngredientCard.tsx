import React from "react";
import Image from "next/image";

interface IngredientList {
  category: string;
  ingredient: string;
  image: string | null;
  calories: number;
  amount: number;
}

const IngredientCard = ({
  ingredient,
  image,
  calories,
  amount,
  setIngredientListEdit,
}: {
  ingredient: string;
  image: string | null;
  calories: number;
  amount: number;
  setIngredientListEdit: React.Dispatch<React.SetStateAction<IngredientList[]>>;
}) => {
  // Function to handle the deletion of an ingredient
  const handleDelete = () => {
    setIngredientListEdit(
      (prev) =>
        prev
          .map((item) =>
            item.ingredient === ingredient
              ? { ...item, amount: item.amount - 1 }
              : item
          )
          .filter((item) => item.amount > 0) // Remove items with amount less than 1
    );
  };

  // Function to handle the addition of an ingredient
  const handleAdd = () => {
    setIngredientListEdit((prev) => {
      // Check if the ingredient already exists in the list
      const existingIngredient = prev.find(
        (item) => item.ingredient === ingredient
      );

      if (existingIngredient) {
        // If ingredient already exists, update the amount
        return prev.map((item) =>
          item.ingredient === ingredient
            ? { ...item, amount: item.amount + 1 }
            : item
        );
      } else {
        // If ingredient does not exist, add a new entry
        return [
          ...prev,
          { category: "", ingredient, image, calories, amount: 1 },
        ];
      }
    });
  };

  return (
    <div className="flex justify-between animate-fade">
      <div className="h-20 flex">
        {image && (
          <Image
            src={image}
            alt={ingredient}
            width={80} // Adjust size as needed
            height={80} // Adjust size as needed
            className="object-cover h-20 w-20"
          />
        )}
        <div className="grid px-4 my-auto gap-2">
          <h1 className="font-bold text-lg">{ingredient}</h1>
          <p className="flex gap-6 text-sm">
            x{amount}{" "}
            <span
              onClick={handleAdd}
              className="link text-success cursor-pointer"
            >
              Add
            </span>
            <span
              onClick={handleDelete}
              className="link text-error cursor-pointer"
            >
              Delete
            </span>
          </p>
        </div>
      </div>
      <div className="flex gap-4">
        <div className="font-bold my-auto">
          +{calories} <span className="text-warning text-lg">Cal</span>
        </div>
      </div>
    </div>
  );
};

export default IngredientCard;
