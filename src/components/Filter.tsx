import {
  Brand,
  filterProducts,
  FilterTypes,
  Ingredient,
  SkinConcerns,
  toggleBrandFilter,
  toggleIngredientFilter,
  toggleSkinConcernFilter,
} from "../features/productsSlice";
import { LuChevronDown, LuX } from "react-icons/lu";
import { useAppDispatch, useAppSelector } from "../hooks";
import { useEffect, useRef, useState } from "react";
import { useViewport } from "react-viewport-hooks";
import { ScreenType } from "../layouts/ProductArch";

type FilterProps = {
  type: FilterTypes;
};

type FilterItemProps = {
  filterType: FilterTypes;
  item: { name: string; active: boolean };
  handleItemClick: (
    filterType: FilterTypes,
    item: { name: string; active: boolean }
  ) => void;
};

function Filter({ type }: FilterProps) {
  const filters = useAppSelector((state) => state.productsData.filters);
  const dispatch = useAppDispatch();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef<null | HTMLDivElement>(null);

  const { vw } = useViewport();
  const [screen, setScreen] = useState<ScreenType>(
    ((vw) => {
      if (vw < 620) return "mobile";
      if (vw < 996) return "tablet";
      return "desktop";
    })(vw)
  );

  let filterList: { name: string; active: boolean }[];

  switch (type) {
    case "brands":
      filterList = filters.brandList;
      break;
    case "ingredients":
      filterList = filters.ingredientList;
      break;
    case "skinConcerns":
      filterList = filters.skinConcernList;
      break;
    default:
      filterList = filters.brandList;
  }

  const handleItemClick = (
    filterType: FilterTypes,
    item: { name: string; active: boolean }
  ) => {
    if (filterType === "brands") {
      dispatch(toggleBrandFilter(item.name as Brand));
      if (screen === "desktop") {
        dispatch(filterProducts());
      }
    }
    if (filterType === "ingredients") {
      dispatch(toggleIngredientFilter(item.name as Ingredient));
      if (screen === "desktop") {
        dispatch(filterProducts());
      }
    }
    if (filterType === "skinConcerns") {
      dispatch(toggleSkinConcernFilter(item.name as SkinConcerns));
      if (screen === "desktop") {
        dispatch(filterProducts());
      }
    }
  };

  useEffect(() => {
    if (vw < 620) return setScreen("mobile");
    else if (vw < 996) return setScreen("tablet");
    else setScreen("desktop");
  }, [vw]);

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

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  const filterTitle = () => {
    switch (type) {
      case "brands":
        return "Brands";
      case "ingredients":
        return "Ingredients";
      case "skinConcerns":
        return "Skin Concerns";
      default:
        return "Brands";
    }
  };

  if (screen !== "desktop") {
    return (
      <div className="mb-filter-box" ref={dropdownRef}>
        <button
          className="mb-filter-box-display"
          onClick={() => toggleDropdown()}
        >
          <span className="mb-filter-box-display__filter-title">
            {filterTitle()}
          </span>
          <span
            className={`mb-filter-box-display__toggle-icon ${
              dropdownOpen ? "mb-filter-box-display__toggle-icon--open" : ""
            }`}
          >
            <LuChevronDown />
          </span>
        </button>
        {dropdownOpen && (
          <ul className="mb-filter-list">
            {filterList.map((item, index) => (
              <FilterItem
                key={index}
                item={item}
                filterType={type}
                handleItemClick={handleItemClick}
              />
            ))}
          </ul>
        )}
      </div>
    );
  }

  return (
    <div className="filter-box" ref={dropdownRef}>
      <button className="filter-box-display" onClick={() => toggleDropdown()}>
        <span className="filter-box-display__filter-title">
          {filterTitle()}
        </span>
        <span
          className={`filter-box-display__toggle-icon ${
            dropdownOpen ? "filter-box-display__toggle-icon--open" : ""
          }`}
        >
          <LuChevronDown />
        </span>
      </button>
      {dropdownOpen && (
        <ul className="filter-list">
          {filterList.map((item, index) => (
            <FilterItem
              key={index}
              item={item}
              filterType={type}
              handleItemClick={handleItemClick}
            />
          ))}
        </ul>
      )}
    </div>
  );
}

export default Filter;

function FilterItem({ item, filterType, handleItemClick }: FilterItemProps) {
  return (
    <li
      className={`filter-list__item ${
        item.active ? "filter-list__item--active" : ""
      } `}
    >
      <label className="filter-list__label" htmlFor={`filter${item.name}`}>
        {item.name}
        {item.active && (
          <span className="filter-list__checkmark">
            <LuX />
          </span>
        )}
      </label>
      <input
        className="filter-list__input"
        type="checkbox"
        name={`filter${item.name}`}
        id={`filter${item.name}`}
        checked={item.active}
        onChange={() => handleItemClick(filterType, item)}
      />
    </li>
  );
}
