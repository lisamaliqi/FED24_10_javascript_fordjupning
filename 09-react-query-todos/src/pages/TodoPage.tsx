import { useState } from "react";
import Button from 'react-bootstrap/Button';
import { Link, useLocation, useNavigate, useParams } from "react-router";
import { Todo } from "../services/Todo.types";
import * as TodosAPI from '../services/TodosAPI';
import ErrorAlert from "../components/Alerts/ErrorAlerts";
import ConfirmationModal from "../components/ConfirmationModal";
import AutoDismissingAlert from "../components/Alerts/AutoDismissingAlert";
import { useQuery } from "@tanstack/react-query";

const TodoPage = () => {
	const [ showDeleteModal, setShowDeleteModal ] = useState(false);

	const { id } = useParams();
	const todoId = Number(id);
	const navigate = useNavigate();
	const location = useLocation();



	const { data: todo, error, isError, isLoading, refetch } = useQuery({
		queryKey: ["todo", { id: todoId }],
		queryFn: () => TodosAPI.getTodo(todoId),
	});


	// Delete todo from API
	const handleDeleteTodo = async (todo: Todo) => {
		await TodosAPI.deleteTodo(todo.id);

		//redirect to /todos
		navigate('/todos', {
			replace: true,
			state: {
				status: {
					message: `Todo ${todo.id} was deleted`,
					type: 'success',
				},
			},
		});
	};


	//toggle todo in API
	const handleToggleTodo = async (todo: Todo) => {
		await TodosAPI.updateTodo(todo.id, {
			completed: !todo.completed,
		});
		//update todo state with the updated todo
		refetch();
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

			<p><strong>Status:</strong>{' '}
				{todo.completed
					? <span className="completed">Completed</span>
					: <span className="not-completed">Not completed</span>}
				</p>

			<div className="buttons mb-3">

				{/* Toggle */}
				<Button
					onClick={() => handleToggleTodo(todo)}
					variant="success">
				Toggle </Button>

				{/* Edit */}
				<Link to={`/todos/${todoId}/edit`} className="btn btn-warning" role="button">
					Edit
				</Link>

				{/* Delete */}
				{/* <Button
					onClick={() => handleDeleteTodo(todo)}
					variant="danger">
				Delete </Button> */}
				{/* <ConfirmDeleteButton onConfirm={() => handleDeleteTodo(todo)} /> */}

				<Button
					onClick={() => setShowDeleteModal(true)}
					variant="danger"
				>Delete</Button>

				{/* Better variant of my confirm button */}

				<ConfirmationModal
					onCancel={() => setShowDeleteModal(false)}
					onConfirm={() => handleDeleteTodo(todo)}
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
