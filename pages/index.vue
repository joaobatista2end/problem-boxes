<template>
  <SingInPage />
</template>

<script lang="ts" setup>
import SingInPage from '~/modules/auth/ui/pages/SingInPage.vue';
import redirectAuth from '~/modules/auth/infra/http/middlewares/redirect-auth';
definePageMeta({
  middleware: [redirectAuth],
});
</script>
