import type { Todo } from "../types/Todo";

interface TodoListItemProps {
	todo: Todo;
	handleDeleteTodo: (todo: Todo) => void //TodoListItemProps will take on a function called handleDeleteTodo that can accept a Todo as a parameter and return nothing
	handleToggleTodo: (todo: Todo) => void
}

const TodoListItem: React.FC<TodoListItemProps> = ({ todo, handleDeleteTodo, handleToggleTodo }) => {

	return (
		<li
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
	);
}

export default TodoListItem;
