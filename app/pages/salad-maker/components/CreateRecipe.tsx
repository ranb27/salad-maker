import React, { useState } from "react";

// Ingredient interface
interface Ingredient {
  ingredient_id: number;
  category: string;
  ingredient: string;
  image: string | null;
  calories: number;
  amount: number;
}

// Props for the CreateRecipe component
interface CreateRecipeProps {
  ingredientList: Ingredient[];
  postRecipe: (args: {
    recipeName: string;
    createIngredientList: Ingredient[];
  }) => void;
}

export default function CreateRecipe({
  ingredientList,
  postRecipe,
}: CreateRecipeProps) {
  // Sum of calories
  const totalCalories = ingredientList.reduce(
    (acc, ingredient) => acc + ingredient.calories * ingredient.amount,
    0
  );

  // Sum Amount
  const totalAmount = ingredientList.reduce(
    (acc, ingredient) => acc + ingredient.amount,
    0
  );

  const [recipeName, setRecipeName] = useState("");

  return (
    <div className="grid grid-cols-1 md:flex gap-4 w-full md:mx-40">
      <div className="bg-warning p-4 w-full rounded-2xl font-bold px-8 text-3xl flex justify-between flex-col sm:flex-row text-end">
        <p className="flex gap-2">
          <span className="py-4 px-6 bg-base-100 rounded-2xl text-warning">
            {totalAmount}
          </span>
          <span className="my-auto text-base-100">Your ingredients</span>
        </p>
        <p className="my-auto text-base-100">{totalCalories} Cal</p>
      </div>
      <button
        className="btn bg-[#2fb62d] text-3xl btn-lg rounded-2xl h-full font-bold text-base-100"
        onClick={() => {
          const createRecipeModal = document.getElementById(
            "create_recipe_modal"
          );
          if (createRecipeModal) {
            (createRecipeModal as HTMLDialogElement).showModal();
          }
        }}
      >
        Create Recipe
      </button>
      {/* Dialog */}
      <dialog id="create_recipe_modal" className="modal">
        <div className="modal-box max-w-md">
          <form method="dialog" className="flex justify-end">
            <button className="opacity-50 font-bold btn btn-ghost text-lg">
              X
            </button>
          </form>
          <div className="grid gap-4">
            <div className="font-bold text-lg flex justify-center">
              <svg
                width="72"
                height="72"
                viewBox="0 0 72 72"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <rect width="72" height="72" rx="36" fill="#F8B602" />
                <path
                  d="M17.5 49.4289C17.5 53.5092 26.734 55.3664 35.3125 55.3664C43.891 55.3664 53.125 53.5092 53.125 49.4289C53.125 46.1894 47.5176 44.7264 43.4777 44.0947L46.2375 41.3539C48.3966 39.195 49.867 36.4443 50.4628 33.4497C51.0585 30.4551 50.7529 27.351 49.5845 24.5301C48.4161 21.7092 46.4375 19.2981 43.8988 17.6018C41.36 15.9054 38.3753 15 35.322 15C32.2687 15 29.284 15.9054 26.7452 17.6018C24.2065 19.2981 22.2279 21.7092 21.0595 24.5301C19.8911 27.351 19.5855 30.4551 20.1812 33.4497C20.777 36.4443 22.2474 39.195 24.4065 41.3539L27.1567 44.1042C23.1074 44.7264 17.5 46.1894 17.5 49.4289ZM37.6875 24.4914C37.6875 24.2709 37.7489 24.0547 37.8649 23.8671C37.9808 23.6795 38.1467 23.5279 38.3439 23.4293C38.5412 23.3307 38.762 23.2889 38.9816 23.3087C39.2013 23.3285 39.4111 23.4091 39.5875 23.5414C41.058 24.6447 42.2791 26.0459 43.1709 27.6535C44.0626 29.2611 44.605 31.0388 44.7626 32.8704C44.8148 33.4331 44.6632 33.9958 44.3354 34.4561C44.0076 34.9164 43.5254 35.2437 42.9766 35.3784L40.0625 36.1075V38.7414C40.0625 39.0564 39.9374 39.3584 39.7147 39.5811C39.492 39.8038 39.1899 39.9289 38.875 39.9289C38.5601 39.9289 38.258 39.8038 38.0353 39.5811C37.8126 39.3584 37.6875 39.0564 37.6875 38.7414V24.4914ZM27 26.8664V24.4914C27 24.1765 27.1251 23.8744 27.3478 23.6517C27.5705 23.429 27.8726 23.3039 28.1875 23.3039C28.5024 23.3039 28.8045 23.429 29.0272 23.6517C29.2499 23.8744 29.375 24.1765 29.375 24.4914V26.8664C29.3797 27.276 29.4919 27.6771 29.7003 28.0297C29.9087 28.3823 30.206 28.674 30.5625 28.8757V24.4914C30.5625 24.1765 30.6876 23.8744 30.9103 23.6517C31.133 23.429 31.4351 23.3039 31.75 23.3039C32.0649 23.3039 32.367 23.429 32.5897 23.6517C32.8124 23.8744 32.9375 24.1765 32.9375 24.4914V28.8757C33.294 28.674 33.5913 28.3823 33.7997 28.0297C34.0081 27.6771 34.1203 27.276 34.125 26.8664V24.4914C34.125 24.1765 34.2501 23.8744 34.4728 23.6517C34.6955 23.429 34.9976 23.3039 35.3125 23.3039C35.6274 23.3039 35.9295 23.429 36.1522 23.6517C36.3749 23.8744 36.5 24.1765 36.5 24.4914V26.8664C36.4961 27.9164 36.1443 28.9355 35.4998 29.7644C34.8552 30.5933 33.9542 31.1853 32.9375 31.4478V38.7414C32.9375 39.0564 32.8124 39.3584 32.5897 39.5811C32.367 39.8038 32.0649 39.9289 31.75 39.9289C31.4351 39.9289 31.133 39.8038 30.9103 39.5811C30.6876 39.3584 30.5625 39.0564 30.5625 38.7414V31.4478C29.5458 31.1853 28.6448 30.5933 28.0002 29.7644C27.3557 28.9355 27.0039 27.9164 27 26.8664ZM29.2658 46.2132L32.7926 49.7424C33.1235 50.0735 33.5163 50.3361 33.9487 50.5153C34.381 50.6944 34.8445 50.7867 35.3125 50.7867C35.7805 50.7867 36.244 50.6944 36.6763 50.5153C37.1087 50.3361 37.5015 50.0735 37.8324 49.7424L41.3592 46.2132C47.8857 46.9684 50.75 48.6879 50.75 49.4289C50.75 50.4929 45.4989 52.9914 35.3125 52.9914C25.1261 52.9914 19.875 50.4929 19.875 49.4289C19.875 48.6879 22.7393 46.9684 29.2658 46.2132Z"
                  fill="white"
                />
              </svg>
            </div>
            <p className="font-bold text-xl text-center">Recipe name</p>

            <input
              type="text"
              placeholder="Input Your Recipe Name..."
              className="input input-bordered w-full"
              value={recipeName}
              onChange={(e) => setRecipeName(e.target.value)}
            />
          </div>
          <div className="modal-action">
            <form method="dialog" className="w-1/2">
              <button className="btn text-base btn-ghost w-full">Cancel</button>
            </form>
            <button
              onClick={() => {
                //post recipe
                postRecipe({
                  recipeName: recipeName,
                  createIngredientList: ingredientList,
                });

                //close modal
                const createRecipeModal = document.getElementById(
                  "create_recipe_modal"
                );
                if (createRecipeModal) {
                  (createRecipeModal as HTMLDialogElement).close();
                }
              }}
              className="btn bg-[#2fb62d] text-base-100 w-1/2 text-base"
            >
              Create new recipe
            </button>
          </div>
        </div>
      </dialog>
    </div>
  );
}
