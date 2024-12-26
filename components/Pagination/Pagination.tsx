'use client';

import useFiltersStore from "@/store/filtersStore";
import useProductStore from "@/store/productsStore";
import React, { useEffect } from "react";

export default function Pagination() {
  const { loading, error, total } = useProductStore();
  const { titleFilter, orderBy, limit, currentPage, setSkip, setCurrentPage } = useFiltersStore();

  const totalPages = Math.ceil(total / limit);

  useEffect(() => {
    setCurrentPage(1);
    setSkip(0);
  }, [titleFilter, orderBy]);

  const onPageChange = (page: number) => {
    if (page > 0 && page <= totalPages) {
      setCurrentPage(page);
    }
    setSkip((page - 1) * limit);
  };

  if(loading || error || totalPages <= 1) return null;

  return (
    <div className="my-5 flex justify-center">
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className="pr-3 py-1 font-semibold rounded disabled:opacity-50"
      >
        <span className='block sm:hidden'>{'<'}</span>
        <span className='hidden sm:block'>{'< Anterior'}</span>
      </button>
      {currentPage >= 3 && <span className='mt-[6px]'>...</span>}
      {Array.from({ length: totalPages }, (_, index) => {
        if(Math.abs(index - currentPage) < 3) return (
          <button
            key={index}
            onClick={() => onPageChange(index + 1)}
            className={`mr-1 px-1 sm:px-2 xl:px-3 py-1 rounded ${
              currentPage === index + 1 ? "font-semibold" : "font-normal"
            }`}
          >
            {index + 1}
          </button>
        )}
      )}
      {currentPage < (totalPages - 3) && <span className='mt-[6px]'>...</span>}
      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className="pl-3 py-1 font-semibold rounded disabled:opacity-50"
      >
        <span className='block sm:hidden'>{'>'}</span>
        <span className='hidden sm:block'>{'Siguiente >'}</span>
      </button>
    </div>
  );
}