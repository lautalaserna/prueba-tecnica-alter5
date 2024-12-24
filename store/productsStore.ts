import { create } from "zustand";
import { addProduct, deleteProduct, getProducts } from "@/services/products";
import { Product } from "@/types/products";

interface ProductStore {
  products: Product[];
  loading: boolean;
  error: string | null;
  total: number;
  filterProducts: (title: string, sortBy: string, order: string, limit: number, skip: number) => Promise<void>;
  addProduct: (product: Product) => Promise<void>;
  deleteProduct: (id: number) => Promise<void>;
}

const useProductStore = create<ProductStore>((set) => ({
  products: [],
  loading: false,
  error: null,
  total: -1,

  filterProducts: async (title, sortBy, order, limit, skip) => {
    set({ loading: true, error: null });
    try {
      const data = await getProducts(title, sortBy, order, limit, skip);
      set({ products: data.products, loading: false, total: data.total });
    } catch (error: any) {
      set({ error: error.message, loading: false });
    }
  },

  addProduct: async (product) => {
    set({ loading: true, error: null });
    try {
      const newProduct = await addProduct(product);
      set((state) => ({ products: [newProduct,...state.products], loading: false }));
    } catch (error: any) {
      set({ error: error.message, loading: false });
    }
  },

  deleteProduct: async (id) => {
    set({ loading: true, error: null });
    try {
      await deleteProduct(id);
      set((state) => ({
        products: state.products.filter((product) => product.id !== id),
        loading: false,
      }));
    } catch (error: any) {
      set({ error: error.message, loading: false });
    }
  },
}));

export default useProductStore;