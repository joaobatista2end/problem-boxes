import type {
  ProblemDto,
  RegisterProblemDto,
} from "../dto/problem/problem.dto";
import type { Either } from "@/core/either";
import { left, right } from "@/core/either";

const supabase = useSupabaseClient();
const loading = ref<boolean>();

export const useRegisterProblem = () => {
  const execute = async (
    problem: RegisterProblemDto
  ): Promise<Either<Error, any>> => {
    try {
      if (!problem.problem_box_id) {
        return left(new MissingParametersError(["problem_box_id"]));
      }
      loading.value = true;

      const response = await supabase
        .from("problems")
        .insert({
          title: problem.title,
          description: problem.description,
          problem_box_id: problem.problem_box_id,
        })
        .select("id")
        .single();

      if (response?.data) {
        const tagIds = await registerTags(problem);
        await createRelationProblemWithTags(response.data.id, tagIds || []);
        return right(response.data);
      } else if (response.error) {
        return left(new Error(response.error.message));
      } else {
        return left(new Error("Unknown error"));
      }
    } catch (error: any) {
      return left(new Error(error.message || error));
    } finally {
      loading.value = false;
    }
  };

  const registerTags = async (
    problem: RegisterProblemDto
  ): Promise<Array<number> | undefined> => {
    try {
      loading.value = true;
      const tags = problem.tags.split(",").map((tag) => {
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
  };
};
