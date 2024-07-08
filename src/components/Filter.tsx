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

// const brands = ["Cosrx", "Minon", "Hada Labo", "Cerave", "The Ordinary"];
// const ingredients = [
//   "Birch Sap",
//   "Hyaluronic acid",
//   "Niacinamide",
//   "Ceramides",
//   "Glycerin",
//   "Propolis",
//   "Green Tea",
//   "Snail Mucin",
//   "Vitamin C",
//   "Centella Asiatica",
//   "Retinol",
// ];
// const skinConcerns = [
//   "Dry Skin",
//   "Wrinkles",
//   "Acne",
//   "Hyperpigmentation",
//   "Dark Spots",
//   "Melasma",
// ];

function Filter({ type }: FilterProps) {
  const filters = useAppSelector((state) => state.productsData.filters);
  const dispatch = useAppDispatch();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef<null | HTMLDivElement>(null);
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

  console.log(filterList);

  const handleItemClick = (
    filterType: FilterTypes,
    item: { name: string; active: boolean }
  ) => {
    console.log("clicked", item);
    if (filterType === "brands") {
      dispatch(toggleBrandFilter(item.name as Brand));
      dispatch(filterProducts());
    }
    if (filterType === "ingredients") {
      dispatch(toggleIngredientFilter(item.name as Ingredient));
      dispatch(filterProducts());
    }
    if (filterType === "skinConcerns") {
      dispatch(toggleSkinConcernFilter(item.name as SkinConcerns));
      dispatch(filterProducts());
    }
  };

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
