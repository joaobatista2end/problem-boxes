<template>
  <div class="max-w-screen-lg mx-auto px-4 lg:px-0">
    <div class="mb-4">
      <h3 class="text-3xl font-medium text-zinc-600 mb-6">
        Caixas de Problemas
      </h3>
      <div
        class="flex items-center gap-x-4 border-amber-500/30 border-2 px-4 py-2 rounded-md bg-amber-100/20"
      >
        <LucideLightbulb class="text-amber-500" />
        <div>
          <h4 class="font-medium text-slate-800">
            Existe algo em sua cidade que pode melhorar?
          </h4>
          <p class="font-light text-slate-600">
            O que acha de contribuir para identificarmos pontos a melhorar em
            nossa cidade?
          </p>
        </div>
      </div>
    </div>

    <div class="grid grid-cols-1 gap-4 lg:grid-cols-3 md:grid-cols-2">
      {{ loading ? "Carregando Caixa de problemas..." : "" }}

      <div v-for="problemBox in problemBoxes" :key="problemBox.id">
        <ProblemBoxThumbnail :data="problemBox" />
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { useFetchProblemBoxes } from "~/domain/usecase/useFetchProblemBoxes";
const { loading, execute, problemBoxes } = useFetchProblemBoxes();

onMounted(async () => {
  await execute();
});
</script>
