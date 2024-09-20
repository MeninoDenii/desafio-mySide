/* eslint-disable @next/next/no-img-element */
"use client";
import { useRouter } from "next/navigation";
import Image from "next/image";

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
  description,
  id,
  image,
  price,
  title,
}) => {
  const router = useRouter();

  const handleClick = () => {
    router.push(`/products/${id}`);
  };

  return (
    <div
      key={id}
      className="flex flex-col border border-[#dedede] rounded-lg w-[260px] justify-between cursor-pointer ease-in duration-300 hover:scale-110"
      onClick={handleClick}
    >
      <div className="flex">
        <Image
          className="rounded-t-lg"
          src={image}
          alt={title}
          width={500}
          height={500}
        />
      </div>
      <div className="bg-black flex flex-col w-full px-4 py-6 rounded-b-lg">
        <span className="text-white font-bold text-3xl">{`R$ ${price}`}</span>
        <span className="truncate text-white font-medium text-2xl">
          {title}
        </span>
        <span className="truncate  text-gray-400 text-base font-medium">
          {description}
        </span>
      </div>
    </div>
  );
};
