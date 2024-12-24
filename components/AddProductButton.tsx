interface AddProductButtonProps {
  onClick: () => void;
}

export default function AddProductButton({ onClick }: AddProductButtonProps) {
  return (
    <button 
      onClick={onClick}
      className='self-end cursor-pointer p-2 px-4 bg-black text-white rounded-md hover:bg-gray-800'
    >
      + Nuevo Producto
    </button>
  );
}