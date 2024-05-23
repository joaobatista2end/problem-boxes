<template>
  <div class="max-w-screen-lg mx-auto px-4 lg:px-0">
    <div class="mb-6">
      <NuxtLink
        class="text-md font-medium text-slate-700 rounded-md"
        :to="{ name: 'index' }"
      >
        <LucideArrowLeft class="inline mr-2" :size="14" />
        Pagina Inicial
      </NuxtLink>
    </div>

    <!-- Thumb -->
    <div
      class="mb-8 gap-x-4 p-4 bg-gray-50 rounded-md flex border-slate-200 border-2"
      v-if="problemBox"
    >
      <img :src="problemBox?.thumbnail_url" alt="" class="max-h-[140px]" />
      <div>
        <h3 class="text-3xl font-medium text-zinc-800 mb-4">
          {{ problemBox?.title }}
        </h3>
        <p class="text-slate-700 text-sm">{{ problemBox?.description }}</p>
      </div>
    </div>

    <div>
      <h3 class="mb-4 text-xl font-medium text-slate-800">
        Lista de problemas
      </h3>

      <!-- Problems -->
      <div class="grid grid-cols-3 gap-x-2">
        <div
          v-if="!loading && !problemBox?.problems?.length"
          class="flex items-center gap-x-4 border-slate-500/30 border-2 px-4 py-2 rounded-md bg-slate-100/20"
        >
          <LucideBox class="text-slate-500" />
          <div>
            <p class="font-light text-slate-600">Sem problemas cadastrados.</p>
          </div>
        </div>

        <div
          v-for="problem in problemBox?.problems"
          :key="problem.id"
          class="flex flex-col bg-gray-50 border-slate-200 rounded-md border-2 p-4"
          v-else-if="problemBox?.problems?.length"
        >
          <h4 class="text-slate-800 text-md font-medium mb-2">
            {{ problem.title }}
          </h4>

          <p class="text-slate-600 text-xs w-full line-clamp-3 mb-4">
            {{ problem.description }}
          </p>

          <div class="mb-3 border-t pt-2" v-if="problem?.tags?.length">
            <span class="text-sm mr-1 text-slate-600">Tags: </span>
            <span
              class="text-xs bg-amber-400 text-slate-800 font-medium px-2 py-1 rounded-full"
              v-for="tag in problem.tags"
              :key="tag"
            >
              {{ tag }}
            </span>
          </div>

          <div class="flex items-end justify-end flex-1">
            <NuxtLink
              class="h-[36px] text-sm px-4 py-2 font-normal bg-slate-700 text-white rounded-md hover:bg-slate-600"
              :to="{ name: 'problem-id', params: { id: problem.id } }"
            >
              Visualizar
              <LucideArrowRight class="inline ml-2" :size="14" />
            </NuxtLink>
          </div>
        </div>

        <div
          v-else
          class="flex items-center gap-x-4 border-slate-500/30 border-2 px-4 py-2 rounded-md bg-slate-100/20"
        >
          <LucideNetwork class="text-slate-500" />
          <div>
            <p class="font-light text-slate-600">Carregando...</p>
          </div>
        </div>
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

loading.value = true;

onMounted(async () => {
  await execute(parseInt(id as string));
});
</script>
