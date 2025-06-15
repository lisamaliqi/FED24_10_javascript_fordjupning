/**Add commentMore actions
 * THIS COMPONENT ISN'T USED ANYMORE
 *
 * IT HAS BEEN REPLACED BY CreateBookForm
 */
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { SubmitHandler, useForm } from "react-hook-form";
import { NewBook } from "../../services/BooksAPI.types";
import useCreateBook from "../../hooks/useCreateBook";


interface CreateAuthorBookFormProps {
	authorId: number;
};

const CreateAuthorBookForm: React.FC<CreateAuthorBookFormProps> = ({ authorId }) => {

	const { handleSubmit, register, formState: { errors } } = useForm<NewBook>({
		mode: "onChange"
	});
	const createAuthorBookMutation = useCreateBook();

	const onCreateAuthorBookSubmit: SubmitHandler<NewBook> = (data) => {
		console.log("Submitted (and validated) data:", data);

		createAuthorBookMutation.mutate({
			...data,
			authorId,
		});
	};


	return (
		<Form onSubmit={handleSubmit(onCreateAuthorBookSubmit)}>
			<Form.Group className="mb-3" controlId="title">
				<Form.Label>Book title</Form.Label>
				<Form.Control
					placeholder="Enter book title here..."
					type="text"
					{...register("title", {
						minLength: 3,
						required: true,
					})}
				/>
				{errors.title && <p className="invalid">Y U ENTER SHORT BOOK TITLE?!</p>}
			</Form.Group>

			<Form.Group className="mb-3" controlId="published">
				<Form.Label>Published</Form.Label>
				<Form.Control
					type="integer"
					{...register("published", {
						required: true,
						max: {
							value: new Date().getFullYear(),
							message: `Book cannot publish in the future (max ${new Date().getFullYear()})`,
						},
					})}
				/>
				{errors.published && <p className="invalid">{errors.published.message}</p>}
			</Form.Group>

			<Form.Group className="mb-3" controlId="pages">
				<Form.Label>Pages</Form.Label>
				<Form.Control
					type="integer"
					{...register("pages", {
						required: true,
						min: {
							value: 3,
							message: "Cmon man, at least 3 pages"
						}
					})}
				/>
				{errors.pages && <p className="invalid">{errors.pages.message}</p>}
			</Form.Group>

			<div className="d-flex justify-content-end">
				<Button variant="success" type="submit">
					Create
				</Button>
			</div>
		</Form>
	)
};

export default CreateAuthorBookForm;
