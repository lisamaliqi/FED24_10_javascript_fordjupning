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

	return (
		<div className="container py-2">
			<h1>React Simple Todo</h1>

			<ul className="todolist list-group">
				{todos.map(todo => (
					<li
						key={todo.id}
						className={todo.completed ? "completed list-group-item" : "list-group-item"}
					>
						<span className="todo-title">{todo.title}</span>
					</li>
				))}
			</ul>
		</div>
	);
};

export default App;
