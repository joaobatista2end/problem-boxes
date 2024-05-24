<template>
  <div>
    <div class="mb-6">
      <NuxtLink
        class="text-md font-medium text-slate-700 rounded-md"
        :to="{ name: 'problem-boxes-id', params: { id } }"
      >
        <LucideArrowLeft class="inline mr-2" :size="14" />
        Caixa de Problemas: {{ problemBox?.title }}
      </NuxtLink>
    </div>

    <div>
      <form @submit.prevent="handleSubmit">
        <div class="space-y-3">
          <div>
            <label for="" class="block mb-2 text-slate-600">Título</label>
            <input
              type="text"
              class="border h-10 rounded-md py-2 px-4"
              placeholder="Insira o título do problema"
            />
          </div>
          <div>
            <label for="" class="block mb-2 text-slate-600">Descrição</label>
            <textarea
              class="border rounded-md px-4 py-2 w-full h-[230px] resize-none"
              placeholder="Insira o título do problema"
            />
          </div>

          <div>
            <label for="" class="block mb-2 text-slate-600">Tags</label>
            <input
              type="text"
              class="border h-10 rounded-md py-2 px-4 w-full"
              placeholder="Insira as tags separadas por vírgula: Tag1, Tag2, Tag3"
            />
          </div>

          <div>
            <label for="" class="block mb-2 text-slate-600">Anexos</label>
            <div class="relative w-full flex-col flex items-center justify-center h-[100px] bg-slate-100 border-slate-200 border-2 rounded-md">
              <p class="text-slate-600">
                <LucideUploadCloud class="inline mr-2" />
                Enviar arquivos
              </p>
              <p class="text-xs text-slate-500">
                Tipos aceitos: (JPG, PNG, MP4, MP3 e PDF)
              </p>
              <input
                type="file"
                class="h-full w-full absolute left-0 top-0 opacity-0"
              />
            </div>
          </div>
        </div>

        <div class="flex justify-end mt-8">
            <button class="py-2 px-2 bg-gradient-to-tr from-orange-300 to-amber-200 rounded-md text-sm border-orange-300 border-2">
              Salvar
              <LucideSave class="inline ml-1" :size="16"/>
              </button>
          </div>
      </form>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { useGetProblemBox } from "~/domain/usecase/useGetProblemBox";

// Composables
const {
  params: { id },
  name,
} = useRoute();
const { execute, loading, problemBox } = useGetProblemBox();

// Methods
const handleSubmit = () => {};

// Hooks
onMounted(async () => {
  loading.value = true;
  await execute(parseInt(id as string));
});
</script>
