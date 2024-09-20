"use client";

import Image from "next/image";
import { Frown } from "lucide-react";
import MySideLogo from "@/img/mySideLogo.svg";
import { Card } from "@/components/Card";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { useGetCategory, useGetProducts } from "@/hooks";

export default function Home() {
  const [selectedCategory, setSelectedCategory] = useState<string>();
  const [search, setSearch] = useState<string>("");

  const { products } = useGetProducts();
  const { categories } = useGetCategory();

  const renderProducts = () => {
    if (selectedCategory) {
      const filteredProducts = products?.filter(
        (product) => product.category === selectedCategory
      );

      if (!filteredProducts?.length)
        return (
          <div className="w-full h-screen flex items-center justify-center flex-col gap-6">
            <Frown size={300} />
            <span className="text-black text-3xl">
              Nenhum produto encontrado!
            </span>
          </div>
        );

      return filteredProducts.map((product) => (
        <Card
          key={product.id}
          category={product.category}
          count={1}
          description={product.description}
          id={product.id}
          image={product.image}
          price={product.price}
          title={product.title}
        />
      ));
    }

    if (search) {
      const searchedProducts = products?.filter((product) =>
        product?.title.toLocaleLowerCase().includes(search.toLocaleLowerCase())
      );

      if (!searchedProducts?.length)
        return (
          <div className="w-full h-screen flex items-center justify-center flex-col gap-6">
            <Frown size={300} />
            <span className="text-black text-3xl">
              Nenhum produto encontrado!
            </span>
          </div>
        );

      return searchedProducts.map((product) => (
        <Card
          key={product.id}
          category={product.category}
          count={1}
          description={product.description}
          id={product.id}
          image={product.image}
          price={product.price}
          title={product.title}
        />
      ));
    }

    return products?.map((product) => (
      <Card
        key={product.id}
        category={product.category}
        count={product?.discount}
        description={product.description}
        id={product.id}
        image={product.image}
        price={product.price}
        title={product.title}
      />
    ));
  };

  return (
    <main>
      <header className="h-16 flex items-center justify-between px-6 py-4 gap-4 bg-[#B0B0B0]">
        <div>
          <Image src={MySideLogo} height={150} width={150} alt="MySide logo" />
        </div>

        <Input
          placeholder="Search"
          onChange={(e) => setSearch(e.target.value)}
        />
      </header>
      <section className="bg-[#1A237E] h-16 px-6 py-4 flex items-center justify-start lg:hidden">
        <Select onValueChange={(value) => setSelectedCategory(value)}>
          <SelectTrigger className="w-[280px]">
            <SelectValue placeholder="Selecione uma categoria" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectLabel>Categorias</SelectLabel>
              {categories?.map((product, index) => (
                <SelectItem key={index} value={product}>
                  {product}
                </SelectItem>
              ))}
            </SelectGroup>
          </SelectContent>
        </Select>
      </section>
      <section className="hidden bg-[#1A237E] md:flex items-center justify-center">
        <div
          className={`flex items-center justify-center ${
            !selectedCategory && "bg-[#E91E63]"
          }  py-2 px-4 border-l border-[#dedede] last:border-r hover:bg-[#29B6F6]`}
          onClick={() => setSelectedCategory("")}
        >
          <span className="text-white uppercase font-bold text-md cursor-pointer">
            Todas
          </span>
        </div>
        {categories?.map((product, index) => (
          <div
            key={index}
            className={`flex items-center justify-center ${
              selectedCategory === product && "bg-[#E91E63]"
            }  py-2 px-4 border-l border-[#dedede] last:border-r hover:bg-[#29B6F6]`}
            onClick={() => setSelectedCategory(product)}
          >
            <span
              key={index}
              className="text-white uppercase font-bold text-md cursor-pointer"
            >
              {product}
            </span>
          </div>
        ))}
      </section>
      <section className="bg-white px-6 py-4 flex flex-wrap justify-center gap-4 h-1/2">
        {renderProducts()}
      </section>
    </main>
  );
}
