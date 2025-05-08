import { useEffect, useState } from "react";
import type { NewTodo, Todo } from "./types/Todo";
import TodoCounter from "./components/TodoCounter";
import AddTodoForm from "./components/AddTodoForm";
import * as TodosAPI from "./services/TodosAPI";
import TodoList from "./components/TodoList";
import "./assets/scss/App.scss";

function App() {

	//create starting todo list with use of Todo types (empty)
	const [todos, setTodos] = useState<Todo[]>([]);
	const [error, setError] = useState<string | false>(false);
	const [isLoading, setIsLoading] = useState(true);

	//OLD handleAddTodo
	/* const handleAddTodo = (newTodoTitle: string) => {
		// Create new todo and set a new list of todos containing the old todos + the new todo as the state
		//...todos = old todos
		//everything after that = creating a new todo
		//setTodo = add the new todo that you just created to the old todos that you just spread out so that they are in an array together
		/* setTodos([...todos, {
			id: Math.max(0, ...todos.map(todo => todo.id)) + 1,
			title: newTodoTitle,
			completed: false,
		}]);
	}; */

	//function to get the todos
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
		};
		setIsLoading(false);
	};

	//function to create a new todo and add it to the other todos
	const handleAddTodo = async (title: string) => {
		const todo: NewTodo = {
			title: title,
			completed: false,
		};

		//post the new todo to the other todos
		await TodosAPI.postTodo(todo);
		//then get all the todos (including the new one)
		getTodos();
	};



	//function to delete a todo
	const handleDeleteTodo = (todo: Todo) => {
		// setTodos(todos.filter(t => t !== todo)); //filter out the todo that you pressed delete on from all the todos

		// FIX ME
	};

	//toggle the todo between completed or not completed
	const handleToggleTodo = (todo: Todo) => {
		// todo.completed = !todo.completed; //make it the opposite of what it already was
		// setTodos([...todos]); //don't really understand why this is needed? but i guess it has to do with updating the new value and adding it to the todos array

		// FIX ME
	};

	//filter out completed and incompleted todos
	const completedTodos = todos.filter(todo => todo.completed);
	const incompleteTodos = todos.filter(todo => !todo.completed);


	/* useEffect(() => {
		// This code will only be executed **AFTER** the component has rendered
		// AND if the length of unfinished todos has changed SINCE THE LAST RENDER
		// console.log("🚨 The length of unfinished todos has changed!");
		document.title = `${incompleteTodos.length} todos unfinished 🇫🇮`;
	}, [incompleteTodos.length]); */


	useEffect(() => {
		getTodos();
	}, []);


	/*
	// This will only be executed when the component is mounted,
	// and only AFTER the component has been rendered
	useEffect(() => {
		console.log("Look mom, I'm a newly mounted component 👶🏻");
	}, []);
 	*/






	return (
		<div className="container py-2">

			<h1>React Simple Todo</h1>

			{/* CREATE A NEW TODO */}
			<AddTodoForm onAddTodo={handleAddTodo} />


			{/* ERROR WHEN FETCHING API */}
			{error && (
				<div className="alert alert-danger">
					{error}
				</div>
			)}

			{/* LOADING SPINNER WHEN FETCHING API */}
			{isLoading && (
				<div className="spinner-border" role="status">
					<span className="visually-hidden">Loading...</span>
				</div>
			)}

			{/* RENDER OUT THE TODO LIST */}
			{!error && !isLoading && todos.length > 0 && (
				<>
					{/* NOT COMPLETED TODOS */}
					<h2 className="mb-2 h5">💪🏻 Stuff I got to do</h2>
					<TodoList
						todos={incompleteTodos}
						onDelete={handleDeleteTodo}//1 = prop    2 = function
						onToggle={handleToggleTodo}
					/>

					{/* COMPLETED TODOS */}
					<h2 className="mb-2 h5">🥺 Stuff I've done</h2>
					<TodoList
						todos={completedTodos}
						onDelete={handleDeleteTodo}
						onToggle={handleToggleTodo}
					/>

					{/* COUNTER FOR COMPLETED TODOS */}
					<TodoCounter
						completed={completedTodos.length}
						total={todos.length}
					/>
				</>
			)}

			{/* if no todos -> send message */}
			{!error && !isLoading && todos.length === 0 && (
				<div className="alert alert-warning">
					You ain't got no todos 🤔?
				</div>
			)}

		</div>
	);
};

export default App;
