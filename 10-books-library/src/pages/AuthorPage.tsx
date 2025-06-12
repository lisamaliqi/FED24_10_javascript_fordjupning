import { useParams } from "react-router";
import WarningAlert from "../components/alerts/WarningAlert";
import useAuthor from "../hooks/useAuthor";
import { Card } from "react-bootstrap";
import CreateAuthorBookForm from "../components/forms/CreateAuthorBookForm";

const AuthorPage = () => {
	const { id } = useParams();
	const authorId = Number(id);
	const { data: author, isError, isLoading } = useAuthor(authorId);

	return (
		<>
			{isError && (
				<WarningAlert>
					An terrible, inexplicable error occurred while fetching authors. It wasn't me!
				</WarningAlert>
			)}

			{isLoading && <p>Loading author...</p>}

			{author && (
				<>
					<title>{"Author: " + author.name}</title>
					<h1 className="mb-3">{author.name}</h1>

					<p>Born: {author.date_of_birth}</p>

					<ul>
						{author.books.map((book) => (
							<li key={book.id}>{book.title}</li>
						))}
					</ul>
				</>
			)}

			<hr className="mb-5" />

			<Card>
				<Card.Body>
					<Card.Title>Add Book</Card.Title>

					<CreateAuthorBookForm authorId={authorId}/>
				</Card.Body>
			</Card>
		</>
	);
};

export default AuthorPage;
