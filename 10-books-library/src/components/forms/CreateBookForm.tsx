import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { SubmitHandler, useForm } from "react-hook-form";
import { NewBook } from "../../services/BooksAPI.types";
import useAuthors from "../../hooks/useAuthors";
import useCreateBook from "../../hooks/useCreateBook";

interface CreateBookFormProps {
	authorId?: number;
};




const currentYear = new Date().getFullYear();

const CreateBookForm: React.FC<CreateBookFormProps> = ({ authorId }) => {
	const { handleSubmit, register, formState: { errors } } = useForm<NewBook>();
	const createBookMutation = useCreateBook();
	const { data: authors } = useAuthors();

	const onCreateBookSubmit: SubmitHandler<NewBook> = (data) => {
		console.log("Submitted data:", data);

		createBookMutation.mutate(data);
	}

	const sortedAuthors = authors && [...authors].sort((a, b) => a.name.localeCompare(b.name));

	return (
		<Form onSubmit={handleSubmit(onCreateBookSubmit)}>
			<Form.Group className="mb-3" controlId="title">
				<Form.Label>Title</Form.Label>
				<Form.Control
					placeholder="Whispers in the Abyss"
					type="text"
					{...register("title", {
						minLength: 3,
						required: true,
					})}
				/>
				{errors.title && <p className="invalid">A book without a title is not a book</p>}
			</Form.Group>

			<Form.Group className="mb-3" controlId="authorId">
				<Form.Label>Author</Form.Label>
				<Form.Select
					{...register("authorId", {
						required: true,
						valueAsNumber: true,
					})}
				>
					{sortedAuthors
						? sortedAuthors.map(author => (
							<option key={author.id} value={author.id}>{author.name}</option>
						))
						: <option>Loading...</option>}
				</Form.Select>

				{errors.authorId && <p className="invalid">A book without an author is not a book</p>}
			</Form.Group>

			<Form.Group className="mb-3" controlId="pages">
				<Form.Label>Pages</Form.Label>
				<Form.Control
					type="number"
					{...register("pages", {
						min: 1,
						required: true,
						valueAsNumber: true,
					})}
				/>
				{errors.pages && <p className="invalid">A book has to have at least 1 page</p>}
			</Form.Group>

			<Form.Group className="mb-3" controlId="published">
				<Form.Label>Published</Form.Label>
				<Form.Control
					type="number"
					{...register("published", {
						required: true,
						valueAsNumber: true,
						min: 1455,
						max: currentYear,
					})}
				/>
				{errors.published && <p className="invalid">Year of Publication has to be between 1455 and {currentYear}</p>}
			</Form.Group>

			<div className="d-flex justify-content-end">
				<Button variant="success" type="submit">
					Create
				</Button>
			</div>
		</Form>
	)
}

export default CreateBookForm;
