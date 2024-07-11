import { LuChevronDown } from "react-icons/lu";
import { useEffect, useRef, useState } from "react";

type ProductCountFilterProps = {
  handleProdPerPageSelection: (newCount: number) => void;
  prodPerPage: number;
};

const countList = [{ number: 3 }, { number: 6 }, { number: 9 }];

function ProductCountFilter({
  handleProdPerPageSelection,
  prodPerPage,
}: ProductCountFilterProps) {
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

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  return (
    <div className="filter-box count-filter-box" ref={dropdownRef}>
      <button className="filter-box-display" onClick={() => toggleDropdown()}>
        <span className="filter-box-display__filter-title">{prodPerPage}</span>
        <span
          className={`filter-box-display__toggle-icon ${
            dropdownOpen ? "filter-box-display__toggle-icon--open" : ""
          }`}
        >
          <LuChevronDown />
        </span>
      </button>
      {dropdownOpen && (
        <ul className="count-filter-list">
          {countList.map((count) => (
            <li key={count.number} className="count-filter-list__item">
              <button
                className="count-filter-list__item-btn"
                onClick={() => {
                  handleProdPerPageSelection(count.number);
                }}
              >
                {count.number}
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default ProductCountFilter;
