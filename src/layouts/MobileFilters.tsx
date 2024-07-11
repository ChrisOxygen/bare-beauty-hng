import { LuArrowDownUp, LuSliders, LuX } from "react-icons/lu";
import PriceFilter from "../components/PriceFilter";
import Filter from "../components/Filter";
import { useAppDispatch, useAppSelector } from "../hooks";
import { clearAllFilters, filterProducts } from "../features/productsSlice";
import { useEffect, useRef, useState } from "react";

function MobileFilters() {
  const filters = useAppSelector((state) => state.productsData.filters);
  const dispatch = useAppDispatch();

  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef<null | HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (!dropdownRef.current) return;
      if (dropdownOpen) {
        if (
          dropdownRef.current &&
          !dropdownRef.current.contains(event.target as Node)
        ) {
          setDropdownOpen(false);
        }
      }
    };

    // Bind the event listener
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      // Unbind the event listener on clean up
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [dropdownRef, dropdownOpen]);

  const closeDropdown = () => {
    setDropdownOpen(false);
  };
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

  const applyFilters = () => {
    dispatch(filterProducts());
    closeDropdown();
  };

  const openDropdown = () => {
    setDropdownOpen(true);
  };

  const clearFilters = () => {
    dispatch(clearAllFilters());
    dispatch(filterProducts());
  };
  return (
    <div className="mobile-filters-block block">
      <div className="box-container">
        <div className="mobile-filters-block__content-area">
          <button className="mobile-filter-btn" onClick={() => openDropdown()}>
            <span className="mobile-filter-btn__icon">
              <LuSliders />
            </span>
            <span className="mobile-filter-btn__text">Filter</span>
          </button>
          <button className="mobile-filter-btn">
            <span className="mobile-filter-btn__icon">
              <LuArrowDownUp />
            </span>
            <span className="mobile-filter-btn__text">Sort</span>
          </button>
        </div>
      </div>
      {dropdownOpen && (
        <div className="filter-container">
          <div className="mobile-filter-box">
            <div className="mobile-filter-box__header">
              <span className="mobile-filter-box-title">Filter </span>
              <button
                className="mobile-filter-box-close-btn"
                onClick={() => closeDropdown()}
              >
                <span className="mobile-filter-box-close-btn__icon">
                  <LuX />
                </span>
              </button>
            </div>
            <div className="mobile-filter-box__body">
              <PriceFilter />
              <Filter type="brands" />
              <Filter type="ingredients" />
              <Filter type="skinConcerns" />
            </div>
            <div className="mobile-filter-box__btn-section">
              <button
                className={`filter-control-btn filter-control-btn--clear ${
                  getActiveFiltersCount() !== 0 ? "clear-active" : ""
                }`}
                onClick={() => clearFilters()}
                disabled={getActiveFiltersCount() === 0}
              >
                Clear
              </button>
              <button
                className="filter-control-btn filter-control-btn--apply"
                onClick={() => applyFilters()}
              >
                Apply({getActiveFiltersCount()})
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default MobileFilters;
