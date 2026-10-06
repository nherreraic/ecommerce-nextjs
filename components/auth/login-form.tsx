"use client";

import { AuthCardWrapper } from "@/components/auth/auth-card-wrapper";

export const LoginForm = () => {

  return (
    <AuthCardWrapper
      headerLabel="♻️ My Ecommerce"
      headerDescription="Iniciar sesión"
      switchButtonLabel="¿No tienes Cuenta?"
      switchButtonHref="/auth/register"
      showSocial={true}
    >
    <div>Children Login Placeholder</div>
    </AuthCardWrapper>
  )

}
