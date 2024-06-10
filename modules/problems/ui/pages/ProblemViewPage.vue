<template>
  <div class="max-w-screen-lg mx-auto px-4 lg:px-0">
    <div class="mb-6">
      <NuxtLink
        class="text-md font-medium text-slate-700 rounded-md"
        :to="{
          name: 'problem-boxes-id',
          params: { id: problem?.problemBox.id },
        }"
      >
        <LucideArrowLeft class="inline mr-2" :size="14" />
        Caixa de problema: {{ problem?.problemBox?.title }}
      </NuxtLink>
    </div>

    <div
      class="mb-8 gap-x-4 p-4 bg-gray-50 rounded-md flex border-slate-200 border-2"
      v-if="problem?.problemBox"
    >
      <img
        :src="problem.problemBox?.thumbnail_url"
        alt=""
        class="max-h-[140px]"
      />
      <div>
        <h3 class="text-3xl font-medium text-zinc-800 mb-4">
          {{ problem.problemBox?.title }}
        </h3>
        <p class="text-slate-700 text-sm">
          {{ problem.problemBox?.description }}
        </p>
      </div>
    </div>

    <div>
      <template v-if="loading"> Carregando... </template>
      <template v-else>
        <h3 class="mb-4 text-xl font-medium text-slate-700">
          {{ problem?.title }}
        </h3>

        <div class="mb-1 border-t pt-2" v-if="problem?.tags?.length">
          <span class="text-sm mr-1 text-slate-600">Tags: </span>
          <div class="inline-flex gap-x-2">
            <span
              class="text-xs bg-amber-400 text-slate-800 font-medium px-2 py-1 rounded-full"
              v-for="tag in problem.tags"
              :key="tag"
            >
              {{ tag }}
            </span>
          </div>
        </div>

        <div class="mb-6">
          <span class="text-sm mr-2 text-slate-600 mb-3">
            Criado em:
            {{ $dayjs(problem?.created_at).format('DD/MM/YYYY [às] HH:mm') }}
          </span>
        </div>

        <p class="text-slate-700 text-sm">
          {{ problem?.description }}
        </p>
      </template>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { useRoute } from 'vue-router';
import { useGetProblem } from '../../domain/usecase/useGetProblem';
import { onMounted } from 'vue';

const route = useRoute();
const id = parseInt(route?.params?.id as string);
const { loading, execute, problem } = useGetProblem();

onMounted(async () => {
  await execute(id);
});
</script>
