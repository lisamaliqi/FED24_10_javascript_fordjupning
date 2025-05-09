import { useEffect, useState } from "react";
import AddTodoForm from "./components/AddTodoForm";
import TodoCounter from "./components/TodoCounter";
import TodoList from "./components/TodoList";
import * as TodosAPI from "./services/TodosAPI";
import { NewTodo, Todo } from "./types/Todo";
import "./assets/scss/App.scss";

function App() {
	const [error, setError] = useState<string | false>(false);
	const [isLoading, setIsLoading] = useState(true);
	const [todos, setTodos] = useState<Todo[]>([]);

	// One of two use-cases for useRef - remember a value between renders
	// *WITHOUT* triggering a re-render when the value is updated
	/*
	const renderCountRef = useRef(0);
	renderCountRef.current++;
	console.log("I have rendered this many times:", renderCountRef.current);
	*/

	const getTodos = async () => {
		// reset state
		setError(false);
		setIsLoading(true);
		setTodos([]);

		// make request to api
		try {
			const data = await TodosAPI.getTodos();
			setTodos(data);
		} catch (err) {
			console.error("Error thrown when fetching todos:", err);
			setError(err instanceof Error ? err.message : "It's not me, it's you");
		}
		setIsLoading(false);
	}

	const handleAddTodo = async (title: string) => {
		const todo: NewTodo = {
			title,
			completed: false,
		}
		await TodosAPI.postTodo(todo);
		getTodos();
	}

	const handleDeleteTodo = async (todo: Todo) => {
		await TodosAPI.deleteTodo(todo.id);
		getTodos();
	}

	const handleToggleTodo = async (todo: Todo) => {
		await TodosAPI.updateTodo(todo.id, {
			completed: !todo.completed,
		});
		getTodos();
	}

	const completedTodos = todos.filter(todo => todo.completed);
	const incompleteTodos = todos.filter(todo => !todo.completed);

	useEffect(() => {
		getTodos();
	}, []);

	return (
		<div className="container py-2">
			<h1>Better Todos</h1>

			<AddTodoForm onAddTodo={handleAddTodo} />

			{error && (
				<div className="alert alert-danger">
					{error}
				</div>
			)}

			{isLoading && (
				<div className="spinner-border" role="status">
					<span className="visually-hidden">Loading...</span>
				</div>
			)}

			{!error && !isLoading && todos.length > 0 && (
				<>
					<h2 className="mb-2 h5">💪🏻 Stuff I got to do</h2>
					<TodoList
						todos={incompleteTodos}
						onDelete={handleDeleteTodo}
						onToggle={handleToggleTodo}
					/>

					<h2 className="mb-2 h5">🥺 Stuff I've done</h2>
					<TodoList
						todos={completedTodos}
						onDelete={handleDeleteTodo}
						onToggle={handleToggleTodo}
					/>

					<TodoCounter
						completed={completedTodos.length}
						total={todos.length}
					/>
				</>
			)}

			{!error && !isLoading && todos.length === 0 && (
				<div className="alert alert-warning">
					You ain't got no todos 🤔?
				</div>
			)}
		</div>
	);
}

export default App;
