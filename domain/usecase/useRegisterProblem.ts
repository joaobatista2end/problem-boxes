import type { CreateProblemDto } from "../dto/problem/problem.dto";

const loading = ref<boolean>();

export const useRegisterProblem = () => {
  const execute = async (problem: CreateProblemDto) => {
    loading.value = true;
    try {
      // TODO: Obter caixas de problemas do supabase
      // 1 - Enviar arquivos para o bucket
      // 2 - Obter o array com as urls dos arquivos
      // 3 - Criar as tags informadas no problema
      // 4 - Criar o problema
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
