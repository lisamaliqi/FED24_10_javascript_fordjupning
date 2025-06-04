import { useQuery } from "@tanstack/react-query";
import * as TodosAPI from "../services/TodosAPI";

const useTodo = (todoId: number) => {
	return useQuery({
		queryKey: ["todo", { id: todoId }],
		queryFn: () => TodosAPI.getTodo(todoId),
		// enabled: queryEnabled,
	});
}

export default useTodo;
