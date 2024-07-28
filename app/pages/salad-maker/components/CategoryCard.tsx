import React from "react";
import Image from "next/image";

export default function CategoryCard({
  title,
  pic,
  setValue,
  value,
}: {
  title: string;
  pic: string;
  setValue: React.Dispatch<React.SetStateAction<string[]>>;
  value: string[];
}) {
  const isSelected = value.includes(title.toLowerCase());

  return (
    <>
      <div
        //check with prev value to double click to set value = ""
        onClick={() =>
          setValue((prev) => {
            const newValue = title.toLowerCase();
            return prev.includes(newValue)
              ? prev.filter((category) => category !== newValue)
              : [...prev, newValue];
          })
        }
        className={`card bg-base-100 cursor-pointer hover:scale-105 duration-200 ${
          isSelected && "shadow-lg"
        }`}
      >
        <div className="flex justify-end m-2">
          <svg
            viewBox="0 0 1024 1024"
            fill="currentColor"
            height="1.5em"
            className="text-success"
          >
            {isSelected && (
              <path d="M512 64C264.6 64 64 264.6 64 512s200.6 448 448 448 448-200.6 448-448S759.4 64 512 64zm193.5 301.7l-210.6 292a31.8 31.8 0 01-51.7 0L318.5 484.9c-3.8-5.3 0-12.7 6.5-12.7h46.9c10.2 0 19.9 4.9 25.9 13.3l71.2 98.8 157.2-218c6-8.3 15.6-13.3 25.9-13.3H699c6.5 0 10.3 7.4 6.5 12.7z" />
            )}
          </svg>
        </div>
        <div className="mb-4">
          <Image
            src={pic}
            width={240}
            height={240}
            alt="poster"
            className="h-20 w-20 rounded mb-2 mx-auto"
          />
          <p className="text-lg text-center opacity-50">{title}</p>
        </div>
      </div>
    </>
  );
}
