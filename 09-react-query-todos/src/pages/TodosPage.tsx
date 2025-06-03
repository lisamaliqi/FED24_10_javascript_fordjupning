import TodoCounter from "../components/TodoCounter";
import * as TodosAPI from "../services/TodosAPI";
import { useQuery } from "@tanstack/react-query";
import  Alert  from "react-bootstrap/Alert";
import ListGroup from "react-bootstrap/ListGroup";
import { Link, useLocation } from "react-router";
import AutoDismissingAlert from "../components/Alerts/AutoDismissingAlert";
import ErrorAlert from "../components/Alerts/ErrorAlerts";


function TodosPage() {
	const location = useLocation();


	const { data: todos, error, isError, isLoading } = useQuery({
		queryKey: ["todos"],
		queryFn: TodosAPI.getTodos,
	});




	return (
		<>
			<h1>Todos</h1>

			{location.state && location.state.status && (
				<AutoDismissingAlert  hideAfter={3000} variant={location.state.status.type}>
					{location.state.status.message}
				</AutoDismissingAlert>
			)}

			{isError && <ErrorAlert>{error.message}</ErrorAlert>}

			<AutoDismissingAlert hideAfter={500} variant="danger">
				Look quickly, imma dissapear!!
			</AutoDismissingAlert>

			{isLoading && (
				<p>Loading todos...</p>
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
