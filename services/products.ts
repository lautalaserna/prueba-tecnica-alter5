import { Product } from "@/types/products";

const API_URL = 'https://dummyjson.com/products'

export const getProducts = async (title: string, sortBy:string, order:string, limit:number, skip:number) => {
  try {
    const response = await fetch(`${API_URL}/search?q=${title}&sortBy=${sortBy}&order=${order}&limit=${limit}&skip=${skip}`);
    
    if (!response.ok) {
      throw new Error(`Error en la solicitud: ${response.status} ${response.statusText}`);
    }
    
    return await response.json();
  } catch (error) {
    throw new Error("No se pudieron obtener los productos");
  }
}

export const addProduct = async (product: Product) => {
  try {
    const response = await fetch(`${API_URL}/add`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(product),
    });

    if (!response.ok) {
      throw new Error(`Error en la solicitud: ${response.status} ${response.statusText}`);
    }

    return await response.json();
  } catch (error) {
    throw new Error("No se pudo agregar el producto");
  }
}

export const deleteProduct = async (id: number) => {
  if (typeof id !== "number" || id <= 0) {
    throw new Error("ID inválido");
  }

  try {
    const response = await fetch(`${API_URL}/${id}`, {
      method: 'DELETE',
    });

    if (!response.ok) {
      throw new Error(`Error en la solicitud: ${response.status} ${response.statusText}`);
    }

    return await response.json();
  } catch (error) {
    throw new Error("No se pudo eliminar el producto");
  }
};
