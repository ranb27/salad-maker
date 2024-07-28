import React from "react";

export default function RecipeCard() {
  return (
    <div
      className="card bg-background min-h-96 object-cover bg-center"
      style={{
        backgroundImage: 'url("/bg_card_recipe.png")',
      }}
    >
      <div className="p-6 h-full flex flex-col justify-between">
        <div className="card bg-base-100 px-6 py-10 grid gap-4">
          <p className="text-lg">Recipe name demo</p>
          <p className="text-3xl font-bold">
            999 <span className="text-warning">Cal</span>
          </p>
          <p className="text-xs text-end opacity-75">
            Created by <span className="text-warning">User</span>
          </p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
          <button className="btn w-full text-base text-error bg-base-100 rounded-full">
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

          <button className="btn w-full text-base text-base-content bg-base-100 rounded-full">
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
    </div>
  );
}
