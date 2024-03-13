import { products, type Product } from "@/products/data/products";
import { ItemCard } from "@/shopping-cart/components/ItemCard";
import { cookies } from "next/headers";
import { WidgetItem } from "../../../components/WidgetItem";

interface ProductInCart {
  product: Product;
  quantity: number;
}

const getProductsInCart = (cart: { [id: string]: number }) => {
  const productsInCart: ProductInCart[] = [];

  Object.keys(cart).forEach((id) => {
    const product = products.find((prod) => prod.id === id);

    if (product) {
      productsInCart.push({ product, quantity: cart[id] });
    }
  });
  return productsInCart;
};

export default function CartPage() {
  const cookiesStore = cookies();
  const cart = JSON.parse(cookiesStore.get("cart")?.value ?? "{}");

  const productsInCart = getProductsInCart(cart);

  const totalPrice = productsInCart.reduce(
    (acum, el) => acum + el.product.price * el.quantity,
    0
  );
  return (
    <div>
      <h1 className="text-5xl">Products in cart</h1>
      <hr />
      <div className="flex">
        <div className="flex flex-col sm:flex-row gap-2 w-full">
          <div className="flex flex-col gap-2 w-full sm:w-8/12">
            {productsInCart.map(({ product, quantity }) => {
              return (
                <ItemCard
                  key={product.id}
                  product={product}
                  quantity={quantity}
                />
              );
            })}
          </div>
        </div>
        <div className="flex flex-col w-full sm:w-4/12 gap-2 mt-4">
          <WidgetItem totalPrice={totalPrice} />
          <span className="text-center text-2xl font-bold">
            Total Price with taxes : $ {(totalPrice * 1.15).toFixed(2)}
          </span>
        </div>
      </div>
    </div>
  );
}
