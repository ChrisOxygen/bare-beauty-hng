import { CiHeart } from "react-icons/ci";
import { LuEye } from "react-icons/lu";
import {
  addToCart,
  increaseQuantity,
  Product,
} from "../features/productsSlice";
import { BiCheck, BiShoppingBag, BiSolidShoppingBag } from "react-icons/bi";
import { useAppDispatch, useAppSelector } from "../hooks";
import toast from "react-hot-toast";
import { FiX } from "react-icons/fi";

type ProductItemProps = {
  product: Product;
};

function ProductItem({ product }: ProductItemProps) {
  const cart = useAppSelector((state) => state.productsData.cart);
  const inCart = cart.some((item) => item.product.name === product.name);
  const dispatch = useAppDispatch();

  const handleAddToCart = () => {
    if (inCart) {
      dispatch(increaseQuantity({ product, quantity: 1 }));
    }
    dispatch(addToCart({ product, quantity: 1 }));
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
              Item has been added to your wishlist.
            </span>
            <button className="view-cart-btn">View cart</button>
          </div>
        </div>
        <div className="cart-action-toast__close-container">
          <button className="cart-action-toast__close-btn">
            <FiX />
          </button>
        </div>
      </div>
    );
  };

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
          <button className="product-actions__action product-actions__action--wishlist">
            <CiHeart />
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
