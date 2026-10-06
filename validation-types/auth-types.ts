import * as z from "zod";

export const LoginType = z.object({
  email: z.email({
    error: "Ingrese un email válido",
  }),
  password: z.string().min(1, {
    error: "Ingrese una contraseña",
  }),
});

export const RegisterType = z.object({
  email: z.email({
    error: "Ingrese un email válido",
  }),
  password: z.string().min(6, {
    error: "La contraseña requiere 6 caracteres como mínimo",
  }),
  name: z.string().min(1, {
    error: "Nombre es requerido",
  }),
});
