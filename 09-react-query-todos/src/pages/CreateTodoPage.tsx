import { Link, useNavigate } from "react-router";
import Alert from "react-bootstrap/Alert";
import AddTodoForm from "../components/AddTodoForm";
import { NewTodo } from "../services/Todo.types";
import * as TodosAPI from '../services/TodosAPI';
import { useMutation } from "@tanstack/react-query";
import ErrorAlert from "../components/Alerts/ErrorAlerts";


export default function CreateTodoPage() {

	const navigate = useNavigate();


	const createTodoMutation = useMutation({
		mutationFn: TodosAPI.postTodo,
	});


	const handleCreateTodo = async (title: string) => {
		const todo: NewTodo = {
			title,
			completed: false,
		}


		// Call mutation 🐢☢️More actions
		createTodoMutation.mutate(todo);

		// Redirect userMore actions
		// setTimeout(() => {
		// 	navigate("/todos/" + data.id);
		// }, 2000);
	};





	return (
		<>
			<h1>Create a new todo</h1>

			{createTodoMutation.isError && (<ErrorAlert>{createTodoMutation.error.message}</ErrorAlert>)}

			{/* FORM */}
			<AddTodoForm onAddTodo={handleCreateTodo}/>

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
