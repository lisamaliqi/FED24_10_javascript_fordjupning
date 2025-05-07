import type { Todo } from "../types/Todo";

interface TodoListItemProps {
	todo: Todo;
	onDelete: (todo: Todo) => void //TodoListItemProps will take on a function called onDelete that can accept a Todo as a parameter and return nothing
	onToggle: (todo: Todo) => void
}

const TodoListItem: React.FC<TodoListItemProps> = ({ todo, onDelete, onToggle }) => {

	return (
		<li
			className={todo.completed ? "completed list-group-item" : "list-group-item"}
		>
			<span className="todo-title">{todo.title}</span>

			<div>
				{/* COMPLETED TODO TOGGLE BUTTON */}
				<button
					className="btn btn-sm btn-outline-warning"
					onClick={() => onToggle(todo)}
				>
					{todo.completed ? "☑️" : "✅"}
				</button>

				{/* DELETE A TODO BUTTON */}
				<button
					className="btn btn-sm btn-outline-danger"
					onClick={() => onDelete(todo)}
				>
					💣
				</button>
			</div>
		</li>
	);
}

export default TodoListItem;
