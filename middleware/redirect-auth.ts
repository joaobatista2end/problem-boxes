export default defineNuxtRouteMiddleware((to, from) => {
  const user = useSupabaseUser();
  if (user.value && from.name !== "dashboard") {
    return navigateTo({ name: "dashboard" });
  }
});
