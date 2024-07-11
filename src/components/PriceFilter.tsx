import { LuChevronDown } from "react-icons/lu";
import { useAppDispatch, useAppSelector } from "../hooks";
import { useEffect, useRef, useState } from "react";
import { Slider } from "@nextui-org/react";
import { filterProducts, setPriceFilter } from "../features/productsSlice";
import { useViewport } from "react-viewport-hooks";
import { ScreenType } from "../layouts/ProductArch";

function PriceFilter() {
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

  if (screen !== "desktop")
    return (
      <div className="mb-filter-box" ref={dropdownRef}>
        <button
          className="mb-filter-box-display"
          onClick={() => toggleDropdown()}
        >
          <span className="mb-filter-box-display__filter-title">Price</span>
          <span
            className={`mb-filter-box-display__toggle-icon ${
              dropdownOpen ? "mb-filter-box-display__toggle-icon--open" : ""
            }`}
          >
            <LuChevronDown />
          </span>
        </button>
        {dropdownOpen && (
          <ul className="mb-filter-list filter-list--price">
            <CostSlider screen={screen} />
          </ul>
        )}
      </div>
    );

  return (
    <div className="filter-box" ref={dropdownRef}>
      <button className="filter-box-display" onClick={() => toggleDropdown()}>
        <span className="filter-box-display__filter-title">Price</span>
        <span
          className={`filter-box-display__toggle-icon ${
            dropdownOpen ? "filter-box-display__toggle-icon--open" : ""
          }`}
        >
          <LuChevronDown />
        </span>
      </button>
      {dropdownOpen && (
        <ul className="filter-list filter-list--price">
          <CostSlider screen={screen} />
        </ul>
      )}
    </div>
  );
}

export default PriceFilter;

type CostSliderProps = {
  screen: ScreenType;
};

function CostSlider({ screen }: CostSliderProps) {
  const { min: minPrice, max: maxPrice } = useAppSelector(
    (state) => state.productsData.filters.price
  );
  const [value, setValue] = useState([minPrice, maxPrice]);
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(setPriceFilter({ min: value[0], max: value[1] }));

    if (screen === "desktop") {
      dispatch(filterProducts());
    }
  }, [dispatch, value, screen]);

  return (
    <div className="range-slider-box">
      <Slider
        step={1}
        aria-label="Price range"
        minValue={0}
        maxValue={30}
        value={value}
        onChange={(value) => setValue(value as number[])}
        formatOptions={{ style: "currency", currency: "USD" }}
        className="max-w-md"
        classNames={{
          track: "track-bg",
          filler: "filler",
        }}
        renderThumb={(props) => (
          <div
            {...props}
            className="thumb-bg top-1/2 group cursor-grab data-[dragging=true]:cursor-grabbing"
          >
            <span className="transition-transform thumb-fg from-secondary-100 to-secondary-500 rounded-full w-5 h-5 block group-data-[dragging=true]:scale-80" />
          </div>
        )}
      />
      <div className="price-label">
        <span className="price-label__min">$0</span>
        <span className="price-label__max">${maxPrice}</span>
      </div>
    </div>
  );
}
