import useProductStore from "@/store/productsStore";
import { Product } from "@/types/products";
import { useState } from "react";

interface AddProductModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const AddProductModal: React.FC<AddProductModalProps> = ({ isOpen, onClose }) => {
  const { addProduct } = useProductStore();
  const [formData, setFormData] = useState({title: "", description: "", price: ""});
  const [errors, setErrors] = useState({title: "", description: "", price: ""});

  const validate = () => {
    const newErrors: typeof errors = {title: "", description: "", price: ""};

    if (!formData.title) newErrors.title = "El título es obligatorio";
    if (!formData.description) newErrors.description = "La descripción es obligatoria";
    if (!formData.price || isNaN(Number(formData.price))) newErrors.price = "El precio debe ser un número válido";

    setErrors(newErrors);
    return !Object.values(newErrors).some((err) => err);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validate()) {
      const productData = {
        title: formData.title,
        description: formData.description,
        price: parseFloat(formData.price),
      }
      
      addProduct(productData as Product);
      setFormData({ title: "", description: "", price: "" });
      setErrors({ title: "", description: "", price: "" });
      onClose();
    }
  };

  const handleCancel = () => {
    setFormData({ title: "", description: "", price: "" });
    setErrors({ title: "", description: "", price: "" });
    onClose();
  }

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="mx-2 bg-white p-6 rounded-lg shadow-lg w-full max-w-2xl">
        <h2 className="text-xl font-semibold mb-4">Agregar un Producto</h2>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div className="flex flex-col gap-1">
            <label className="font-semibold">Título</label>
            <input
              type="text"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              className={`${errors.title ? 'border-red-500' : 'border-gray-600'} w-full px-3 py-2 border rounded-md text-gray-700`}
            />
            {errors.title && <p className="text-sm text-red-500">{errors.title}</p>}
          </div>
          <div className="flex flex-col gap-1">
            <label className="font-semibold">Descripción</label>
            <textarea
              value={formData.description}
              rows={4}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              className={`${errors.description ? 'border-red-500' : 'border-gray-600'} w-full px-3 py-2 border border-gray-600 rounded-md text-gray-700`}
            />
            {errors.description && <p className="text-sm text-red-500">{errors.description}</p>}
          </div>
          <div className="flex flex-col gap-1">
            <label className="font-semibold">Precio</label>
            <input
              type="number"
              value={formData.price}
              onChange={(e) => setFormData({ ...formData, price: e.target.value })}
              className={`${errors.price ? 'border-red-500' : 'border-gray-600'} w-full px-3 py-2 border border-gray-600 rounded-md text-gray-700`}
            />
            {errors.price && <p className="text-sm text-red-500">{errors.price}</p>}
          </div>
          <div className="flex justify-end gap-1 space-x-2 mt-4">
            <button
              type="button"
              onClick={handleCancel}
              className="px-4 py-2 bg-gray-300 text-black rounded-md ease-in duration-100 hover:bg-gray-400"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="flex gap-1 items-center px-4 py-2 bg-black text-white rounded-md ease-in duration-100 hover:bg-gray-900"
            >
              Guardar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddProductModal;