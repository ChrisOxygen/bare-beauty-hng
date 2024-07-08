import { useEffect } from "react";
import ProductItem from "../components/ProductItem";

import { useAppDispatch, useAppSelector } from "../hooks";

import {
  clearAllFilters,
  filterProducts,
  Product,
} from "../features/productsSlice";

import { LuArrowDownUp, LuChevronDown, LuSliders } from "react-icons/lu";
import Filter from "../components/Filter";

import { Toaster } from "react-hot-toast";

type ProductArchProps = {
  filteredProducts: Product[];
};

function ProductArch({ filteredProducts }: ProductArchProps) {
  const filters = useAppSelector((state) => state.productsData.filters);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(filterProducts());
  }, [dispatch]);

  console.log(filteredProducts);

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
      {" "}
      <div className="product-arch-block block">
        {" "}
        <div className="box-container product-arch-block__content-area">
          {" "}
          <div className="prod-primary-filter">
            {" "}
            <div className="prod-primary-filter__header-sect">
              {" "}
              <div className="filter-text">
                {" "}
                <span className="filter-text__icon">
                  {" "}
                  <LuSliders />{" "}
                </span>{" "}
                <span className="filter-text__text">Filter</span>{" "}
              </div>{" "}
              <button
                className="filter-reset-btn"
                onClick={() => clearFilters()}
              >
                {" "}
                <span className="filter-reset-btn__text">Clear</span>{" "}
                <span className="filter-reset-btn__count">
                  {" "}
                  ( {getActiveFiltersCount()}){" "}
                </span>{" "}
              </button>{" "}
            </div>{" "}
            <div className="prod-primary-filter__body-sect">
              {" "}
              <div className="sort-text">
                {" "}
                <button className="filter-box-display">
                  {" "}
                  <span className="filter-box-display__filter-title">
                    {" "}
                    Price{" "}
                  </span>{" "}
                  <span className={`filter-box-display__toggle-icon`}>
                    {" "}
                    <LuChevronDown />{" "}
                  </span>{" "}
                </button>{" "}
              </div>{" "}
              <Filter type="brands" /> <Filter type="ingredients" />{" "}
              <Filter type="skinConcerns" />{" "}
            </div>{" "}
          </div>{" "}
          <div className="prod-sec-filter">
            {" "}
            <div className="prod-per-page-filter">
              {" "}
              <span className="prod-per-page-filter__text">Show</span>{" "}
              <button className="filter-box-display">
                {" "}
                <span className="filter-box-display__filter-title">
                  12
                </span>{" "}
                <span className={`filter-box-display__toggle-icon`}>
                  {" "}
                  <LuChevronDown />{" "}
                </span>{" "}
              </button>{" "}
            </div>{" "}
            <div className="column-display-filter">
              {" "}
              <button className="column-display-filter__filter-btn">
                {" "}
                <span className="column-display-filter__filter-icon">
                  {" "}
                  <span className="column-bar"></span>{" "}
                  <span className="column-bar"></span>{" "}
                </span>{" "}
              </button>{" "}
              <button className="column-display-filter__filter-btn column-display-filter__filter-btn--active">
                {" "}
                <span className="column-display-filter__filter-icon">
                  {" "}
                  <span className="column-bar"></span>{" "}
                  <span className="column-bar"></span>{" "}
                  <span className="column-bar"></span>{" "}
                </span>{" "}
              </button>{" "}
              <button className="column-display-filter__filter-btn">
                {" "}
                <span className="column-display-filter__filter-icon">
                  {" "}
                  <span className="column-bar"></span>{" "}
                  <span className="column-bar"></span>{" "}
                  <span className="column-bar"></span>{" "}
                  <span className="column-bar"></span>{" "}
                </span>{" "}
              </button>{" "}
            </div>{" "}
            <div className="sort-best">
              {" "}
              <div className="sort-text">
                {" "}
                <span className="sort-text__icon">
                  {" "}
                  <LuArrowDownUp />{" "}
                </span>{" "}
                <span className="sort-text__text">Sort</span>{" "}
                <button className="filter-box-display">
                  {" "}
                  <span className="filter-box-display__filter-title">
                    {" "}
                    Bestsellers{" "}
                  </span>{" "}
                  <span className={`filter-box-display__toggle-icon`}>
                    {" "}
                    <LuChevronDown />{" "}
                  </span>{" "}
                </button>{" "}
              </div>{" "}
            </div>{" "}
          </div>{" "}
          <ul className="prod-list">
            {" "}
            {filteredProducts.map((product, index) => (
              <ProductItem key={index} product={product} />
            ))}
          </ul>{" "}
          <div className="prod-pagination"></div>{" "}
        </div>{" "}
      </div>{" "}
      <Toaster />{" "}
    </>
  );
}

export default ProductArch;
