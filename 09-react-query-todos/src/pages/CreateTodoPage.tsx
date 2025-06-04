import { Link } from "react-router";
import Alert from "react-bootstrap/Alert";
import AddTodoForm from "../components/AddTodoForm";
import { NewTodo, Todo } from "../services/Todo.types";
import * as TodosAPI from '../services/TodosAPI';
import { useMutation, useQueryClient } from "@tanstack/react-query";
import ErrorAlert from "../components/Alerts/ErrorAlerts";


export default function CreateTodoPage() {

	// const navigate = useNavigate();
	const queryClient  = useQueryClient();


	const createTodoMutation = useMutation({
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
		},
	});


	const handleCreateTodo = async (title: string) => {
		const todo: NewTodo = {
			title,
			completed: false,
		}


		// Call mutation 🐢☢️
		createTodoMutation.mutate(todo);
	};





	return (
		<>
			<h1>Create a new todo</h1>

			{createTodoMutation.isError && (<ErrorAlert>{createTodoMutation.error.message}</ErrorAlert>)}

			{/* FORM */}
			<AddTodoForm
				onAddTodo={handleCreateTodo}
				isCreating={createTodoMutation.isPending}
			/>

			{createTodoMutation.isSuccess && (
				<Alert variant="success">
					<h2>Created todo successfully!</h2>
					<Link to={'/todos/' + createTodoMutation.data.id} className="btn btn-secondary mt-4" role='button'>
						Go to todo
					</Link>
				</Alert>
			)}



			<Link to='/todos' className="btn btn-secondary" role='button'> {/* Both a link and a button in this instance (link as button doesn't work) */}
				Back to all Todos
			</Link>
		</>
	)
};
