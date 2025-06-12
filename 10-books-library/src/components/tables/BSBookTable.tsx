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
type SortOrder = "asc" | "desc";



const BSBookTable: React.FC<BSBookTableProps> = ({ books }) => {

	const [sortedData, setSortedData] = useState([...books]);
	const [sortKey, setSortKey] = useState<string | null>(null);
	const [sortOrder, setSortOrder] = useState<SortOrder>("asc"); //sorting direction


	/**
	 * Set the data sort order
	 *
	 * @param key Key to sort by
	 */
	//function that sorts on title, pages or published if user clicks one of those titles
	const orderBy = (key: SortKeys) => {
		// 1. If we don't already sort by this key, sort by this key
		// 2. If we already sort by this key, reverse the order
		// 3. If we already sort by this key and in reverse order, don't sort
		// 4. Sort numeric data correctly

		//if the key user presses (ex. title) is not the same as the sortKey:
		if (key !== sortKey) {
			setSortKey(key); //set the sortKey to that key
			setSortOrder("asc"); //set order to asc
			setSortedData( sortDataByKey(books, key, "asc") );

		//if sortOrder is the same as asc, change the order
		} else if (sortOrder === "asc") {
			setSortOrder("desc");
			setSortedData( sortDataByKey(books, key, "desc") );

		//refresh to the beginning state of sorting
		} else {
			setSortKey(null);
			setSortOrder("asc");
			setSortedData([...books]);
		}
	};



	/**
	 * Sort data by a key and return the sorted data
	 *
	 * @param data Data to sort
	 * @param key Key to sort by
	 * @param order Order to sort by
	 * @returns The sorted data
	 */
	const sortDataByKey = (data: Book[], key: SortKeys, order: SortOrder) => {
		return [...data].sort((a, b) => { //...data creates a shallow copy of original array

			//check if both values are string
			if (typeof a[key] === "string" && typeof b[key] === "string") {
				return order === "asc"
					? a[key].localeCompare(b[key]) //if order is asc do this  (a-b, a-z)
					: b[key].localeCompare(a[key]); //if order is not asc do this (b-a, z-a)

			//check if both values are numbers
			} else if (typeof a[key] === "number" && typeof b[key] === "number") {
				return order === "asc"
					? a[key] - b[key]
					: b[key] - a[key];
			}

			// If values are neither strings nor numbers, leave them as-is
			return 0;
		});
	};



	//icons to show which way it is sorted and based on which key
	const sortIcon = (key: SortKeys) => {
		//makes sure that the icon only is visible in the column that user is sorting
		if (sortKey !== key) {
			return null;
		};

		return sortOrder === "asc"
			? <span role="img" aria-label="Ascending">⬇️</span>
			: <span role="img" aria-label="Descending">⬆️</span>
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
					<th colSpan={3}>Book Info</th>
					<th colSpan={2}>Author Info</th>
				</tr>
				<tr>
					<th onClick={() => orderBy("title")} className="sortable">Title {sortIcon("title")}</th>
					<th onClick={() => orderBy("pages")} className="sortable">Pages {sortIcon("pages")}</th>
					<th onClick={() => orderBy("published")} className="sortable">Published {sortIcon("published")}</th>
					<th>Name</th>
					<th>Birthdate</th>
				</tr>
			</thead>

			<tbody>
				{sortedData.map(book => (
					<tr key={book.id}>
						<td>{book.title}</td>
						<td className="text-end">{book.pages}</td>
						<td className="text-end">{book.published}</td>
						<td>
							<Link to={"/authors/" + book.author.id}>
								{book.author.name}
							</Link>
						</td>
						<td>{book.author.date_of_birth}</td>
					</tr>
				))}
			</tbody>
		</Table>
	)
};



export default BSBookTable;
