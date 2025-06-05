import { useMutation, useQueryClient } from "@tanstack/react-query";
import * as TodosAPI from "../services/TodosAPI";
import { Todo } from "../services/Todo.types";
import { toast } from "react-toastify";


const useCreateTodo = () => {

	const queryClient  = useQueryClient();


	return useMutation({
		mutationFn: TodosAPI.postTodo,
		onSuccess: async (createdTodo) => {
			// set the response from the mutation as the query cache for the created todo
			queryClient.setQueryData(["todo", { id: createdTodo.id }], createdTodo);

			//get ['todos'] from the cache if they exist and are fresh,
			//otherwise fetch them from the API
			const cachedTodos = await queryClient.fetchQuery({
				queryKey: ["todos"],
				queryFn: TodosAPI.getTodos,
			});

			// instead of invalidating the ["todos"] query, we can construct new data
			// based on the previous data + newly created todo from the mutation
			//**ONLY** add the new todo if it does not already exist in the cache
			if (!cachedTodos.find(todo => todo.id === createdTodo.id)) {
				queryClient.setQueryData<Todo[]>(["todos"], (todos) => {
					return [
						...todos ?? [],
						createdTodo,
					];
				});
			}

			// 🥂
			toast.success("Todo created!", { icon: () => "🤩" });
		},
	})
};


export default useCreateTodo;
