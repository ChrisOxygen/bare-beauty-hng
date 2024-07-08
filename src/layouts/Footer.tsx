import { CiLocationOn, CiMail, CiPhone } from "react-icons/ci";
import { LuFacebook, LuInstagram, LuTwitter } from "react-icons/lu";
import { Link } from "react-router-dom";

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-details-block block">
        <div className="box-container footer-details-block__content-area">
          <div className="footer-contact-container">
            <div className="footer-logo-box">
              <img
                src="/assets/BareBeauty-logo.svg"
                alt=""
                className="footer-logo-box__logo"
              />
            </div>
            <ul className="contact-details-list">
              <li className="contact-details-list__item">
                <span className="contact-details-list__icon">
                  <CiLocationOn />
                </span>
                <span className="contact-details-list__text">
                  17, Albert Einstein Avenue, Lagos, Nigeria.
                </span>
              </li>
              <li className="contact-details-list__item">
                <span className="contact-details-list__icon">
                  <CiPhone />
                </span>
                <span className="contact-details-list__text">+23472947023</span>
              </li>
              <li className="contact-details-list__item">
                <span className="contact-details-list__icon">
                  <CiMail />
                </span>
                <span className="contact-details-list__text">
                  @barebeautyng@yahoo.com
                </span>
              </li>
            </ul>
            <div className="footer-social-media-handles">
              <span className="social-media-icon">
                <LuInstagram />
              </span>
              <span className="social-media-icon">
                <LuFacebook />
              </span>
              <span className="social-media-icon">
                <LuTwitter />
              </span>
            </div>
          </div>
          <div className="footer-usefull-links">
            <h5 className="footer-usefull-links__title">SHOP</h5>
            <menu className="footer-usefull-links__list">
              <li className="footer-usefull-links__item">
                <Link to="/" className="footer-usefull-links__link">
                  Home
                </Link>
              </li>
              <li className="footer-usefull-links__item">
                <Link to="/" className="footer-usefull-links__link">
                  Brands
                </Link>
              </li>
              <li className="footer-usefull-links__item">
                <Link to="/" className="footer-usefull-links__link">
                  Categories
                </Link>
              </li>
              <li className="footer-usefull-links__item">
                <Link to="/" className="footer-usefull-links__link">
                  Blog
                </Link>
              </li>
            </menu>
          </div>
          <div className="footer-usefull-links">
            <h5 className="footer-usefull-links__title">LEGAL</h5>
            <menu className="footer-usefull-links__list">
              <li className="footer-usefull-links__item">
                <Link to="/" className="footer-usefull-links__link">
                  Privacy Policy
                </Link>
              </li>
              <li className="footer-usefull-links__item">
                <Link to="/" className="footer-usefull-links__link">
                  Terms And Conditions
                </Link>
              </li>
              <li className="footer-usefull-links__item">
                <Link to="/" className="footer-usefull-links__link">
                  Contact
                </Link>
              </li>
              <li className="footer-usefull-links__item">
                <Link to="/" className="footer-usefull-links__link">
                  About Us
                </Link>
              </li>
            </menu>
          </div>
          <div className="footer-newsletter-container">
            <h5 className="footer-newsletter-container__title">
              Subscribe to our newsletter
            </h5>
            <span className="footer-newsletter-container__desc">
              Score 10% off your first purchase! Subscribe to our newsletter for
              exclusive discounts.
            </span>
            <form action="" className="footer-newsletter-container__form">
              <input
                type="text"
                className="footer-newsletter-container__input"
                placeholder="Enter your email address"
              />
              <button className="footer-newsletter-container__submit">
                Subscribe
              </button>
            </form>
          </div>
        </div>
      </div>
      <div className="footer-copyright-block block">
        <div className="box-container footer-copyright-block__content-area">
          <span className="copyright-text">© 2024 BareBeauty Inc</span>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
