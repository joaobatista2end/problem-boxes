import type { ProblemBoxDto } from "../dto/problem-box/problem-box.dto";

const loading = ref<boolean>();
const problemBoxes = reactive<Array<ProblemBoxDto>>([]);

export const useFetchProblemBoxes = () => {
  const execute = async () => {
    loading.value = true;
    try {
      // TODO: Obter caixas de problemas do supabase
    } catch (error) {
      console.error(error);
    } finally {
      loading.value = false;
    }
  };

  return {
    loading,
    problemBoxes,
    execute,
  };
};
