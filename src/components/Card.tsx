/* eslint-disable @next/next/no-img-element */
"use client";

interface iCard {
  title: string;
  description: string;
  id: number;
  image: string;
  price: number;
  count: number;
  category: string;
}

export const Card: React.FC<iCard> = ({
  category,
  count,
  description,
  id,
  image,
  price,
  title,
}) => {
  return (
    <div
      key={id}
      className="border border-black  rounded-lg px-4 pt-6 flex flex-col justify-between w-[300px]"
    >
      <div className="flex items-center justify-between">
        <h2 className="text-xl capitalize font-bold">{category}</h2>
        <div className="flex items-center justify-center bg-gray-500 py-2 px-2 rounded-md">
          <span className="text-sm text-white font-bold">{count}</span>
        </div>
      </div>
      <div className="flex  justify-center">
        <img src={image} width={80} height={80} alt={title} />
      </div>

      <div>
        <div>{title}</div>

        <div>{price}</div>
        <span>{description}</span>
      </div>
    </div>
  );
};
