import { useAppSelector } from "../hooks";
import BreadCrumbSect from "../layouts/BreadCrumbSect";
import ProductArch from "../layouts/ProductArch";

export default function FaceMoisturizers() {
  const products = useAppSelector(
    (state) => state.productsData.filteredProducts
  );
  return (
    <div className="face-moisturizers-page">
      <BreadCrumbSect />
      <ProductArch filteredProducts={products} />
    </div>
  );
}
