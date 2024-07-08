import { Link } from "react-router-dom";

function BreadCrumbSect() {
  return (
    <div className="breadcrumb-block block">
      <div className="box-container ">
        <div className="breadcrumb-block__content-area">
          <h3 className="page-title">Face Moisturizers</h3>
          <span className="page-desc">
            Unleash the full potential of your skin with our curated selection
            of targeted face serums. These lightweight, fast-absorbing formulas
            are packed with potent active ingredients that address specific
            concerns like fine lines, wrinkles, hyperpigmentation, and dullness.
          </span>
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
    </div>
  );
}

export default BreadCrumbSect;
