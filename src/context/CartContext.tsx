"use client";

import { createContext, useState, ReactNode } from "react";

interface iCart {
  id: number;
  title: string;
  price: number;
  image: string;
}

interface CartContextType {
  cartItems: iCart[];
  addToCart: (item: iCart) => void;
  removeFromCart: (id: number) => void;
}

interface CartProviderProps {
  children: ReactNode;
}

export const CartContext = createContext<CartContextType | undefined>(
  undefined
);

// export const CartContext = createContext<CartContextType>({
//   cartItems: [],
//   addToCart: () => {},
//   removeFromCart: () => {},
// });

export const CartProvider = ({ children }: CartProviderProps) => {
  const [cartItems, setCartItems] = useState<iCart[]>([]);

  const addToCart = (item: iCart) => {
    setCartItems((prevItems) => [...prevItems, item]);
  };

  const removeFromCart = (id: number) => {
    setCartItems((prevItems) => prevItems.filter((item) => item.id !== id));
  };

  const value: CartContextType = {
    cartItems,
    addToCart,
    removeFromCart,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};
