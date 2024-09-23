"use client";
import { useEffect, useState, useContext } from "react";
import { CartContext } from "@/context";
import { useRouter } from "next/navigation";
import { ArrowLeft, Frown, LoaderCircle, ShoppingCart } from "lucide-react";
import { iProduct } from "@/interfaces/interface";

import Image from "next/image";
import MySideLogo from "@/img/mySideLogo.svg";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

export default function Page({ params }: { params: { productId: string } }) {
  const [product, setProduct] = useState<iProduct>();
  const [loading, setLoading] = useState<boolean>(false);

  const fetchProduct = async () => {
    const response = await fetch(
      `https://fakestoreapi.in/api/products/${params.productId}`
    );
    const data = await response.json();

    return data;
  };

  const router = useRouter();

  useEffect(() => {
    setLoading(true);
    fetchProduct()
      .then((data) => {
        setProduct(data?.product);
        setLoading(false);
      })
      .catch(() => {
        setLoading(false);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  const cartContext = useContext(CartContext);

  if (!cartContext) return null;

  const { addToCart, cartItems, removeFromCart } = cartContext;

  const handleAddToCart = () => {
    if (!product) return null;

    addToCart({
      id: product?.id,
      title: product?.title,
      price: product?.price,
      image: product?.image,
    });
  };

  const total = cartItems.reduce((acc, item) => acc + item.price, 0);

  return (
    <div className="bg-white h-full">
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
                      Nenhum produto no carrinho
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
      {loading ? (
        <div className="flex items-center justify-center h-full">
          <LoaderCircle className="animate-spin stroke-blue-800" />
        </div>
      ) : (
        <>
          <section className="w-full flex flex-col items-center bg-[#DCDCDC] py-10 px-4 gap-6 lg:flex-row">
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
              <Button
                className="bg-green-600"
                disabled={Boolean(
                  cartItems.find((item) => item.id === product?.id)
                )}
                onClick={handleAddToCart}
              >
                Adicionar ao carrinho
              </Button>
            </div>
          </section>
          <section className="bg-white p-4 border-t border-[#dedede] h-fit ">
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
        </>
      )}
    </div>
  );
}
