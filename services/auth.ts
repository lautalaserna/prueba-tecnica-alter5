import { User } from "@/types/users";
import Cookies from "js-cookie";

const API_URL = process.env.NEXT_PUBLIC_AUTH_BASE_URL;

export const login = async (username: string, password: string) => {
  const res = await fetch(`${API_URL}/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ username, password }),
  });

  if (!res.ok) {
    throw new Error('Credenciales incorrectas');
  }

  const data = await res.json();
  Cookies.set('accessToken', data.accessToken, { expires: 1 });
};

export const getCurrentUser = async (): Promise<User> => {
  const token = Cookies.get('accessToken');

  if (!token) {
    throw new Error('Usuario no autenticado');
  }

  const res = await fetch(`${API_URL}/me`, {
    method: 'GET',
    headers: { Authorization: `Bearer ${token}` },
  });

  if (!res.ok) {
    throw new Error('No se pudo obtener el usuario');
  }

  return res.json();
};

export const logout = () => {
  Cookies.remove('accessToken');
};
