"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { iProduct } from "@/interfaces/interface";

import Image from "next/image";
import MySideLogo from "@/img/mySideLogo.svg";

export default function Page({ params }: { params: { productId: string } }) {
  const [product, setProduct] = useState<iProduct>();

  const fetchProduct = async () => {
    const response = await fetch(
      `https://fakestoreapi.in/api/products/${params.productId}`
    );
    const data = await response.json();
    setProduct(data?.product);
  };

  const router = useRouter();

  useEffect(() => {
    fetchProduct();
  }, []);

  return (
    <div className="bg-[#F6F3EA]">
      <header className="flex items-center justify-between px-4 bg-white h-16 border-b border-[#dedede]">
        <div
          className="flex items-center gap-2 cursor-pointer"
          onClick={() => router.back()}
        >
          <ArrowLeft />
          <span className="font-medium text-black">Voltar</span>
        </div>
        <Image
          src={MySideLogo}
          height={150}
          width={150}
          alt="MySide logo"
          className="cursor-pointer"
          onClick={() => router.back()}
        />
        <div />
      </header>
      <section className="w-full flex flex-col items-center py-10 px-4 gap-6 lg:flex-row">
        <Image
          src={product?.image || ""}
          width={400}
          height={400}
          alt={product?.title || ""}
          className="rounded-lg"
        />
        <div className="flex flex-col justify-center gap-4">
          <span className="bg-[#FCBB14] flex justify-center p-2 w-fit rounded-lg text-xs uppercase text-[#5D2318] font-bold">
            {product?.category}
          </span>
          <span className="text-black font-bold text-3xl">
            {product?.title}
          </span>
          <span className="text-black font-medium text-2xl">
            {product?.price.toLocaleString("pt-BR", {
              style: "currency",
              currency: "BRL",
            })}
          </span>
        </div>
      </section>
      <section className="bg-white p-4 border-t border-[#dedede] ">
        <h2 className="font-bold uppercase">Descrição</h2>
        <p className="mt-2">{product?.description}</p>
      </section>

      <section className="bg-white p-4 border-t border-[#dedede] ">
        <h2 className="font-bold uppercase">informações</h2>
        <div className="flex items-center gap-1 mt-2">
          <span className="font-bold">Fabricante:</span>
          <span className="capitalize">{product?.brand}</span>
        </div>
        <div className="flex items-center gap-1 mt-2">
          <span className="font-bold">Modelo:</span>
          <span className="capitalize">{product?.model}</span>
        </div>
        <div className="flex items-center gap-1 mt-2">
          <span className="font-bold">Categoria:</span>
          <span className="capitalize">{product?.category}</span>
        </div>
        <div className="flex items-center gap-1 mt-2">
          <span className="font-bold">Cor:</span>
          <span className="capitalize">{product?.color}</span>
        </div>
      </section>
    </div>
  );
}
