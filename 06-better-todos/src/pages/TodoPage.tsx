import { useEffect, useState } from "react";
import Button from 'react-bootstrap/Button';
import { Link, useNavigate, useParams } from "react-router";
import { Todo } from "../types/Todo";
import * as TodosAPI from '../services/TodosAPI';
import ConfirmDeleteButton from "../components/ConfirmDeleteButton";
import ErrorAlert from "../components/Alerts/ErrorAlerts";

const TodoPage = () => {
	const [ error, setError] = useState<string | false>(false);
	const [ isLoading, setIsLoading] = useState(true);
	const [ todo, setTodo] = useState<Todo | null>(null);

	const { id } = useParams();
	const todoId = Number(id);
	const navigate = useNavigate();



	//get todo from API
	const getTodo = async (id: number) => {
		// reset state
		setError(false);
		setIsLoading(true);
		setTodo(null);


		// make request to api
		try {
			const data = await TodosAPI.getTodo(id);
			setTodo(data);
		} catch (err) {
			console.error("Error thrown when fetching todo with id: ", id, err);
			setError(err instanceof Error ? err.message : "It's not me, it's you");
		};
		setIsLoading(false);
	};


	// Delete todo from API
	const handleDeleteTodo = async (todo: Todo) => {
		await TodosAPI.deleteTodo(todo.id);

		//redirect to /todos
		navigate('/todos', {
			replace: true,
			state: {
				status: {
					message: `Todo ${todo.id} was deleted`,
					type: 'success',
				},
			},
		});
	};


	//toggle todo in API
	const handleToggleTodo = async (todo: Todo) => {
		const updatedTodo = await TodosAPI.updateTodo(todo.id, {
			completed: !todo.completed,
		});
		//update todo state with the updated todo
		setTodo(updatedTodo);
	};


	useEffect(() => {
		//load todo on mount
		getTodo(todoId);
	}, [todoId]);


	if (error) {
		return <ErrorAlert>{error}</ErrorAlert>;
	};


	if (isLoading) {
		return <p>Loading...</p>
	};


	if (!todo) {
		return <p>Loading...</p>
	};




	return (
		<>
			<h1>{todo.title} with id: {todo.id}</h1>

			<p><strong>Status:</strong>{' '}
				{todo.completed
					? <span className="completed">Completed</span>
					: <span className="not-completed">Not completed</span>}
				</p>

			<div className="buttons mb-3">
				{/* Toggle */}
				<Button
					onClick={() => handleToggleTodo(todo)}
					variant="success">
				Toggle </Button>

				{/* Delete */}
				{/* <Button
					onClick={() => handleDeleteTodo(todo)}
					variant="danger">
				Delete </Button> */}
				<ConfirmDeleteButton onConfirm={() => handleDeleteTodo(todo)} />
			</div>

			{/* Here be button-link back to all todos */}
			<Link to='/todos' className="btn btn-secondary" role='button'> {/* Both a link and a button in this instance (link as button doesn't work) */}
					Back to all Todos
			</Link>
		</>
	)
};

export default TodoPage;
