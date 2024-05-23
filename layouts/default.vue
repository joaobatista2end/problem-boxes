<template>
  <div class="pt-10">
    <div
      class="max-w-screen-lg mx-auto px-4 lg:px-0 border-b border-slate-200 pb-3 mb-6"
    >
      <div class="flex justify-end">
        <h3 class="text-zinc-800 font-bold flex items-center">
          <div
            class="inline-flex bg-gradient-to-tr p-2 border-2 border-orange-300 rounded-lg from-amber-200 to-orange-500 mr-2"
          >
            <LucidePackageOpen class="inline text-slate-800" />
          </div>
          <div>
            <span class="font-thin block tracking-tight text-slate-800"
              >Caixas de
            </span>
            <span
              class="uppercase text-amber-600 font-extrabold block -mt-[8px]"
              >Problemas</span
            >
          </div>
        </h3>
      </div>
    </div>
    <slot></slot>
  </div>
</template>
<script lang="ts" setup></script>
