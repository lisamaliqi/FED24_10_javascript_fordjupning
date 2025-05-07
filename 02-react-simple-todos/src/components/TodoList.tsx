import type { Todo } from "../types/Todo";
import TodoListItem from "./TodoListItem";

interface TodoListProps {
	todos: Todo[];
	onDelete: (todo: Todo) => void
	onToggle: (todo: Todo) => void
};


const TodoList: React.FC<TodoListProps> = ({ todos, onDelete, onToggle }) => {


	return (
		<ul className="todolist list-group">
			{todos.map(todo => (
				<TodoListItem
					key={todo.id}
					todo={todo}
					onDelete={onDelete} //1 = prop    2 = function
					onToggle={onToggle}
				/>
			))}
		</ul>
	)
};


export default TodoList;
