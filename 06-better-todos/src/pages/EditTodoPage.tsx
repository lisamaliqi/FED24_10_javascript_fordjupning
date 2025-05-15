import { useState, useEffect } from "react";
import Alert from "react-bootstrap/Alert";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { useNavigate, useParams } from "react-router";
import { Todo } from "../types/Todo";
import * as TodosAPI from "../services/TodosAPI";


const EditTodoPage = () => {
	const [error, setError] = useState<string | false>(false);
	const [isLoading, setIsLoading] = useState(true);
	const [todo, setTodo] = useState<Todo | null>(null);
	const [inputNewTodoTitle, setInputNewTodoTitle] = useState("");

	const { id } = useParams();
	const todoId = Number(id); //turn it to a number

	const navigate = useNavigate();


	// Get todo from API
	const getTodo = async (id: number) => {
		// reset state
		setError(false);
		setIsLoading(true);
		setTodo(null);

		// make request to api
		try {
			const data = await TodosAPI.getTodo(id);
			setInputNewTodoTitle(data.title);
			setTodo(data);
		} catch (err) {
			console.error(`Error thrown when fetching todo with id '${id}'`, err);
			setError(err instanceof Error ? err.message : "It's not me, it's you");
		}
		setIsLoading(false);
	};


	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();

		if(!todo) {
			throw new Error('Cant submit, todo is null');
		};

		// Call TodosAPI and update the todo
		await TodosAPI.updateTodo(todo.id, {
			title: inputNewTodoTitle,
		});

		// Redirect user to /todos/:id
		navigate("/todos/" + todo.id, {
			state: {
				status: {
					message: `Todo ${todo.id} was updated`,
					type: "success",
				},
			},
		});
	};


	useEffect(() => {
		getTodo(todoId);
	}, [todoId]);




	if (error) {
		return (
			<Alert variant="warning">
				<h1>Something went wrong!</h1>
				<p>{error}</p>

				<Button variant="primary" onClick={() => getTodo(todoId)}>TRY HARDER!!!</Button>
			</Alert>
		)
	};

	if (isLoading || !todo) {
		return <p>Loading...</p>
	};





	return (
		<>
			<h1 title={`Todo #${todo.id}`}>Edit: {todo.title}</h1>

			<Form onSubmit={handleSubmit} className="mb-3">
				<Form.Group className="mb-3" controlId="title">
					<Form.Label>Title</Form.Label>
					<Form.Control
						type="text"
						placeholder="Enter the new title"
						onChange={e => setInputNewTodoTitle(e.target.value)}
						value={inputNewTodoTitle}
					/>
				</Form.Group>

				<Button variant="primary" type="submit">
					Save
				</Button>
			</Form>

			<Button variant="secondary" onClick={() => navigate(-1)}>
				&laquo; Go back
			</Button>
		</>
	)
}

export default EditTodoPage
