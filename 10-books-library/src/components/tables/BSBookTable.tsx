import Table from "react-bootstrap/Table";
import { Book } from "../../services/BooksAPI.types";
import { Link } from "react-router";

interface BSBookTableProps {
	books: Book[];
}



const BSBookTable: React.FC<BSBookTableProps> = ({ books }) => {
	if (!books.length) { //if there is no length (no books)
		return <p>No books for you!</p>;
	}

	return (
		<Table bordered hover responsive striped>
			<thead>
				<tr>
					<th>Title</th>
					<th>Author</th>
					<th>Pages</th>
					<th>Published</th>
				</tr>
			</thead>

			<tbody>
				{books.map(book => (
					<tr key={book.id}>
						<td>{book.title}</td>
						<td>
							<Link to={"/authors/" + book.author.id}>
								{book.author.name}
							</Link>
						</td>
						<td  className="text-end">{book.pages}</td>
						<td  className="text-end">{book.published}</td>
					</tr>
				))}
			</tbody>
		</Table>
	)
};



export default BSBookTable;
