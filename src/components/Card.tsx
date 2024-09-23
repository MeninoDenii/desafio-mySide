/* eslint-disable @next/next/no-img-element */
"use client";
import { CartContext } from "@/context";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { CirclePlus } from "lucide-react";
import { useContext } from "react";

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

  const cartContext = useContext(CartContext);

  if (!cartContext) return null;

  const { addToCart, cartItems } = cartContext;

  const handleClick = () => {
    router.push(`/products/${id}`);
  };

  const handleAddToCart = () => {
    const item = { id, title, price, image };
    addToCart(item);
  };

  return (
    <div
      key={id}
      className="flex flex-col border border-[#dedede] rounded-lg w-[260px]  max-h-[400px] justify-between cursor-pointer ease-in duration-300 hover:scale-110"
    >
      <div className="flex">
        <Image
          className="rounded-t-lg"
          src={image}
          alt={title}
          width={500}
          height={500}
          onClick={handleClick}
        />
      </div>
      <div className="bg-black flex flex-col w-full px-4 py-6 rounded-b-lg">
        <div className="flex items-center justify-between w-full">
          <span className="text-white font-bold text-3xl">
            {price.toLocaleString("pt-BR", {
              style: "currency",
              currency: "BRL",
            })}
          </span>
          {!cartItems.find((item) => item.id === id) && (
            <CirclePlus
              className="stroke-green-600"
              size={24}
              onClick={handleAddToCart}
            />
          )}
        </div>
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
