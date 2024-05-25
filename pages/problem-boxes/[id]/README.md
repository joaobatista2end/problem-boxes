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
              <VeeField
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

const handleSelectFiles = (event: Event) => {
try {
const { files } = event.target as HTMLVeeFieldElement;
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
