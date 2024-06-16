<template>
  <div class="max-w-screen-lg mx-auto">
    <h3 class="text-slate-800 mb-6 font-semibold text-xl">Login</h3>
    <form @submit="onSubmit">
      <div class="space-y-3">
        <div>
          <label for="email" class="block mb-2 text-slate-600">E-mail</label>
          <input
            name="email"
            type="email"
            class="border h-10 rounded-md py-2 px-4 w-full md:w-auto"
            :class="errors.email ? 'border-red-500' : ''"
            placeholder="email@example.com"
            v-model="email"
          />
          <span class="block text-xs text-red-500 mt-2">{{
            errors.email
          }}</span>
        </div>
        <div>
          <label for="password" class="block mb-2 text-slate-600">Senha</label>
          <input
            name="password"
            type="password"
            class="border rounded-md px-4 py-2 w-full md:w-auto"
            :class="errors.password ? 'border-red-500' : ''"
            v-model="password"
          />
          <span class="block text-xs text-red-500 mt-2">{{
            errors.password
          }}</span>
        </div>
      </div>

      <div class="mt-6">
        <button
          :disabled="loading"
          class="w-full md:w-auto py-2 px-2 bg-gradient-to-tr from-orange-300 to-amber-200 rounded-md text-sm border-orange-300 border-2 disabled:opacity-30"
        >
          {{ loading ? "Carregando..." : "Entrar" }}
          <LucideLogIn class="inline ml-1" :size="16" />
        </button>
      </div>
    </form>
  </div>
</template>

<script lang="ts" setup>
import { toTypedSchema } from "@vee-validate/zod";
import { useField, useForm } from "vee-validate";
import { useRouter } from "vue-router";
import { z } from "zod";
import { useSingIn } from "../../domain/usecases/useSingIn";

const router = useRouter();
const { execute: singIn, loading } = useSingIn();
const validationSchema = toTypedSchema(
  z.object({
    email: z
      .string({ message: "E-mail é obrigatório" })
      .email({ message: "O campo deve ser um  e-mail" }),
    password: z.string({ message: "Senha é obrigatória" }),
  })
);

const { handleSubmit, errors } = useForm({
  validationSchema,
});

const { value: email } = useField<string>("email");
const { value: password } = useField<string>("password");

const onSubmit = handleSubmit(async (payload) => {
  await singIn(payload);
  router.push({ name: "dashboard" });
});
</script>
