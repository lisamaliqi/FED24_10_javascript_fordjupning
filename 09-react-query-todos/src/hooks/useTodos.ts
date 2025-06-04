import { useQuery } from "@tanstack/react-query";
import * as TodosAPI from "../services/TodosAPI";


const useTodos = () => {
	return useQuery({
		queryKey: ["todos"],
		queryFn: TodosAPI.getTodos,
	});
};


export default useTodos;
