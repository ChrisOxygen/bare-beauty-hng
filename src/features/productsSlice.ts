import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import products from "../../data.json";

export type FilterTypes = "brands" | "ingredients" | "skinConcerns";

export type Brand =
  | "Cosrx"
  | "La Roche Posay"
  | "Minon"
  | "Labiotte"
  | "Acwell"
  | "Olay"
  | "L'Oreal Paris"
  | "E.l.f."
  | "The Ordinary"
  | "Naturium";

export type SkinConcerns =
  | "Dry Skin"
  | "Wrinkles"
  | "Acne"
  | "Hyperpigmentation"
  | "Dark Spots"
  | "Melasma";

export type Ingredient =
  | "Birch Sap"
  | "Hyaluronic acid"
  | "Niacinamide"
  | "Ceramides"
  | "Glycerin"
  | "Propolis"
  | "Green Tea"
  | "Snail Mucin"
  | "Vitamin C"
  | "Centella Asiatica"
  | "Retinol";

export type Product = {
  name: string;
  normal_price: number;
  sale_price: number;
  image: string;
  brand: Brand;
  ingredients: Ingredient[];
  skin_concerns: SkinConcerns[];
  soldCount: number;
};

export type CartItem = {
  product: Product;
  quantity: number;
};

const initialState = {
  products: products as Product[],
  filteredProducts: products as Product[],
  cart: [] as CartItem[],

  filters: {
    brandList: [
      { name: "Cosrx", active: false },
      { name: "Minon", active: false },
      { name: "Hada Labo", active: false },
      { name: "Cerave", active: false },
      { name: "The Ordinary", active: false },
    ],
    ingredientList: [
      { name: "Birch Sap", active: false },
      { name: "Hyaluronic acid", active: false },
      { name: "Niacinamide", active: false },
      { name: "Ceramides", active: false },
      { name: "Glycerin", active: false },
      { name: "Propolis", active: false },
      { name: "Green Tea", active: false },
      { name: "Snail Mucin", active: false },
      { name: "Vitamin C", active: false },
      { name: "Centella Asiatica", active: false },
      { name: "Retinol", active: false },
    ],
    skinConcernList: [
      { name: "Dry Skin", active: false },
      { name: "Wrinkles", active: false },
      { name: "Acne", active: false },
      { name: "Hyperpigmentation", active: false },
      { name: "Dark Spots", active: false },
      { name: "Melasma", active: false },
    ],
    price: {
      min: 0,
      max: 100000,
    },
  },
};

