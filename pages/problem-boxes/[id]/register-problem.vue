<template>
  <div class="max-w-screen-lg mx-auto px-8 md:px-0">
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
              v-model="problem.title"
            />
          </div>
          <div>
            <label for="" class="block mb-2 text-slate-600">Descrição</label>
            <textarea
              class="border rounded-md px-4 py-2 w-full h-[230px] resize-none"
              placeholder="Insira o título do problema"
              v-model="problem.description"
            />
          </div>

          <div>
            <label for="" class="block mb-2 text-slate-600">Tags</label>
            <input
              type="text"
              class="border h-10 rounded-md py-2 px-4 w-full"
              placeholder="Insira as tags separadas por vírgula: Tag1, Tag2, Tag3"
              v-model="problem.tags"
            />
          </div>

          <!-- <div>
            <label for="" class="block mb-2 text-slate-600">Anexos</label>
            <div
              class="relative w-full flex-col flex items-center justify-center h-[100px] bg-slate-100 border-slate-200 border-2 rounded-md"
            >
              <p class="text-slate-600">
                <LucideUploadCloud class="inline mr-2" />
                Enviar arquivos
              </p>
              <p class="text-xs text-slate-500">
                Tipos aceitos: (JPG, PNG, GIF). No total, os arquivos devem
                somar 4 mb.
              </p>
              <input
                type="file"
                class="h-full w-full absolute left-0 top-0 opacity-0"
                ref="fileAttachments"
                @change="handleSelectFiles"
                multiple
                accept="image/gif, image/png, image/jpeg"
              />
            </div>

            <template v-if="problem.attachments?.length">
              <span class="block mt-4 mb-2 text-slate-600">
                Arquivos selecionados:
              </span>

              <ul
                class="flex border gap-x-2 rounded-md border-slate-200 px-4 py-2"
              >
                <li
                  v-for="(file, index) in problem.attachments"
                  :key="index"
                  class="flex items-center gap-x-2 text-xs bg-amber-400 text-slate-800 font-medium px-2 py-1 rounded-full"
                >
                  {{ file.name }}

                  <button class="rounded-full" @click="removeFile(index)">
                    <LucideXCircle :size="14" class="text-slate-800" />
                  </button>
                </li>
              </ul>
            </template>
          </div> -->
        </div>

        <div class="flex justify-end mt-8">
          <button
            :disabled="loadingRegistreProblem"
            class="py-2 px-2 bg-gradient-to-tr from-orange-300 to-amber-200 rounded-md text-sm border-orange-300 border-2"
          >
            {{ loadingRegistreProblem ? "Carregando" : "Salvar" }}
            <LucideSave class="inline ml-1" :size="16" />
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { useGetProblemBox } from "~/domain/usecase/useGetProblemBox";
import { useRegisterProblem } from "~/domain/usecase/useRegisterProblem";

// State
const fileAttachments = ref<HTMLInputElement>();
// Composables
const {
  params: { id },
  name,
} = useRoute();
const { execute, loading, problemBox } = useGetProblemBox();
const {
  problem,
  loading: loadingRegistreProblem,
  execute: registerProblem,
} = useRegisterProblem();

// Methods
const handleSubmit = async () => {
  await registerProblem(problemBox.value?.id);
};

const handleSelectFiles = (event: Event) => {
  try {
    const { files } = event.target as HTMLInputElement;
    problem.value.attachments = [
      ...(problem.value.attachments || []),
      ...Array.from(files || []),
    ];
  } catch (error) {
    problem.value.attachments = [];
  }
};

const removeFile = (index: number) => {
  problem.value.attachments?.splice(index, 1);
};

// Hooks
onMounted(async () => {
  loading.value = true;
  await execute(parseInt(id as string));
});
</script>
