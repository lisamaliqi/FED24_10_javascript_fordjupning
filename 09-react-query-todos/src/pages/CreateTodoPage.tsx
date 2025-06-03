import { Link, useNavigate } from "react-router";
import Alert from "react-bootstrap/Alert";
import AddTodoForm from "../components/AddTodoForm";
import { NewTodo, Todo } from "../services/Todo.types";
import * as TodosAPI from '../services/TodosAPI';
import { useState } from "react";


export default function CreateTodoPage() {

	const [ createdTodo, setCreatedTodo ] = useState<Todo | null>(null);
	const [ error, setError ] = useState<string | false>(false);
	const navigate = useNavigate();


	const handleCreateTodo = async (title: string) => {
		setCreatedTodo(null);
		setError(false);

		const todo: NewTodo = {
			title,
			completed: false,
		}

		try {
			const data = await TodosAPI.postTodo(todo);
			setCreatedTodo(data);


			setTimeout(() => {
				navigate('/todos/' + data.id);
			}, 2000);

		} catch (err) {
			console.error("Error thrown when creating todo:", err);
			setError(err instanceof Error ? err.message : "It's not me, it's you");
		}
	};





	return (
		<>
			<h1>Create a new todo</h1>

			{error && <Alert variant="warning">{error}</Alert>}

			{/* FORM */}
			<AddTodoForm onAddTodo={handleCreateTodo}/>

			{createdTodo && (
				<Alert variant="success">
					<h2>Created todo successfully!</h2>
					<Link to={'/todos/' + createdTodo.id} className="btn btn-secondary mt-4" role='button'>
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
