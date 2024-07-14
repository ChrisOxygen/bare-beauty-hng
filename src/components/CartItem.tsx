import { LuX } from "react-icons/lu";
import { removeFromCart, type CartItem } from "../features/productsSlice";
import CartItemQuantityControl from "./CartItemQuantityControl";
import { useAppDispatch, useAppSelector } from "../hooks";
import { useEffect, useState } from "react";
import { useViewport } from "react-viewport-hooks";
import { ScreenType } from "../layouts/ProductArch";

type CartItemProps = {
  cartProduct: CartItem;
};

function CartItem({ cartProduct }: CartItemProps) {
  const cart = useAppSelector((state) => state.productsData.cart);
  const { vw } = useViewport();
  const [screen, setScreen] = useState<ScreenType>(
    ((vw) => {
      if (vw < 620) return "mobile";
      if (vw < 996) return "tablet";
      return "desktop";
    })(vw)
  );

  const dispatch = useAppDispatch();

  const removeItemFromCart = () => {
    dispatch(removeFromCart(cartProduct));
    localStorage.setItem("cart", JSON.stringify(cart));
  };

  useEffect(() => {
    if (vw < 620) return setScreen("mobile");
    else if (vw < 996) return setScreen("tablet");
    else setScreen("desktop");
  }, [vw]);
  const { product, quantity } = cartProduct;

  const totalPrice = product.sale_price
    ? product.sale_price * quantity
    : product.normal_price * quantity;

  if (screen === "mobile" || screen === "tablet") {
    return (
      <div className="mobile-cart-item">
        <div className="mobile-cart-item__img">
          <img src={`/assets/product images/${product.image}`} alt="" />
        </div>
        <div className="mobile-cart-item__details">
          <div className="m-cart-item-top">
            <h3 className="mobile-cart-item__title">{product.name}</h3>
            <span className="mobile-cart-item__price">
              ${totalPrice.toFixed(2)}
            </span>
          </div>
          <div className="m-cart-item-bottom">
            <CartItemQuantityControl
              itemQuantity={quantity}
              product={product}
            />
            <button
              className="remove-item-btn"
              onClick={() => removeItemFromCart()}
            >
              <span className="remove-item-btn__icon">
                <LuX />
              </span>
            </button>
          </div>
        </div>
      </div>
    );
  }
  return (
    <div className="single-cart-item table-row">
      <div className="table-column table-column--prducts">
        <div className="cart-product">
          <div className="cart-product__img">
            <img src={`/assets/product images/${product.image}`} alt="" />
          </div>
          <span className="cart-product__title">{product.name}</span>
        </div>
      </div>
      <div className="table-column table-column--price">
        <span className="cart-product__price">
          ${product.sale_price ? product.sale_price : product.normal_price}
        </span>
      </div>
      <div className="table-column table-column--quantity">
        <CartItemQuantityControl itemQuantity={quantity} product={product} />
      </div>
      <div className="table-column table-column--total">
        <span className="cart-product__total">${totalPrice.toFixed(2)}</span>
      </div>
      <div className="table-column table-column--remov-btn">
        <button
          className="remove-item-btn"
          onClick={() => dispatch(removeFromCart(cartProduct))}
        >
          <span className="remove-item-btn__icon">
            <LuX />
          </span>
        </button>
      </div>
    </div>
  );
}

export default CartItem;
