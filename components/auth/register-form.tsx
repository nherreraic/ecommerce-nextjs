"use client";

import * as z from "zod";

import { useState, useTransition } from "react";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Field,
  FieldError,
  FieldLabel,
} from "@/components/ui/field";

import { AuthCardWrapper } from "@/components/auth/auth-card-wrapper";
import { FormError } from "@/components/errors/form-error";

import { register } from "@/actions/auth/register";
import { RegisterType } from "@/validation-types/auth-types";

export const RegisterForm = () => {
  const [error, setError] = useState("");
  const [isPending, startTransition] = useTransition();

  const form = useForm<z.infer<typeof RegisterType>>({
    resolver: zodResolver(RegisterType),
    defaultValues: {
      email: "",
      password: "",
      name: "",
    },
  });

  const onSubmit = (values: z.infer<typeof RegisterType>) => {
    setError("");

    startTransition(() => {
      register(values)
        .then((data) => {
          if (data?.error) {
            setError(data.error);
          }
        })
        .catch((error) => {
          if (error?.message === "NEXT_REDIRECT") {
            return;
          }

          setError("Algo salió mal");
        });
    });
  };

  return (
    <AuthCardWrapper
      headerLabel="♻️ My Ecommerce"
      headerDescription="¡Regístrate y Compra!"
      switchButtonLabel="¿Ya tienes Cuenta?"
      switchButtonHref="/auth/login"
      showSocial={true}
    >
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-6"
      >
        <div className="space-y-4">
          <Controller
            name="name"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor="name">
                  Nombre
                </FieldLabel>

                <Input
                  {...field}
                  id="name"
                  type="text"
                  disabled={isPending}
                  placeholder="Tu Nombre"
                  autoComplete="name"
                  aria-invalid={fieldState.invalid}
                />

                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />

          <Controller
            name="email"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor="email">
                  Email
                </FieldLabel>

                <Input
                  {...field}
                  id="email"
                  type="email"
                  disabled={isPending}
                  placeholder="example@gmail.com"
                  autoComplete="email"
                  aria-invalid={fieldState.invalid}
                />

                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />

          <Controller
            name="password"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor="password">
                  Contraseña
                </FieldLabel>

                <Input
                  {...field}
                  id="password"
                  type="password"
                  disabled={isPending}
                  placeholder="******"
                  autoComplete="new-password"
                  aria-invalid={fieldState.invalid}
                />

                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />
        </div>

        <FormError message={error} />

        <Button
          disabled={isPending}
          type="submit"
          className="w-full"
        >
          Registrar Cuenta
        </Button>
      </form>
    </AuthCardWrapper>
  );
};
