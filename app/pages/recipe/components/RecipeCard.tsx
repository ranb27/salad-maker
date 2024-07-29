import React from "react";
import UserEmailFetcher from "@/app/components/AuthUser";

interface IngredientList {
  category: string;
  ingredient: string;
  image: string | null;
  calories: number;
  amount: number;
}

export default function RecipeCard({
  id,
  recipeName,
  ingredientList,
  createdBy,
  deleteRecipe,
  setIsEditting,
  setUpdateId,
}: {
  id: number;
  recipeName: string;
  ingredientList: IngredientList[];
  createdBy: string;
  deleteRecipe: (id: number) => void;
  setIsEditting: (isEditting: boolean) => void;
  setUpdateId: (id: number) => void;
}) {
  //! Auth
  const userAuth = UserEmailFetcher();

  // Sum of calories
  const totalCalories = ingredientList.reduce(
    (acc, list) => acc + list.calories * list.amount,
    0
  );

  return (
    <div
      className="card bg-background min-h-96 object-cover bg-center animate-fade"
      style={{
        backgroundImage: 'url("/bg_card_recipe.png")',
      }}
    >
      <div className="p-6 h-full flex flex-col justify-between">
        <div
          onClick={() => {
            const viewRecipeModal = document.getElementById(
              `view_recipe_modal_${id}`
            );
            if (viewRecipeModal) {
              (viewRecipeModal as HTMLDialogElement).showModal();
            }
          }}
          className="card bg-base-100 px-6 py-10 grid gap-4 hover:scale-105 cursor-pointer duration-200"
        >
          <p className="text-lg">{recipeName}</p>
          <p className="text-3xl font-bold">
            {totalCalories} <span className="text-warning">Cal</span>
          </p>
          <p className="text-xs text-end opacity-75">
            Created by{" "}
            <span className="text-warning">
              {createdBy?.split("@")[0].toUpperCase()}
            </span>
          </p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
          <button
            // onClick={() => deleteRecipe(id)}
            onClick={() => {
              const deleteRecipeModal = document.getElementById(
                `delete_recipe_modal_${id}`
              );
              if (deleteRecipeModal) {
                (deleteRecipeModal as HTMLDialogElement).showModal();
              }
            }}
            className={`btn w-full text-base text-error bg-base-100 rounded-full ${
              userAuth === createdBy ? "" : "btn-disabled"
            }`}
          >
            <p className="text-nowrap flex gap-1">
              <svg
                width="25"
                height="24"
                viewBox="0 0 25 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M7.5 4C7.5 3.46957 7.71071 2.96086 8.08579 2.58579C8.46086 2.21071 8.96957 2 9.5 2H15.5C16.0304 2 16.5391 2.21071 16.9142 2.58579C17.2893 2.96086 17.5 3.46957 17.5 4V6H21.5C21.7652 6 22.0196 6.10536 22.2071 6.29289C22.3946 6.48043 22.5 6.73478 22.5 7C22.5 7.26522 22.3946 7.51957 22.2071 7.70711C22.0196 7.89464 21.7652 8 21.5 8H20.431L19.564 20.142C19.5281 20.6466 19.3023 21.1188 18.9321 21.4636C18.5619 21.8083 18.0749 22 17.569 22H7.43C6.92414 22 6.43707 21.8083 6.06688 21.4636C5.6967 21.1188 5.47092 20.6466 5.435 20.142L4.57 8H3.5C3.23478 8 2.98043 7.89464 2.79289 7.70711C2.60536 7.51957 2.5 7.26522 2.5 7C2.5 6.73478 2.60536 6.48043 2.79289 6.29289C2.98043 6.10536 3.23478 6 3.5 6H7.5V4ZM9.5 6H15.5V4H9.5V6ZM6.574 8L7.431 20H17.57L18.427 8H6.574ZM10.5 10C10.7652 10 11.0196 10.1054 11.2071 10.2929C11.3946 10.4804 11.5 10.7348 11.5 11V17C11.5 17.2652 11.3946 17.5196 11.2071 17.7071C11.0196 17.8946 10.7652 18 10.5 18C10.2348 18 9.98043 17.8946 9.79289 17.7071C9.60536 17.5196 9.5 17.2652 9.5 17V11C9.5 10.7348 9.60536 10.4804 9.79289 10.2929C9.98043 10.1054 10.2348 10 10.5 10ZM14.5 10C14.7652 10 15.0196 10.1054 15.2071 10.2929C15.3946 10.4804 15.5 10.7348 15.5 11V17C15.5 17.2652 15.3946 17.5196 15.2071 17.7071C15.0196 17.8946 14.7652 18 14.5 18C14.2348 18 13.9804 17.8946 13.7929 17.7071C13.6054 17.5196 13.5 17.2652 13.5 17V11C13.5 10.7348 13.6054 10.4804 13.7929 10.2929C13.9804 10.1054 14.2348 10 14.5 10Z"
                  fill="oklch(var(--er))"
                />
              </svg>
              Delete
            </p>
          </button>

          <button
            onClick={() => {
              setIsEditting(true);
              setUpdateId(id);
            }}
            className={`btn w-full text-base text-base-content bg-base-100 rounded-full ${
              userAuth === createdBy ? "" : "btn-disabled"
            }`}
          >
            <p className="text-nowrap flex gap-1">
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M7 17.0129L11.413 16.9979L21.045 7.4579C21.423 7.0799 21.631 6.5779 21.631 6.0439C21.631 5.5099 21.423 5.0079 21.045 4.6299L19.459 3.0439C18.703 2.2879 17.384 2.2919 16.634 3.0409L7 12.5829V17.0129ZM18.045 4.4579L19.634 6.0409L18.037 7.6229L16.451 6.0379L18.045 4.4579ZM9 13.4169L15.03 7.4439L16.616 9.0299L10.587 15.0009L9 15.0059V13.4169Z"
                  fill="oklch(var(--bc))"
                />
                <path
                  d="M5 21H19C20.103 21 21 20.103 21 19V10.332L19 12.332V19H8.158C8.132 19 8.105 19.01 8.079 19.01C8.046 19.01 8.013 19.001 7.979 19H5V5H11.847L13.847 3H5C3.897 3 3 3.897 3 5V19C3 20.103 3.897 21 5 21Z"
                  fill="oklch(var(--bc))"
                />
              </svg>
              Edit
            </p>
          </button>
        </div>
      </div>
      {/* Open the modal using document.getElementById('ID').showModal() method */}

      <dialog id={`delete_recipe_modal_${id}`} className="modal">
        <div className="modal-box max-w-lg">
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
                <rect width="72" height="72" rx="36" fill="#FFF5F6" />
                <path
                  d="M23.4501 50.9999H48.5501C51.1168 50.9999 52.7168 48.2166 51.4335 45.9999L38.8835 24.3166C37.6001 22.0999 34.4001 22.0999 33.1168 24.3166L20.5668 45.9999C19.2835 48.2166 20.8835 50.9999 23.4501 50.9999ZM36.0001 39.3332C35.0835 39.3332 34.3335 38.5832 34.3335 37.6666V34.3332C34.3335 33.4166 35.0835 32.6666 36.0001 32.6666C36.9168 32.6666 37.6668 33.4166 37.6668 34.3332V37.6666C37.6668 38.5832 36.9168 39.3332 36.0001 39.3332ZM37.6668 45.9999H34.3335V42.6666H37.6668V45.9999Z"
                  fill="oklch(var(--er))"
                />
              </svg>
            </div>

            <h3 className="font-bold text-lg text-center ">
              Delete Recipe : <span className="text-error">{recipeName}</span> ?
            </h3>

            <div className="modal-action">
              <form method="dialog" className="grid grid-cols-2 gap-2 w-full">
                <button className="btn text-base btn-ghost">Cancel</button>
                <button
                  onClick={() => deleteRecipe(id)}
                  className="btn btn-error text-base-100 text-base"
                >
                  Delete
                </button>
              </form>
            </div>
          </div>
        </div>
      </dialog>

      <dialog id={`view_recipe_modal_${id}`} className="modal">
        <div className="modal-box max-w-4xl">
          <form method="dialog" className="flex justify-end">
            <button className="opacity-50 font-bold btn btn-ghost text-lg">
              X
            </button>
          </form>
          <div className="grid gap-4">
            <div className="font-bold text-lg flex justify-center p-5 bg-primary/10 rounded-full mx-auto">
              <svg
                viewBox="0 0 24 24"
                fill="oklch(var(--p))"
                width="32"
                height="32"
              >
                <path d="M3 2h2v20H3zm7 4h7v2h-7zm0 4h7v2h-7z" />
                <path d="M19 2H6v20h13c1.103 0 2-.897 2-2V4c0-1.103-.897-2-2-2zm0 18H8V4h11v16z" />
              </svg>
            </div>

            <h3 className="font-bold text-lg text-center ">
              Recipe : <span className="text-primary">{recipeName}</span>
            </h3>

            <div className="grid gap-4">
              <div className="grid gap-4">
                <p className="font-bold text-lg menu-title">Ingredients</p>
                <div className="overflow-x-auto">
                  <table className="table">
                    {/* Table head */}
                    <thead>
                      <tr className="text-primary text-center">
                        <th>Name</th>
                        <th>Amount</th>
                        <th>Category</th>
                        <th>Calories</th>
                        <th>Image</th>
                      </tr>
                    </thead>
                    <tbody>
                      {/* Table rows */}
                      {ingredientList.map((ingredient, index) => (
                        <tr key={index} className="text-center">
                          <td>{ingredient.ingredient}</td>
                          <td>{ingredient.amount}</td>
                          <td>{ingredient.category}</td>
                          <td>{ingredient.calories}</td>
                          <td>
                            {ingredient.image ? (
                              <img
                                src={ingredient.image}
                                alt={ingredient.ingredient}
                                className="h-16 w-auto object-cover mx-auto"
                              />
                            ) : (
                              "No Image"
                            )}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      </dialog>
    </div>
  );
}
