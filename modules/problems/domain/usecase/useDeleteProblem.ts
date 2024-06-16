import { left, right, type Either } from "~/core/either";

export const useDeleteProblem = () => {
  const supabase = useSupabaseClient();
  const loading = ref<boolean>();

  const execute = async (id: number): Promise<Either<Error, any>> => {
    loading.value = true;
    try {
      const data = await supabase.from('problems').delete().eq('id', id)
      return right(data);
    } catch (error) {
      return left(new DeleteRegisterError(error))
    } finally {
      loading.value = false;
    }
  };

  return {
    execute,
    loading
  }
}