import Table from "react-bootstrap/Table";
import { Book } from "../../services/BooksAPI.types";
import { Link } from "react-router";
import { useEffect, useState } from "react";

interface BSBookTableProps {
	books: Book[];
};


// type SortKeys = "title" | "pages" | "published";
type SortKeys = keyof Book; // get a literal string union of all keys in Book type
//get out the name of the types with keyof



const BSBookTable: React.FC<BSBookTableProps> = ({ books }) => {

	const [sortedData, setSortedData] = useState([...books]);
	const [sortKey, setSortKey] = useState<string | null>(null);
	const [sortAscending, setSortAscending] = useState(true); //sorting direction


	/**
	 * Sort data by key
	 *
	 * @param key Key to sort by
	 */
	//function that sorts on title, pages or publisher if user clicks one of those titles
	const sortBy = (key: SortKeys) => {
		// 1. If we don't already sort by this key, sort by this key
		// 2. If we already sort by this key, reverse the order
		// 3. If we already sort by this key and in reverse order, don't sort
		// 4. Sort numeric data correctly
	};



	//When books change (e.g., new data comes in), reset sortedData to the new books array.
	useEffect(() => {
		setSortedData([...books]);
	}, [books]);



	if (!books.length) { //if there is no length (no books)
		return <p>No books for you!</p>;
	};



	return (
		<Table bordered hover responsive striped>
			<thead>
				<tr>
					<th onClick={() => sortBy("title")} className="sortable">Title</th>
					<th>Author</th>
					<th onClick={() => sortBy("pages")} className="sortable">Pages</th>
					<th onClick={() => sortBy("published")} className="sortable">Published</th>
				</tr>
			</thead>

			<tbody>
				{sortedData.map(book => (
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
