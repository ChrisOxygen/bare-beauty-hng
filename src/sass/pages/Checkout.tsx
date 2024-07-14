import { Link } from "react-router-dom";
import ShippingMethodSelector from "../../components/ShippingMethodSelector";

function Checkout() {
  return (
    <div className="checkout-page block">
      <div className="box-container">
        <div className="checkout-page__content-area">
          <div className="checkout-page-title-section">
            <h2 className="checkout-page-title-section__title">CHECKOUT</h2>
            <div className="checkout-page-title-section__bread-crumbs">
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
          <div className="checkout-body-section">
            <div className="login-signup-box">
              <button className="auth-btn auth-btn__login">Log in</button>
              <span className="btn-divider"></span>
              <button className="auth-btn auth-btn__signup">Sign up</button>
            </div>
            <div className="checkout-details">
              <div className="shipping-section">
                <div className="shipping-section__header-block checkout-section-header">
                  <h5 className="checkout-section-header__title">
                    Shipping Information
                  </h5>
                  <span className="checkout-section-header__desc">
                    Let us know where you would like your order to be sent
                  </span>
                </div>
                <div className="shipping-section__form-container">
                  <form className="checkout-form">
                    <div className="shipping-info-block">
                      <div className="input-row input-row__single">
                        <div className="input-box">
                          <label
                            htmlFor="fullName"
                            className="input-box__label"
                          >
                            Full Name
                          </label>
                          <input type="text" className="input-box__input" />
                        </div>
                      </div>
                      <div className="input-row input-row__double">
                        <div className="input-box">
                          <label htmlFor="email" className="input-box__label">
                            Email
                          </label>
                          <input type="text" className="input-box__input" />
                        </div>
                        <div className="input-box">
                          <label
                            htmlFor="phoneNumber"
                            className="input-box__label"
                          >
                            Phone Number
                          </label>
                          <input type="text" className="input-box__input" />
                        </div>
                      </div>
                      <div className="input-row input-row__single">
                        <div className="input-box">
                          <label
                            htmlFor="streetAdd"
                            className="input-box__label"
                          >
                            Street address and house number
                          </label>
                          <input type="text" className="input-box__input" />
                        </div>
                      </div>
                      <div className="input-row input-row__double">
                        <div className="input-box">
                          <label htmlFor="country" className="input-box__label">
                            Country
                          </label>
                          <input type="text" className="input-box__input" />
                        </div>
                        <div className="input-box">
                          <label htmlFor="zipCode" className="input-box__label">
                            ZIP Code
                          </label>
                          <input type="text" className="input-box__input" />
                        </div>
                      </div>
                    </div>
                    <div className="shipping-method-block">
                      <div className="shipping-method-block__header checkout-section-header">
                        <h3 className="checkout-section-header__title">
                          Shipping Method
                        </h3>
                      </div>
                      <div className="shipping-method-block__options">
                        <ShippingMethodSelector />
                      </div>
                    </div>
                    <div className="billing-info-block">
                      <div className="billing-info-block__header checkout-section-header">
                        <h5 className="checkout-section-header__title">
                          Billing Information
                        </h5>
                        <span className="checkout-section-header__desc">
                          Complete your purchase with your billing information
                        </span>
                      </div>
                      <div className="same-as-shipping">
                        <input
                          type="checkbox"
                          name="sameAsShipping"
                          id=""
                          className="same-as-shipping__input"
                        />
                        <label htmlFor="" className="same-as-shipping__label">
                          Same as shipping information
                        </label>
                      </div>

                      <div className="billing-info-block__input-section">
                        <div className="input-row input-row__single">
                          <div className="input-box">
                            <label
                              htmlFor="fullName"
                              className="input-box__label"
                            >
                              Full Name
                            </label>
                            <input type="text" className="input-box__input" />
                          </div>
                        </div>
                        <div className="input-row input-row__double">
                          <div className="input-box">
                            <label htmlFor="email" className="input-box__label">
                              Email
                            </label>
                            <input type="text" className="input-box__input" />
                          </div>
                          <div className="input-box">
                            <label
                              htmlFor="phoneNumber"
                              className="input-box__label"
                            >
                              Phone Number
                            </label>
                            <input type="text" className="input-box__input" />
                          </div>
                        </div>
                        <div className="input-row input-row__single">
                          <div className="input-box">
                            <label
                              htmlFor="streetAdd"
                              className="input-box__label"
                            >
                              Street address and house number
                            </label>
                            <input type="text" className="input-box__input" />
                          </div>
                        </div>
                        <div className="input-row input-row__double">
                          <div className="input-box">
                            <label
                              htmlFor="country"
                              className="input-box__label"
                            >
                              Country
                            </label>
                            <input type="text" className="input-box__input" />
                          </div>
                          <div className="input-box">
                            <label
                              htmlFor="zipCode"
                              className="input-box__label"
                            >
                              ZIP Code
                            </label>
                            <input type="text" className="input-box__input" />
                          </div>
                        </div>
                      </div>
                    </div>
                  </form>
                </div>
              </div>
              <div className="checkout-order-summary">
                <div className="checkout-order-summary__header checkout-section-header">
                  <h5 className="checkout-section-header__title">
                    Order Summary
                  </h5>
                  <span className="checkout-section-header__desc">
                    Here is a summary of the items you ordered
                  </span>
                </div>
                <div className="checkout-order-summary__summary-container">
                  <div className="cart-cost-details">
                    <div className="cart-cost-details__item">
                      <span className="cart-cost-details__item-title">
                        Subtotal
                      </span>
                      <span className="cart-cost-details__item-cost">
                        {/* ${subTotal.toFixed(2)} */}00
                      </span>
                    </div>
                    <div className="cart-cost-details__item">
                      <span className="cart-cost-details__item-title">
                        Shipping
                      </span>
                      <span className="cart-cost-details__item-cost">N/A</span>
                    </div>
                    <div className="cart-cost-details__item">
                      <span className="cart-cost-details__item-title">
                        VAT(1%)
                      </span>
                      <span className="cart-cost-details__item-cost">
                        {/* ${vat.toFixed(2)} */}00
                      </span>
                    </div>
                  </div>
                  <div className="cart-total-cost-sect">
                    <div className="cart-total-cost-sect__item">
                      <span className="cart-total-cost-sect__item-title">
                        Total
                      </span>
                      <span className="cart-total-cost-sect__item-cost">
                        {/* ${total} */} 000
                      </span>
                    </div>
                  </div>
                  <button
                    className="goto-checkout-btn"
                    // onClick={() => handleProceedToCheckout()}
                  >
                    Pay
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Checkout;