const productsSlice = createSlice({
  name: "productsData",
  initialState,
  reducers: {
    filterProducts: (state) => {
      const filteredBrandList = [] as string[];
      state.filters.brandList.forEach((brand) => {
        if (brand.active) {
          filteredBrandList.push(brand.name);
        }
      });

      const filteredIngredientList = [] as string[];

      state.filters.ingredientList.forEach((ingredient) => {
        if (ingredient.active) {
          filteredIngredientList.push(ingredient.name);
        }
      });

      const filteredSkinConcernList = [] as string[];

      state.filters.skinConcernList.forEach((skinConcern) => {
        if (skinConcern.active) {
          filteredSkinConcernList.push(skinConcern.name);
        }
      });

      const filteredProducts = state.products.filter((product) => {
        if (
          filteredBrandList.length === 0 &&
          filteredIngredientList.length === 0 &&
          filteredSkinConcernList.length === 0 &&
          state.filters.price.min === 0 &&
          state.filters.price.max === 100000
        ) {
          return true;
        }

        let isBrandMatch = false;
        let isSkinConcernMatch = false;
        let isIngredientMatch = false;
        let isPriceMatch = false;
        if (
          filteredBrandList.length === 0 ||
          filteredBrandList.includes(product.brand)
        ) {
          isBrandMatch = true;
        } else {
          isBrandMatch = false;
        }
        if (
          filteredIngredientList.length === 0 ||
          filteredIngredientList.some((ingredient) =>
            product.ingredients.includes(ingredient as Ingredient)
          )
        ) {
          isIngredientMatch = true;
        } else {
          isIngredientMatch = false;
        }
        if (
          filteredSkinConcernList.length === 0 ||
          filteredSkinConcernList.some((skinConcern) =>
            product.skin_concerns.includes(skinConcern as SkinConcerns)
          )
        ) {
          isSkinConcernMatch = true;
        } else {
          isSkinConcernMatch = false;
        }
        if (
          state.filters.price.min <= product.sale_price &&
          state.filters.price.max >= product.sale_price
        ) {
          isPriceMatch = true;
        } else {
          isPriceMatch = false;
        }

        return (
          isBrandMatch &&
          isIngredientMatch &&
          isSkinConcernMatch &&
          isPriceMatch
        );
      });

      state.filteredProducts = filteredProducts;
    },
    addBrandFilter: (state, action: PayloadAction<Brand>) => {
      state.filters.brandList = state.filters.brandList.map((brand) => {
        if (brand.name === action.payload) {
          return { ...brand, active: true };
        }
        return brand;
      });
    },
    toggleBrandFilter: (state, action: PayloadAction<Brand>) => {
      state.filters.brandList = state.filters.brandList.map((brand) => {
        if (brand.name === action.payload) {
          return { ...brand, active: !brand.active };
        }
        return brand;
      });
    },
    removeBrandFilter: (state, action: PayloadAction<Brand>) => {
      state.filters.brandList = state.filters.brandList.map((brand) => {
        if (brand.name === action.payload) {
          return { ...brand, active: false };
        }
        return brand;
      });
    },
    addIngredientFilter: (state, action: PayloadAction<Ingredient>) => {
      state.filters.ingredientList = state.filters.ingredientList.map(
        (ingredient) => {
          if (ingredient.name === action.payload) {
            return { ...ingredient, active: true };
          }
          return ingredient;
        }
      );
    },
    toggleIngredientFilter: (state, action: PayloadAction<Ingredient>) => {
      state.filters.ingredientList = state.filters.ingredientList.map(
        (ingredient) => {
          if (ingredient.name === action.payload) {
            return { ...ingredient, active: !ingredient.active };
          }
          return ingredient;
        }
      );
    },
    removeIngredientFilter: (state, action: PayloadAction<Ingredient>) => {
      state.filters.ingredientList = state.filters.ingredientList.map(
        (ingredient) => {
          if (ingredient.name === action.payload) {
            return { ...ingredient, active: false };
          }
          return ingredient;
        }
      );
    },
    addSkinConcernFilter: (state, action: PayloadAction<SkinConcerns>) => {
      state.filters.skinConcernList = state.filters.skinConcernList.map(
        (skinConcern) => {
          if (skinConcern.name === action.payload) {
            return { ...skinConcern, active: true };
          }
          return skinConcern;
        }
      );
    },
    toggleSkinConcernFilter: (state, action: PayloadAction<SkinConcerns>) => {
      state.filters.skinConcernList = state.filters.skinConcernList.map(
        (skinConcern) => {
          if (skinConcern.name === action.payload) {
            return { ...skinConcern, active: !skinConcern.active };
          }
          return skinConcern;
        }
      );
    },
    removeSkinConcernFilter: (state, action: PayloadAction<SkinConcerns>) => {
      state.filters.skinConcernList = state.filters.skinConcernList.map(
        (skinConcern) => {
          if (skinConcern.name === action.payload) {
            return { ...skinConcern, active: false };
          }
          return skinConcern;
        }
      );
    },
    clearAllFilters: (state) => {
      state.filters.brandList = state.filters.brandList.map((brand) => {
        return { ...brand, active: false };
      });
      state.filters.ingredientList = state.filters.ingredientList.map(
        (ingredient) => {
          return { ...ingredient, active: false };
        }
      );
      state.filters.skinConcernList = state.filters.skinConcernList.map(
        (skinConcern) => {
          return { ...skinConcern, active: false };
        }
      );
    },

    addToCart: (state, action: PayloadAction<CartItem>) => {
      state.cart.push(action.payload);
    },
    removeFromCart: (state, action: PayloadAction<CartItem>) => {
      state.cart = state.cart.filter(
        (item) => item.product.name !== action.payload.product.name
      );
    },
    clearCart: (state) => {
      state.cart = [];
    },
    increaseQuantity: (state, action: PayloadAction<CartItem>) => {
      state.cart = state.cart.map((item) => {
        if (item.product.name === action.payload.product.name) {
          return { ...item, quantity: item.quantity + 1 };
        }
        return item;
      });
    },
    decreaseQuantity: (state, action: PayloadAction<CartItem>) => {
      state.cart = state.cart.map((item) => {
        if (item.product.name === action.payload.product.name) {
          if (item.quantity >= 2) {
            return { ...item, quantity: item.quantity - 1 };
          }
        }
        return item;
      });
    },

    setPriceFilterMax: (state) => {
      const productMaxPrice = state.products.reduce((max, product) => {
        return product.sale_price > max ? product.sale_price : max;
      }, 0);

      state.filters.price.max = productMaxPrice;
    },
    setPriceFilter: (
      state,
      action: PayloadAction<{ min: number; max: number }>
    ) => {
      state.filters.price = action.payload;
    },
  },
});

export default productsSlice;

export const {
  filterProducts,
  toggleBrandFilter,
  toggleIngredientFilter,
  toggleSkinConcernFilter,
  clearAllFilters,

  addToCart,
  removeFromCart,
  clearCart,
  increaseQuantity,
  decreaseQuantity,
  setPriceFilterMax,
  setPriceFilter,
} = productsSlice.actions;
