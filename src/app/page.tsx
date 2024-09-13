"use client";

import Image from "next/image";
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
          <Image src={MySideLogo} height={150} width={150} alt="MySide logo" />
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
        return <div>Nenhum produto encontrado</div>;

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
    <div className="flex justify-center items-center">
      <main className="max-w-[1080px] w-full">
        <header className="h-16 flex items-center justify-between px-6 py-4 gap-4 bg-white">
          <div>
            <Image
              src={MySideLogo}
              height={150}
              width={150}
              alt="MySide logo"
            />
          </div>

          <Input
            placeholder="Search"
            onChange={(e) => setSearch(e.target.value)}
          />
        </header>
        <section className="bg-[#1D64D0] h-16 px-6 py-4 flex items-center mt-7 justify-between">
          <h1>Ofertas</h1>
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
        <section className="bg-white px-6 py-4 flex flex-wrap justify-center gap-4">
          {renderProducts()}
        </section>
      </main>
    </div>
  );
}
