<template>
  <div>
    <div class="max-w-screen-lg mx-auto px-4 lg:px-0">
      <div class="mb-8">
        <div
          class="flex items-center gap-x-4 border-amber-500/30 border-2 px-4 py-2 rounded-md bg-amber-100/20"
        >
          <LucideLightbulb class="text-amber-500" />
          <div>
            <h4 class="font-medium text-slate-800">
              Existe algo em sua cidade que pode melhorar?
            </h4>
            <p class="font-light text-slate-600 text-sm">
              O que acha de contribuir para identificarmos pontos a melhorar em
              nossa cidade?
            </p>
          </div>
        </div>
      </div>

      <div class="grid grid-cols-1 gap-4 lg:grid-cols-3 md:grid-cols-2">
        <template v-if="loading"> Carregando Caixa de problemas... </template>

        <template v-else>
          <div v-for="problemBox in problemBoxes" :key="problemBox.id">
            <ProblemBoxThumbnail :data="problemBox" />
          </div>
        </template>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { useFetchProblemBoxes } from "~/domain/usecase/useFetchProblemBoxes";
const { loading, execute, problemBoxes } = useFetchProblemBoxes();

definePageMeta({
  middleware: ['auth']
})

onMounted(async () => {
  await execute();
});
</script>
