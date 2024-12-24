import { OrderType } from "@/types/filters";
import { create } from "zustand";

interface FiltersStore {
  titleFilter: string;
  orderBy: OrderType;
  limit: number;
  skip: number;
  setTitleFilter: (title: string) => void;
  setOrderBy: (orderBy: OrderType) => void;
  setLimit: (limit: number) => void;
  setSkip: (skip: number) => void;
  resetFilters: () => void;
}

const useFiltersStore = create<FiltersStore>((set) => ({
  titleFilter: '',
  orderBy: 'none',
  limit: 10,
  skip: 0,
  
  setTitleFilter: (titleFilter) =>
    set((state) => ({
      ...state,
      titleFilter,
    })),
  
  setOrderBy: (orderBy) =>
    set((state) => ({
      ...state,
      orderBy,
    })),
  
  setLimit: (limit) =>
    set((state) => ({
      ...state,
      limit,
    })),

  setSkip: (skip) =>
    set((state) => ({
      ...state,
      skip,
    })),
  
  resetFilters: () =>
    set(() => ({
      titleFilter: '',
      orderBy: 'none',
      skip: 0,
    })),
}));

export default useFiltersStore;