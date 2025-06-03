import { useState, useEffect } from "react";
import { useQuery, useMutation } from "@tanstack/react-query";
import Alert from "react-bootstrap/Alert";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { useNavigate, useParams } from "react-router";
import * as TodosAPI from "../services/TodosAPI";
import { NewTodo } from "../services/Todo.types";


const EditTodoPage = () => {
	const [inputNewTodoTitle, setInputNewTodoTitle] = useState("");

	const { id } = useParams();
	const todoId = Number(id); //turn it to a number

	const navigate = useNavigate();


	const { data: todo, error, isError, isLoading, refetch } = useQuery({
		queryKey: ["todo", { id: todoId }],
		queryFn: () => TodosAPI.getTodo(todoId),
	});

	const updateTodoMutation = useMutation({
		mutationFn: (data: Partial<NewTodo>) => TodosAPI.updateTodo(todoId, data),
		onSuccess: (updatedTodo) => {
			// Redirect user to /todos/:id
			navigate("/todos/" + updatedTodo.id, {
				state: {
					status: {
						message: `Todo ${updatedTodo.id} was updated`,
						type: "success",
					},
				},
			});
		},
	});


	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();

		// Mutate!More actions
		updateTodoMutation.mutate({
			title: inputNewTodoTitle,
		});
	};


	useEffect(() => {
		if (!todo) {
			return;
		};

		setInputNewTodoTitle(todo.title);
	}, [todo]);


	if (isError) {
		return (
			<Alert variant="warning">
				<h1>Something went wrong!</h1>
				<p>{error.message}</p>

				<Button variant="primary" onClick={() => refetch()}>TRY HARDER!!!</Button>
			</Alert>
		)
	};

	if (isLoading || !todo) {
		return <p>Loading todo...</p>
	};





	return (
		<>
			<h1 title={`Todo #${todo.id}`}>Edit: {todo.title}</h1>

			<Form onSubmit={handleSubmit} className="mb-3">
				<Form.Group className="mb-3" controlId="title">
					<Form.Label>Title</Form.Label>
					<Form.Control
						type="text"
						placeholder="Enter the new title"
						onChange={e => setInputNewTodoTitle(e.target.value)}
						value={inputNewTodoTitle}
					/>
				</Form.Group>

				<Button disabled={updateTodoMutation.isPending} variant="primary" type="submit">
					{updateTodoMutation.isPending ? "Saving..." : "Save"}
				</Button>
			</Form>

			<Button variant="secondary" onClick={() => navigate(-1)}>
				&laquo; Go back
			</Button>
		</>
	)
}

export default EditTodoPage
