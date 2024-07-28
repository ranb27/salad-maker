import React from "react";
import Image from "next/image";

export default function IngredientCard({
  title,
  value,
  pic,
}: {
  title: string;
  value: number;
  pic: string;
}) {
  return (
    <div className="card bg-base-100">
      <div className="m-6 grid gap-2">
        <Image
          src={pic}
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
          <svg
            viewBox="0 0 512 512"
            fill="currentColor"
            height="3rem"
            className="text-warning cursor-pointer active:scale-90 duration-200"
          >
            <path d="M256 48C141.31 48 48 141.31 48 256s93.31 208 208 208 208-93.31 208-208S370.69 48 256 48zm96 224h-80v80h-32v-80h-80v-32h80v-80h32v80h80z" />
          </svg>
          <p className="font-bold text-2xl my-auto">2</p>
          <svg
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
