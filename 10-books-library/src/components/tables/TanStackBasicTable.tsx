import BSTable from "react-bootstrap/Table";
import { ColumnDef, flexRender, getCoreRowModel, useReactTable } from "@tanstack/react-table";


interface TanStackBasicTableProps<TData, TValue> {
	columns: ColumnDef<TData, TValue>[]; //describing the array with columns and how to render them
	data: TData[]; //actual data
};



const TanStackBasicTable = <TData, TValue>({ columns, data }: TanStackBasicTableProps<TData, TValue>) => {

	//setting up the table
	const table = useReactTable({
		data,
		columns,
		getCoreRowModel: getCoreRowModel(),
	});




	return (
		<BSTable bordered hover responsive striped size="sm">
			<thead>
				{table.getHeaderGroups().map(headerGroup => ( //get the headerGroup from the table and map over it (includes accessorKey and header)
					<tr key={headerGroup.id}>
						{headerGroup.headers.map(header => ( //map over the headerGroups headers
							<th key={header.id} colSpan={header.colSpan}>
								{header.isPlaceholder
									? null
									: flexRender( //render out what is defined in header (jsx, text, function etc.)
										header.column.columnDef.header,
										header.getContext()
									)
								}
							</th>
						))}
					</tr>
				))}
			</thead>

			<tbody>
				{table.getRowModel().rows.map(row => ( //render out the rows with context
					<tr key={row.id}>
						{row.getVisibleCells().map(cell => (
							<td key={cell.id}>
								{flexRender(
									cell.column.columnDef.cell,
									cell.getContext()
								)}
							</td>
						))}
					</tr>
				))}
			</tbody>
		</BSTable>
	)
};

export default TanStackBasicTable;
