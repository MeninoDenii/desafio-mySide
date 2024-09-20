export interface iProducts {
  products: {
    brand: string;
    category: string;
    color: string;
    description: string;
    discount: number;
    id: number;
    image: string;
    model: string;
    price: number;
    title: string;
  }[];
}

export interface iProduct {
  brand: string;
  category: string;
  color: string;
  description: string;
  discount: number;
  id: number;
  image: string;
  model: string;
  price: number;
  title: string;
}

export interface iCategory {
  categories: string[];
}
