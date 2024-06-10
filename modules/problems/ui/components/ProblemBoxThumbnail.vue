<template>
  <div
    class="cursor-pointer w-full p-1 bg-gradient-to-br hover:bg-gradient-to-tl hover:to-orange-300 to-orange-200 from-transparent rounded-md"
    @click="redirectToProblemBoxPage"
  >
    <div
      class="w-full relative rounded-md min-h-[260px] px-2 py-4 bg-gradient-to-tr from-orange-200 hover:from-orange-300 hover:to-amber-200 to-amber-100"
    >
      <h3 class="text-2xl text-center font-medium mb-4 text-cyan-950">
        {{ data.title }}
      </h3>

      <img
        :src="data.thumbnail_url"
        :alt="data.description"
        class="h-[160px] mx-auto mb-2"
      />

      <p class="text-center font-light">
        <span
          class="bg-slate-800 text-white px-3 py-1 rounded-md mr-2"
          v-if="data.problems.length"
          >{{ data.problems.length }}</span
        >
        {{
          data.problems.length
            ? 'Problemas Cadastrados'
            : 'Sem problemas cadastrados'
        }}
      </p>
    </div>
  </div>
</template>

<script lang="ts" setup>
import type { ProblemBoxDto } from '../../domain/dto/problem-box/problem-box.dto';

const props = defineProps<{ data: ProblemBoxDto }>();

const router = useRouter();

const redirectToProblemBoxPage = () => {
  router.push({ name: 'problem-boxes-id', params: { id: props.data.id } });
};
</script>
