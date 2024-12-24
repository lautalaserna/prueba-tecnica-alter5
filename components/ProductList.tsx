'use client';

import useFiltersStore from "@/store/filtersStore";
import useProductStore from "@/store/productsStore";
import { Product } from "@/types/products";
import { useEffect } from "react";
import ProductCard from "./ProductCard";
import { useDebounce } from "@/hooks/useDebounce";

export default function ProductList() {
  const { products, total, loading, error, filterProducts } = useProductStore();
  const { titleFilter, orderBy, limit, skip } = useFiltersStore();
  const debouncedTitle = useDebounce(titleFilter, 800);
  
  useEffect(() => {
    let [sort, order] = orderBy.split('_');
    if(orderBy === 'none') {
      sort = '';
      order = '';
    }

    filterProducts(titleFilter, sort, order, limit, skip);
  }, [debouncedTitle, orderBy, limit, skip]);

  if(loading) return (
    <div className="w-full flex justify-center items-center mt-20">
      <p>⌚ Cargando...</p>
    </div>
  )
  
  if(error) return(
    <div className="w-full flex flex-col justify-center items-center mt-20 text-red-700">
      <p className="font-semibold">⚠️Ocurrió un error! Intentelo más tarde...💔</p>
      <p className="text-sm">{error}</p>
    </div>
  )

  if(total === 0) return(
    <div className="w-full flex justify-center items-center mt-20">
      <p>😖No se encontraron productos..</p>
    </div>
  )
  
  return (
    <div className="w-full py-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-5 items-center">
      {products.map((product: Product) => (
        <ProductCard key={product.id} product={product}/>
      ))}
    </div>  
  );
}