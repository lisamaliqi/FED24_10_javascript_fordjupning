import { useEffect, useRef, useState } from "react"

interface AddTodoFormProps {
	onAddTodo: (newTodoTitle: string) => void
};

const AddTodoForm: React.FC<AddTodoFormProps> = ({ onAddTodo }) => {

	//state for the input field to create a new todo
	const [inputTodoTitle, setInputTodoTitle] = useState("");

	//make input field autofocus
	const inputTodoTitleRef = useRef<HTMLInputElement | null>(null); //null bc we don't have the element yet, hasn't been bound to anything yet
	// console.log('inputTodoTitleRef: ', inputTodoTitleRef);

	//function to create a new todo and add it to the other todos
	const handleAddTodo = (e: React.FormEvent) => {
		e.preventDefault();

		// Tell parent to create a new todo with `inputTodoTitle` as title
		onAddTodo(inputTodoTitle.trim()); //trim to remove white space

		// Clear input field
		setInputTodoTitle("");
	};


	//
	useEffect(() => {
		//only if this is truthy, call on focus
		inputTodoTitleRef.current?.focus()
	}, []);




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
					ref={inputTodoTitleRef}
					required
				/>

				<button
					className="btn btn-success"
					type="submit"
					disabled={inputTodoTitle.trim().length < 3} //input less than 3 chars -> submit disabled
				>🚀</button>
			</div>

			{/* SHOW ERROR MESSAGE IF LESS THAN 3 CHAR */}
			{inputTodoTitle.trim().length > 0 && inputTodoTitle.trim().length < 3 && (
				<div className="form-text text-danger text-small">Please enter 3 chars or more.</div>
			)}

		</form>
	);
};


export default AddTodoForm;
