import React, { useState } from "react";
import { Product, ProductInBasket } from "../types";

type BasketContext = {
  items: ProductInBasket[];
  quantity: number;
  subTotal: number;
  addToBasket: (product: ProductInBasket) => void;
  removeFromBasket: (gtin: string) => void;
  updateQuantity: (gtin: string, newQuantity: number) => void;
};

const BasketContext = React.createContext<BasketContext>({
  items: [],
  quantity: 0,
  subTotal: 0,
  addToBasket: () => {},
  removeFromBasket: () => {},
  updateQuantity: () => {},
});

export const BasketContextProvider = (props: {
  children: boolean | React.ReactChild | React.ReactFragment | React.ReactPortal | null | undefined;
}) => {
  const [items, setItems] = useState<ProductInBasket[]>([]);
  const [quantity, setQuantity] = useState(0);
  const [subTotal, setSubTotal] = useState(0.0);

  /**
   * Adds a single item to basket
   * Takes in product object
   */

  const addToBasket = (product: ProductInBasket) => {
    const price = product.recommendedRetailPrice;
    const _quantity = product.quantity;

    const index = items.findIndex((x) => x.gtin === product.gtin);

    if (index === -1) {
      setItems([...items, product]);
    } else {
      items[index].quantity += product.quantity;
    }

    setQuantity(quantity + _quantity);

    const newSubTotal = subTotal + price * _quantity;
    setSubTotal(newSubTotal);
  };

  /**
   *  Removes the item entirely from basket
   *  even if multiples of the same item is inside the basket
   */
  const removeFromBasket = (gtin: string) => {
    const index = items.findIndex((x) => x.gtin === gtin);

    const itemPrice = items[index].recommendedRetailPrice;
    const itemQuantity = items[index].quantity;
    const newBasket = [...items];
    let basketQuantity = quantity;
    let basketSubTotal = subTotal;

    if (index >= 0) {
      newBasket.splice(index, 1);
      const newQuantity = (basketQuantity -= itemQuantity);
      const newSubTotal = (basketSubTotal -= itemPrice * itemQuantity);
      setQuantity(newQuantity);
      setSubTotal(newSubTotal);
      setItems(newBasket);
    } else {
      console.warn(`Cant remove product (id: ${index}) as its not in basket!`);
    }
  };

  /**
   * Updates the item quantity
   * Takes in gtin and new Quantity
   * Quantity can be lower or higher than current
   */
  const updateQuantity = (gtin: string, newQuantity: number) => {
    const index = items.findIndex((x) => x.gtin === gtin);

    const newBasket = [...items];

    let basketQuantity = quantity;
    let basketSubTotal = subTotal;

    if (newQuantity <= 0) {
      removeFromBasket(gtin);
    } else {
      if (newQuantity < newBasket[index].quantity) {
        const diff = newBasket[index].quantity - newQuantity;

        newBasket[index].quantity -= diff;
        basketQuantity -= diff;

        basketSubTotal -= newBasket[index].recommendedRetailPrice * diff;

        setQuantity(basketQuantity);
        setSubTotal(basketSubTotal);
        setItems(newBasket);
      } else {
        const diff = Math.abs(newQuantity - newBasket[index].quantity);

        basketQuantity += diff;

        basketSubTotal += newBasket[index].recommendedRetailPrice * diff;
        newBasket[index].quantity += diff;

        setQuantity(basketQuantity);
        setSubTotal(basketSubTotal);
        setItems(newBasket);
      }
    }
  };

  const contextValue = {
    addToBasket,
    items,
    quantity,
    subTotal,
    removeFromBasket,
    updateQuantity,
  };

  return <BasketContext.Provider value={contextValue}>{props.children}</BasketContext.Provider>;
};

export default BasketContext;
