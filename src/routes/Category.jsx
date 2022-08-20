import { useContext, useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { CategoriesContext } from "../contexts/CategoriesContext";
import ProductCard from "../components/ProductCard";
import "./Category.scss";

const Category = () => {
  const { category } = useParams();
  const { categoriesMap } = useContext(CategoriesContext);
  const [products, setProducts] = useState(categoriesMap[category]);

  useEffect(() => {
    setProducts(categoriesMap[category]);
  }, [category, categoriesMap]);

  const productList =
    products &&
    products.map((product) => (
      <ProductCard key={product.id} product={product} />
    ));

  return (
    <>
      <h2 className="category-title">{category.toUpperCase()}</h2>
      <div className="category-container">{productList}</div>
    </>
  );
};

export default Category;
