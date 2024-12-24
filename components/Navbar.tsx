'use client';

import { getCurrentUser, logout } from "@/services/auth";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function Navbar() {
  const [user, setUser] = useState<any>(null);
  const router = useRouter();
   
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const userData = await getCurrentUser();
        setUser(userData);
      } catch (err) {
        router.push('/');
      }
    };

    fetchUser();
  }, []);
  
  const handleLogout = () => {
    logout();
    router.push('/');
  };

  return (
    <nav>
      <div className="fixed w-full z-10 h-[80px] px-6 bg-black shadow-md flex justify-between items-center">
        <div className="flex items-center gap-2">
          {user && <img
            src={user?.image}
            alt={`${user?.firstName} ${user?.lastName}`}
            className="w-10 h-10 rounded-full"
          />}
          {user && <span className="text-white font-medium">{user?.firstName} {user?.lastName}</span>}
        </div>
        <button
          onClick={handleLogout}
          className="flex p-2 px-3 items-center gap-1 rounded-md bg-white text-black font-medium">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="black" className="w-5 h-5">
            <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 9V5.25A2.25 2.25 0 0013.5 3H6.75A2.25 2.25 0 004.5 5.25v13.5A2.25 2.25 0 006.75 21h6.75a2.25 2.25 0 002.25-2.25V15M18 12l-3-3m3 3l-3 3m3-3H9" />
          </svg>
          <span className="hidden sm:block">Salir</span>
        </button>
      </div>
    </nav>
  );
}