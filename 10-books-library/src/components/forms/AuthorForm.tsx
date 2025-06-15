import Button from "react-bootstrap/Button";
import { zodResolver } from "@hookform/resolvers/zod";
import { DevTool } from "@hookform/devtools";
import Form from "react-bootstrap/Form";
import { SubmitHandler, useForm } from "react-hook-form";
import { Author } from "../../services/BooksAPI.types";
import useCreateAuthor from "../../hooks/useCreateAuthor";
import useUpdateAuthor from "../../hooks/useUpdateAuthor";
import { authorSchema, AuthorSchema } from "../../schemas/AuthorSchema";

interface AuthorFormProps {
	author?: Author;
}

const AuthorForm: React.FC<AuthorFormProps> = ({ author }) => {
	const { control, handleSubmit, register, watch, formState: { errors } } = useForm<AuthorSchema>({
		defaultValues: author,
		resolver: zodResolver(authorSchema),
	});

	const createAuthorMutation = useCreateAuthor();
	const updateAuthorMutation = useUpdateAuthor(author?.id ?? 0);

	const authorName = watch("name");
	console.log("Current author name:", authorName);


	const onAuthorSubmit: SubmitHandler<AuthorSchema> = (data) => {
		console.log("Submitted (and validated) data:", data);

		// if we're passed an author via props
		// then we should update, otherwise create
		if (author) {
			// UPDATE!
			updateAuthorMutation.mutate(data);
		} else {
			// CREATE!
			createAuthorMutation.mutate({
				...data,
				books: [],
			});
		}
	};


	return (
		<>
			<Form onSubmit={handleSubmit(onAuthorSubmit)}>
				<Form.Group className="mb-3" controlId="name">
					<Form.Label>Author Name</Form.Label>
					<Form.Control
						placeholder="Astrid Lindgren"
						type="text"
						{...register("name")}
					/>
					{errors.name && <p className="invalid">{errors.name.message}</p>}
				</Form.Group>
				<Form.Group className="mb-3" controlId="date_of_birth">
					<Form.Label>Date of Birth</Form.Label>
					<Form.Control
						type="date"
						{...register("date_of_birth")}
					/>
					{errors.date_of_birth && <p className="invalid">{errors.date_of_birth.message}</p>}
				</Form.Group>
				<div className="d-flex justify-content-end">
					<Button variant="success" type="submit">
						Save
					</Button>
				</div>
			</Form>

			<DevTool control={control} />
		</>
	)
};

export default AuthorForm;
