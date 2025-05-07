import { useState } from "react";
import type { Todo } from "./types/Todo";
import "./assets/scss/App.scss";

function App() {

	//create starting todo list with use of Todo types
	const [todos, setTodos] = useState<Todo[]>([
		{ id: 1, title: "Make coffee", completed: true },
		{ id: 2, title: "Drink coffee", completed: false },
		{ id: 3, title: "Drink MOAR coffee", completed: false },
		{ id: 4, title: "Drink ALL ZE coffee", completed: false },
	]);

	//state for the input field to create a new todo
	const [inputTodoTitle, setInputTodoTitle] = useState("");

	//function to create a new todo and add it to the other todos
	const handleAddTodo = (e: React.FormEvent) => {
		e.preventDefault();

		// Create new todo and set a new list of todos containing the old todos + the new todo as the state
		//...todos = old todos
		//everything after that = creating a new todo
		//setTodo = add the new todo that you just created to the old todos that you just spread out so that they are in an array together
		setTodos([...todos, {
			id: Math.max(0, ...todos.map(todo => todo.id)) + 1,
			title: inputTodoTitle,
			completed: false,
		}]);

		// Clear input field
		setInputTodoTitle("");
	};

	//function to delete a todo
	const handleDeleteTodo = (todo: Todo) => {
		setTodos(todos.filter(t => t !== todo)); //filter out the todo that you pressed delete on from all the todos
	};

	//toggle the todo between completed or not completed
	const handleToggleTodo = (todo: Todo) => {
		todo.completed = !todo.completed; //make it the opposite of what it already was
		setTodos([...todos]); //don't really understand why this is needed? but i guess it has to do with updating the new value and adding it to the todos array
	};




	return (
		<div className="container py-2">

			<h1>React Simple Todo</h1>

			{/* CREATE A NEW TODO */}
			<form onSubmit={handleAddTodo} className="mb-3">
				<div className="input-group">
					<input
						aria-label="New todo title"
						className="form-control"
						onChange={e => setInputTodoTitle(e.target.value)}
						placeholder="Learn about REACT!!!"
						type="text"
						value={inputTodoTitle}
						required
					/>

					<button className="btn btn-success" type="submit">🚀</button>
				</div>
			</form>


			{/* if no todos -> send message */}
			{todos.length > 0
				? (
					// RENDER OUT THE TODO LIST
					<ul className="todolist list-group">
						{todos.map(todo => (
							<li
								key={todo.id}
								className={todo.completed ? "completed list-group-item" : "list-group-item"}
							>
								<span className="todo-title">{todo.title}</span>

								<div>
									{/* COMPLETED TODO TOGGLE BUTTON */}
									<button
										className="btn btn-sm btn-outline-warning"
										onClick={() => handleToggleTodo(todo)}
									>
										{todo.completed ? "☑️" : "✅"}
									</button>

									{/* DELETE A TODO BUTTON */}
									<button
										className="btn btn-sm btn-outline-danger"
										onClick={() => handleDeleteTodo(todo)}
									>
										💣
									</button>
								</div>
							</li>
						))}
					</ul>
				) : (
					<div className="alert alert-warning">
						You ain't got no todos 🤔?
					</div>
				)
			}
		</div>
	);
};

export default App;
