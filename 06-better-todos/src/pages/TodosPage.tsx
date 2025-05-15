import { useEffect, useState } from "react";
import TodoCounter from "../components/TodoCounter";
import * as TodosAPI from "../services/TodosAPI";
import { Todo } from "../types/Todo";
import  Alert  from "react-bootstrap/Alert";
import  Spinner  from "react-bootstrap/Spinner";
import ListGroup from "react-bootstrap/ListGroup";
import { Link, useLocation } from "react-router";
import AutoDismissingAlert from "../components/Alerts/AutoDismissingAlert";
import ErrorAlert from "../components/Alerts/ErrorAlerts";


function TodosPage() {
	const [error, setError] = useState<string | false>(false);
	const [isLoading, setIsLoading] = useState(true);
	const [todos, setTodos] = useState<Todo[] | null>(null);
	const location = useLocation();


	const getTodos = async () => {
		// reset state
		setError(false);
		setIsLoading(true);
		setTodos(null);

		// make request to api
		try {
			const data = await TodosAPI.getTodos();

			// sort data
			const sortedTodos = data
				.sort((a: Todo, b: Todo) => a.title.localeCompare(b.title))
				.sort((a: Todo, b: Todo) => Number(a.completed) - Number(b.completed));

			// set sorted todos  as state
			setTodos(sortedTodos);

		} catch (err) {
			console.error("Error thrown when fetching todos:", err);
			setError(err instanceof Error ? err.message : "It's not me, it's you");
		}
		setIsLoading(false);
	};


	/* const handleAddTodo = async (title: string) => {
		const todo: NewTodo = {
			title,
			completed: false,
		}
		await TodosAPI.postTodo(todo);
		getTodos();
	}; */


	// const completedTodos = todos.filter(todo => todo.completed);
	// const incompleteTodos = todos.filter(todo => !todo.completed);

	useEffect(() => {
		getTodos();
	}, []);




	return (
		<>
			<h1>Todos</h1>

			{location.state && location.state.status && (
				<AutoDismissingAlert  hideAfter={3000} variant={location.state.status.type}>
					{location.state.status.message}
				</AutoDismissingAlert>
			)}

			{/* {error && (
				<Alert variant="danger">
					{error}
				</Alert>
			)} */}

			{/* {error && (
				<ErrorAlert>
					{error}
				</ErrorAlert>
			)} */}

			{error && <ErrorAlert>{error}</ErrorAlert>}

			<AutoDismissingAlert hideAfter={500} variant="danger">
				Look quickly, imma dissapear!!
			</AutoDismissingAlert>

			{isLoading && (
				<Spinner animation="border" role="status">
					<span className="visually-hidden">Loading...</span>
				</Spinner>
			)}

			{todos && todos.length > 0 && (
				<>
					<ListGroup className="todolist">
						{todos.map(todo => (
							<ListGroup.Item
								action
								as={Link}
								className={todo.completed ? "completed" : ""}
								key={todo.id}
								to={`/todos/${todo.id}`}
							>
								<span className="todo-title">{todo.title}</span>
							</ListGroup.Item>
						))}
					</ListGroup>

					<TodoCounter
						completed={todos.filter(todo => todo.completed).length}
						total={todos.length}
					/>
				</>
			)}

			{todos && todos.length === 0 && (
				<Alert variant="warning">
					You ain't got no todos 🤔?
				</Alert>
			)}
		</>
	);
};

export default TodosPage;
