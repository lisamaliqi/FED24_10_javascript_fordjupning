import { useQuery } from "@tanstack/react-query";
import * as TodosAPI from "../services/TodosAPI";

const useTodo = (todoId: number, enabled = true) => { //? = optional, default = true, boolean type not needed when having true as default
	return useQuery({
		queryKey: ["todo", { id: todoId }],
		queryFn: () => TodosAPI.getTodo(todoId),
		enabled: enabled,
	});
}

export default useTodo;
