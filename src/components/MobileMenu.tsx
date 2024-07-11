import { useEffect, useRef, useState } from "react";
import { LuMenu, LuX } from "react-icons/lu";
import { Link } from "react-router-dom";

function MobileMenu() {
  const [menuOpen, setMenuOpen] = useState(false);
  const menuBoxRef = useRef<null | HTMLDivElement>(null); // Ref for the mobile-menu-box
  const menuContainerRef = useRef<null | HTMLDivElement>(null); // Ref for the mobile-menu-container

  const openMenu = () => {
    setMenuOpen(true);
  };
  const closeMenu = () => {
    setMenuOpen(false);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        menuBoxRef.current &&
        menuContainerRef.current &&
        !menuContainerRef.current.contains(event.target as Node)
      ) {
        closeMenu();
      }
    };

    // Add event listener when the menu is open
    if (menuOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    // Cleanup the event listener
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [menuOpen]);
  return (
    <>
      <button className="icon-links-list__link" onClick={() => openMenu()}>
        <span className="icon-links-list__icon">
          <LuMenu />
        </span>
      </button>
      {menuOpen && (
        <div className="mobile-menu-box" ref={menuBoxRef}>
          <div className="mobile-menu-container" ref={menuContainerRef}>
            <div className="mobile-menu-container__header">
              <div className="logo-box">
                <img
                  src="/assets/BareBeauty-logo.svg"
                  alt=""
                  className="logo-box__logo"
                />
              </div>
              <button
                className="mobile-menu-container__close-btn"
                onClick={() => closeMenu()}
              >
                <span className="btn-icon">
                  <LuX />
                </span>
              </button>
            </div>
            <div className="mobile-menu-container__body">
              <ul className="mobile-menu-list nav-menu-list">
                <li className="mobile-menu-list__item">
                  <Link to="/" className="mobile-menu-list__link">
                    Home
                  </Link>
                </li>
                <li className="mobile-menu-list__item">
                  <Link to="/" className="mobile-menu-list__link">
                    Categories
                  </Link>
                </li>
                <li className="mobile-menu-list__item">
                  <Link to="/" className="mobile-menu-list__link">
                    Brands
                  </Link>
                </li>
                <li className="mobile-menu-list__item">
                  <Link to="/" className="mobile-menu-list__link">
                    Sale
                  </Link>
                </li>
                <li className="mobile-menu-list__item">
                  <Link to="/" className="mobile-menu-list__link">
                    Blog
                  </Link>
                </li>
                <li className="mobile-menu-list__item">
                  <Link to="/" className="mobile-menu-list__link">
                    Support
                  </Link>
                </li>
              </ul>
              <ul className="mobile-menu-list utility-menu-list">
                <li className="mobile-menu-list__item">
                  <Link to="/" className="mobile-menu-list__link">
                    Wishlist
                  </Link>
                </li>
                <li className="mobile-menu-list__item">
                  <Link to="/" className="mobile-menu-list__link">
                    Profile
                  </Link>
                </li>
                <li className="mobile-menu-list__item">
                  <Link to="/" className="mobile-menu-list__link">
                    Help
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default MobileMenu;
