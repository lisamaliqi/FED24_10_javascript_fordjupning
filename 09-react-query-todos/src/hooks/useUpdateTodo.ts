import { useMutation, useQueryClient } from "@tanstack/react-query";
import * as TodosAPI from "../services/TodosAPI";
import { NewTodo } from "../services/Todo.types";


const useUpdateTodo = (todoId: number) => {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: (data: Partial<NewTodo>) => TodosAPI.updateTodo(todoId, data),
		onSuccess: async (updatedTodo) => {
			// set the response from the mutation as the query cache for this todo
			queryClient.setQueryData(["todo", { id: todoId }], updatedTodo);

			// prefetch ["todos"] query as it is very likely the user will
			// return to todo list as their next step
			await queryClient.prefetchQuery({
				queryKey: ["todos"],
				queryFn: TodosAPI.getTodos,
				staleTime: 0, // always prefetch, even if the existing data is considered fresh 🌱
			});
		},
	});
}

export default useUpdateTodo;
