import type { ProblemBoxDto } from '../dto/problem-box/problem-box.dto';

const loading = ref<boolean>();
const problemBox = ref<ProblemBoxDto>();

export const useGetProblemBox = () => {
  const supabase = useSupabaseClient();

  const execute = async (id: number): Promise<void> => {
    loading.value = true;
    try {
      const data = await get(id);
      problemBox.value = data;
    } catch (error) {
      console.error(error);
    } finally {
      loading.value = false;
    }
  };

  const get = async (id: number): Promise<ProblemBoxDto | undefined> => {
    try {
      const { data, error } = await supabase.rpc(
        'get_problem_box_with_problems',
        { p_id: id } as any
      );

      if (error || !data) {
        console.error(error);
        return undefined;
      }

      return data as ProblemBoxDto;
    } catch (error) {
      console.error(error);
      return undefined;
    }
  };

  return {
    loading,
    problemBox,
    execute,
  };
};
