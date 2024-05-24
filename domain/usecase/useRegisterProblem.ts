import type {
  ProblemDto,
  RegisterProblemDto,
} from "../dto/problem/problem.dto";

const supabase = useSupabaseClient();
const loading = ref<boolean>();
const problem = ref<RegisterProblemDto>({
  title: "",
  description: "",
  tags: "",
  attachments: [],
});
export const useRegisterProblem = () => {
  const execute = async (problem_box_id?: number): Promise<any> => {
    try {
      if (!problem_box_id)
        throw Error("É necessário o ID da Caixa de Problema");
      loading.value = true;

      const response = await supabase
        .from("problems")
        .insert({
          title: problem.value.title,
          description: problem.value.description,
          problem_box_id,
        } as any)
        .select("id")
        .single();

      if (response?.data) {
        const tagIds = await registerTags();
        await createRelationProblemWithTags(response.data.id, tagIds || []);
      }

      console.log(response);
    } catch (error) {
      console.error(error);
    } finally {
      problem.value = {} as RegisterProblemDto;
      loading.value = false;
    }
  };

  const registerTags = async (): Promise<Array<number> | undefined> => {
    try {
      loading.value = true;
      const tags = problem.value.tags.split(",").map((tag) => {
        return {
          name: tag.replace(/^\s+|\s+$/g, ""),
        };
      });

      const { data, error } = await supabase
        .from("problem_tags")
        .insert(tags as any)
        .select("id");

      if (error || !data) {
        console.error(error);
        return undefined;
      }

      const tagIds = data.map((tag) => tag.id);

      return tagIds;
    } catch (error) {
      console.error(error);
    } finally {
      problem.value = {} as RegisterProblemDto;
      loading.value = false;
    }
  };

  const createRelationProblemWithTags = async (
    problemId: number,
    problemTagIds: Array<number>
  ) => {
    try {
      if (!problemTagIds.length) return;

      const tagIdsWithProblemIds = problemTagIds.map((problem_tag_id) => {
        return {
          problem_id: problemId,
          problem_tag_id,
        };
      });

      const { data, error } = await supabase
        .from("problems_tag_belongs_problem")
        .insert(tagIdsWithProblemIds as any)
        .select("id");

      if (error || !data) {
        console.error(error);
        return undefined;
      }
    } catch (error) {
      console.error(error);
    } finally {
      loading.value = false;
    }
  };

  return {
    loading,
    execute,
    problem,
  };
};
