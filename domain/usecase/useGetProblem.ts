import type { ProblemDto } from "../dto/problem/problem.dto";

const loading = ref<boolean>();
const problem = ref<ProblemDto>();

export const useGetProblem = () => {
  const supabase = useSupabaseClient();

  const execute = async (id: number): Promise<void> => {
    loading.value = true;
    try {
      const data = await get(id);
      problem.value = data;
    } catch (error) {
      console.error(error);
    } finally {
      loading.value = false;
    }
  };

  const get = async (id: number): Promise<ProblemDto | undefined> => {
    try {
      const { data, error } = await supabase.rpc("get_problem_with_tags", {
        p_id: id,
      } as any);

      if (error || !data) {
        console.error(error);
        return undefined;
      }

      return data as ProblemDto;
    } catch (error) {
      console.error(error);
      return undefined;
    }
  };

  return {
    loading,
    problem,
    execute,
  };
};
