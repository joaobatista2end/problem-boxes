<template>
  <div class="py-10 p-8 lg:p-0">
    <div
      class="max-w-screen-lg mx-auto px-4 lg:px-0 border-b border-slate-200 py-3 mb-6 flex"
    >
      <NuxtLink to="/dashboard">
        <h3 class="text-zinc-800 font-bold flex items-center">
          <div
            class="inline-flex bg-gradient-to-tr p-2 border-2 border-orange-300 rounded-lg from-amber-200 to-amber-500 mr-2"
          >
            <LucidePackageOpen class="inline text-slate-800" />
          </div>
          <div>
            <span class="font-thin block tracking-tight text-slate-800">
              Caixas de
            </span>
            <span
              class="uppercase text-amber-500 font-extrabold block -mt-[4px]"
            >
              Problemas
            </span>
          </div>
        </h3>
      </NuxtLink>
      <div class="flex-1 flex justify-end items-center gap-x-4">
        <template v-if="!user">
          <NuxtLink
            v-if="!isLoginRoute"
            to="/"
            class="font-semibold text-white px-4 py-2 rounded-md bg-amber-500"
          >
            Entrar
          </NuxtLink>
          <NuxtLink
            v-if="!isRegisterRoute"
            :to="{ name: 'register' }"
            class="font-medium text-zinc-700"
          >
            Registrar-se
          </NuxtLink>
        </template>

        <button
          @click="singOut()"
          class="font-semibold text-white px-4 py-2 rounded-md bg-slate-700"
          v-else
        >
          {{ loading ? 'Carregando...' : 'Sair' }}
        </button>
      </div>
    </div>
    <slot></slot>
  </div>
</template>
<script lang="ts" setup>
import { useSingOut } from '~/domain/usecase/useSingOut';
const route = useRoute();
const user = useSupabaseUser();
const { execute: singOut, loading } = useSingOut();

const isLoginRoute = computed(() => {
  return route.name === 'auth';
});

const isRegisterRoute = computed(() => {
  return route.name === 'auth-register';
});
</script>
~/modules/problems/domain/usecase/useSingOut
