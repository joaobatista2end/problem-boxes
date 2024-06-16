<template>
  <NuxtLink
    :to="{ name: 'problem-id', params: { id: problem?.id } }"
    class="flex flex-col bg-gray-50 border-slate-200 rounded-md border-2 p-4"
  >
    <div class="flex items-start justify-between">
      <h4 class="text-slate-800 text-md font-medium mb-2">
        {{ problem?.title }}
      </h4>
      <button
        v-if="canDelete"
        class="text-xs p-2 font-normal bg-red-700 text-white rounded-full hover:bg-red-600 disabled:opacity-40"
        @click.prevent="remove(problem.id)"
        :disabled="loading"
      >
        <LucideTrash :size="16"/>
      </button>
    </div>

    <p class="text-slate-600 text-xs w-full line-clamp-3 mb-4">
      {{ problem?.description }}
    </p>

    <div class="mb-3 border-t pt-2">
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

      <span class="text-xs text-slate-800 font-medium" v-else> Sem tags </span>
    </div>
  </NuxtLink>
</template>

<script lang="ts" setup>
import type { ProblemDto } from "../../domain/dto/problem/problem.dto";
import { useDeleteProblem } from "../../domain/usecase/useDeleteProblem";

const props = defineProps<{
  problem: ProblemDto;
}>();

const { execute: remove, loading } = useDeleteProblem();

const canDelete = computed(() => {
  const session = useSupabaseSession();
  return session.value?.user.id === props.problem.user_id;
})
</script>
