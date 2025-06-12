import WarningAlert from "../components/alerts/WarningAlert";
import TanStackBasicTable from "../components/tables/TanStackBasicTable";
import useAuthors from "../hooks/useAuthors";
import { Author } from "../services/BooksAPI.types";
import { createColumnHelper } from "@tanstack/react-table";


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
	columnHelper.group({
		header: "ID",
		columns: [
			columnHelper.accessor("id", {
				header: "ID",
			}),
		],
	}),
	columnHelper.group({
		header: "Author Details",
		columns: [
			columnHelper.accessor("name", {
				header: "Name",
			}),
			columnHelper.accessor("date_of_birth", {
				header: "Birthdate",
				meta: {
					align: "end",
				},
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

			{authors && <TanStackBasicTable columns={columns} data={authors} />}
		</>
	);
};

export default AuthorsPage;
