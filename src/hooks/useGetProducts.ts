import { iProducts } from "@/interfaces/interface";
import { useState, useEffect } from "react";

export const useGetProducts = () => {
  const [products, setProducts] = useState<iProducts["products"]>();
  const [loading, setLoading] = useState<boolean>(false);

  const fetchProducts = async () => {
    const response = await fetch("https://fakestoreapi.in/api/products");
    const data = await response.json();
    return data;
  };

  useEffect(() => {
    setLoading(true);

    fetchProducts()
      .then((data) => {
        setProducts(data?.products);
      })
      .catch(() => {
        setLoading(false);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  return {
    products,
    loading,
  };
};
