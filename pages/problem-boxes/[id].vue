<template>
  <div class="max-w-screen-lg mx-auto px-4 lg:px-0">
    <div
      class="gap-x-4 p-1 bg-gradient-to-br hover:bg-gradient-to-tl hover:to-orange-300 to-orange-200 from-transparent rounded-md"
    >
      <div
        class="flex gap-x-4 p-4 bg-gradient-to-tr from-orange-200 hover:from-orange-300 hover:to-amber-200 to-amber-100"
      >
        {{ loading ? "Carregando Caixa de problemas..." : "" }}
        <img :src="problemBox?.thumbnail_url" alt="" class="max-h-[140px]" />
        <div>
          <h3 class="text-3xl font-medium text-zinc-600 mb-4">
            {{ problemBox?.title }}
          </h3>
          <p>{{ problemBox?.description }}</p>
        </div>
      </div>
    </div>

    <div class="grid grid-cols-3">
      <div v-for="problem in problemBox?.problems" :key="problem.id">
        <h4 class="text-lg font-medium">{{ problem.title }}</h4>
        <p class="text-sm w-full line-clamp-3">
          {{ problem.description }}
        </p>

        <button class="px-4 py-2 font-light bg-slate-700 text-white rounded-md">
          Ler mais
        </button>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { useGetProblemBox } from "~/domain/usecase/useGetProblemBox";

const {
  params: { id },
  name,
} = useRoute();

const { execute, loading, problemBox } = useGetProblemBox();

onMounted(async () => {
  await execute(parseInt(id as string));
});
</script>
