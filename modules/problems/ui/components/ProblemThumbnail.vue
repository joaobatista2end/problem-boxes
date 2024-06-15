<template>
  <div
    class="flex flex-col bg-gray-50 border-slate-200 rounded-md border-2 p-4"
  >
    <h4 class="text-slate-800 text-md font-medium mb-2">
      {{ problem?.title }}
    </h4>

    <p class="text-slate-600 text-xs w-full line-clamp-3 mb-4">
      {{ problem?.description }}
    </p>

    <div class="mb-3 border-t pt-2" >
      <span class="text-sm mr-1 text-slate-600">Tags: </span>
      <div class="inline-flex gap-x-2" v-if="problem?.tags?.length">
        <span
          class="text-xs bg-amber-400 text-slate-800 font-medium px-2 py-1 rounded-full"
          v-for="tag in problem.tags"
          :key="tag"
        >
          {{ tag }}
        </span>
      </div>

      <span class="text-xs text-slate-800 font-medium" v-else>
        Sem tags
      </span>
    </div>

    <div class="flex items-end justify-end flex-1">
      <NuxtLink
        class="text-xs px-3 py-2 font-normal bg-slate-700 text-white rounded-md hover:bg-slate-600"
        :to="{ name: 'problem-id', params: { id: problem?.id } }"
      >
        Visualizar
        <LucideArrowRight class="inline ml-2" :size="14" />
      </NuxtLink>
    </div>
  </div>
</template>

<script lang="ts" setup>
import type { ProblemDto } from '../../domain/dto/problem/problem.dto';

defineProps<{
  problem: ProblemDto
}>();
</script>
