const loading = ref<boolean>();

export const useSingOut = () => {
  const supabase = useSupabaseClient();
  const router = useRouter();

  const execute = async (): Promise<any> => {
    loading.value = true;
    try {
      const { error } = await supabase.auth.signOut();
      router.push('/')
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
