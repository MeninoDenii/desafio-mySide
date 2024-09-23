import "@testing-library/jest-dom";
import { render, screen, fireEvent } from "@testing-library/react";
import { Card } from "@/components/Card";
import { CartContext } from "@/context";
import { useRouter } from "next/navigation";

jest.mock("next/navigation", () => ({
  useRouter: jest.fn(),
}));

const mockRouter = {
  push: jest.fn(),
};

(useRouter as jest.Mock).mockReturnValue(mockRouter);

describe("Card Component", () => {
  const mockAddToCart = jest.fn();
  const cartContextValue = {
    addToCart: mockAddToCart,
    cartItems: [],
    removeFromCart: jest.fn(),
  };

  const product = {
    id: 1,
    title: "Produto Teste",
    description: "Descrição do Produto",
    image: "/produto.jpg",
    price: 100,
    count: 1,
    category: "Categoria Teste",
  };

  it("deve renderizar o componente corretamente", () => {
    render(
      <CartContext.Provider value={cartContextValue}>
        <Card {...product} />
      </CartContext.Provider>
    );

    expect(screen.getByText("Produto Teste")).toBeInTheDocument();
    expect(screen.getByText("Produto Teste")).toBeInTheDocument();
    expect(screen.getByText("Descrição do Produto")).toBeInTheDocument();
  });

  it("deve navegar para a página do produto ao clicar na imagem", () => {
    render(
      <CartContext.Provider value={cartContextValue}>
        <Card {...product} />
      </CartContext.Provider>
    );

    const image = screen.getByAltText("Produto Teste");
    fireEvent.click(image);

    expect(mockRouter.push).toHaveBeenCalledWith("/products/1");
  });

  it("deve adicionar o produto ao carrinho ao clicar no botão de adicionar ao carrinho", () => {
    render(
      <CartContext.Provider value={cartContextValue}>
        <Card {...product} />
      </CartContext.Provider>
    );

    const addToCartButton = screen.getByTestId("button");
    fireEvent.click(addToCartButton);

    expect(mockAddToCart).toHaveBeenCalledWith({
      id: 1,
      title: "Produto Teste",
      price: 100,
      image: "/produto.jpg",
    });
  });

  it("não deve mostrar o botão de adicionar ao carrinho se o item já estiver no carrinho", () => {
    const cartContextWithItem = {
      addToCart: mockAddToCart,
      cartItems: [
        { id: 1, title: "Produto Teste", price: 100, image: "/produto.jpg" },
      ],
      removeFromCart: jest.fn(),
    };

    render(
      <CartContext.Provider value={cartContextWithItem}>
        <Card {...product} />
      </CartContext.Provider>
    );

    expect(screen.queryByTestId("button")).toBeNull();
  });
});
