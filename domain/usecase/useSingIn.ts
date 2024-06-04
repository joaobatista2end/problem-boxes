const loading = ref<boolean>();

export const useSingIn = () => {
  const supabase = useSupabaseClient();

  const execute = async (payload: {
    email: string;
    password: string;
  }): Promise<any> => {
    loading.value = true;
    try {
      const { data, error } = await supabase.auth.signInWithPassword(payload);
      if (error || !data) {
        console.error(error);
        return undefined;
      }
      const user = useSupabaseUser();
      console.log({ user });
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
