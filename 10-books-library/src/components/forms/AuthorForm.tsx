import Button from "react-bootstrap/Button";
import { DevTool } from "@hookform/devtools";
import Form from "react-bootstrap/Form";
import { SubmitHandler, useForm } from "react-hook-form";
import { Author, NewAuthor } from "../../services/BooksAPI.types";
import useCreateAuthor from "../../hooks/useCreateAuthor";
import useUpdateAuthor from "../../hooks/useUpdateAuthor";

interface AuthorFormProps {
	author?: Author;
}

const AuthorForm: React.FC<AuthorFormProps> = ({ author }) => {
	const { control, handleSubmit, register, watch, formState: { errors } } = useForm<NewAuthor>({
		defaultValues: author,
	});

	const createAuthorMutation = useCreateAuthor();
	const updateAuthorMutation = useUpdateAuthor(author?.id ?? 0);

	const authorName = watch("name");
	console.log("Current author name:", authorName);


	const onAuthorSubmit: SubmitHandler<NewAuthor> = (data) => {
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
						{...register("name", {
							minLength: {
								message: "Name has to be at least 3 characters",
								value: 3,
							},
							required: {
								message: "Name is required",
								value: true,
							},
						})}
					/>
					{errors.name && <p className="invalid">{errors.name.message}</p>}
				</Form.Group>
				<Form.Group className="mb-3" controlId="date_of_birth">
					<Form.Label>Date of Birth</Form.Label>
					<Form.Control
						type="date"
						{...register("date_of_birth", {
							required: {
								message: "Author has to have a date of birth",
								value: true,
							},
						})}
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
