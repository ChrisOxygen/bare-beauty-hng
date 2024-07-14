import { BiArrowBack } from "react-icons/bi";
import { Link, useNavigate } from "react-router-dom";
import CartItem from "../components/CartItem";
import { useAppDispatch, useAppSelector } from "../hooks";
import { initiateCheckout } from "../features/productsSlice";

function CartPage() {
  const cart = useAppSelector((state) => state.productsData.cart);

  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const subTotal =
    cart.length > 0
      ? cart.reduce(
          (acc, item) => acc + item.product.sale_price! * item.quantity,
          0
        )
      : 0;

  const vat = subTotal * 0.01;

  const total = subTotal + vat;

  const handleProceedToCheckout = () => {
    dispatch(initiateCheckout({ subTotal, vat, total }));
    navigate("/checkout");
  };

  if (cart.length === 0) {
    return (
      <div className="cart-page block">
        <div className="box-container">
          <div className="cart-page__content-area">
            <div className="empty-cart-section">
              <h3 className="empty-cart-section__title">Your cart is empty</h3>
              <Link to="/" className="empty-cart-section__link">
                Continue shopping
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }
  return (
    <div className="cart-page block">
      <div className="box-container">
        <div className="cart-page__content-area">
          <div className="cart-page-title-section">
            <h2 className="cart-page-title-section__title">MY CART</h2>
            <div className="cart-page-title-section__bread-crumbs">
              <menu className="breadcrumb-list">
                <li className="breadcrumb-list__item">
                  <Link to="/" className="breadcrumb-list__link">
                    Home
                  </Link>
                </li>
                <li className="breadcrumb-list__item">
                  <Link to="/" className="breadcrumb-list__link">
                    Categories
                  </Link>
                </li>
                <li className="breadcrumb-list__item">
                  <Link
                    to="/"
                    className="breadcrumb-list__link breadcrumb-list__link--current"
                  >
                    Face moisturizers
                  </Link>
                </li>
              </menu>
            </div>
          </div>
          <div className="cart-products-section">
            <div className="cart-table-header-row table-row">
              <div className="table-column table-column--prducts">
                <span className="title-text">Products</span>
              </div>
              <div className="table-column table-column--price">
                <span className="title-text">Price</span>
              </div>
              <div className="table-column table-column--quantity">
                <span className="title-text">Quantity</span>
              </div>
              <div className="table-column table-column--total">
                <span className="title-text">Total</span>
              </div>
              <div className="table-column table-column--remov-btn"></div>
            </div>
            <div className="cart-table-body-row">
              {cart.map((cartItem, index) => (
                <CartItem key={index} cartProduct={cartItem} />
              ))}
            </div>
            <button className="back-to-shop-btn">
              <span className="back-to-shop-btn__icon">
                <BiArrowBack />
              </span>
              <span className="back-to-shop-btn__text">Continue Shopping</span>
            </button>
          </div>
          <div className="cart-summary-section">
            <div className="coupon-container">
              <h4 className="coupon-container__title">Coupon Code</h4>
              <form action="" className="coupon-container__form">
                <input
                  type="text"
                  className="coupon-container__input"
                  placeholder="Enter your coupon code"
                />
                <button className="coupon-container__btn">Apply</button>
              </form>
            </div>
            <div className="sumarry-container">
              <div className="cart-cost-details">
                <div className="cart-cost-details__item">
                  <span className="cart-cost-details__item-title">
                    Subtotal
                  </span>
                  <span className="cart-cost-details__item-cost">
                    ${subTotal.toFixed(2)}
                  </span>
                </div>
                <div className="cart-cost-details__item">
                  <span className="cart-cost-details__item-title">
                    Shipping
                  </span>
                  <span className="cart-cost-details__item-cost">N/A</span>
                </div>
                <div className="cart-cost-details__item">
                  <span className="cart-cost-details__item-title">VAT(1%)</span>
                  <span className="cart-cost-details__item-cost">
                    ${vat.toFixed(2)}
                  </span>
                </div>
              </div>
              <div className="cart-total-cost-sect">
                <div className="cart-total-cost-sect__item">
                  <span className="cart-total-cost-sect__item-title">
                    Total
                  </span>
                  <span className="cart-total-cost-sect__item-cost">
                    ${total}
                  </span>
                </div>
              </div>
              <button
                className="goto-checkout-btn"
                onClick={() => handleProceedToCheckout()}
              >
                Proceed to Checkout
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CartPage;
