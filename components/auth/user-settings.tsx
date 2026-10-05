"use client";
import { FaUser, FaSignInAlt, FaUserPlus } from "react-icons/fa";
import { 
  CreditCard,
  ShoppingBag,
 } from "lucide-react";
 import { useTransition } from "react";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";

export const UserSettings = () => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button
          className="w-8 h-8 flex items-center justify-center rounded-full cursor-pointer bg-white text-black hover:bg-gray-200"
          aria-label="Abrir menu de usuario"
        >
          <FaUser className="text-xl" />
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56">
        <DropdownMenuItem
          onSelect={() => console.log("Abriendo página de inicio de sesión")}
        >
          <FaSignInAlt className="mr-2 h-6 w-6 text-gray-800" />
          <span className="text-gray-800 text-lg" >Iniciar Sesión</span>
        </DropdownMenuItem>
        <DropdownMenuItem
          onSelect={() => console.log("Abriendo página de registro de usuario")}
        >
          <FaUserPlus className="mr-2 h-6 w-6 text-gray-800" />
          <span className="text-gray-800 text-lg" >¡Regístrate Gratis!</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
