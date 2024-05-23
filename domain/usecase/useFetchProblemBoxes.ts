import type { ProblemBoxDto } from "../dto/problem-box/problem-box.dto";

const loading = ref<boolean>();
const problemBoxes = reactive<Array<ProblemBoxDto>>([]);

export const useFetchProblemBoxes = () => {
  const supabase = useSupabaseClient();

  const execute = async (): Promise<void> => {
    loading.value = true;
    try {
      const data = await fetch();
      Object.assign(problemBoxes, data);
    } catch (error) {
      console.error(error);
    } finally {
      loading.value = false;
    }
  };

  const fetch = async (): Promise<Array<ProblemBoxDto>> => {
    try {
      const { data, error } = await supabase
        .from("problem_boxes")
        .select("*, problems(*)");

      if (error) {
        console.error(error);
      }

      return data as Array<ProblemBoxDto>;
    } catch (error) {
      console.error(error);
      return [];
    }
  };

  return {
    loading,
    problemBoxes,
    execute,
  };
};
