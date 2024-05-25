<template>
  <div class="max-w-screen-lg mx-auto">
    <div class="mb-6">
      <NuxtLink
        class="text-md font-medium text-slate-700 rounded-md"
        :to="{ name: 'problem-boxes-id', params: { id: problemBoxId } }"
      >
        <LucideArrowLeft class="inline mr-2" :size="14" />
        Voltar
      </NuxtLink>
    </div>
    <div>
      <form @submit="onSubmit">
        <div class="space-y-3">
          <div>
            <label for="title" class="block mb-2 text-slate-600">Título</label>
            <input
              name="title"
              type="text"
              class="border h-10 rounded-md py-2 px-4"
              placeholder="Insira o título do problema"
              v-model="title"
            />
            <span class="block text-xs text-red-500 mt-2">{{
              errors.title
            }}</span>
          </div>
          <div>
            <label for="description" class="block mb-2 text-slate-600"
              >Descrição</label
            >
            <textarea
              name="description"
              class="border rounded-md px-4 py-2 w-full h-[230px] resize-none"
              placeholder="Insira o título do problema"
              v-model="description"
            />
            <span class="block text-xs text-red-500 mt-2">{{
              errors.description
            }}</span>
          </div>

          <div>
            <label for="tags" class="block mb-2 text-slate-600">Tags</label>
            <input
              name="tags"
              type="text"
              class="border h-10 rounded-md py-2 px-4 w-full"
              placeholder="Insira as tags separadas por vírgula: Tag1, Tag2, Tag3"
              v-model="tags"
            />
          </div>
        </div>

        <div class="flex justify-end mt-8">
          <button
            :disabled="loadingRegistreProblem"
            class="py-2 px-2 bg-gradient-to-tr from-orange-300 to-amber-200 rounded-md text-sm border-orange-300 border-2 disabled:opacity-30"
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
import { useRegisterProblem } from "~/domain/usecase/useRegisterProblem";
import { toTypedSchema } from "@vee-validate/zod";
import { useForm, useField } from "vee-validate";
import { z } from "zod";

// State
const validationSchema = toTypedSchema(
  z.object({
    title: z
      .string({ message: "Título requerido" })
      .min(1, "Título requerido")
      .max(180, { message: "O título deve ter no máximo 180 caracteres" }),
    description: z.string({ message: "Descrição requerido" }),
    problem_box_id: z.number().optional(),
    tags: z.string().optional(),
  })
);

const { handleSubmit, errors } = useForm({
  validationSchema,
});

const { value: title } = useField<string>("title");
const { value: description } = useField<string>("description");
const { value: tags } = useField<string>("tags");

// const fileAttachments = ref<HTMLVeeFieldElement>();
// Composables
const { params } = useRoute();
const problemBoxId = Number(params.id as string);
const router = useRouter();
const { loading: loadingRegistreProblem, execute: registerProblem } =
  useRegisterProblem();

// Methods
const onSubmit = handleSubmit(async () => {
  const problem = await registerProblem({
    title: title.value,
    description: description.value,
    tags: tags.value,
    problem_box_id: problemBoxId,
  });

  router.push({ name: "problem-id", params: { id: problem.id } });
});
</script>
