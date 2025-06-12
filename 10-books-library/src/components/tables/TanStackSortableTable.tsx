import BSTable from "react-bootstrap/Table";
import { ColumnDef, flexRender, getCoreRowModel, getSortedRowModel, SortingState, useReactTable } from "@tanstack/react-table";
import { useState } from "react";


interface TanStackBasicTableProps<TData, TValue> {
	columns: ColumnDef<TData, TValue>[]; //describing the array with columns and how to render them
	data: TData[]; //actual data
};


const sortingIndicators = {
	asc: " 🙂",
	desc: " 🙃",
};




const TanStackBasicTable = <TData, TValue>({ columns, data }: TanStackBasicTableProps<TData, TValue>) => {

	const [sorting, setSorting] = useState<SortingState>([]);

	//setting up the table
	const table = useReactTable({
		data,
		columns,
		state: {
			sorting,
		},
		onSortingChange: setSorting,
		getCoreRowModel: getCoreRowModel(),
		getSortedRowModel: getSortedRowModel(),
	});




	return (
		<BSTable bordered hover responsive striped size="sm">
			<thead>
				{table.getHeaderGroups().map(headerGroup => (
					<tr key={headerGroup.id}>
						{headerGroup.headers.map(header => {
							const sortDirection = header.column.getIsSorted();

							return (
								<th key={header.id} colSpan={header.colSpan}>
									{header.isPlaceholder
										? null
										: <div
											className={header.column.getCanSort() ? "sortable" : ""}
											onClick={header.column.getToggleSortingHandler()}
										>
											{flexRender(
												header.column.columnDef.header,
												header.getContext()
											)}

											{/* Add a sort direction indicator */}
											{sortDirection && sortingIndicators[sortDirection]}
										</div>
									}
								</th>
							)
						})}
					</tr>
				))}
			</thead>

			<tbody>
				{table.getRowModel().rows.map(row => ( //render out the rows with context
					<tr key={row.id}>
						{row.getVisibleCells().map(cell => (
							<td key={cell.id} className={cell.column.columnDef.meta?.align || ""}>
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
