import { useEffect, useState } from "react";
import ProductItem from "../components/ProductItem";

import { useAppDispatch, useAppSelector } from "../hooks";

import {
  clearAllFilters,
  filterProducts,
  Product,
  setPriceFilterMax,
} from "../features/productsSlice";

import { LuArrowDownUp, LuChevronDown, LuSliders } from "react-icons/lu";
import Filter from "../components/Filter";

import { Toaster } from "react-hot-toast";
import PriceFilter from "../components/PriceFilter";
import ProductCountFilter from "../components/ProductCountFilter";
import { useViewport } from "react-viewport-hooks";
import MobileFilters from "./MobileFilters";

export type ScreenType = "mobile" | "tablet" | "desktop";

type ProductArchProps = {
  filteredProducts: Product[];
  handleProdPerPageSelection: (newCount: number) => void;
  prodPerPage: number;
};

function ProductArch({
  filteredProducts,
  handleProdPerPageSelection,
  prodPerPage,
}: ProductArchProps) {
  const filters = useAppSelector((state) => state.productsData.filters);
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

  useEffect(() => {
    dispatch(setPriceFilterMax());
    dispatch(filterProducts());
  }, [dispatch]);

  const getActiveFiltersCount = () => {
    let count = 0;

    filters.brandList.forEach((brand) => {
      if (brand.active) {
        count++;
      }
    });

    filters.ingredientList.forEach((ingredient) => {
      if (ingredient.active) {
        count++;
      }
    });

    filters.skinConcernList.forEach((skinConcern) => {
      if (skinConcern.active) {
        count++;
      }
    });

    return count;
  };

  const clearFilters = () => {
    dispatch(clearAllFilters());
    dispatch(filterProducts());
  };

  return (
    <>
      <div className="product-arch-block block">
        <div className="box-container product-arch-block__content-area">
          {screen === "mobile" || screen === "tablet" ? (
            <MobileFilters />
          ) : null}
          <div className="prod-primary-filter">
            <div className="prod-primary-filter__header-sect">
              <div className="filter-text">
                <span className="filter-text__icon">
                  <LuSliders />
                </span>
                <span className="filter-text__text">Filter</span>
              </div>
              <button
                className="filter-reset-btn"
                onClick={() => clearFilters()}
              >
                <span className="filter-reset-btn__text">Clear</span>
                <span className="filter-reset-btn__count">
                  ( {getActiveFiltersCount()})
                </span>
              </button>
            </div>
            <div className="prod-primary-filter__body-sect">
              <PriceFilter />
              <Filter type="brands" />
              <Filter type="ingredients" />
              <Filter type="skinConcerns" />
            </div>
          </div>
          <div className="prod-sec-filter">
            <div className="prod-per-page-filter">
              <span className="prod-per-page-filter__text">Show</span>

              <ProductCountFilter
                handleProdPerPageSelection={handleProdPerPageSelection}
                prodPerPage={prodPerPage}
              />
            </div>
            <div className="column-display-filter">
              <button className="column-display-filter__filter-btn">
                <span className="column-display-filter__filter-icon">
                  <span className="column-bar"></span>
                  <span className="column-bar"></span>
                </span>
              </button>
              <button className="column-display-filter__filter-btn column-display-filter__filter-btn--active">
                <span className="column-display-filter__filter-icon">
                  <span className="column-bar"></span>
                  <span className="column-bar"></span>
                  <span className="column-bar"></span>
                </span>
              </button>
              <button className="column-display-filter__filter-btn">
                <span className="column-display-filter__filter-icon">
                  <span className="column-bar"></span>
                  <span className="column-bar"></span>
                  <span className="column-bar"></span>
                  <span className="column-bar"></span>
                </span>
              </button>
            </div>
            <div className="sort-best">
              <div className="sort-text">
                <span className="sort-text__icon">
                  <LuArrowDownUp />
                </span>
                <span className="sort-text__text">Sort</span>
                <button className="filter-box-display">
                  <span className="filter-box-display__filter-title">
                    Bestsellers
                  </span>
                  <span className={`filter-box-display__toggle-icon`}>
                    <LuChevronDown />
                  </span>
                </button>
              </div>
            </div>
          </div>
          <ul className="prod-list">
            {filteredProducts.map((product, index) => (
              <ProductItem key={index} product={product} />
            ))}
          </ul>
        </div>
      </div>
      <Toaster />
    </>
  );
}

export default ProductArch;
