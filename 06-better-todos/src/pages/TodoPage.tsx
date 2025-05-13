import { useEffect, useState } from "react";
import Alert from 'react-bootstrap/Alert';
import Button from 'react-bootstrap/Button';
import { Link, useParams } from "react-router";
import { Todo } from "../types/Todo";
import * as TodosAPI from '../services/TodosAPI';

const TodoPage = () => {
	const [ error, setError] = useState<string | false>(false);
	const [ isLoading, setIsLoading] = useState(true);
	const [ todo, setTodo] = useState<Todo | null>(null);
	const { id } = useParams();
	const todoId = Number(id);



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


	//toggle todo in API
	const handleToggleTodo = async (todo: Todo) => {
		await TodosAPI.updateTodo(todo.id, {
			completed: !todo.completed,
		});
		getTodo(todoId);
	};


	useEffect(() => {
		//load todo on mount
		getTodo(todoId);
	}, [todoId]);


	if (error) {
		return <Alert variant='warning'>{error}</Alert>
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
			</div>

			{/* Here be button-link back to all todos */}
			<Link to='/todos' className="btn btn-secondary" role='button'> {/* Both a link and a button in this instance (link as button doesn't work) */}
					Back to all Todos
			</Link>
		</>
	)
};

export default TodoPage;
