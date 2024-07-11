import { CiHeart, CiSearch, CiShoppingCart, CiUser } from "react-icons/ci";
import { GoChevronDown, GoSearch } from "react-icons/go";

import { Link } from "react-router-dom";
import MobileMenu from "../components/MobileMenu";

function Header() {
  return (
    <div className="header block">
      <div className="box-container header-content">
        <div className="top-section">
          <div className="search-box">
            <button className="search-box__btn">
              <span className="search-box__icon">
                <CiSearch />
              </span>
            </button>
            <input
              type="text"
              className="search-box__input"
              placeholder="Search"
            />
          </div>
          <div className="mobile-menu-search-box">
            <ul className="icon-links-list">
              <li className="icon-links-list__item">
                <MobileMenu />
              </li>
              <li className="icon-links-list__item icon-links-list__item">
                <Link to="/" className="icon-links-list__link">
                  <span className="icon-links-list__icon">
                    <GoSearch />
                  </span>
                </Link>
              </li>
            </ul>
            <div className="language-selector">
              <div className="language-selector__selected">
                <img src="assets/EN-flag.png" alt="" className="lang-flag" />
                <span className="lang-code">EN</span>
                <span className="dropdown-icon">
                  <GoChevronDown />
                </span>
              </div>
            </div>
          </div>
          <div className="logo-box">
            <img
              src="/assets/BareBeauty-logo.svg"
              alt=""
              className="logo-box__logo"
            />
          </div>
          <div className="utils-box">
            <ul className="icon-links-list">
              <li className="icon-links-list__item">
                <Link to="/" className="icon-links-list__link">
                  <span className="icon-links-list__icon">
                    <CiShoppingCart />
                  </span>
                </Link>
              </li>
              <li className="icon-links-list__item icon-links-list__item--wishlist">
                <Link to="/" className="icon-links-list__link">
                  <span className="icon-links-list__icon">
                    <CiHeart />
                  </span>
                </Link>
              </li>
              <li className="icon-links-list__item">
                <Link to="/" className="icon-links-list__link">
                  <span className="icon-links-list__icon">
                    <CiUser />
                  </span>
                </Link>
              </li>
            </ul>
            <div className="language-selector">
              <div className="language-selector__selected">
                <img src="assets/EN-flag.png" alt="" className="lang-flag" />
                <span className="lang-code">EN</span>
                <span className="dropdown-icon">
                  <GoChevronDown />
                </span>
              </div>
            </div>
          </div>
        </div>
        <div className="nav-section">
          <menu className="nav-menu-list">
            <li className="nav-menu-list__item">Home</li>
            <li className="nav-menu-list__item">Categories</li>
            <li className="nav-menu-list__item">Sale</li>
            <li className="nav-menu-list__item">Blog</li>
          </menu>
        </div>
      </div>
    </div>
  );
}

export default Header;
