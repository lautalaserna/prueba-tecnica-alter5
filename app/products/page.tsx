'use client';

import AddProductButton from '@/components/AddProductButton';
import AddProductModal from '@/components/AddProductModal';
import Filters from '@/components/Filters';
import Navbar from '@/components/Navbar';
import Pagination from '@/components/Pagination';
import ProductList from '@/components/ProductList';
import { useState } from 'react';

function ProductsPage() { 
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <Navbar />
      <main className="min-h-[calc(100vh-100px)] pt-[80px] px-20 md:px-28 w-full flex flex-col items-center">
        <section className='w-full flex justify-center md:justify-end items-center pt-6'>
          <AddProductButton onClick={() => setIsModalOpen(true)} />
        </section>
        <AddProductModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
        <Filters />
        <ProductList />
        <Pagination />
      </main>
    </>
  );
};

export default ProductsPage;