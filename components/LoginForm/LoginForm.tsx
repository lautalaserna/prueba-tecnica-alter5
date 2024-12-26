'use client';

import { login } from "@/services/auth";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function LoginForm() {
  const [loading, setLoading] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [userImg, setUserImg] = useState<string>('/user-1.svg');
  const router = useRouter();

  useEffect(() => {
    if (error) {
      setUserImg('user-error.svg');
    }
  }, [error]);

  const handleImgClick = () => {
    const randomUser = Math.floor(Math.random() * 8) + 1;
    setUserImg(`/user-${randomUser}.svg`);
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      await login(username, password);
      router.replace('/products');
    } catch (err) {
      setError('Credenciales incorrectas');
      setLoading(false);
    }
  };

  if(loading) return (
    <div className="flex items-center justify-center min-h-[calc(100vh-100px)]">
      <span>⌚ Cargando...</span>
    </div>
  );
  
  return (
    <div className="animate-fade-in flex flex-col items-center justify-center min-h-[calc(100vh-100px)]">
      <div className="min-h-[120px] min-w-[120px] bg-gray-200 rounded-full flex items-center justify-center">
        {userImg && <Image className='cursor-pointer ease-in-out duration-200 hover:scale-105' onClick={handleImgClick} src={userImg} width={120} height={120} alt="Logo" />}
      </div>
      <h1 className="pt-3 text-2xl font-bold">Iniciar Sesión</h1>
      <form onSubmit={handleSubmit} className="flex flex-col space-y-4 mt-8">
        <input
          type="text"
          placeholder="Usuario"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="px-3 py-2 border border-gray-600 text-gray-700p-2 rounded-md min-w-[300px]"
        />
        <input
          type="password"
          placeholder="Contraseña"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="px-3 py-2 border border-gray-600 text-gray-700p-2 rounded-md min-w-[300px]"
        />
        <button 
          type="submit"
          className="cursor-pointer p-2 bg-black text-white rounded-md ease-in duration-100 hover:bg-gray-800">
          Ingresar
        </button>
      </form>
      {error && <p className="text-red-500 mt-2">{error}</p>}
    </div>
  );
}