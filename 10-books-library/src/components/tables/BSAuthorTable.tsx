import { useEffect, useState } from "react";
import Table from "react-bootstrap/Table";
import { Link } from "react-router";
import { Author } from "../../services/BooksAPI.types";

interface BSAuthorTableProps {
	authors: Author[];
};

// type SortKeys = "title" | "pages" | "published";
type SortKeys = keyof Author; // get a literal string union of all keys in Author type
type SortOrder = "asc" | "desc";



const BSAuthorTable: React.FC<BSAuthorTableProps> = ({ authors }) => {
	const [sortedData, setSortedData] = useState([...authors]);
	const [sortKey, setSortKey] = useState<string | null>(null);
	const [sortOrder, setSortOrder] = useState<SortOrder>("asc");

	/**
	 * Set the data sort order
	 *
	 * @param key Key to sort by
	 */
	const orderBy = (key: SortKeys) => {
		// 1. If we don't already sort by this key, sort by this key
		// 2. If we already sort by this key, reverse the order
		// 3. If we already sort by this key and in reverse order, don't sort
		// 4. Sort numeric data correctly

		if (key !== sortKey) {
			setSortKey(key);
			setSortOrder("asc");
			setSortedData( sortDataByKey(authors, key, "asc") );

		} else if (sortOrder === "asc") {
			setSortOrder("desc");
			setSortedData( sortDataByKey(authors, key, "desc") );

		} else {
			setSortKey(null);
			setSortOrder("asc");
			setSortedData([...authors]);
		};
	};


	/**
	 * Sort data by a key and return the sorted data
	 *
	 * @param data Data to sort
	 * @param key Key to sort by
	 * @param order Order to sort by
	 * @returns The sorted data
	 */
	const sortDataByKey = (data: Author[], key: SortKeys, order: SortOrder) => {
		return [...data].sort((a, b) => {
			if (typeof a[key] === "string" && typeof b[key] === "string") {
				return order === "asc"
					? a[key].localeCompare(b[key])
					: b[key].localeCompare(a[key]);
			} else if (typeof a[key] === "number" && typeof b[key] === "number") {
				return order === "asc"
					? a[key] - b[key]
					: b[key] - a[key];
			}

			return 0;
		});
	};


	const sortIcon = (key: SortKeys) => {
		if (sortKey !== key) {
			return null;
		};

		return sortOrder === "asc"
			? <span role="img" aria-label="Ascending">⬇️</span>
			: <span role="img" aria-label="Descending">⬆️</span>
	};


	useEffect(() => {
		setSortedData([...authors]);
	}, [authors]);


	if (!authors.length) {
		return <p>No authors for you!</p>;
	};





	return (
		<Table bordered hover responsive striped>
			<thead>
				<tr>
					<th onClick={() => orderBy("name")} className="sortable">Name {sortIcon("name")}</th>
					<th onClick={() => orderBy("date_of_birth")} className="sortable">Date of Birth {sortIcon("date_of_birth")}</th>
				</tr>
			</thead>

			<tbody>
				{sortedData.map(author => (
					<tr key={author.id}>
						<td>
							<Link to={"/authors/" + author.id}>
								{author.name}
							</Link>
						</td>
						<td className="text-end">{author.date_of_birth}</td>
					</tr>
				))}
			</tbody>
		</Table>
	)
};

export default BSAuthorTable;
