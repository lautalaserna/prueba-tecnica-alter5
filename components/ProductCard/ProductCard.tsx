'use client';

import { Product } from "@/types/products";
import Image from "next/image";
import { useState } from "react";
import { DeleteModal } from "@/components";
import useProductStore from "@/store/productsStore";

interface ProductProps {
  product: Product;
}

export default function ProductCard({ product }: ProductProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { deleteProduct } = useProductStore()

  const handleDeleteClick = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleConfirmDelete = () => {
    deleteProduct(product.id);
    setIsModalOpen(false);
  };
  
  return (
    <div
      key={product.id}
      className="h-full flex flex-col items-center justify-between border p-4 rounded-md cursor-pointer hover:shadow hover:border-gray-300 hover:bg-slate-50"
    >
      {product.thumbnail ? 
        <Image src={product.thumbnail} alt={product.title} width={200} height={200} priority /> :
        <Image src='/unnamed.jpg' alt={product.title} width={200} height={200} />
      }
      <h2 className="mt-1 font-semibold text-center">{product.title}</h2>
      <p>$ {product.price}</p>
      <button
        onClick={handleDeleteClick}
        className="mt-3 flex items-center gap-1 px-6 py-2 bg-red-500 text-white rounded-md ease-in duration-100 hover:bg-red-700"
      >
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-5 h-5">
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 3.75h6M4.5 6.75h15M9 6.75v12.75M15 6.75v12.75M6 6.75v12.75a1.5 1.5 0 001.5 1.5h9a1.5 1.5 0 001.5-1.5V6.75" />
        </svg>
        <span>Eliminar</span>
      </button>

      <DeleteModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        onConfirm={handleConfirmDelete}
      />
    </div>
  );
}