import { useEffect, useState } from "react";

export const useGetCategory = () => {
  const [categories, setCategories] = useState<string[]>();

  const fetchCategory = async () => {
    const response = await fetch(
      "https://fakestoreapi.in/api/products/category"
    );
    const data = await response.json();
    return data;
  };

  useEffect(() => {
    fetchCategory()
      .then((data) => setCategories(data?.categories))
      .catch(console.error);
  }, []);

  return {
    categories,
  };
};
