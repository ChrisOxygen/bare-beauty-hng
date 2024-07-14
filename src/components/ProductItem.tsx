import { LuEye } from "react-icons/lu";
import {
  addToCart,
  addToWishList,
  increaseQuantity,
  Product,
  removeFromWishList,
} from "../features/productsSlice";
import {
  BiCheck,
  BiHeart,
  BiShoppingBag,
  BiSolidHeart,
  BiSolidShoppingBag,
} from "react-icons/bi";
import { useAppDispatch, useAppSelector } from "../hooks";
import toast from "react-hot-toast";
import { FiX } from "react-icons/fi";
import { useEffect, useState } from "react";
import { useViewport } from "react-viewport-hooks";
import { ScreenType } from "../layouts/ProductArch";
import { useNavigate } from "react-router-dom";

type ProductItemProps = {
  product: Product;
};

function ProductItem({ product }: ProductItemProps) {
  const cart = useAppSelector((state) => state.productsData.cart);
  const wishList = useAppSelector((state) => state.productsData.wishList);
  const inCart = cart.some((item) => item.product.name === product.name);
  const inWishlist = wishList.some((item) => item.name === product.name);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const { vw } = useViewport();
  const [screen, setScreen] = useState<ScreenType>(
    ((vw) => {
      if (vw < 620) return "mobile";
      if (vw < 996) return "tablet";
      return "desktop";
    })(vw)
  );

  useEffect(() => {
    if (vw < 620) return setScreen("mobile");
    else if (vw < 996) return setScreen("tablet");
    else setScreen("desktop");
  }, [vw]);

  const handleAddToCart = () => {
    if (inCart) {
      dispatch(increaseQuantity({ product, quantity: 1 }));
    } else {
      dispatch(addToCart({ product, quantity: 1 }));
    }

    toast.custom(
      <div className="cart-action-toast">
        <div className="cart-action-toast__details">
          <p className="cart-success">
            <span className="cart-success__text">Success</span>
            <span className="cart-success__icon">
              <BiCheck />
            </span>
          </p>
          <div className="cart-msg-btn">
            <span className="cart-msg">
              {inCart
                ? "Item's quantity has increased."
                : "Item added to cart."}
            </span>
            <button className="view-cart-btn" onClick={() => navigate("/cart")}>
              View cart
            </button>
          </div>
        </div>
        <div className="cart-action-toast__close-container">
          <button
            className="cart-action-toast__close-btn"
            onClick={() => toast.dismiss()}
          >
            <FiX />
          </button>
        </div>
      </div>
    );
  };

  const handleWishlistClick = () => {
    if (inWishlist) {
      dispatch(removeFromWishList(product));
    } else {
      dispatch(addToWishList(product));
    }

    toast.custom(
      <div className="cart-action-toast">
        <div className="cart-action-toast__details">
          <p className="cart-success">
            <span className="cart-success__text">Success</span>
            <span className="cart-success__icon">
              <BiCheck />
            </span>
          </p>
          <div className="cart-msg-btn">
            <span className="cart-msg">
              {inWishlist
                ? "Item removed from wishlist."
                : "Item added to wishlist."}
            </span>
          </div>
        </div>
        <div className="cart-action-toast__close-container">
          <button
            className="cart-action-toast__close-btn"
            onClick={() => toast.dismiss()}
          >
            <FiX />
          </button>
        </div>
      </div>
    );
  };

  if (screen === "mobile" || screen === "tablet") {
    return (
      <div className="mb-single-product-box">
        <div className="mb-image-section">
          <img
            src={`assets/product images/${product.image}`}
            alt=""
            className="mb-image-section__img"
          />
          <button
            className="mb-product-actions__action mb-product-actions__action--add-to-cart"
            onClick={() => handleAddToCart()}
          >
            {inCart ? <BiSolidShoppingBag /> : <BiShoppingBag />}
          </button>
        </div>
        <div className="mb-details-section">
          <div className="mb-product-title-wishlist">
            <h5 className="mb-product-title">{product.name}</h5>
            <button
              className="mb-product-actions__action mb-product-actions__action--wishlist"
              onClick={() => handleWishlistClick()}
            >
              {inWishlist ? <BiSolidHeart /> : <BiHeart />}
            </button>
          </div>
          <div className="product-price">
            <span className="product-price__normal-price">
              ${product.normal_price}
            </span>
            <span className="product-price__sale-price">
              ${product.sale_price}
            </span>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="single-product-box">
      <div className="image-section">
        <img
          src={`assets/product images/${product.image}`}
          alt=""
          className="image-section__img"
        />
        <div className="product-actions">
          <button
            className="product-actions__action product-actions__action--add-to-cart"
            onClick={() => handleAddToCart()}
          >
            {inCart ? <BiSolidShoppingBag /> : <BiShoppingBag />}
          </button>
          <button className="product-actions__action product-actions__action--view">
            <LuEye />
          </button>
          <button
            className="product-actions__action product-actions__action--wishlist"
            onClick={() => handleWishlistClick()}
          >
            {inWishlist ? <BiSolidHeart /> : <BiHeart />}
          </button>
        </div>
      </div>
      <div className="details-section">
        <h5 className="product-title">{product.name}</h5>
        <div className="product-price">
          <span className="product-price__normal-price">
            ${product.normal_price}
          </span>
          <span className="product-price__sale-price">
            ${product.sale_price}
          </span>
        </div>
      </div>
    </div>
  );
}

export default ProductItem;
