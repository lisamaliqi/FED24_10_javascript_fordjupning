import { Link } from "react-router";
import WarningAlert from "../components/alerts/WarningAlert";
import TanStackSortableTable from "../components/tables/TanStackSortableTable";
import useAuthors from "../hooks/useAuthors";
import { Author } from "../services/BooksAPI.types";
import { createColumnHelper } from "@tanstack/react-table";
import { Card } from "react-bootstrap";
import AuthorForm from "../components/forms/AuthorForm";


/*
const columns: ColumnDef<Author>[] = [
	{
		accessorKey: "name",
		header: "Name",
	},
	{
		accessorKey: "date_of_birth",
		header: "Date of birth",
	},
];
*/

const columnHelper = createColumnHelper<Author>();

const columns = [
	// ID
	columnHelper.group({
		header: "ID",
		id: "id-group",
		// header: "", //headers cant be empty, it will throw an error!
		columns: [
			columnHelper.accessor("id", {
				header: "ID",
			}),
		],
	}),

	// Author details
	columnHelper.group({
		header: "Author Details",
		columns: [
			columnHelper.accessor("name", {
				header: "Name",
				cell: (props) => (  //link the name of the author to the authorPage
					<Link to={"/authors/" + props.row.original.id}>
						{props.getValue()}
					</Link>
				),
			}),
			columnHelper.accessor("date_of_birth", {
				header: "Birthdate",
				meta: {
					align: "end",
				},
			}),
		],
	}),

	// Actions
	columnHelper.group({
		id: "actions-group",
		columns: [
			columnHelper.display({
				header: "Actions",
				cell: (props) => (
					<div className="d-flex gap-1">
						<Link
							className="btn btn-warning btn-sm"
							to={"/authors/" + props.row.original.id + "/edit"}
						>
							Edit
						</Link>
						<Link
							className="btn btn-primary btn-sm"
							to={"/authors/" + props.row.original.id}
						>
							View
						</Link>
					</div>
				),
			}),
		],
	}),
];




const AuthorsPage = () => {
	const { data: authors, isError, isLoading } = useAuthors();

	return (
		<>
			<title>Authors</title>
			<h1 className="mb-3">Authors</h1>

			{isError && (
				<WarningAlert>
					An terrible, inexplicable error occurred while fetching authors. It wasn't me!
				</WarningAlert>
			)}

			{isLoading && <p>Loading authors...</p>}

			{authors && <TanStackSortableTable columns={columns} data={authors} />}

			<hr className="mb-5" />

			<Card>
				<Card.Body>
					<Card.Title>Create Author</Card.Title>

					<AuthorForm />
				</Card.Body>
			</Card>
		</>
	);
};

export default AuthorsPage;
