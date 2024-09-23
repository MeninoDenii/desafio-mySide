"use client";

import { useContext } from "react";
import Image from "next/image";
import { Frown, ShoppingCart } from "lucide-react";
import { CartContext } from "@/context";
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
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetFooter,
  SheetTrigger,
} from "@/components/ui/sheet";
import { useGetCategory, useGetProducts } from "@/hooks";
import { Button } from "@/components/ui/button";

export default function Home() {
  const [selectedCategory, setSelectedCategory] = useState<string>("Todas");
  const [search, setSearch] = useState<string>("");

  const { products } = useGetProducts();
  const { categories } = useGetCategory();

  const renderProducts = () => {
    if (selectedCategory !== "Todas") {
      const filteredProducts = products?.filter(
        (product) => product.category === selectedCategory
      );

      if (!filteredProducts?.length)
        return (
          <div className="w-full h-screen flex items-center justify-center flex-col gap-6">
            <Frown size={300} />
            <span className="text-black text-3xl  text-center">
              Nenhum produto encontrado!
            </span>
          </div>
        );

      if (search) {
        const searchedProducts = filteredProducts?.filter((product) =>
          product?.title
            .toLocaleLowerCase()
            .includes(search.toLocaleLowerCase())
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

  const cartContext = useContext(CartContext);

  if (!cartContext) return null;

  const { cartItems, removeFromCart } = cartContext;

  const total = cartItems.reduce((acc, item) => acc + item.price, 0);

  return (
    <main style={{ height: "100%" }}>
      <header className="h-16 flex items-center justify-between px-6 py-4 gap-4 bg-white">
        <div>
          <Image src={MySideLogo} height={150} width={150} alt="MySide logo" />
        </div>

        <Input
          placeholder="Search"
          onChange={(e) => setSearch(e.target.value)}
        />
        <div>
          <Sheet>
            <SheetTrigger>
              <div className="relative inline-block">
                <ShoppingCart size={24} className="stroke-black" />
                {cartItems.length > 0 && (
                  <div className="absolute -top-1 -right-1 bg-red-600 text-white rounded-full w-2 h-2 flex items-center justify-center animate-pulse" />
                )}
              </div>
            </SheetTrigger>
            <SheetContent className="flex flex-col justify-between">
              <SheetHeader>
                <SheetTitle>Meu Carrinho</SheetTitle>
              </SheetHeader>
              <SheetDescription className="text-center h-full overflow-auto pb-6">
                {!cartItems?.length ? (
                  <div className="flex items-center flex-col justify-center h-full">
                    <Frown size={100} />
                    <span className="text-black ">
                      Você não possui nenhum produto!
                    </span>
                  </div>
                ) : (
                  <ul className="flex  flex-col gap-4 mt-3 px-4">
                    {cartItems.map((item) => (
                      <li
                        className="flex items-center gap-2 border border-[#dedede] rounded-lg py-2 px-4"
                        key={item.id}
                      >
                        <Image
                          src={item.image}
                          height={50}
                          width={50}
                          alt={item.title}
                        />
                        <div className="flex items-center flex-col justify-between gap-3">
                          <span className="text-black">{item.title}</span>
                          <div className="flex items-center justify-between w-full">
                            <span className="text-black font-bold text-sm">
                              {item.price.toLocaleString("pt-BR", {
                                style: "currency",
                                currency: "BRL",
                              })}
                            </span>
                            <Button
                              className="bg-red-600"
                              onClick={() => removeFromCart(item.id)}
                            >
                              Remover
                            </Button>
                          </div>
                        </div>
                      </li>
                    ))}
                  </ul>
                )}
              </SheetDescription>
              <SheetFooter className="bg-black h-16 flex py-2">
                <span className="text-white font-bold text-3xl">
                  Total:{" "}
                  {total.toLocaleString("pt-BR", {
                    style: "currency",
                    currency: "BRL",
                  })}
                </span>
              </SheetFooter>
            </SheetContent>
          </Sheet>
        </div>
      </header>
      <section className="bg-[#1A237E] h-16 px-6 py-4 flex items-center justify-between lg:hidden">
        <Select onValueChange={(value) => setSelectedCategory(value)}>
          <SelectTrigger>
            <SelectValue placeholder="Selecione uma categoria" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectLabel>Categorias</SelectLabel>
              <SelectItem value="Todas">Todas</SelectItem>
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
          onClick={() => setSelectedCategory("Todas")}
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
      <section className="bg-white px-6 py-4 flex flex-wrap justify-center gap-4 h-full max-h-full overflow-auto">
        {renderProducts()}
      </section>
    </main>
  );
}
