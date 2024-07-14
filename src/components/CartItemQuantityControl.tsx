import { FormEvent, useEffect, useState } from "react";
import { LuMinus, LuPlus } from "react-icons/lu";
import { useDispatch } from "react-redux";

import {
  Product,
  removeFromCart,
  updateCartItemQuantity,
} from "../features/productsSlice";
import CartItem from "./CartItem";

type CartItemQuantityControlProps = {
  itemQuantity: number;
  product: Product;
};

function CartItemQuantityControl({
  itemQuantity,
  product,
}: CartItemQuantityControlProps) {
  const dispatch = useDispatch();
  const [quantity, setQuantity] = useState<number>(itemQuantity);

  useEffect(() => {
    if (itemQuantity === quantity) return;
    if (quantity < 1) {
      dispatch(removeFromCart({ product, quantity: itemQuantity } as CartItem));
      return;
    }
    dispatch(updateCartItemQuantity({ product, quantity } as CartItem));
  }, [itemQuantity, dispatch, quantity, product]);

  if (quantity === null) return <span>Loading...</span>;

  const handleQuantityChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuantity(parseInt(e.target.value));
  };

  const incrementQuantity = (e: FormEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setQuantity((prev) => prev + 1);
  };

  const decrementQuantity = (e: FormEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setQuantity((prev) => prev - 1);
  };

  return (
    <div className="quantity-input-box">
      <button
        className="quantity-input-box__operator-icon "
        onClick={decrementQuantity}
      >
        <LuMinus />
      </button>

      <input
        type="number"
        name="quantity"
        id=""
        value={quantity}
        onChange={handleQuantityChange}
      />

      <button
        className="quantity-input-box__operator-icon "
        onClick={incrementQuantity}
      >
        <LuPlus />
      </button>
    </div>
  );
}

export default CartItemQuantityControl;
