const loading = ref<boolean>();

export const useSingUp = () => {
  const supabase = useSupabaseClient();

  const execute = async (payload: {
    email: string;
    password: string;
  }): Promise<any> => {
    loading.value = true;
    try {
      const { data, error } = await supabase.auth.signUp(payload);
      if (error || !data) {
        console.error(error);
        return undefined;
      }
      return data;
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
