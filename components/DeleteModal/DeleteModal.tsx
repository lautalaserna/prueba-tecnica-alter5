'use client';

interface DeleteModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
}

export default function DeleteModal({ isOpen, onClose, onConfirm }: DeleteModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
      <div className="animate-fade-in-up bg-white p-6 rounded-md shadow-md mx-2">
        <h3 className="text-lg font-semibold mb-2">Confirmar Eliminación</h3>
        <p>Está seguro que desea eliminar el producto?</p>
        <div className="mt-10 flex justify-end space-x-3">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-gray-300 text-black rounded-md ease-in duration-100 hover:bg-gray-400"
          >
            Cancelar
          </button>
          <button
            onClick={onConfirm}
            className="flex items-center px-4 py-2 bg-red-500 text-white rounded-md ease-in duration-100 hover:bg-red-700"
          >
            <span>Eliminar</span>
          </button>
        </div>
      </div>
    </div>
  );
}