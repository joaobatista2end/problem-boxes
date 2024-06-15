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
      class="mb-6 gap-x-4 p-4 bg-gray-50 rounded-md flex border-slate-200 border-2"
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

    <!-- Register Problem -->
    <div class="mb-2 flex justify-end">
      <NuxtLink
        :to="{
          name: 'problem-boxes-id-register-problem',
          params: { id: problemBox?.id },
        }"
        class="py-2 px-2 bg-gradient-to-tr from-orange-300 to-amber-200 rounded-md text-sm border-orange-300 border-2"
      >
        <LucideListPlus class="inline mr-2" :size="18" />
        Adicionar problema
      </NuxtLink>
    </div>

    <!-- Problems -->
    <div>
      <h3 class="mb-4 text-xl font-medium text-slate-800">
        Lista de problemas
      </h3>

      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2">
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
          v-else-if="problemBox?.problems?.length"
        >
          <ProblemThumbnail :problem="problem" />
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
import { useGetProblemBox } from "../../domain/usecase/useGetProblemBox";
import ProblemThumbnail from "../components/ProblemThumbnail.vue";

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
