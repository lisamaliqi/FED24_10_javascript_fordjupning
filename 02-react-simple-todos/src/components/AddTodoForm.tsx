import { useState } from "react"

interface AddTodoFormProps {
	onAddTodo: (newTodoTitle: string) => void
};

const AddTodoForm: React.FC<AddTodoFormProps> = ({ onAddTodo }) => {

	//state for the input field to create a new todo
	const [inputTodoTitle, setInputTodoTitle] = useState("");

	//function to create a new todo and add it to the other todos
	const handleAddTodo = (e: React.FormEvent) => {
		e.preventDefault();

		// Tell parent to create a new todo with `inputTodoTitle` as title
		onAddTodo(inputTodoTitle.trim()); //trim to remove white space

		// Clear input field
		setInputTodoTitle("");
	};


	return (
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

				<button
					className="btn btn-success"
					type="submit"
					disabled={inputTodoTitle.trim().length < 3} //input less than 3 chars -> submit disabled
				>🚀</button>
			</div>
		</form>
	);
};


export default AddTodoForm;
