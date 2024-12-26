'use client';

import useFiltersStore from "@/store/filtersStore";
import { OrderByEnum, OrderType } from "@/types/filters";
import { useDebounce } from "@/hooks/useDebounce";
import { useEffect, useState } from "react";

export default function Filters() {
  const { titleFilter, orderBy, setTitleFilter, setOrderBy, resetFilters } = useFiltersStore();
  const [ localTitle, setLocalTitle ] = useState(titleFilter);
  const debouncedTitle = useDebounce(localTitle, 800);

  useEffect(() => {
    setTitleFilter(debouncedTitle);
  }, [debouncedTitle]);

  useEffect(() => {
    setLocalTitle(titleFilter);
  }, [titleFilter]);

  return (
    <section className="w-full mt-2 mb-5 flex flex-col md:flex-row gap-4">
      <div className="w-full md:w-[300px] flex flex-col gap-1 items-start">
        <span className="font-semibold">Título</span>
        <input
          type="text"
          value={localTitle}
          onChange={(e) => setLocalTitle(e.target.value)}
          placeholder="Busque un producto..."
          className="w-full px-3 py-2 border border-gray-600 rounded-md text-gray-700"
        />
      </div>

      <div className="w-full md:min-w-[180] md:w-[200px] flex flex-col gap-1 items-start">
        <span className="font-semibold">Ordenar por</span>
        <div className="w-full relative w-45">
          <select 
            value={orderBy} 
            onChange={(e) => setOrderBy(e.target.value as OrderType)}
            className="w-full px-4 py-2 cursor-pointer appearance-none border border-gray-600 text-gray-700 rounded-md focus:outline-none"
          >
            {Object.entries(OrderByEnum).map(([key, value]) => (
              <option key={key} value={key}>{value}</option>
            ))}
          </select>
          <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-500">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor" >
              <path fillRule="evenodd" d="M5.293 9.293a1 1 0 011.414 0L10 12.586l3.293-3.293a1 1 0 011.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
            </svg>
          </div>
        </div>
      </div>
      <div className="flex flex-col justify-end">  
        <button onClick={resetFilters} className="mb-2 h-fit flex items-end text-black">
          <span className="ms-[1px] min-w-[90px] text-gray-500 hover:text-gray-900"><strong className="text-xl">⨉</strong> Limpiar</span>
        </button>
      </div>
    </section>
  );
}