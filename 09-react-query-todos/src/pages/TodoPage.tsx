import { useState } from "react";
import Button from 'react-bootstrap/Button';
import { Link, useLocation, useNavigate, useParams } from "react-router";
import * as TodosAPI from '../services/TodosAPI';
import ErrorAlert from "../components/Alerts/ErrorAlerts";
import ConfirmationModal from "../components/ConfirmationModal";
import AutoDismissingAlert from "../components/Alerts/AutoDismissingAlert";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Todo } from "../services/Todo.types";
import useTodo from "../hooks/useTodo";
import useUpdateTodo from "../hooks/useUpdateTodo";
import useDeleteTodo from "../hooks/useDeleteTodo";

const TodoPage = () => {
	const [queryEnabled, setQueryEnabled] = useState(true);
	const [ showDeleteModal, setShowDeleteModal ] = useState(false);

	const { id } = useParams();
	const todoId = Number(id);
	const navigate = useNavigate();
	const location = useLocation();
	const queryClient = useQueryClient();



	const { data: todo, error, isError, isLoading } = useTodo(todoId, queryEnabled);

	const updateTodoMutation = useUpdateTodo(todoId);


	// Delete todo from API
	const deleteTodoMutation = useDeleteTodo(
		todoId,
		() => {
			// disable query for this specific todo
			setQueryEnabled(false);
		},
		() => {
			// Redirect to "/todos"
			navigate("/todos", {
				replace: true,
				state: {
					status: {
						message: `Todo ${todoId} was deleted`,
						type: "success",
					},
				},
			});
		},
	);


	const handleDelete = () => {
		setShowDeleteModal(false);
		deleteTodoMutation.mutate();
	};


	if (isError) {
		return <ErrorAlert>{error.message}</ErrorAlert>;
	};


	if (isLoading) {
		return <p>Loading todo...</p>
	};


	if (!todo) {
		return <p>Loading todo...</p>
	};




	return (
		<>
			<h1>{todo.title} with id: {todo.id}</h1>

			{location.state && location.state.status && (
				<AutoDismissingAlert hideAfter={3000} variant={location.state.status.type}>
					{location.state.status.message}
				</AutoDismissingAlert>
			)}

			{updateTodoMutation.isError && (
				<ErrorAlert>
					Update todo failed: {updateTodoMutation.error.message}
				</ErrorAlert>
			)}

			<p><strong>Status:</strong>{' '}
				{todo.completed
					? <span className="completed">Completed</span>
					: <span className="not-completed">Not completed</span>}
				</p>

			<div className="buttons mb-3">

				{/* Toggle */}
				<Button
					disabled={updateTodoMutation.isPending}
					onClick={() => updateTodoMutation.mutate({completed: !todo.completed})}
					variant="success">
				Toggle </Button>

				{/* Edit */}
				<Link to={`/todos/${todoId}/edit`} className="btn btn-warning" role="button">
					Edit
				</Link>

				<Button
					disabled={deleteTodoMutation.isPending}
					onClick={() => setShowDeleteModal(true)}
					variant="danger"
				>Delete</Button>

				{/* Better variant of my confirm button */}

				<ConfirmationModal
					onCancel={() => setShowDeleteModal(false)}
					onConfirm={() => handleDelete()}
					show={showDeleteModal}
					title="Sure u wanna delete?"
					variant="danger"
				>
					Delete todo "{todo.title}"?
				</ConfirmationModal>
			</div>

			{/* Here be button-link back to all todos */}
			<Link to='/todos' className="btn btn-secondary" role='button'> {/* Both a link and a button in this instance (link as button doesn't work) */}
					Back to all Todos
			</Link>
		</>
	)
};

export default TodoPage;
