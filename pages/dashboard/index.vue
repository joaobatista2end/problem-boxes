<template>
  <ProblemBoxesPage />
</template>

<script lang="ts" setup>
import ProblemBoxesPage from '~/modules/problems/ui/pages/ProblemBoxesPage.vue';
import auth from '~/modules/auth/infra/http/middlewares/auth';

definePageMeta({
  middleware: [auth],
});
</script>
