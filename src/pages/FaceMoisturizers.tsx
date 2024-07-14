import { useState } from "react";
import { useAppSelector } from "../hooks";
import BreadCrumbSect from "../layouts/BreadCrumbSect";
import ProductArch from "../layouts/ProductArch";
import ProdArchPagination from "../components/ProdArchPagination";

export default function FaceMoisturizers() {
  const [currentPage, setCurrentPage] = useState(1);
  const [prodPerPage, setProdPerPage] = useState(3);
  const products = useAppSelector(
    (state) => state.productsData.filteredProducts
  );

  const productsCount = products.length;
  const totalPages = Math.ceil(productsCount / prodPerPage);

  const handleNewPageSelection = (newPage: number) => {
    setCurrentPage(newPage);
  };

  const handleProdPerPageSelection = (newCount: number) => {
    setProdPerPage(newCount);
  };

  const paginateProducts = () => {
    const indexOfLastProd = currentPage * prodPerPage;
    const indexOfFirstProd = indexOfLastProd - prodPerPage;
    const currentProducts = products.slice(indexOfFirstProd, indexOfLastProd);

    return currentProducts;
  };

  const paginatedProducts = paginateProducts();
  return (
    <div className="face-moisturizers-page">
      <BreadCrumbSect />
      <ProductArch
        filteredProducts={paginatedProducts}
        handleProdPerPageSelection={handleProdPerPageSelection}
        prodPerPage={prodPerPage}
      />
      <ProdArchPagination
        totalPages={totalPages}
        currentPage={currentPage}
        handleNewPageSelection={handleNewPageSelection}
      />
    </div>
  );
}
