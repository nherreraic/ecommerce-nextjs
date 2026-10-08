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

import { LoginType } from "@/validation-types/auth-types";
import { login } from "@/actions/auth/login";

export const LoginForm = () => {
  const [error, setError] = useState("");
  const [isPending, startTransition] = useTransition();

  const form = useForm<z.infer<typeof LoginType>>({
    resolver: zodResolver(LoginType),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = (values: z.infer<typeof LoginType>) => {
    setError("");

    startTransition(() => {
      login(values)
        .then((data) => {
          if (data?.error) {
            setError(data.error)
          }
        })
        .catch((error) => {
          if (error?.message === "NEXT_REDIRECT") {
            return;
          }
          setError("Credenciales Inválidas o te registraste con google/github o algo salió mal")
        })
    })
  }

  return (
    <AuthCardWrapper
      headerLabel="♻️ My Ecommerce"
      headerDescription="Iniciar Sesión"
      switchButtonLabel="¿No tienes cuenta?"
      switchButtonHref="/auth/register"
      showSocial={true}
    >
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-6"
      >
        <div className="space-y-4">
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
                  autoComplete="current-password"
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
          Iniciar Sesión
        </Button>
      </form>
    </AuthCardWrapper>
  );
};
