const loading = ref<boolean>();

export const useSingOut = () => {
  const supabase = useSupabaseClient();

  const execute = async (): Promise<any> => {
    loading.value = true;
    try {
      const { error } = await supabase.auth.signOut();
    } catch (error) {
      console.error(error);
    } finally {
      loading.value = false;
    }
  };

  return {
    loading,
    execute,
  };
};
